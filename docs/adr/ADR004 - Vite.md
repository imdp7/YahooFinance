# ADR004 - Use Vite for frontend tooling

## Status

Adopted

## Decision

Use [Vite](https://vitejs.dev/) as the frontend tooling for local development and production builds.

## Context

Modern web app development involves multiple tools and technologies working together to support both
rapid local development and production quality builds. The easiest way to scaffold a project is to
use a tool to bootstrap its creation.

## Options Considered

[Vite](https://vitejs.dev/) is next generation frontend tooling.

- `+` Native ESM based dev server for fast Hot Module Replacement (HMR) during local development.
- `+` Production Rollup builds are pre-configured for performance optimizations.
- `+` Supports React and TypeScript, but also JavaScript and other web frameworks.
- `-` Opinionated tool choices may impact other future decisions.

[Create React App](https://create-react-app.dev/) (CRA) is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.

- `+` The most common tool for setting up a modern React web app.

## Consequences

- `-` Vite is newer and less common that Create React App. This has technology benefits, but also makes finding examples and experts harder.

## Advice

None provided
