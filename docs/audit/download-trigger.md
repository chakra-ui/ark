# Download Trigger Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/download-trigger/download-trigger.ts`, `packages/angular/src/download-trigger/download-trigger.spec.ts`, `packages/angular/src/download-trigger/download-trigger.stories.ts`, `packages/angular/src/download-trigger/examples/basic.ts`, `packages/angular/src/download-trigger/examples/svg.ts`, `packages/angular/src/download-trigger/examples/with-promise.ts`, `packages/angular/src/download-trigger/public-api.ts`
- React files: `packages/react/src/components/download-trigger/download-trigger.tsx`, `packages/react/src/components/download-trigger/use-download.ts`, `packages/react/src/components/download-trigger/download-trigger.stories.tsx`, `packages/react/src/components/download-trigger/examples/basic.tsx`, `packages/react/src/components/download-trigger/examples/svg.tsx`, `packages/react/src/components/download-trigger/examples/with-promise.tsx`, `packages/react/src/components/download-trigger/index.ts`
- Storybook/style files: `.storybook/modules/download-trigger.module.css`, `.storybook/modules/button.module.css`

## Summary
- Status: Fixed and committed.
- Highest-risk gaps: Angular accepted missing required download inputs, ignored `event.defaultPrevented`, and showed the utility under a different Storybook category with non-parity demo styling.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `fileName`, `mimeType`, and `data` are required in React but optional/defaulted in Angular. Angular also types `mimeType` as a loose string instead of `FileMimeType`. | `packages/react/src/components/download-trigger/use-download.ts` | `packages/angular/src/download-trigger/download-trigger.ts` | Make all three signal inputs required and type `mimeType` with `FileMimeType`. |
| Functionality | React calls the consumer click handler first and skips the download when the event is default-prevented. Angular did not inspect the click event. | `packages/react/src/components/download-trigger/download-trigger.tsx` | `packages/angular/src/download-trigger/download-trigger.ts`, `packages/angular/src/download-trigger/download-trigger.spec.ts` | Pass the click event into `onClick`, return early when `defaultPrevented`, and add coverage. |
| Functionality | React always renders the trigger as `type="button"` to avoid accidental form submits. Angular examples set the type, but the directive did not enforce it. | `packages/react/src/components/download-trigger/download-trigger.tsx` | `packages/angular/src/download-trigger/download-trigger.ts` | Add a host `type="button"` binding on the directive. |
| Story parity | React Storybook title is `Utilities / Download Trigger`; Angular uses `Components / Download Trigger`. | `packages/react/src/components/download-trigger/download-trigger.stories.tsx` | `packages/angular/src/download-trigger/download-trigger.stories.ts` | Rename Angular story title to match React. |
| Styling parity | Angular examples use local ad hoc preview and button CSS instead of the shared download-trigger/button module layout, spacing, token colors, icon sizing, and ellipsis text behavior. | `.storybook/modules/download-trigger.module.css`, `.storybook/modules/button.module.css`, React example files | `packages/angular/src/download-trigger/examples/*.ts` | Add shared Angular example styles matching the CSS module and apply them across the three examples. |
| Accessibility | React preview icons are hidden from assistive tech and text remains visible as adjacent content. Angular adds aria-labels on preview containers that are not present in React. | `packages/react/src/components/download-trigger/examples/*.tsx` | `packages/angular/src/download-trigger/examples/*.ts` | Remove extra preview labels and preserve hidden decorative icons. |
| Test parity | Existing tests cover direct data, sync/async providers, rejected providers, Blob/File, SSR, and undefined data. They do not cover default-prevented clicks or required inputs. | `packages/react/src/components/download-trigger/download-trigger.tsx` | `packages/angular/src/download-trigger/download-trigger.spec.ts` | Update tests for required bindings and add default-prevented coverage. |

## Implementation Plan
1. Align directive inputs, host click handling, `type="button"`, and safer root-to-window resolution.
2. Update specs for required inputs and default-prevented click behavior.
3. Align Storybook title and examples with React story names/content and shared demo styling.
4. Run focused Angular tests, typecheck, and diff checks.

## Verification
- [ ] Typecheck/build: `bun run --cwd packages/angular typecheck` blocked by unrelated dirty date-input examples: `src/date-input/examples/localized.ts` and `src/date-input/examples/rtl.ts` cannot resolve `@ark-ui/angular/locale`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/download-trigger/download-trigger.spec.ts` passed, 9 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` started successfully and reported Storybook ready at `http://localhost:6006/`; stopped with Ctrl-C after startup.
- [x] Manual/visual checks: Compared Angular Basic, Svg, and WithPromise example templates/styles against React examples and `.storybook/modules/download-trigger.module.css` plus `.storybook/modules/button.module.css`; aligned story title, preview/button layout, decorative icons, spacing, token colors, and ellipsis preview text.
- [x] Formatting/diff: `bunx biome check packages/angular/src/download-trigger/download-trigger.ts packages/angular/src/download-trigger/download-trigger.spec.ts packages/angular/src/download-trigger/download-trigger.stories.ts packages/angular/src/download-trigger/download-trigger-example-styles.ts packages/angular/src/download-trigger/examples/basic.ts packages/angular/src/download-trigger/examples/svg.ts packages/angular/src/download-trigger/examples/with-promise.ts docs/audit/download-trigger.md` passed for the 7 TypeScript files. `git diff --check -- packages/angular/src/download-trigger docs/audit/download-trigger.md` passed.

## Commit
- Hash:
- Message: `fix(angular): align download trigger parity`
