from text_encoder import TextEncoder
from diffusion_model import DiffusionModel

class TextTo3DPipeline:
    def __init__(self, text_encoder_path, diffusion_config_path, diffusion_model_path):
        self.text_encoder = TextEncoder(text_encoder_path)
        self.diffusion_model = DiffusionModel(diffusion_config_path, diffusion_model_path)

    def generate(self, prompt):
        embedding = self.text_encoder.encode(prompt)
        result = self.diffusion_model.generate(embedding)
        return result
