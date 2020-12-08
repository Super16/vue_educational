#!/usr/bin/env bash

set -e

npm run build

cd dist

git init 

git add -A

git commit -m "Initial commit"

git push -f $1 master:gh-pages

cd ~

