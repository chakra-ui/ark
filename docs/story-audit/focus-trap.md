# Focus Trap Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/src/focus-trap/focus-trap.stories.ts`
- Angular examples: `packages/angular/src/focus-trap/examples/basic.ts`, `packages/angular/src/focus-trap/examples/initial-focus.ts`, `packages/angular/src/focus-trap/examples/autofocus.ts`
- Angular styles: inline standalone component styles in each Focus Trap example
- React story: `packages/react/src/components/focus-trap/focus-trap.stories.tsx`
- React examples: `packages/react/src/components/focus-trap/examples/basic.tsx`, `packages/react/src/components/focus-trap/examples/initial-focus.tsx`, `packages/react/src/components/focus-trap/examples/autofocus.tsx`
- React styles: inline `style` props in each React example; no Focus Trap CSS module

## Summary
- Status: Angular already matches the React Storybook surface for story inventory, order, copy, state transitions, focus-trap options, and inline layout styling.
- Highest-risk gaps: none identified. Angular expresses React's `disabled={!trapped}` state through the directive activation input `[arkFocusTrap]="trapped()"`, which is framework-idiomatic and equivalent for the story surface.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Present; re-exported from `./examples/basic` | Present; imports `FocusTrapBasicExample` through `moduleMetadata` and renders `<focus-trap-basic-example />` | Matches story name and first position. |
| `InitialFocus` | Present; re-exported from `./examples/initial-focus` | Present; imports `FocusTrapInitialFocusExample` through `moduleMetadata` and renders `<focus-trap-initial-focus-example />` | Matches story name and second position. |
| `Autofocus` | Present; re-exported from `./examples/autofocus` | Present; imports `FocusTrapAutofocusExample` through `moduleMetadata` and renders `<focus-trap-autofocus-example />` | Matches story name and third position. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded controls in each example | Start button plus trapped container with one text input, one textarea, and End Trap button | Local boolean state only; no async data | No divergence. Angular uses a `signal(false)` and `TrapFocusOptions` with `returnFocusOnDeactivate: false`, matching React's `useState(false)` and prop. |
| `InitialFocus` | Hard-coded controls in each example | Toggle button plus trapped container with first input, second initial-focus input, textarea, and End Trap button | Local boolean state plus element reference; no async data | No divergence. Angular `viewChild` supplies `initialFocus`, matching React `useRef`. |
| `Autofocus` | Hard-coded controls in each example | Toggle button plus conditionally rendered trapped container with regular input, autofocus input, and End Trap button | Local boolean state plus trigger element reference; no async data | No divergence. Angular `viewChild` supplies `setReturnFocus`, matching React `useRef` and `getButtonNode`. |

## Sections / Structure
- Meta differences: none. Both stories set `title: 'Components / Focus Trap'` and do not define `parameters`, `decorators`, `argTypes`, `args`, or `tags` at the meta level.
- Decorator differences: React re-exports example functions directly. Angular uses per-story `moduleMetadata` imports and a template render for each standalone component, matching neighboring Angular story conventions.
- Per-story decorators / args / controls: no story-specific args, controls, or Storybook parameters exist in either stack.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Example host | React fragment or `<div>` wrapper depending on example | `:host { display: block; }` | No user-visible gap for Storybook layout. | No change. |
| Focus trap content | Inline `style` on trapped `<div>`: `display: flex`, `flexDirection: column`, `gap: 1rem`, `paddingBlock: 1rem` | `.trap` inline component style: `display: flex`, `flex-direction: column`, `gap: 1rem`, `padding-block: 1rem` | None. | No change. |
| Native controls | Browser default controls; React does not add a CSS module | Angular examples set `font: inherit` on relevant `button`, `input`, and `textarea` controls | Angular-only normalization, consistent with local Angular examples; does not alter story contract. | No change. |
| Autofocus input | Native `autoFocus` prop with a lint suppression comment | Native `autofocus` attribute | None for rendered behavior. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | None | `packages/react/src/components/focus-trap/focus-trap.stories.tsx` | `packages/angular/src/focus-trap/focus-trap.stories.ts` | No change. |
| Basic behavior | None | `packages/react/src/components/focus-trap/examples/basic.tsx` | `packages/angular/src/focus-trap/examples/basic.ts` | No change. |
| Initial focus behavior | None | `packages/react/src/components/focus-trap/examples/initial-focus.tsx` | `packages/angular/src/focus-trap/examples/initial-focus.ts` | No change. |
| Autofocus and return focus behavior | None | `packages/react/src/components/focus-trap/examples/autofocus.tsx` | `packages/angular/src/focus-trap/examples/autofocus.ts` | No change. |
| Demo styling | None | Inline React style props | Inline Angular component styles | No change. |

## Implementation Plan
1. Confirm the Angular and React story exports, order, and metadata match.
2. Compare all Focus Trap example templates, state sources, element references, options, copy, and styling.
3. Record that no Angular story-surface fixes are required.
4. Run focused verification for the Focus Trap spec, Angular typecheck, Storybook startup, and whitespace checks.

## Deferred (component-level work)
- None.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6212 --ci` reached `Storybook ready!` at `http://localhost:6212/`; stopped the port process afterward. Existing unused TypeScript compilation warnings and `DefinePlugin` warning only.
- [ ] Visual check of each story: not performed in-browser; structural audit confirmed each Angular story and example matches the React story surface.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/focus-trap/focus-trap.spec.ts` passed, 1 file / 10 tests.
- [x] Angular typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and `forms isolation: ok`.
- [x] `git diff --check`: passed.
- [x] Ignored audit doc whitespace: `git diff --no-index --check /dev/null docs/story-audit/focus-trap.md` emitted no whitespace warnings; exit code `1` is expected for a no-index comparison with differences.

## Commit
- Hash: See this audit's commit in git history.
- Message: `docs(angular): audit focus-trap story parity`
