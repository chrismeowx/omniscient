from flask import Blueprint, request, jsonify
from services.keyword import extract_keyword
import requests

generate_bp = Blueprint('generate_bp', __name__)

COLAB_BASE = "https://0df06a0a27a8.ngrok-free.app"

@generate_bp.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    keyword = extract_keyword(prompt)
    print("Extracted keyword:", keyword)

    colab_response = requests.post(
        f"{COLAB_BASE}/generate",
        json={"prompt": keyword}
    )

    if not colab_response.ok:
        return jsonify({"error": "Failed to call Colab"}), 500

    colab_data = colab_response.json()
    render_url = f"https://0df06a0a27a8.ngrok-free.app/generate/render/cats.gif"

    return jsonify({
        "keyword": keyword,
        "render_url": render_url
    })
