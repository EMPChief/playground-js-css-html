#!/bin/bash

# This script updates all HTML files in the project (except resume folder)
# to include favicon references to the central assets/logo directory

# Find all HTML files except those in resume directory
HTML_FILES=$(find . -name "*.html" -not -path "./resume/*")

for file in $HTML_FILES; do
  # Skip already updated files
  if grep -q "assets/logo/favicon" "$file"; then
    echo "Skipping already updated file: $file"
    continue
  fi

  # Get the directory depth to determine relative path to root
  depth=$(echo "$file" | awk -F'/' '{print NF-1}')
  path_prefix=""
  
  # Create the correct relative path prefix
  for ((i=1; i<depth; i++)); do
    path_prefix="../$path_prefix"
  done

  # Insert favicon links after the title tag
  sed -i "/<\/title>/a\\
    <!-- Favicon -->\\
    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"${path_prefix}assets/logo/favicon-32x32.png\">\\
    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"${path_prefix}assets/logo/favicon-16x16.png\">" "$file"
  
  echo "Updated: $file"
done

echo "Done updating favicon references in HTML files." 