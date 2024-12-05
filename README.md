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

## Compile and run the project

-Copy `.env.dist`, create `.env` and paste

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

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

```

```
