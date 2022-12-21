import torch
torch.multiprocessing.set_start_method('spawn')
from backend.worker_commons.worker import backend_worker as app  # noqa: F401
