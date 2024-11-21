#!/bin/bash

# Substitute environment variables in init.sql
# envsubst < ./initializedb.sql.template > ./initializedb.sql
# sed -e "s/\${DB_USER}/$DB_USER/g" -e "s/\${DB_PASSWORD}/$DB_PASSWORD/g" /docker-entrypoint-initdb.d/initializedb.sql.template > /docker-entrypoint-initdb.d/init.sql
sed -e "s/\${DB_USER}/$DB_USER/g" -e "s/\${DB_PASSWORD}/$DB_PASSWORD/g" ./initializedb.sql.template > ./init.sql

# Execute the original entrypoint script with all its arguments
# exec docker-entrypoint.sh "$@"