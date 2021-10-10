FROM node:12

ENV NPM_CONFIG_PREFIX="/home/node/.npm-global"
ENV PATH="/home/node/.npm-global:/home/node/.npm-global/bin:${PATH}"

RUN mkdir -p "/.expo" && chmod -R 777 /.expo
RUN mkdir -p "/.npm" && chmod -R 777 /.npm
RUN mkdir -p "/home/node/code"
WORKDIR "/home/node/code"

RUN npm install -g expo-cli

RUN mkdir -p "/.cache" && chmod -R 777 /.cache

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["/bin/bash", "-c", "npm install; npm start"]
