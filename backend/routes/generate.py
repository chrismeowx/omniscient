from flask import Blueprint, request, jsonify, send_file
import torch
import imageio

from shap_e.diffusion.sample import sample_latents
from shap_e.diffusion.gaussian_diffusion import diffusion_from_config
from shap_e.models.download import load_model, load_config
from shap_e.util.notebooks import create_pan_cameras, decode_latent_images

from services.keyword import extract_keyword

generate_bp = Blueprint('generate_bp', __name__)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model = load_model('text300M', device=device)
xm = load_model('transmitter', device=device)
diffusion = diffusion_from_config(load_config('diffusion'))

def generate_latents(keyword, guidance_scale=15.0, batch_size=1):
    latents = sample_latents(
        batch_size=batch_size,
        model=model,
        diffusion=diffusion,
        guidance_scale=guidance_scale,
        model_kwargs=dict(texts=[keyword] * batch_size),
        progress=True,
        clip_denoised=True,
        use_fp16=True,
        use_karras=True,
        karras_steps=64,
        sigma_min=1e-3,
        sigma_max=160,
        s_churn=0,
    )
    return latents

def render_latent_to_gif(latent, output_gif="output.gif"):
    cameras = create_pan_cameras(64, device)
    images = decode_latent_images(xm, latent, cameras, rendering_mode="stf")

    frames = [img.cpu().numpy() for img in images]
    frames = [(frame * 255).astype('uint8') for frame in frames]
    imageio.mimsave(output_gif, frames, fps=8)

    return output_gif

@generate_bp.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"status": "error", "message": "No prompt provided."}), 400

    keyword = extract_keyword(prompt)
    latents = generate_latents(keyword)

    latent_file = f"{keyword}_latent.pth"
    torch.save(latents[0], latent_file)

    return jsonify({
        "status": "success",
        "keyword_used": keyword,
        "latent_file": latent_file,
        "render_url": f"/generate/render/{latent_file}"
    })

@generate_bp.route("/generate/render/<latent_file>")
def render(latent_file):
    latent = torch.load(latent_file, map_location=device)
    output_gif = latent_file.replace(".pth", ".gif")

    render_latent_to_gif(latent, output_gif)

    return send_file(output_gif, mimetype="image/gif")

@generate_bp.route("/generate/download/<filename>")
def download_file(filename):
    return send_file(filename, as_attachment=True)
