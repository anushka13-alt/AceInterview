FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y \
    g++ \
    gcc \
    python3 \
    default-jdk && \
    apt-get clean

WORKDIR /app

CMD ["bash"]
