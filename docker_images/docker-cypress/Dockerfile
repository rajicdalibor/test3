## Image where we run the e2e_tests when on circleCI
# currently pushed at docker hub under mnembrini/3ap-3apadmin-e2e:0.0.1

FROM circleci/openjdk:8-node-browsers

# cypress dependencies
RUN sudo apt-get update && \
  sudo apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb


# versions of local tools
RUN node -v
RUN npm -v
