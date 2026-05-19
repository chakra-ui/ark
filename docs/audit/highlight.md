# Highlight Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/highlight/highlight.ts`, `packages/angular/src/highlight/public-api.ts`, `packages/angular/src/highlight/highlight.stories.ts`, `packages/angular/src/highlight/examples/*.ts`, `packages/angular/src/highlight/highlight.spec.ts`
- React files: `packages/react/src/components/highlight/highlight.tsx`, `packages/react/src/components/highlight/use-highlight.ts`, `packages/react/src/components/highlight/index.ts`, `packages/react/src/components/highlight/examples/*.tsx`, `packages/react/src/components/highlight/highlight.stories.tsx`
- Storybook/style files: `.storybook/modules/highlight.module.css`, `.storybook/modules/field.module.css`

## Summary
- Status: Fixed
- Highest-risk gaps:
  - Angular exposed only the `highlightWord` utility, while React/Solid/Vue/Svelte expose a renderable Highlight component.
  - Angular Storybook examples manually repeated chunk rendering instead of exercising the public component surface.
  - Angular examples did not match the React demo module styling for text, marks, layout, labels, and dynamic-query input states.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Missing renderable Highlight component for `query`, `text`, `ignoreCase`, `matchAll`, and `exactMatch`. | `packages/react/src/components/highlight/highlight.tsx` | `packages/angular/src/highlight/highlight.ts` | Fixed: added `ArkHighlightComponent` backed by `highlightWord`, exported from the highlight entry point while preserving utility exports. |
| Story parity | Stories exist, but examples render chunks manually and do not validate the component API. | `packages/react/src/components/highlight/examples/*.tsx` | `packages/angular/src/highlight/examples/*.ts` | Fixed: converted examples to use `<ark-highlight>` with matching story names and props. |
| Styling parity | Missing React `.Text`, `.Mark`, `.Root`, `.Label`, `.Section`, and field input styles. | `.storybook/modules/highlight.module.css`, `.storybook/modules/field.module.css` | `packages/angular/src/highlight/examples/*.ts` | Fixed: added shared Angular example styles and applied the corresponding classes. |
| Functionality parity | Utility behavior is tested, but component rendering, required text handling, and dynamic query updates are not. | `packages/react/src/components/highlight/highlight.tsx` | `packages/angular/src/highlight/highlight.spec.ts` | Fixed: added component host tests and kept utility behavior coverage. |
| Accessibility parity | Highlight renders matched text as semantic `<mark>` elements with no roles or keyboard behavior in React; Angular should match. | `packages/react/src/components/highlight/highlight.tsx` | `packages/angular/src/highlight/highlight.ts` | Fixed: matched chunks render as `<mark>` and non-matching chunks render as text-equivalent spans to avoid Angular template whitespace changes. |

## Implementation Plan
1. Add an `ArkHighlightComponent` that validates `text`, computes chunks with `highlightWord`, renders matching chunks as `<mark>`, and supports Storybook mark styling.
2. Add shared Angular example styles mirroring the React highlight and field CSS modules.
3. Update all Highlight examples to use `<ark-highlight>` and matching classes.
4. Expand tests to cover component rendering, dynamic query updates, runtime text validation, examples mounting, and existing utility behavior.
5. Run focused Highlight tests, Angular typecheck, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; package build completed and forms isolation reported `forms isolation: ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/highlight/highlight.spec.ts` passed with 19 tests.
- [ ] Storybook render: `bun run --cwd packages/angular storybook` was attempted with a 60 second startup cap; it was still compiling Webpack modules and did not reach a local URL before the cap.
- [ ] Manual/visual checks: Deferred because Storybook did not finish startup within the bounded check. Styling was matched against `.storybook/modules/highlight.module.css` and `.storybook/modules/field.module.css` in code.

## Commit
- Hash: recorded in final status
- Message: `fix(angular): align highlight with react parity`
