#! /bin/sh

docker build -t expo-build .
docker run --user "$UID:$GID" --network=host -it -v $(pwd):/home/node/tracing-paper-sketching expo-build

