# vCard Backend App

## Description

Built using [Nest](https://github.com/nestjs/nest) framework.
This application was created to generate a list of products to be published by its user on social media

## Setup

This application requires a few variables to work with:
```bash
APP_NAME=vCard
APP_DESCRIPTION=vCard is an application to generate dynamic list to send to customers

PORT=<Port wheere the app will run>

COGNITO_USER_POOL_ID=<AWS Cognito User Pool ID>
COGNITO_CLIENT_ID=<AWS Cognito Client ID>
COGNITO_REGION=<AWS Region for Cognito Pool>
```

Keep in mind that you must have a AWS account setup and must create the Cognito Pool Prior attempting to execute this project

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

## License

yhis project is under [MIT licensed](../LICENSE).
