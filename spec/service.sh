#/bin/bash
set -e

service=web
port=8080

jinja2 service.yaml \
  -D service=$service \
  -D port=$port \
  -D tag=$tag \
  | kubectl apply -f -
