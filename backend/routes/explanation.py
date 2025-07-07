from flask import Blueprint, request, jsonify, current_app
from services.llama_client import client
import re, json

explanation_bp = Blueprint('explanation_bp', __name__)

@explanation_bp.route("/ask", methods=["POST"])
def ask():
    db = current_app.config["DB"]  
    data = request.get_json()
    prompt = data["prompt"]

    instruction = (
        "Jawab singkat, bagi penjelasan jadi beberapa bagian. "
        "Format jawab: JSON array. "
        "Setiap item: {\"title\": \"Judul\", \"body\": \"Penjelasan\"}. "
        "Hanya balas JSON array saja, TANPA penjelasan tambahan."
        "Jangan pakai "
    )

    completion = client.chat.completions.create(
        model="meta-llama/llama-3.3-70b-instruct:free",
        messages=[
            {"role": "system", "content": instruction},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    raw_output = completion.choices[0].message.content
    cleaned_output = re.sub(r"```json|```", "", raw_output).strip()

    try:
        sections = json.loads(cleaned_output)
    except json.JSONDecodeError:
        sections = [{"title": "Penjelasan", "body": raw_output}]

    db.collection("prompts").add({
        "prompt": prompt,
        "sections": sections
    })

    return jsonify({"result": sections})
