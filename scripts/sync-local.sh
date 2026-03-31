#!/bin/bash
# sync-local.sh
# VAULT="/mnt/d/my-data/notes/personal-blog-content" # Windows Vault location
VAULT="/home/amitkul/devhome/personal-blog-content" # WSL
CONTENT="src/content"

rsync -av --delete "$VAULT/posts/" "$CONTENT/posts/"
rsync -av --delete "$VAULT/pages/" "$CONTENT/pages/"

echo "✓ Content synced"