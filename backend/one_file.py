from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch, imageio, json, re
from keybert import KeyBERT
from shap_e.diffusion.sample import sample_latents
from shap_e.diffusion.gaussian_diffusion import diffusion_from_config
from shap_e.models.download import load_model, load_config
from shap_e.util.notebooks import create_pan_cameras, decode_latent_images
from openai import OpenAI

# --- Setup ---
app = Flask(__name__)
CORS(app)

kw_model = KeyBERT()
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = load_model('text300M', device=device)
xm = load_model('transmitter', device=device)
diffusion = diffusion_from_config(load_config('diffusion'))

# llama client
with open("config.json") as f:
    key = json.load(f)["LLAMA2_API_KEY"]
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=key,
)

# --- Routes ---
@app.route("/ask", methods=["POST"])
def process_prompt():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "Prompt is empty"}), 400

    # --- 1. Extract keyword ---
    keyword = kw_model.extract_keywords(prompt, keyphrase_ngram_range=(1, 1), stop_words="english")[0][0]

    # --- 2. Generate 3D latent ---
    latents = sample_latents(
        batch_size=1,
        model=model,
        diffusion=diffusion,
        guidance_scale=15.0,
        model_kwargs=dict(texts=[keyword]),
        device=device,
        clip_denoised=True,
        use_fp16=torch.cuda.is_available(),
        use_karras=True,
        karras_steps=64,
        sigma_min=0.0001,
        sigma_max=1.0,
        s_churn=0
    )
    latent_file = f"{keyword}_latent.pth"
    torch.save(latents[0], latent_file)

    # --- 3. Render to GIF ---
    latent = torch.load(latent_file, map_location=device)
    output_gif = latent_file.replace(".pth", ".gif")
    cameras = create_pan_cameras(64, device)
    images = decode_latent_images(xm, latent, cameras, rendering_mode="stf")
    frames = [(img.cpu().numpy() * 255).astype("uint8") for img in images]
    imageio.mimsave(output_gif, frames, fps=8)

    # --- 4. Get Explanation ---
    instruction = (
        "Jawab singkat. Format JSON array seperti: "
        "[{\"title\": \"Judul\", \"body\": \"Penjelasan\"}]"
    )

    completion = client.chat.completions.create(
        model="meta-llama/llama-3.3-70b-instruct:free",
        messages=[
            {"role": "system", "content": instruction},
            {"role": "user", "content": prompt}
        ]
    )
    raw_output = re.sub(r"```json|```", "", completion.choices[0].message.content.strip())
    try:
        explanation = json.loads(raw_output)
    except:
        explanation = [{"title": "Penjelasan", "body": raw_output}]

    # --- 5. Return combined response ---
    return jsonify({
        "keyword": keyword,
        "latent_file": latent_file,
        "gif_url": f"/render/{output_gif}",
        "explanation": explanation
    })


# --- Run ---
if __name__ == "__main__":
    app.run(debug=True) 