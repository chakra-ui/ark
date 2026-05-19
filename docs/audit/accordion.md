# Accordion Angular Parity Audit

## Scope
- Angular files:
  - `packages/angular/src/accordion/accordion-root.ts`
  - `packages/angular/src/accordion/accordion-root-provider.ts`
  - `packages/angular/src/accordion/accordion-item.ts`
  - `packages/angular/src/accordion/accordion-item-trigger.ts`
  - `packages/angular/src/accordion/accordion-item-content.ts`
  - `packages/angular/src/accordion/accordion-item-indicator.ts`
  - `packages/angular/src/accordion/accordion.stories.ts`
  - `packages/angular/src/accordion/examples/*`
  - `packages/angular/src/accordion/accordion-example-styles.ts`
  - `packages/angular/src/accordion/accordion.spec.ts`
  - `packages/angular/src/accordion/public-api.ts`
- React files:
  - `packages/react/src/components/accordion/accordion-root.tsx`
  - `packages/react/src/components/accordion/accordion-root-provider.tsx`
  - `packages/react/src/components/accordion/accordion-item.tsx`
  - `packages/react/src/components/accordion/accordion-item-trigger.tsx`
  - `packages/react/src/components/accordion/accordion-item-content.tsx`
  - `packages/react/src/components/accordion/accordion-context.tsx`
  - `packages/react/src/components/accordion/accordion-item-context.tsx`
  - `packages/react/src/components/accordion/accordion.stories.tsx`
  - `packages/react/src/components/accordion/examples/*`
  - `packages/react/src/components/accordion/tests/*`
- Storybook/style files:
  - `.storybook/modules/accordion.module.css`
  - `.storybook/modules/slider.module.css`
  - `packages/angular/src/accordion/accordion-example-styles.ts`

## Summary
- Status: Complete with two documented deferred gaps.
- Highest-risk gaps:
  - Angular root does not expose React/Zag `onFocusChange` as an Angular output even though the public type is exported.
  - Angular lacks public structural context directives matching React `Accordion.Context` and `Accordion.ItemContext`; only injection helpers exist.
  - Angular Storybook is missing React's `Context`, `LazyMount`, and `WithSlider` stories.
  - Angular accordion examples use a different card-like visual treatment and plus-sign indicator, while React uses the shared `.storybook/modules/accordion.module.css` selectors, chevron indicator, body wrapper, horizontal sizing, and animation selectors.
  - React render-strategy props (`lazyMount`, `unmountOnExit`) are not currently modelled on Angular accordion directives. Implementing true DOM mount/unmount parity requires a structural/presence composition design rather than a simple directive prop pass-through.
  - React `WithSlider` cannot be reproduced in Angular because there is no Angular slider component in this package today.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `onFocusChange` is available in React root props but Angular has no `(focusChange)` output. | `packages/react/src/components/accordion/accordion-root.tsx` | `packages/angular/src/accordion/accordion-root.ts` | Fixed: added `focusChange` output and wired Zag `onFocusChange`. |
