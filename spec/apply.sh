#/bin/bash
set -e

cd ../infra
jinja2 ../deploy/secret.yaml \
  -D crt=$(terraform output crt) \
  -D key=$(terraform output key) \
  > ../deploy/secret.rendered

cd ../spec
kubectl apply -f secret.rendered

service=web
port=80

jinja2 service.yaml \
  -D service=$service \
  -D port=$port \
  | kubectl apply -f -

jinja2 ingress.yaml \
  -D domain=$domain \
  -D service=$service \
  -D port=$port \
  | kubectl apply -f -
