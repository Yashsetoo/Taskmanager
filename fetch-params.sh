#!/bin/bash
set -e
REGION="eu-north-1"   # update to your region

get() {
  aws ssm get-parameter --region $REGION --name "$1" \
    --with-decryption --query 'Parameter.Value' --output text
}

cat > .env << EOF
# Tier 3 — Database connection
DB_HOST=$(get /taskapp/DB_HOST)
DB_PORT=$(get /taskapp/DB_PORT)
DB_NAME=$(get /taskapp/DB_NAME)
DB_USER=$(get /taskapp/DB_USER)
DB_PASSWORD=$(get /taskapp/DB_PASSWORD)

# Tier 2 — Backend
SECRET_KEY=$(get /taskapp/SECRET_KEY)
ALLOWED_ORIGINS=$(get /taskapp/ALLOWED_ORIGINS)

# Tier 1 — Frontend
NEXT_PUBLIC_API_URL=$(get /taskapp/NEXT_PUBLIC_API_URL)
EOF

echo "✓ .env written from SSM Parameter Store"

