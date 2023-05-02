# ADR005 - Use React Router for client-side routing

## Status

Adopted

## Decision

[React Router](https://reactrouter.com/) using `<BrowserRouter>`

## Context

Single page web applications which leverage the URL path need client-side routing logic.

## Options Considered

React Router is a fully-featured client and server-side routing library for React

- `+` De facto choice for routing

## Consequences

- `-` Some applications using this template won't need React Router.
- `-` Use of [BrowserRouter](https://reactrouter.com/docs/en/v6/api#browserrouter) requires production hosting platform to handle full URLs for bookmarks and page reloads.

## Advice

None provided
