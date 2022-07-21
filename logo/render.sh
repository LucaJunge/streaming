#!/bin/bash
logoSizes=(16 32 128 256 500 512 1000 1024 2048)

mkdir -p "sizes"

for size in ${logoSizes[@]}; do
  inkscape "logo.svg" \
  --export-width=$size \
  --export-type=png \
  --export-filename="./sizes/logo_$size.png"
  echo "Rendered logo with ${size}x${size}"
done
