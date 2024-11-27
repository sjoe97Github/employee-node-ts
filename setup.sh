#!/bin/bash
export AWS_REGION='us-west-2',
export AWS_ACCESS_KEY_ID='',
export AWS_SECRET_ACCESS_KEY=''

export MYSQL_ROOT_PASSWORD='***REMOVED***'

# docker-compose up -d
docker-compose up -d; docker-compose logs -f

if [ $? -eq 0 ]; then
  echo "Docker Compose started successfully."

#   npx nodemon --exec ts-node src/app.ts
else
  echo "Docker Compose failed to start. Check the logs for more information."
fi

