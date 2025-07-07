import pickle
import torch
from shap_e.diffusion.gaussian_diffusion import diffusion_from_config
from shap_e.util.notebooks import decode_latent_mesh
from shap_e.models.download import load_model
import trimesh

def export_mesh(mesh, filename):
    if isinstance(mesh, list):
        for i, m in enumerate(mesh):
            m.export(f"{filename}_{i}.obj")
    else:
        mesh.export(filename)

class DiffusionModel:
    def __init__(self, config_path, model_path):
        with open(config_path, "rb") as f:
            config = pickle.load(f)

        self.model = diffusion_from_config(config)

        state_dict = torch.load(model_path, map_location="cpu")
        self.model.load_state_dict(state_dict)
        self.model.eval()

        self.decoder = load_model(device="cpu")

    def generate(self, text_embedding):
        with torch.no_grad():
            latents = self.model.sample(
                batch_size=1,
                model_kwargs={"text_embeddings": text_embedding},
                device="cpu"
            )

            mesh = decode_latent_mesh(latents, self.decoder)

            export_mesh(mesh, "output.obj")

        return "output.obj"
    