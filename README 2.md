# 3APAdmin [![Circle CI](https://circleci.com/gh/3AP-AG/3APAdmin.svg?style=shield&circle-token=4705865d7d0b544a0baaf681f149a9910a42435c)](https://circleci.com/gh/3AP-AG/3APAdmin)

3APAdmin is a webapp that powers the 3AP intranet. It has a Spring Boot backend and a React frontend.

## Links

[Confluence wiki](https://3apjira.atlassian.net/wiki/spaces/AA/pages/164167687/3AP+Admin+Portal)

[JIRA tasks](https://3apjira.atlassian.net/secure/RapidBoard.jspa?rapidView=43&projectKey=AD&view=planning&selectedIssue=AD-38)

## Features

* Login with Google SSO
* Harvest API
  * Get all users from Harvest
  * Calculate overtime hours per month for each user

## Missing features
* Microservice infrastructure
* Reactive Spring 🤓

## Install npm
* `brew install node`

## Install yarn
* `brew install yarn`

## Start FE app
Start react application in different environment.

-- Development env --

* `yarn start` 

-- Production env --

* `yarn global add serve` - this should run only once (if it is not installed yet)
* `yarn build`
* `serve -s build`

