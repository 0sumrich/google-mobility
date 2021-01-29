#!/usr/bin/env zsh
conda activate base
python update.py
git add .
git commit -m "data refresh $(date)"
git push
git branch -f gh-pages
git checkout gh-pages
git reset --hard origin/main
yarn build
cp -r dist/* .
git add -A .
git commit -a -m 'gh-pages update'
git push origin gh-pages --force
git checkout main