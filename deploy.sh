#!/bin/zsh

set -euo pipefail


ssh $VPS_username@$VPS_IP -p $VPS_port -C "cd ~/website ; git pull -f ; sudo docker compose down ; sudo docker compose up -d"

set +euo pipefail
