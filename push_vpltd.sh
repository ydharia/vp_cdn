#!/bin/bash
echo "📦 Syncing clean code snapshot to secondary repo..."

read -p "Enter commit message for secondary repo: " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="Manual sync on $(date '+%Y-%m-%d %H:%M:%S')"
fi

git add .
git commit -m "Local work before sync" || echo "No local changes to commit."

git checkout --orphan temp-sync-branch
git add .
git commit -m "$COMMIT_MSG"
git push --force secondary temp-sync-branch:main
git checkout main
git branch -D temp-sync-branch

echo "✅ Code synced to secondary repo with commit message: '$COMMIT_MSG'"
