FROM alpine
RUN mkdir -p /srv/main
COPY ./server /srv/main
WORKDIR /srv/main
RUN chmod +x ./startingApp.sh
CMD [ "sh", "./startingApp.sh" ]