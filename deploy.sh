#!/bin/zsh

set -euo pipefail


sleep 1
ssh $VPS_username@$VPS_IP -p $VPS_port -C "cd ~/website && git pull -f && sudo docker compose restart jekyll"

set +euo pipefail
