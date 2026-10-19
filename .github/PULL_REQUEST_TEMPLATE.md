## What changed

<!-- One or two sentences. Link the issue if there is one. -->

Target `dev` for changes. Target `main` only for a release PR from `dev`.

## Why

<!-- The reason this is the right change, not just what it does. -->

## Checks

- [ ] **New repository only:** the identity PR (name, `README.md`, `docs/product.md` vision) is
      merged — no code before it (rule 3)
- [ ] Docs updated in this PR, or the body says why there is no doc impact (rule 2)
- [ ] The check command in `docs/development.md` passes
- [ ] The build passes
- [ ] Docs updated if behavior or a decision changed (`docs/`, `docs/decisions.md`)
- [ ] For a PR to `main`, exactly one release label is applied: `release:patch`, `release:minor`, or `release:major`
