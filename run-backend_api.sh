#!/bin/bash
export ENABLE_CORS=*
export REDIS_URL=redis://localhost:6379/0
export STORAGE=/data

d=$(dirname $0)
cd $d/python/backend

source /opt/conda/etc/profile.d/conda.sh
conda activate causal
if [[ -z "${DEBUG}" ]]; then
    # API debug disabled
    echo "Starting backend api with debug disabled"
    poetry run python -m uvicorn backend.api_main:app --host 0.0.0.0 --port 8081
else
    # API debug enabled
    echo "Starting backend api with debug enabled"
    poetry run python -m debugpy --listen 0.0.0.0:6900 -m uvicorn backend.api_main:app --host 0.0.0.0 --port 8081
fi

