#!/bin/bash

export REDIS_URL=redis://localhost:6379/0
export WORKER=true
export N_PARALLEL_JOBS=0

path=$(dirname $0)
cd $path/python/backend

source /opt/anaconda3/etc/profile.d/conda.sh
conda activate showwhy

if [[ -z "$N_PARALLEL_JOBS" ]]; then
    extra_params=""
else
    extra_params="--concurrency $N_PARALLEL_JOBS"
fi

extra_params="-P eventlet"

if [[ -z "${DEBUG}" ]]; then
    # worker debug disabled
    echo "Starting backend worker with debug disabled (extra_params=$extra_params)"
    poetry run python -m celery -A backend.worker_main worker -l info $extra_params
else
    # worker debug enabled
    echo "Starting backend worker with debug enabled (extra_params=$extra_params)"
    poetry run python -m debugpy --listen 0.0.0.0:6901 -m celery -A backend.worker_main worker -l info $extra_params
fi
