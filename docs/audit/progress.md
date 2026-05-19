# Progress Angular Parity Audit

## Scope
- Angular files: `packages/angular/progress/`
- React files: `packages/react/src/components/progress/`
- Storybook/style files: `packages/angular/progress/progress.stories.ts`, `packages/angular/progress/progress-example-styles.ts`, `.storybook/modules/progress.module.css`, `.storybook/modules/progress-circular.module.css`

## Summary
- Status: Re-audited. Earlier parity fixes (root `translations`/`locale` inputs, `ProgressIntlTranslations` re-export, locale inheritance through `useProgress()`, value-text signals, controlled and initial-value stories for linear and circular, indeterminate examples using `[defaultValue]="null"`, circular demo styling) remain in place. One additional styling parity gap fixed in this pass: the circular demo `[arkProgress]` root used `display: inline-flex`, while React's `.Root` uses `display: flex`.
- Highest-risk gaps remaining: none functional. Minor styling delta on circular root brought into alignment.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API (prior) | Root accepts `translations` and `locale`; Angular root only exposed `formatOptions`. | `packages/react/src/components/progress/progress-root.tsx` | `packages/angular/progress/progress-root.ts` | Already fixed: `translations` and `locale` signal inputs forward into the machine context. |
| Public API (prior) | `ProgressIntlTranslations` was not exported for Angular consumers. | `packages/angular/node_modules/@zag-js/progress/dist/progress.types.d.ts` | `packages/angular/progress/progress.types.ts`, `packages/angular/progress/public-api.ts` | Already fixed: re-exported the Zag translation type as `ProgressIntlTranslations`. |
| Functionality (prior) | `useProgress()` should inherit the Ark locale provider when no explicit locale is supplied. | `packages/react/src/components/progress/use-progress.ts` | `packages/angular/progress/use-progress.ts` | Already fixed: `locale: props.locale ?? locale.locale` in machine context. |
| Functionality (prior) | React `Progress.ValueText` renders `percentAsString` by default; Angular directive only applied props, leaving examples visually empty. | `packages/react/src/components/progress/progress-value-text.tsx` | `packages/angular/progress/progress-value-text.ts`, `packages/angular/progress/examples/**` | Already fixed: `ArkProgressValueText` exposes `percentAsString` and `valueAsString` signals; examples render the percent string explicitly via template ref. |
| Story parity (prior) | Linear and circular `Controlled` stories were missing. | `packages/react/src/components/progress/examples/**/controlled.tsx` | `packages/angular/progress/examples/**`, `packages/angular/progress/progress.stories.ts` | Already fixed. |
| Story parity (prior) | Linear and circular `InitialValue` stories were missing. | `packages/react/src/components/progress/examples/**/initial-value.tsx` | `packages/angular/progress/examples/**`, `packages/angular/progress/progress.stories.ts` | Already fixed. |
| Styling parity (prior) | Circular demo used different alignment, size, stroke thickness, transitions, and lacked indeterminate animations. | `.storybook/modules/progress-circular.module.css` | `packages/angular/progress/progress-example-styles.ts` | Already fixed. |
| Story parity (prior) | Linear/circular indeterminate examples used controlled `[value]="null"` instead of React's uncontrolled `defaultValue={null}`. | `packages/react/src/components/progress/examples/**/indeterminate.tsx` | `packages/angular/progress/examples/**/indeterminate.ts` | Already fixed. |
| Styling parity (new) | Circular demo `[arkProgress]` / `[arkProgressRootProvider]` root used `display: inline-flex`; React `.Root` uses `display: flex`, making the demo a block-level flex container. | `.storybook/modules/progress-circular.module.css` (`.Root { display: flex; ... }`) | `packages/angular/progress/progress-example-styles.ts` (`progressCircularExampleStyles`) | Changed circular root to `display: flex` to match React. |

## Items reviewed and left as `No change`
- `ProgressContext` (React render-delegate component): Angular's directive-centric public API resolves this via `exportAs` plus a template reference and does not ship a separate `Context` part, per `docs/technical-requirements.md` §5. Documented in this audit as intentional.
- `useProgressContext` (React hook export): Angular equivalent is `injectArkProgressContext` (and the `ARK_PROGRESS_CONTEXT` token), already exported from the public API. The hook-name mismatch is the documented Angular idiom.
- `useProgress` signature: Angular's `useProgress({ context: () => ... })` returns a `UseMachineReturn`-style wrapper instead of React's direct `Api`; consumers reach the api via `.api()`. This is the package-wide Angular contract from the bridge in `_zag/`, used consistently by every component, and is not a parity bug.
- Vertical example using static `orientation="vertical"` attribute: matches React (`<Progress.Root orientation="vertical" ...>`) and the signal input accepts the string literal directly.

## Implementation Plan
1. Align circular demo root `display` to React's `display: flex` (done in this pass).
2. No further implementation changes required; prior fixes remain valid and covered by tests.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` — progress portion clean; one pre-existing, unrelated failure in `src/navigation-menu/navigation-menu.spec.ts(124,73)` (`Property 'id' comes from an index signature`) is out of scope for this component.
- [x] Component tests: `bun run --cwd packages/angular test:ci progress/progress.spec.ts` — 19/19 passed.
- [ ] Storybook render: Not run; covered by example mount tests and visual diff against the React CSS module.
- [ ] Manual/visual checks: Not run; styles were compared directly against React CSS modules.

## Commit
- Hash: f1779eeca
- Message: `fix(angular): align progress with react parity`
