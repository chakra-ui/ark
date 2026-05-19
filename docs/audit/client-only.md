# ClientOnly Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/client-only.spec.ts`, `packages/angular/src/client-only/client-only.stories.ts`, `packages/angular/src/client-only/examples/basic.ts`, `packages/angular/src/client-only/examples/with-fallback.ts`, `packages/angular/src/client-only/public-api.ts`, `packages/angular/src/client-only/ng-package.json`
- React files: `packages/react/src/components/client-only/client-only.tsx`, `packages/react/src/components/client-only/client-only.stories.tsx`, `packages/react/src/components/client-only/examples/basic.tsx`, `packages/react/src/components/client-only/examples/with-fallback.tsx`, `packages/react/src/components/client-only/index.ts`
- Storybook/style files: no `client-only` CSS module exists; both frameworks render unstyled content for `Basic` and `WithFallback`

## Summary
- Status: Aligned. Angular exposes the standalone `<ark-client-only>` utility with projected client content and an optional fallback `TemplateRef`, matching the React component's client-only render/fallback contract in Angular template form.
- Highest-risk gaps: None requiring code changes. Angular intentionally accepts fallback content as a `TemplateRef` because Angular templates cannot pass arbitrary render nodes like React props.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | React exports `ClientOnly` with `children` and optional `fallback`; Angular exports `ArkClientOnlyComponent` with content projection and optional `fallback` template input. | `packages/react/src/components/client-only/client-only.tsx` | `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/public-api.ts` | No change. Angular API is idiomatic and equivalent for consumers. |
| Story parity | React and Angular both provide `Basic` and `WithFallback` stories with matching text. | `packages/react/src/components/client-only/client-only.stories.tsx`, `packages/react/src/components/client-only/examples/*.tsx` | `packages/angular/src/client-only/client-only.stories.ts`, `packages/angular/src/client-only/examples/*.ts` | No change. |
| Functionality parity | Client content is hidden until the browser render path runs; fallback renders while client content is unavailable. | `packages/react/src/components/client-only/client-only.tsx` | `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/client-only.spec.ts` | No change. Existing specs cover fallback, client swap, SSR construction safety, and `display: contents`. |
| Styling parity | No React CSS module or Angular example styles are used for this utility. | none | none | No change. |
| Accessibility parity | Component adds no roles or ARIA and uses `display: contents` so it does not introduce an extra layout box. | `packages/react/src/components/client-only/client-only.tsx` | `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/client-only.spec.ts` | No change. |
| Test parity | React has no dedicated client-only tests; Angular has focused tests for the utility behavior. | none | `packages/angular/src/client-only/client-only.spec.ts` | No change. |

## Implementation Plan
1. Compare React source, stories, and examples against the Angular component, stories, examples, package entry point, and focused spec.
2. Confirm no styling module exists for `client-only` and no Storybook style parity work is needed.
3. Run the focused Angular component spec.
4. Record aligned parity status without editing component implementation.

## Verification
- [x] Typecheck/build: Not run; no implementation, export, or public type changes were made.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/client-only/client-only.spec.ts` passed: 1 file, 4 tests.
- [ ] Storybook render: Not run; no Storybook implementation or styling changes were made.
- [ ] Manual/visual checks: Not run; examples are unstyled text-only parity stories and no browser inspection was needed for this audit.

## Commit
- Hash: recorded in final status
- Message: `docs(angular): audit client-only parity`
