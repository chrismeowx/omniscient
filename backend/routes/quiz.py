from flask import Blueprint, request, jsonify
from services.llama_client import client
import json

quiz_bp = Blueprint('quiz_bp', __name__)

@quiz_bp.route("/generate-quiz", methods=["POST"])
def generate_quiz():
    data = request.get_json()
    prompt = data["prompt"]
    format = data["format"]

    if format == "Multiple":
        instruction = (
            "Buat PERSIS 10 soal pilihan ganda. "
            "Setiap soal punya 3 opsi A B C. "
            "Jawaban benar hanya satu huruf A/B/C. "
            "Balas HANYA JSON ARRAY. "
            "Tanpa kata pembuka atau penjelasan. "
            "Format: [{\"question\": \"...\", \"options\": [\"A. ...\", \"B. ...\", \"C. ...\"], \"answer\": \"A\"}]"
        )
    elif format == "Essay":
        instruction = (
            "Buat PERSIS 10 soal essay singkat. "
            "Setiap soal dengan jawaban contoh singkat. "
            "Balas HANYA JSON ARRAY. "
            "Format: [{\"question\": \"...\", \"answer\": \"...\"}]"
        )
    else:
        return jsonify({"error": "Invalid format"}), 400

    completion = client.chat.completions.create(
        model="meta-llama/llama-3.3-70b-instruct:free",
        messages=[
            {"role": "system", "content": instruction},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    raw_output = completion.choices[0].message.content.strip()

    print("=== RAW OUTPUT ===")
    print(raw_output)

    try:
        quiz = json.loads(raw_output)
    except:
        quiz = [{"question": "Parsing gagal", "answer": raw_output}]

    return jsonify({"quiz": quiz})


@quiz_bp.route("/check-essay", methods=["POST"])
def check_essay():
    data = request.get_json()
    question = data["question"]
    user_answer = data["user_answer"]
    correct_answer = data["correct_answer"]

    instruction = (
        f"Periksa jawaban essay ini.\n"
        f"Pertanyaan: {question}\n"
        f"Jawaban benar: {correct_answer}\n"
        f"Jawaban user: {user_answer}\n"
        f"Balas: Apakah jawaban user benar? Jelaskan max 40 kata."
    )

    completion = client.chat.completions.create(
        model="meta-llama/llama-3.3-70b-instruct:free",
        messages=[
            {"role": "system", "content": instruction}
        ]
    )

    feedback = completion.choices[0].message.content.strip()

    return jsonify({"feedback": feedback})
