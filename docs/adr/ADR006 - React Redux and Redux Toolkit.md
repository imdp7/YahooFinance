# ADR006 - Use React Redux and Redux Toolkit for managing application state

## Status

Adopted

## Decision

Use [Redux](https://redux.js.org/) for managing application state,
[React Redux](https://react-redux.js.org/) as the React bindings for Redux,
and [Redux Toolkit](https://redux-toolkit.js.org/) for efficient Redux development.

## Context

Demos being built using this template will likely require state management.

## Options Considered

Redux + React Redux + Redux Toolkit

- `+` De facto standard, including detailed documentation many code samples.
- `+` Redux DevTools make it easy to trace when, where, why, and how your application's state changed.

React [Context](https://reactjs.org/docs/context.html) provides a way to pass data through the component tree without having to pass props down manually at every level.

- `-` [Why React Context is Not a "State Management" Tool (and Why It Doesn't Replace Redux)](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/)

## Consequences

- `-` Some applications using this template won't need Redux.

## Advice

None provided
