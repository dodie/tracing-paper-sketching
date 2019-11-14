FROM node:12

ENV USERNAME node

USER $USERNAME

ENV NPM_CONFIG_PREFIX="/home/$USERNAME/.npm-global"
ENV PATH="/home/$USERNAME/.npm-global:/home/$USERNAME/.npm-global/bin:${PATH}"

RUN mkdir -p "/home/$USERNAME/code"
WORKDIR "/home/$USERNAME/code"

RUN npm install -g expo-cli

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["/bin/bash", "-c", "npm install; npm start"]
