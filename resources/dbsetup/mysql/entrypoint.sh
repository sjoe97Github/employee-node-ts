#!/bin/bash

echo "Entry Point Script ..... DB_USER = $DB_USER"
echo "Entry Point Script ..... DB_PASSWORD = $DB_PASSWORD"
echo "Entry Point Script ..... MYSQL_DATABASE = $MYSQL_DATABASE"
echo "Entry Point Script ..... MYSQL_ROOT_PASSWORD = $MYSQL_ROOT_PASSWORD"

# Substitute environment variables in init.sql
# envsubst < /docker-entrypoint-initdb.d/initializedb.sql.template > /docker-entrypoint-initdb.d/initializedb.sql
sed -e "s/\${DB_USER}/$DB_USER/g" -e "s/\${DB_PASSWORD}/$DB_PASSWORD/g" /docker-entrypoint-initdb.d/initializedb.sql.template > /docker-entrypoint-initdb.d/init.sql

echo "Executing docker-entrypoint.sh ....."

# Execute the original entrypoint script with all its arguments
# exec docker-entrypoint.sh "$@"
which docker-entrypoint.sh
cat /docker-entrypoint.sh 


# docker-entrypoint.sh "$@"

echo "After executing docker-entrypoint.sh ....."

# Keep the container running for debugging
# tail -f /dev/null