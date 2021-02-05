#!/usr/bin/env zsh
git pull
conda activate base
python update.py
git add .
git commit -m "data refresh $(date)"
git push
yarn deploy