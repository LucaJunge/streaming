#!/bin/bash

logo_sizes=(16 32 128 256 512 1024 2048)
variants=("logo_base" "logo_base_inverted" "logo_muted"  "logo_muted_inverted")

# Create main folder for variants
mkdir -p "variants"

# Create folders for sizes and variants
for variant in ${variants[@]}; do
  mkdir -p "variants/$variant"
done

#Create png for every variant in every size
for variant in ${variants[@]}; do
  for size in ${logo_sizes[@]}; do
    inkscape "logo.svg" \
    --export-width="$size" \
    --export-type="png" \
    --export-id="$variant" \
    --export-filename=- > "variants/${variant}/${variant}_${size}x${size}.png"
    echo "Rendered $variant (${size}x${size})"
  done
done
