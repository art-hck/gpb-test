#!/bin/bash

PROJECT_PATH=`dirname $(readlink -f $0)`
PROJECT_NAME=${PROJECT_PATH##*/}

echo ""
echo "Envirment setup."
echo ""
read -p "APP_PATH (in containers) [/opt/$PROJECT_NAME]: " APP_PATH
read -p "NGINX_HOST_PORT [80]: " NGINX_HOST_PORT
read -p "NGINX_CONTAINER_PORT [8080]: " NGINX_CONTAINER_PORT
read -p "NGINX_HOST [localhost]: " NGINX_HOST


echo APP_PATH=${APP_PATH:-/opt/${PROJECT_NAME}} >> ${PROJECT_PATH}/.env

echo NGINX_HOST=${NGINX_HOST:-localhost} >> ${PROJECT_PATH}/.env
echo NGINX_HOST_PORT=${NGINX_HOST_PORT:-80} >> ${PROJECT_PATH}/.env
echo NGINX_CONTAINER_PORT=${NGINX_CONTAINER_PORT:-8080} >> ${PROJECT_PATH}/.env

echo USER=`whoami` >> ${PROJECT_PATH}/.env
echo PROJECT_PATH=${PROJECT_PATH} >> ${PROJECT_PATH}/.env
