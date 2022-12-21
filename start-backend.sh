#!/bin/bash

d=$(dirname $0)
cd $d

Params="--collect --user -d -E PATH=$PATH"

systemd-run $Params -u showwhy_api ./run-backend_api.sh
systemd-run $Params -u showwhy_worker ./run-backend_worker.sh

