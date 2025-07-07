from transformers import CLIPTextModel, CLIPTokenizer

class TextEncoder:
    def __init__(self, model_path=None):
        self.tokenizer = CLIPTokenizer.from_pretrained(
            "openai/clip-vit-base-patch32"
        )

        self.model = CLIPTextModel.from_pretrained("./models/clip-vit-base-patch32", local_files_only=True)

        if model_path:
            # Load bobot sendiri pakai safetensors
            from safetensors.torch import load_file
            state_dict = load_file(model_path)
            self.model.load_state_dict(state_dict)

        self.model.eval()
