## Overview

This API enables course prioritization based on predefined dependencies and course relationships.

## Key Features

- Supports authentication with an external provider
- Allows sorting of courses considering prerequisite and desired course connections

## Input JSON Structure

```json
{
  "userId": "00000000-0000-0000-0000-000000000000",
  "courses": [
    {
      "desiredCourse": "Finance",
      "requiredCourse": "PortfolioTheories"
    },
    {
      "desiredCourse": "Investment",
      "requiredCourse": "InvestmentStyle"
    },
    {
      "desiredCourse": "InvestmentManagment",
      "requiredCourse": "Investment"
    },
    {
      "desiredCourse": "PortfolioTheories",
      "requiredCourse": "InvestmentStyle"
    },
    {
      "desiredCourse": "InvestmentStyle",
      "requiredCourse": "InvestmentManagment"
    },
    {
      "desiredCourse": "PortfolioConstruction",
      "requiredCourse": "Investment"
    }
  ]
}
```

## Output EXPECTED

```json

[
  {
    "desiredCourse": "Finance",
    "requiredCourse": "PortfolioTheories",
  },
  {
    "desiredCourse": "Investment",
    "requiredCourse": "InvestmentStyle",
  },
  {
    "desiredCourse": "InvestmentManagment",
    "requiredCourse": "Investment",
  },
  {
    "desiredCourse": "PortfolioTheories",
    "requiredCourse": "InvestmentStyle",
  },
  {
    "desiredCourse": "InvestmentStyle",
    "requiredCourse": "InvestmentManagment",
  },
  {
    "desiredCourse": "PortfolioConstruction",
    "requiredCourse": "Investment",
  },
];

```

## Prerequisites:

- Node 18+
- Docker desktop

## Initialization

- Run database container using `docker-compose up -d` or `docker compose up -d` depending on your operating system

- `npm install` to install all necessary dependencies

- Create `.env` and copy `.env.dist`

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations

-When do some change on entities file, require run `name=${fileName }npm run migration:generate`
-To generate empty migration `name={fileName} npm run migration:create`
-To run migrations `npm run migration:run`

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

To view the documentation, check the `/api` endpoint.

It describes the different routes and examples of responses.