| Public API | React exposes `Accordion.Context`; Angular only exposes `injectArkAccordionContext`. | `packages/react/src/components/accordion/accordion-context.tsx` | `packages/angular/src/accordion/public-api.ts` | Fixed: added `ArkAccordionContext` structural directive and exported its template type. |
| Public API | React exposes `Accordion.ItemContext`; Angular has only an injection token/helper and a story-local helper component. | `packages/react/src/components/accordion/accordion-item-context.tsx` | `packages/angular/src/accordion/use-accordion-item-context.ts` | Fixed: added `[arkAccordionItemContext]` structural directive and exported `ArkAccordionItemContextDirective` plus its template type. The directive class name avoids colliding with the existing public `ArkAccordionItemContext` type. |
| Stories | Angular lacks the React `Context` story. | `packages/react/src/components/accordion/examples/context.tsx` | `packages/angular/src/accordion/accordion.stories.ts` | Fixed: added Angular context example and story. |
| Stories | Angular lacks `LazyMount`. | `packages/react/src/components/accordion/examples/lazy-mount.tsx` | `packages/angular/src/accordion/accordion.stories.ts` | Defer true story until Angular accordion supports render strategy. Record as deferred. |
| Stories | Angular lacks `WithSlider`. | `packages/react/src/components/accordion/examples/with-slider.tsx` | `packages/angular/src/accordion/accordion.stories.ts` | Defer because Angular slider is not implemented. Record as deferred. |
| Styling | Angular examples do not match React Storybook accordion CSS for root flex layout, item borders, trigger spacing, focus ring, content animation selectors, body padding, centered horizontal content, and output styling. | `.storybook/modules/accordion.module.css` | `packages/angular/src/accordion/accordion-example-styles.ts`, `packages/angular/src/accordion/examples/*` | Fixed: rewrote Angular example styles to mirror React selectors via Angular directive selectors and updated examples to use body/output helper classes and chevron indicators. |
| Accessibility | Angular trigger focus navigation is covered for value changes but not for `focusChange` emission. | `packages/react/src/components/accordion/tests/accordion.test.tsx` | `packages/angular/src/accordion/accordion.spec.ts` | Fixed: added focus output coverage. |
| Test parity | Angular tests do not cover new context directives. | `packages/react/src/components/accordion/tests/accordion.test.tsx` | `packages/angular/src/accordion/accordion.spec.ts` | Fixed: added structural context directive behavior tests. |

## Implementation Plan
1. Add `ArkAccordionContext` and `[arkAccordionItemContext]` structural directives following existing Angular context directive patterns. Done.
2. Export the new directives and template context types from `public-api.ts`. Done.
3. Add `focusChange` output to `ArkAccordionRoot` and wire it to Zag `onFocusChange`. Done.
4. Add React-parity context story and update item-context story to use the public structural directive. Done.
5. Align accordion example styles and markup with React's Storybook module, including chevron-like indicators, body wrappers, output styling, and horizontal content classes. Done.
6. Add focused tests for `focusChange`, context directives, and updated examples. Done.
7. Verify with accordion tests, broader Angular checks as needed, `git diff --check`, then commit. Done.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. This ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `ng build @ark-ui/angular --configuration=production`, and `bun run scripts/check-forms-isolation.ts`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/accordion/accordion.spec.ts` passed with 20 tests.
- [x] Storybook render: `STORYBOOK_DISABLE_TELEMETRY=1 bun run --cwd packages/angular storybook -- --ci --port 6006` compiled and reached `Storybook ready!` at `http://localhost:6006/`. The server was stopped with Ctrl-C after readiness, so the command process exited from interruption after the successful startup check.
- [x] Lint: `bun run --cwd packages/angular lint` exited 0. Biome reported existing informational `useLiteralKeys` suggestions across multiple files; no errors were reported.
- [x] Diff check: `git diff --check` passed.
- [ ] Manual/visual checks: Not performed in a browser. Storybook startup verified compilation of the changed stories.
- Failed command recorded: `bun run --cwd packages/angular test:ci packages/angular/src/accordion/accordion.spec.ts` failed because `test:ci` runs inside `packages/angular`, so Vitest found no files for the repo-root filter. Corrected command: `bun run --cwd packages/angular test:ci src/accordion/accordion.spec.ts`.
- Failed command recorded: initial `bun run --cwd packages/angular test:ci src/accordion/accordion.spec.ts` failed because the new `(focusChange)` test asserted a nonexistent `focusedValue` detail field. The test was corrected to assert emission and active focus.

## Deferred Gaps
- `LazyMount`: deferred because Angular accordion currently renders item content through attribute directives on consumer-provided elements. Matching React's render-strategy behavior requires a structural/presence composition that can omit or unmount content DOM and coordinate trigger `aria-controls` when content is absent.
- `WithSlider`: deferred because this repository does not currently provide an Angular slider component or Storybook story to embed.

## Commit
- Hash: See commit containing this audit.
- Message: `fix(angular): align accordion with react parity`
