# ADR008 - Use Vitest and Cypress for testing

## Status

Proposed

## Decision

Use [Vitest](https://vitest.dev/) for unit testing because of native integration with Vite.

Use [Cypress](https://www.cypress.io/) for end to end testing and write tests in [TypeScript](https://docs.cypress.io/guides/tooling/typescript-support).

## Context

Testing is an important part of all modern web applications. Although much of the "feature"
code in this template will discarded, having working example tests will accelerate
future test creation.

## Options Considered

Vitest is a Vite native test runner which uses the Vite dev server to transform your files during testing.

- `+` Vite's config, transformers, resolvers, and plugins.
- `+` Chai built-in for assertions + Jest expect compatible APIs
- `-` Vitest is still in development

Cypress

- `+` [Amplify Console offers a deeper integration with Cypress](https://docs.aws.amazon.com/amplify/latest/userguide/running-tests.html#add-tests-to-your-existing-amplify-app)

[Jest](https://jestjs.io/) is a delightful JavaScript Testing Framework with a focus on simplicity.

- `+` De facto standard, including detailed documentation many code samples.
- `-` Requires duplicate configuration from Vite around build tooling.

## Consequences

- `-` Because Vitest is still in development, it might not make a good choice for a production web app.

## Advice

None provided
