# ADR007 - Use ESLint and Prettier for code quality and formatting

## Status

Adopted

## Decision

Add dev dependencies for [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

- ESLint statically analyzes your code to quickly find problems.
- Prettier is an opinionated code formatter.

Use `.js` based configuration files instead or `.json`.
Install `eslint-plugin-react`, `eslint-config-prettier` and `@typescript-eslint/eslint-plugin`
and extend their recommended settings.

## Context

When demo code is published as a sample on GitHub, there is an expectation
of code quality and readability by customers.

## Options Considered

ESLint + Prettier

- `+` ESLint has integrations into other tools like editors, build systems, and more.
- `+` Prettier supports many languages used in this project, including TypeScript, JSX, JSON, SCSS, and Markdown.
- `+` Both tools have Visual Studio Code (and other IDE) extensions.

ESLint only

- `+` ESLint comes with several built-in formatters for JavaScript.

## Consequences

- `+` Since these code quality tools are development dependencies, they can be easily removed or replaced in the project.

## Advice

None provided
