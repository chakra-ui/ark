# Toggle Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/toggle/toggle.stories.ts`
- Angular examples: `packages/angular/toggle/examples/`
- Angular styles: `packages/angular/toggle/toggle-example-styles.ts`
- React story: `packages/react/src/components/toggle/toggle.stories.tsx`
- React examples: `packages/react/src/components/toggle/examples/`
- React styles: `.storybook/modules/toggle.module.css`

## Summary
- Status: Fixed; story inventory, order, examples, data sources, and styling now match React's Storybook surface.
- Highest-risk gaps: None remaining for the story surface.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | `export { Basic } from './examples/basic'` | `ToggleBasicExample` via `moduleMetadata` | Matching first story and bold icon surface. |
| Context | `export { Context } from './examples/context'` | `ToggleContextExample` via `moduleMetadata` | Matching second story and `On` / `Off` context text. |
| Controlled | `export { Controlled } from './examples/controlled'` | `ToggleControlledExample` via `moduleMetadata` | Matching third story, controlled pressed state, and heart indicator. |
| Disabled | `export { Disabled } from './examples/disabled'` | `ToggleDisabledExample` via `moduleMetadata` | Matching fourth story and disabled root. |
| Indicator | `export { Indicator } from './examples/indicator'` | `ToggleIndicatorExample` via `moduleMetadata` | Matching fifth story and heart indicator fallback/on states. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Inline component markup. React uses `BoldIcon` from `lucide-react`; Angular uses local `ToggleBoldIcon`. | One toggle root button with one bold icon. | None. | No change; Angular local icon preserves the same visible SVG surface without adding a React dependency. |
| Context | Inline component markup and toggle context. | One toggle root button, bold icon, and derived text label. | Context-driven `pressed ? 'On' : 'Off'`. | No change; Angular uses `ArkToggleContext` template syntax instead of React render prop. |
| Controlled | Local controlled state. React uses `useState(false)`; Angular uses a signal bound through `[(pressed)]`. | One toggle root button with a heart indicator. | User interaction updates controlled pressed state. | No change; state wiring is framework-idiomatic and renders the same surface. |
| Disabled | Inline component markup. | One disabled toggle root button with one bold icon. | None. | No divergence. |
| Indicator | Inline component markup plus current toggle API state. | One toggle root button with a heart indicator that swaps outline/filled heart. | User interaction updates uncontrolled pressed state. | No change; Angular uses an exported root ref to read `toggle.api().pressed` where React uses `Toggle.Indicator` fallback/children. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Toggle'`. React uses `Meta` from `@storybook/react-vite`; Angular uses `Meta` / `StoryObj` from `@storybook/angular`.
- Decorator differences: React re-exports example functions directly. Angular wraps each standalone example with `moduleMetadata({ imports: [...] })` and renders a selector template, matching neighboring Angular stories.
- Per-story decorators / args / controls: Neither stack defines args, controls, tags, backgrounds, or story-specific parameters for Toggle.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root button layout | `.Root` | `[arkToggle]` | None; layout, gap, padding, type, border, color, hover, focus, disabled, and icon sizing match. | No change. |
| Active state | `.Root[data-state='on']` | `[arkToggle][data-state='on']` | Angular active background omits React's `!important`. | Add `!important` to the active background declaration. |
| Indicator | `.Indicator` | `[arkToggleIndicator]` | None; both use inline-flex centering. | No change. |
| Icons | Lucide `BoldIcon` / `HeartIcon` | `ToggleBoldIcon` / `ToggleHeartIcon` | No visible styling gap; SVGs are hidden from assistive tech and styled by root CSS. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Active styling | Active background lacks React's `!important`. | `.storybook/modules/toggle.module.css` `.Root[data-state='on']` | `packages/angular/toggle/toggle-example-styles.ts` | Add `!important` to `[arkToggle][data-state='on']` background. |

## Implementation Plan
1. Updated `packages/angular/toggle/toggle-example-styles.ts` so the active toggle background matches React specificity.
2. Ran the toggle spec, Angular package typecheck, Storybook startup, and whitespace checks.
3. Recorded verification results here.

## Deferred (component-level work)
- None identified.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6012 --ci` reached `Storybook ready!` at `http://localhost:6012/`; stopped after startup. Existing warnings included unused TypeScript compilation entries and `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Not performed in this run; Storybook startup succeeded, but no browser side-by-side review was executed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci toggle/toggle.spec.ts` passed, 1 file / 17 tests.
- [ ] Typecheck: `bun run --cwd packages/angular typecheck` failed before completing on unrelated `packages/angular/combobox/examples/highlight-matching-text.ts(2,39): error TS2307: Cannot find module '@ark-ui/angular/highlight' or its corresponding type declarations.`
- [ ] Whitespace: `git diff --check` failed on unrelated trailing whitespace in `packages/angular/tags-input/examples/*.ts`. Toggle-scoped `git diff --check -- packages/angular/toggle/toggle-example-styles.ts packages/angular/toggle/examples/icons.ts` passed. `git diff --no-index --check /dev/null docs/story-audit/toggle.md` produced no whitespace warnings; exit code was non-zero because the file is new.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align toggle story with react parity`
