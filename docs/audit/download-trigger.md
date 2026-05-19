# Download Trigger Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/download-trigger/download-trigger.ts`, `packages/angular/src/download-trigger/download-trigger.spec.ts`, `packages/angular/src/download-trigger/download-trigger.stories.ts`, `packages/angular/src/download-trigger/download-trigger-example-styles.ts`, `packages/angular/src/download-trigger/examples/basic.ts`, `packages/angular/src/download-trigger/examples/svg.ts`, `packages/angular/src/download-trigger/examples/with-promise.ts`, `packages/angular/src/download-trigger/public-api.ts`
- React files: `packages/react/src/components/download-trigger/download-trigger.tsx`, `packages/react/src/components/download-trigger/use-download.ts`, `packages/react/src/components/download-trigger/download-trigger.stories.tsx`, `packages/react/src/components/download-trigger/examples/basic.tsx`, `packages/react/src/components/download-trigger/examples/svg.tsx`, `packages/react/src/components/download-trigger/examples/with-promise.tsx`, `packages/react/src/components/download-trigger/index.ts`
- Storybook/style files: `.storybook/modules/download-trigger.module.css`, `.storybook/modules/button.module.css`

## Summary
- Status: Re-audited; parity confirmed. No new Angular code changes required.
- Highest-risk gaps (now closed by prior commit `4a50fb50c`): required download inputs, `event.defaultPrevented` short-circuit, `type="button"` enforcement, Storybook category title, and demo styling parity with the shared CSS modules.
- Remaining intentional divergences: directive class name uses the `Directive` suffix (matches `ArkPropsDirective`, `ArkFocusTrapDirective`, `ArkAccordionItemContextDirective`); React's standalone `useDownload` hook is not surfaced because Angular's directive-centric API embeds the logic per [docs/technical-requirements.md](../technical-requirements.md) section 4.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `fileName`, `mimeType`, and `data` are required in React but were optional/defaulted in Angular. Angular also typed `mimeType` as a loose string instead of `FileMimeType`. | `packages/react/src/components/download-trigger/use-download.ts` | `packages/angular/src/download-trigger/download-trigger.ts` | Closed: signal inputs are `input.required` and `mimeType` is typed as `FileMimeType`. |
| Functionality | React calls the consumer click handler first and skips the download when the event is default-prevented. Angular did not inspect the click event. | `packages/react/src/components/download-trigger/download-trigger.tsx` | `packages/angular/src/download-trigger/download-trigger.ts`, `packages/angular/src/download-trigger/download-trigger.spec.ts` | Closed: host `(click)` reads `event.defaultPrevented` and returns early; coverage added. |
| Functionality | React always renders the trigger as `type="button"` to avoid accidental form submits. | `packages/react/src/components/download-trigger/download-trigger.tsx` | `packages/angular/src/download-trigger/download-trigger.ts` | Closed: host metadata sets `type: 'button'`. Consumer-supplied `type=` overrides remain possible in Angular host attribute merge; documented as Angular-idiomatic. |
| Story parity | React Storybook title is `Utilities / Download Trigger`; Angular used `Components / Download Trigger`. | `packages/react/src/components/download-trigger/download-trigger.stories.tsx` | `packages/angular/src/download-trigger/download-trigger.stories.ts` | Closed: Angular meta uses the same title. |
| Styling parity | Angular examples used ad hoc preview and button CSS instead of the shared download-trigger/button module layout, spacing, tokens, icon sizing, and ellipsis text behavior. | `.storybook/modules/download-trigger.module.css`, `.storybook/modules/button.module.css`, React example files | `packages/angular/src/download-trigger/examples/*.ts` | Closed: `download-trigger-example-styles.ts` mirrors the React modules and is applied across all three examples. |
| Accessibility | React preview icons are hidden from assistive tech and text remains visible as adjacent content. Angular had added extra aria-labels on preview containers not present in React. | `packages/react/src/components/download-trigger/examples/*.tsx` | `packages/angular/src/download-trigger/examples/*.ts` | Closed: decorative SVGs use `aria-hidden="true"`, no extra container labels. |
| Test parity | Tests cover direct data, sync/async providers, rejected providers, Blob/File, SSR, undefined data; original tests did not cover default-prevented clicks or required inputs. | `packages/react/src/components/download-trigger/download-trigger.tsx` | `packages/angular/src/download-trigger/download-trigger.spec.ts` | Closed: 9 specs cover required bindings, default-prevented click, sync/async providers, rejected providers, Blob/File, SSR PLATFORM_ID, and host `type` enforcement. |
| Public API | React exposes `useDownload`, `UseDownloadProps`, `UseDownloadReturn`, `DownloadableData`. Angular exposes the directive plus `DownloadableData`/`DownloadData`. | `packages/react/src/components/download-trigger/index.ts` | `packages/angular/src/download-trigger/public-api.ts` | No change: directive-centric public API per [docs/technical-requirements.md](../technical-requirements.md) section 4; consumers compose behavior by applying `[arkDownloadTrigger]` rather than calling a hook. |
| Public API | Directive class is named `ArkDownloadTriggerDirective` with the `Directive` suffix. Most child-part directives drop the suffix (`ArkTabsTrigger`), but standalone behavior directives keep it (`ArkPropsDirective`, `ArkFocusTrapDirective`, `ArkAccordionItemContextDirective`). | n/a | `packages/angular/src/download-trigger/download-trigger.ts` | No change: matches the existing standalone-behavior directive naming pattern in this package. |

## Implementation Plan
1. Re-read React source, stories, examples, and CSS modules.
2. Re-read Angular directive, spec, stories, examples, shared example styles, and public API.
3. Confirm every audited gap from the prior pass remains closed against the current React reference.
4. Identify any drift introduced since the prior commit; record findings or apply minimal fixes.
5. Run focused Angular specs to confirm parity is still green; update the verification checklist.
6. Commit the audit-only update if no Angular code change is required, with a parity-aligned message.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/download-trigger/download-trigger.spec.ts` passed, 9 tests (`Test Files 1 passed (1)` / `Tests 9 passed (9)`).
- [ ] Typecheck/build: not re-run during this re-audit; prior pass reported `bun run --cwd packages/angular typecheck` blocked by unrelated dirty date-input examples that cannot resolve `@ark-ui/angular/locale`. Re-attempt deferred to the date-input/locale audit owner.
- [x] Storybook render: validated in prior pass (`bun run --cwd packages/angular storybook` reported ready at `http://localhost:6006/`); no story changes in this re-audit pass that would invalidate it.
- [x] Manual/visual checks: Re-compared Angular Basic, Svg, and WithPromise example templates and `download-trigger-example-styles.ts` against React examples and `.storybook/modules/download-trigger.module.css` + `.storybook/modules/button.module.css`. Layout, preview chrome, button styling, decorative SVG sizing/`aria-hidden`, and ellipsis preview text remain aligned.
- [x] Diff hygiene: `git diff --check -- packages/angular/src/download-trigger docs/audit/download-trigger.md` (run before commit).

## Commit
- Previous fix: `4a50fb50c fix(angular): align download trigger parity`.
- Re-audit commit: see git log for `fix(angular): align download-trigger with react parity`.
- Message: `fix(angular): align download-trigger with react parity`
