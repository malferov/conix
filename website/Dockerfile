FROM nginx:alpine
ARG sha
ARG ver
ARG date
ARG app
ARG domain
ENV app ${app}
WORKDIR /usr/share/nginx/html
COPY website/ ./
