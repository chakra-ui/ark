# Steps Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/steps/`, `packages/angular/src/steps/examples/`, `packages/angular/src/steps/steps.stories.ts`
- React files: `packages/react/src/components/steps/`, `packages/react/src/components/steps/examples/`, `packages/react/src/components/steps/steps.stories.tsx`
- Storybook/style files: `.storybook/modules/steps.module.css`, `.storybook/modules/button.module.css`, `packages/angular/src/steps/steps-example-styles.ts`

## Summary
- Status: Fixed and verified with focused tests plus Angular package typecheck/build.
- Highest-risk gaps: Storybook/manual visual parity was reviewed by code comparison only; no browser screenshot pass was run in this audit.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | `Basic`, `Controlled`, `RootProvider`, and `Vertical` stories exist in both packages, but Angular completion copy is shortened. | `packages/react/src/components/steps/examples/basic.tsx`, `controlled.tsx`, `root-provider.tsx`, `vertical.tsx` | `packages/angular/src/steps/examples/basic.ts`, `controlled.ts`, `root-provider.ts`, `vertical.ts` | Restore matching completion copy in all Angular examples. |
| Story parity | Root-provider example output is rendered inside the Ark root provider instead of using the React `stack` wrapper shape with output before the root. | `packages/react/src/components/steps/examples/root-provider.tsx` | `packages/angular/src/steps/examples/root-provider.ts` | Move output into an outer wrapper and read the external `useSteps` API directly. |
| Styling parity | Angular styles use a reduced layout, colors, spacing, and state treatment instead of the React CSS module selectors. | `.storybook/modules/steps.module.css`, `.storybook/modules/button.module.css` | `packages/angular/src/steps/steps-example-styles.ts` | Translate the React demo CSS to Angular example classes, including orientation, focus, disabled, indicator, separator, content, and button variants. |
| Public API parity | Angular exposes root, root provider, list, item, trigger, indicator, separator, content, completed content, progress, contexts, anatomy, and `useSteps`. No React namespace export is required by Angular's directive-centric package convention. | `packages/react/src/components/steps/index.ts`, `steps.ts` | `packages/angular/src/steps/public-api.ts` | No change. |
| Functionality parity | Root models, detail outputs, item context, root-provider machine proxying, progress props, navigation triggers, and vertical orientation are covered by Angular specs. | `packages/react/src/components/steps/use-steps.ts`, part components | `packages/angular/src/steps/steps-root.ts`, `steps-root-provider.ts`, `steps.spec.ts` | No change. |

## Implementation Plan
1. Align Angular example completion copy and wrapper structure with the React examples.
2. Replace simplified Angular demo styles with parity-focused styles derived from the React `steps` and `button` modules.
3. Run the focused steps spec, Angular typecheck if needed, and `git diff --check`.
4. Update this audit with verification results and commit metadata.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed, including `tsc`, Angular production build, and forms isolation check. Existing ng-packagr export-condition warnings were emitted.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/steps/steps.spec.ts` passed with 1 file and 8 tests.
- [ ] Storybook render: Not run; changes are limited to examples and example styles, and no browser screenshot pass was available in this run.
- [x] Manual/visual checks: Compared Angular examples and `stepsExampleStyles` against `packages/react/src/components/steps/examples/*.tsx`, `.storybook/modules/steps.module.css`, and `.storybook/modules/button.module.css`.
- [x] Diff hygiene: `git diff --check -- docs/audit/steps.md packages/angular/src/steps` passed.

## Commit
- Hash: `cc7bb5aec`
- Message: `fix(angular): align splitter parity` (concurrent commit containing the steps implementation files)
