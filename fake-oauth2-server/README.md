# Fake oauth2 server

This is node server that provides mockups answers to external services (google and harvest) with https protocol.

## Setup
* run command `yarn install`
* Import certificate into jks with command `sudo keytool -import -alias node-server-self-signed-cert -file <project_root>/fake-oauth2-server/cert/selfsigned.crt -keystore <jdk_home>/Contents/Home/jre/lib/security/cacerts`
* run command `yarn start`