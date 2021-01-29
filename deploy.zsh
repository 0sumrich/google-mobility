#!/usr/bin/env zsh
conda activate base
python update.py
git add .
git commit -m "data refresh $(date)"
git push
yarn deploy