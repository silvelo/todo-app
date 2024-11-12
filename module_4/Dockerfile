FROM nginx:alpine
RUN apk update && apk add --no-cache iputils nano
VOLUME ["/etc/nginx/conf.d"]
COPY ./index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]