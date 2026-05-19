# Steps Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/steps/`, `packages/angular/src/steps/examples/`, `packages/angular/src/steps/steps.stories.ts`, `packages/angular/src/steps/steps-example-styles.ts`, `packages/angular/src/steps/steps.spec.ts`
- React files: `packages/react/src/components/steps/`, `packages/react/src/components/steps/examples/`, `packages/react/src/components/steps/steps.stories.tsx`
- Storybook/style files: `.storybook/modules/steps.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/utilities.css`, `.storybook/modules/theme.css`

## Summary
- Status: Re-audited. Storybook example copy, layout wrappers, and demo CSS have been brought into parity with the React reference. Focused steps spec and src-only typecheck pass; package-level build/typecheck fails on an unrelated `navigation-menu.spec.ts` error tracked outside this audit.
- Highest-risk gaps: None remaining for steps. Storybook visual parity was verified by code comparison only; no browser screenshot pass was performed in this re-audit.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Completed-content copy diverged (`"Steps Complete - thank you."` vs React `"Steps Complete - Thank you for filling out the form!"`) across Basic, Controlled, RootProvider, and Vertical examples. | `packages/react/src/components/steps/examples/basic.tsx`, `controlled.tsx`, `root-provider.tsx`, `vertical.tsx` | `packages/angular/src/steps/examples/basic.ts`, `controlled.ts`, `root-provider.ts`, `vertical.ts` | Restored the full React completion message in every Angular example. |
| Story parity | Controlled example rendered `<output>` as a sibling of the root with no `stack` wrapper, drifting from React's `<div className="stack">` structure. | `packages/react/src/components/steps/examples/controlled.tsx` | `packages/angular/src/steps/examples/controlled.ts` | Wrapped the controlled example in a `.stack` container and placed `<output>` before the root, matching React. |
| Story parity | Root-provider example put `<output>` inside the provider via `ArkStepsContext`, while React reads `steps.value` from the externally-created `useSteps` instance outside the provider. | `packages/react/src/components/steps/examples/root-provider.tsx` | `packages/angular/src/steps/examples/root-provider.ts` | Replaced the `*arkStepsContext` wrapper with a direct `steps.api().value` read in an outer `.stack` div, before `arkStepsRootProvider`. |
| Story parity | Vertical example content/completed wrappers used a plain `<p>` instead of React's `vstack` layout, so the inline `Back`/`Next` actions did not align with the reference. | `packages/react/src/components/steps/examples/vertical.tsx` | `packages/angular/src/steps/examples/vertical.ts` | Replaced the `<p>` wrapper with a `.vstack` container holding the title/description and inline actions, and mirrored the completion `.vstack` layout. |
| Styling parity | Angular demo styles used a simplified palette, layout, and state treatment that did not match the React `steps.module.css`/`button.module.css`. Notably missing: horizontal `flex-direction: column`, vertical `min-height` and 3rem gutter, list `space-between`, item `position: relative` for absolute vertical separators, coral state colors via `--demo-*` tokens, focus-visible outlines, `[hidden]` handling, and the button surface/solid variants with hover transitions. | `.storybook/modules/steps.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/utilities.css` | `packages/angular/src/steps/steps-example-styles.ts` | Rewrote `stepsExampleStyles` to translate the React CSS modules, including `.stack`/`.vstack`/`output` utilities, `--steps-*` tokens, coral indicator states, complete separator color, absolute vertical separators, hidden content handling, and the `.steps-button` surface/solid hover/disabled/focus variants. |
| Public API parity | Angular exposes root, root provider, list, item, trigger, indicator, separator, content, completed content, progress, next/prev triggers, context directives, anatomy, item/root context tokens, and `useSteps`. No React namespace export is required by Angular's directive-centric package convention; output naming follows the `xDetailsChange` pattern documented for `model()`-derived channels in technical-requirements §3 (mirrors pagination). | `packages/react/src/components/steps/index.ts`, `steps.ts` | `packages/angular/src/steps/public-api.ts`, `steps-root.ts` | No change. |
| Functionality parity | Controlled `[(step)]` model channel, `stepDetailsChange`/`stepComplete`/`stepInvalid` outputs, default/uncontrolled `defaultStep`, vertical orientation, item context propagation, next/prev triggers, progress role/value, and root-provider proxying are all covered by `steps.spec.ts`. Single-emission rule for the model channel is asserted. | `packages/react/src/components/steps/use-steps.ts`, part components | `packages/angular/src/steps/use-steps.ts`, `steps-root.ts`, `steps-root-provider.ts`, `steps.spec.ts` | No change. |
| Accessibility parity | ARIA attributes (`aria-current="step"`, `aria-orientation`, `role="progressbar"`, `aria-valuenow`, hidden content) are applied via Zag through `applyArkProps` and asserted in the spec. Focus-visible outlines added to triggers/content/buttons in the example styles. | `.storybook/modules/steps.module.css` (focus-visible), Zag wiring | `packages/angular/src/steps/steps.spec.ts`, `steps-example-styles.ts` | No change beyond example-style focus rings. |

## Implementation Plan
1. Rewrite `stepsExampleStyles` to mirror the React `steps.module.css` and `button.module.css` modules (tokens, states, focus rings, hidden handling, horizontal/vertical layouts).
2. Update Angular examples (basic/controlled/root-provider/vertical) to align completion copy, wrapper structure, and inline action layouts with the React references.
3. Re-run `bun run --cwd packages/angular test:ci src/steps/steps.spec.ts`, src-only `tsc -p tsconfig.json --noEmit`, and `git diff --check` on this component's files.
4. Update this audit with verification results and commit metadata.

## Verification
- [x] Typecheck/build: `tsc -p packages/angular/tsconfig.json --noEmit` passes cleanly with the steps changes. Full `bun run --cwd packages/angular typecheck` still fails on the pre-existing `src/navigation-menu/navigation-menu.spec.ts(124,73) TS4111` error unrelated to steps; that file is outside this component's scope.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/steps/steps.spec.ts` → 1 file, 8 tests passed.
- [ ] Storybook render: Not executed in this re-audit; changes are limited to examples and example styles, and no browser screenshot pass was available in this environment.
- [x] Manual/visual checks: Compared Angular examples and `stepsExampleStyles` against `packages/react/src/components/steps/examples/*.tsx`, `.storybook/modules/steps.module.css`, `.storybook/modules/button.module.css`, and `.storybook/modules/utilities.css`.
- [x] Diff hygiene: `git diff --check -- docs/audit/steps.md packages/angular/src/steps` produced no warnings.

## Commit
- Hash: `52b7aeda7`
- Message: `fix(angular): align steps with react parity`
