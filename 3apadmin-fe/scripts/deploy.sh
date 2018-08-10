#!/usr/bin/env bash
## Deploy the frontend to swisscom cloud

# change directory to where this script is located
pushd "$(dirname ${BASH_SOURCE[0]})"
# cd to frontend root folder
cd ..
yarn build
cf push -f deploy/manifest/manifest-dev.yml

# restore original directory
popd
