from openai import OpenAI
import json
import re

with open("config.json", "r") as f:
    config = json.load(f)

value = re.sub(r"\s+", "", config["OPENROUTER_API_KEY"])
if not value:
    raise ValueError("Error, API not found.")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=value,
    default_headers={
        "HTTP-Referer": "https://colab.research.google.com",
        "X-Title": "my-colab-test"
    }
)
