# ADR002 - Use AWS UI Components and React

## Status

Adopted

## Decision

The intent of this starter template was to use the AWS Design System and [AWS UI](https://github.com/aws/awsui-documentation) Components.
Since AWS UI components, are React components, this also made the decision to use [React](https://reactjs.org/).
Since colors from the AWS UI design tokens are available to import from an `.scss` file, this make the decision to use [SASS](https://sass-lang.com/).

## Context

This template was envisioned to help jump start web UIs for Solution Architect demos of AWS services.
These builders have familiarity as users of the AWS Design System. Pre-selecting this UI component
library should accelerate creating visually compelling demos.

## Options Considered

[AWS UI](https://github.com/aws/awsui-documentation) is a collection of more than 50 React
components that help create intuitive, responsive, and accessible interfaces for web applications.

- `+` An open-source design system whose UI components are familiar to existing AWS Console users.
- `-` Only supports React based web applications.

[Amplify UI](https://ui.docs.amplify.aws/) is an open-source design system with cloud-connected
components and primitives that simplify building accessible, performant, and beautiful applications
in React, Angular, and Vue (more coming soon).

- `+` Another open-source design system from AWS which supports multiple web frameworks.
- `-` Wanted to match the "look and feel" of the AWS Console.

[AWS NorthStar](https://github.com/aws/aws-northstar)

- `+` Built for rapidly prototyping intuitive, meaningful and accessible user experiences.
- `-` Wanted to match the "look and feel" of the AWS Console.

## Consequences

- `-` This original decision limits the applicability of this template, but also allows it to be be purpose-built.

## Advice

None provided
