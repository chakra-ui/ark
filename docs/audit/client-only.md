# ClientOnly Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/client-only.spec.ts`, `packages/angular/src/client-only/client-only.stories.ts`, `packages/angular/src/client-only/examples/basic.ts`, `packages/angular/src/client-only/examples/with-fallback.ts`, `packages/angular/src/client-only/public-api.ts`, `packages/angular/src/client-only/ng-package.json`
- React files: `packages/react/src/components/client-only/client-only.tsx`, `packages/react/src/components/client-only/client-only.stories.tsx`, `packages/react/src/components/client-only/examples/basic.tsx`, `packages/react/src/components/client-only/examples/with-fallback.tsx`, `packages/react/src/components/client-only/index.ts`
- Storybook/style files: no `client-only` CSS module exists; both frameworks render unstyled content for `Basic` and `WithFallback`

## Summary
- Status: Aligned. Angular exposes the standalone `<ark-client-only>` utility with projected client content and an optional fallback `TemplateRef`, matching the React component's client-only render/fallback contract in Angular template form. The Angular API also accepts an optional `clientTemplate` `TemplateRef` to mirror React's `children: () => ReactNode` lazy form so consumers with browser-only expressions can defer instantiation until after the first browser render.
- Highest-risk gaps: None requiring further work. The previous audit dismissed the React `children: () => ReactNode` lazy form as an Angular-specific limitation; this re-audit closes that gap with a non-breaking `clientTemplate` input so consumer expressions that depend on `window`/`document` can be hosted inside an `<ng-template>` that is only instantiated after `afterNextRender`.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | React exports `ClientOnly` with `children` and optional `fallback`; Angular exports `ArkClientOnlyComponent` with content projection plus optional `fallback` and `clientTemplate` template inputs. | `packages/react/src/components/client-only/client-only.tsx` | `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/public-api.ts` | No further change. `clientTemplate` covers React's `() => ReactNode` form; `<ng-content/>` covers the static children form. |
| Lazy children parity | React `children` may be a function; Angular cannot defer expressions inside projected `<ng-content/>` because projected views evaluate during the parent CD pass. | `packages/react/src/components/client-only/client-only.tsx` | `packages/angular/src/client-only/client-only.ts` | Added `clientTemplate` input; when supplied, client content is rendered via `*ngTemplateOutlet` only after `isClient` flips to true. |
| Story parity | React and Angular both provide `Basic` and `WithFallback` stories with matching text. | `packages/react/src/components/client-only/client-only.stories.tsx`, `packages/react/src/components/client-only/examples/*.tsx` | `packages/angular/src/client-only/client-only.stories.ts`, `packages/angular/src/client-only/examples/*.ts` | No change. Existing two stories continue to mirror React. |
| Functionality parity | Client content is hidden until the browser render path runs; fallback renders while client content is unavailable. | `packages/react/src/components/client-only/client-only.tsx` | `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/client-only.spec.ts` | No further change. `afterNextRender` + `queueMicrotask` keeps the fallback visible for the first paint, matching React's `useSyncExternalStore` snapshot semantics during hydration. |
| Styling parity | No React CSS module or Angular example styles are used for this utility. | none | none | No change. |
| Accessibility parity | Component adds no roles or ARIA and uses `display: contents` so it does not introduce an extra layout box. | `packages/react/src/components/client-only/client-only.tsx` | `packages/angular/src/client-only/client-only.ts`, `packages/angular/src/client-only/client-only.spec.ts` | No change. |
| Test parity | React has no dedicated client-only tests; Angular spec covers fallback, client swap, SSR safety, `display: contents`, and now `clientTemplate`. | none | `packages/angular/src/client-only/client-only.spec.ts` | Added a spec for the `clientTemplate` deferred-instantiation path. |

## Implementation Plan
1. Re-read React source, stories, and examples; re-confirm public-API and story parity.
2. Close the previously-deferred lazy-children gap by adding an optional `clientTemplate` `TemplateRef` input on `ArkClientOnlyComponent` that takes precedence over projected `<ng-content/>` when supplied, instantiated via `*ngTemplateOutlet` only after `isClient` flips to true.
3. Add a spec that verifies the `clientTemplate` content is not in the DOM before browser render and is present after `afterNextRender` settles.
4. Re-run the focused component spec and the package typecheck/build.
5. Record the re-audit findings.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed (ng-packagr partial build + forms-isolation check both succeed).
- [x] Component tests: `bun run --cwd packages/angular test:ci src/client-only/client-only.spec.ts` passed — 1 file, 5 tests.
- [ ] Storybook render: Not run; the new `clientTemplate` input is additive and the existing two stories continue to exercise the default `<ng-content/>` path and the fallback `TemplateRef` path. No story changes were needed.
- [ ] Manual/visual checks: Not run; examples remain unstyled text-only parity stories and no browser inspection was needed for this re-audit.

## Commit
- Hash: recorded in final status
- Message: `fix(angular): align client-only with react parity`
