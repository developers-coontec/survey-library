#!/bin/bash

#npm install -g npm-cli-login
npm-cli-login -u jenkins -p jenkins1234!1 -e developers@coontec.com -r https://maven.meback.ai/repository/npm-private/

#npm set //maven.meback.ai/repository/npm-private/:_authToken NpmToken.0b029231-1b5d-3fd6-9817-a01f575d1ea4
#npm login --registry https://maven.meback.ai/repository/npm-private/

rm -rf build

npm install --registry https://maven.meback.ai/repository/npm-group
#npm install


#npm run build_knockout_prod
#npm run build_knockout_dev
#npm run build_core_prod
#npm run build_core_dev
#npm run build_react_prod
#npm run build_react_dev
npm run build_dev
npm run build_prod
npm run build_knockout_ui
npm run build_react_ui
#
cd build/survey-knockout
npm publish --registry https://maven.meback.ai/repository/npm-private/
cd ../survey-core
npm publish --registry https://maven.meback.ai/repository/npm-private/
cd ../survey-knockout-ui
npm publish --registry https://maven.meback.ai/repository/npm-private/
cd ../survey-react
npm publish --registry https://maven.meback.ai/repository/npm-private/
cd ../survey-react-ui
npm publish --registry https://maven.meback.ai/repository/npm-private/
