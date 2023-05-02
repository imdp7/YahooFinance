# ADR001 - Use "git clone" for Project Scaffolding

## Status

Adopted

## Decision

Create this template to be straightforward to `git clone` (or "copy/paste").

## Context

This template was envisioned to help jump start Solution Architect demo projects.
The fastest way to scaffold a new project is to just "copy" an existing project and modify as needed.

## Options Considered

`git clone` to make a copy of an existing, working project.

- `+` Common and fast way to scaffold projects.
- `-` Adopting template updates is not an automated process.

`README.md` based documentation on project creation.

- `+` Users understand all the steps involved.
- `-` Requires time and human effort to create project.

[progen](https://github.com/projen/projen) to define and maintain complex project configuration through code.

- `+` As opposed to existing templating/scaffolding tools, projen is not a one-off generator. To modify your project setup, users interact with rich strongly-typed class and execute projen to update their project configuration files.
- `-` Requires another tool and additional effort during project setup.

## Consequences

- `+` Allows for a evolution from "git clone" to a tool like [degit](https://github.com/Rich-Harris/degit)

## Advice

None provided
