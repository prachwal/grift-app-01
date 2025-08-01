#!/bin/bash

# Script to copy JSON definition files from netlify/functions to public folder
# This makes them accessible during development

echo "Copying JSON definition files..."

# Create public directory structure
mkdir -p public/netlify/functions/hello

# Copy JSON files
find netlify/functions -name "*.json" -type f | while read json_file; do
    # Get relative path
    rel_path=${json_file#netlify/functions/}
    target_path="public/netlify/functions/$rel_path"
    
    # Create target directory if it doesn't exist
    target_dir=$(dirname "$target_path")
    mkdir -p "$target_dir"
    
    # Copy file
    cp "$json_file" "$target_path"
    echo "Copied: $json_file -> $target_path"
done

echo "JSON definition files copied successfully!"
