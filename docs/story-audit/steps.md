# Steps Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/steps/steps.stories.ts`
- Angular examples: `packages/angular/src/steps/examples/_data.ts`, `basic.ts`, `controlled.ts`, `root-provider.ts`,
  `vertical.ts`
- Angular styles: `packages/angular/src/steps/steps-example-styles.ts`
- React story: `packages/react/src/components/steps/steps.stories.tsx`
- React examples: `packages/react/src/components/steps/examples/basic.tsx`, `controlled.tsx`, `root-provider.tsx`,
  `vertical.tsx`
- React styles: `.storybook/modules/steps.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Fixed. Angular already matched React story inventory and order. The audit aligned Angular's shared example
  data shape and button styling selectors with the React reference.
- Highest-risk gaps: None after focused story-surface fixes.

## Story Inventory

| Story name     | React | Angular | Notes                                                                                                                                                           |
| -------------- | ----- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Basic`        | Yes   | Yes     | Same title/content/action structure.                                                                                                                            |
| `Controlled`   | Yes   | Yes     | React uses `useState`; Angular uses a `signal` model binding. No change; this is framework-idiomatic parity.                                                    |
| `RootProvider` | Yes   | Yes     | React uses `useSteps({ count })`; Angular uses `useSteps({ context: () => ({ count }) })` inside injection context. No change; this matches Angular hook shape. |
| `Vertical`     | Yes   | Yes     | Same orientation, nested action placement, and completed content structure.                                                                                     |

## Example Data Sources

| Example        | Data origin                                                             | Shape                                        | Dynamic/async | Divergence                                                                              |
| -------------- | ----------------------------------------------------------------------- | -------------------------------------------- | ------------- | --------------------------------------------------------------------------------------- |
| `Basic`        | React hard-coded local array; Angular shared `stepExampleItems` fixture | Three items: `value`, `title`, `description` | None          | Fixed: Angular fixture now includes React's `value` field and loops track `item.value`. |
| `Controlled`   | Same three item data; local controlled step state                       | Step index state plus item list              | None          | No behavioral divergence. Angular uses `signal(0)` and `[(step)]`.                      |
| `RootProvider` | Same three item data; root-provider API instance                        | Steps API plus item list                     | None          | No user-visible divergence.                                                             |
| `Vertical`     | Same three item data                                                    | Three items and vertical orientation         | None          | Fixed through shared data shape.                                                        |

## Sections / Structure

- Meta differences: Both stories set `title: 'Components / Steps'`; neither defines parameters, args, argTypes, tags, or
  global decorators.
- Decorator differences: React re-exports example components directly. Angular uses `moduleMetadata` imports and render
  templates for standalone examples, matching local Angular Storybook conventions.
- Per-story decorators / args / controls: Angular has one `moduleMetadata` decorator per story and no args or controls;
  React has no args or controls.

## Styling

| Element                     | React selector / class                 | Angular selector / class                       | Gap                                                                                         | Fix                                   |
| --------------------------- | -------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------- |
| Root                        | `styles.Root` / `.Root`                | `.steps-root`                                  | Matched before audit.                                                                       | No change.                            |
| List / item / trigger       | `.List`, `.Item`, `.Trigger`           | `.steps-list`, `.steps-item`, `.steps-trigger` | Matched before audit.                                                                       | No change.                            |
| Indicator / separator       | `.Indicator`, `.Separator`             | `.steps-indicator`, `.steps-separator`         | Matched before audit.                                                                       | No change.                            |
| Content / completed content | `.Content`, `.CompletedContent`        | `.steps-content`, `.steps-completed`           | Angular includes explicit `[hidden]` fallback for directive output.                         | No change; preserves rendered parity. |
| Actions                     | `.Actions`                             | `.steps-actions`                               | Matched before audit.                                                                       | No change.                            |
| Buttons                     | `button.Root` from `button.module.css` | `.steps-button`                                | Missing shared `svg`, icon-only `:has`, and `[aria-expanded='true']` hover-state selectors. | Added selectors to `.steps-button`.   |

## Gap Matrix

| Area           | Gap                                                                   | React reference                                      | Angular location                                     | Fix                                                                               |
| -------------- | --------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| Example data   | Angular fixture omitted item `value`, while React examples define it. | `packages/react/src/components/steps/examples/*.tsx` | `packages/angular/src/steps/examples/_data.ts`       | Added `value` to the shared fixture and switched `@for` tracking to `item.value`. |
| Button styling | Angular local button copy lacked a few shared button selectors.       | `.storybook/modules/button.module.css`               | `packages/angular/src/steps/steps-example-styles.ts` | Added SVG sizing, icon-only padding, and expanded hover-state selector.           |

## Implementation Plan

1. Align the Angular shared item fixture with React's `value`, `title`, and `description` shape.
2. Update Angular example loops to track the stable `value` key.
3. Expand `.steps-button` to include the missing shared button selectors used by React.
4. Run focused Steps verification and record results.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6246 --ci` reached Storybook ready at
      `http://localhost:6246/`; stopped after startup. Existing unused TypeScript compilation and `DefinePlugin`
      warnings only.
- [ ] Visual check of each story: Browser side-by-side review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/steps/steps.spec.ts` passed, 1 file / 8 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production package build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/steps/examples/_data.ts packages/angular/src/steps/examples/basic.ts packages/angular/src/steps/examples/controlled.ts packages/angular/src/steps/examples/root-provider.ts packages/angular/src/steps/examples/vertical.ts packages/angular/src/steps/steps-example-styles.ts docs/story-audit/steps.md`
      passed.
- [x] Whitespace check: `git diff --check` passed. `git diff --no-index --check /dev/null docs/story-audit/steps.md`
      emitted no whitespace warnings; exit code `1` is expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align steps story with react parity`
