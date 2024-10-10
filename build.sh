#!/bin/bash

#npm install -g npm-cli-login
npm-cli-login -u jenkins -p jenkins1234\!1 -e developers@coontec.com -r https://maven.planesg.ai/repository/npm-private/


rm -rf build

npm install --registry https://maven.planesg.ai/repository/npm-group/
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
npm publish --registry https://maven.planesg.ai/repository/npm-private/
cd ../survey-core
npm publish --registry https://maven.planesg.ai/repository/npm-private/
cd ../survey-knockout-ui
npm publish --registry https://maven.planesg.ai/repository/npm-private/
cd ../survey-react
npm publish --registry https://maven.planesg.ai/repository/npm-private/
cd ../survey-react-ui
npm publish --registry https://maven.planesg.ai/repository/npm-private/
