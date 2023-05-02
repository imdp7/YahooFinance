# ADR003 - Use TypeScript for application logic

## Status

Adopted

## Decision

Use [TypeScript](https://www.typescriptlang.org/) to build the application logic (`.ts` files) and React components (`.tsx` files).

## Context

React applications are often built with XML-like syntax called JSX.
React components can be built [without ES6](https://reactjs.org/docs/react-without-es6.html) as a plain JavaScript class or [without JSX](https://reactjs.org/docs/react-without-jsx.html).
They also can be [built using TypeScript](https://reactjs.org/docs/static-type-checking.html#typescript) and still contain JSX syntactic sugar.

## Options Considered

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- `+` Types can make the code easier to read and use, especially when your development environment supports code completion and type checking.
- `-` Requires additional build tooling and project setup.

JavaScript runs on the client side of the web, which can be used to design / program how the web pages behave on the occurrence of an event. JavaScript is an easy to learn and also powerful scripting language, widely used for controlling web page behavior. [\[MDN\]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript)

- `+` Likely more React code examples and resources using JavaScript.

## Consequences

- `-` For builders new to TypeScript, this adds complexity to the project.

## Advice

None provided
