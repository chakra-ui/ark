# Tour Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/tour/tour.stories.ts`
- Angular examples: `packages/angular/src/tour/examples/*.ts`
- Angular styles: `packages/angular/src/tour/tour-example-styles.ts`
- React story: `packages/react/src/components/tour/tour.stories.tsx`
- React examples: `packages/react/src/components/tour/examples/*.tsx`
- React styles: `.storybook/modules/tour.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Aligned after focused story-surface fixes.
- Highest-risk gaps: None remaining at story-surface level.

## Story Inventory

| Story name         | React | Angular | Notes                                                                              |
| ------------------ | ----- | ------- | ---------------------------------------------------------------------------------- |
| Basic              | Yes   | Yes     | Same story role and step data.                                                     |
| AsyncStep          | Yes   | Yes     | Same GitHub async loading behavior.                                                |
| Events             | Yes   | Yes     | Same event logging behavior via Angular outputs.                                   |
| KeyboardNavigation | Yes   | Yes     | Same keyboard navigation setup.                                                    |
| MixedTypes         | Yes   | Yes     | Same dialog, tooltip, and floating step data.                                      |
| SkipTour           | Yes   | Yes     | Same skip action coverage.                                                         |
| Controlled         | No    | Yes     | Remove from public Storybook exports; leave implementation/test fixture untouched. |
| WaitForClick       | Yes   | Yes     | Same click-gated behavior.                                                         |
| WaitForElement     | Yes   | Yes     | Same dynamic list behavior.                                                        |
| WaitForInput       | Yes   | Yes     | Same form-gated behavior.                                                          |
| ProgressBar        | Yes   | Yes     | Same bottom progress indicator.                                                    |

## Example Data Sources

| Example            | Data origin                           | Shape                                                    | Dynamic/async                                                          | Divergence                                                                  |
| ------------------ | ------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Basic              | Local `steps` array                   | 5 tour steps targeting three action buttons              | None                                                                   | No data divergence.                                                         |
| AsyncStep          | Local `steps` array plus GitHub fetch | 3 steps; middle step updates title/description           | Fetches `https://api.github.com/users/segunadebayo` with abort cleanup | No data divergence.                                                         |
| Events             | Local `steps` array plus signal log   | 3 steps and string log entries                           | Logs `stepChange`/`statusChange` events                                | Angular uses outputs instead of React callbacks; no user-facing divergence. |
| KeyboardNavigation | Local `steps` array                   | 3 steps with keyboard navigation enabled                 | None                                                                   | No data divergence.                                                         |
| MixedTypes         | Local `steps` array                   | 4 steps covering dialog, tooltip, floating               | None                                                                   | No data divergence.                                                         |
| SkipTour           | Local `steps` array                   | 3 steps with skip/dismiss actions                        | None                                                                   | No data divergence.                                                         |
| WaitForClick       | Local `steps` array                   | 5 steps; three steps wait for target clicks              | Uses `waitForEvent`                                                    | Angular catches cancelled promises defensively; no user-facing divergence.  |
| WaitForElement     | Local signal list and `steps` array   | Starts with 2 items; added item marked `data-item="new"` | Uses `waitForEvent` and `waitForElement`                               | No data divergence.                                                         |
| WaitForInput       | Local `steps` array and form inputs   | 5 steps; name/email/terms predicates                     | Uses `waitForEvent` predicates                                         | No data divergence.                                                         |
| ProgressBar        | Local `steps` array                   | 4 targeted steps                                         | Progress width from tour API                                           | No data divergence.                                                         |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Tour'` only.
- Decorator differences: React re-exports example functions. Angular wraps each standalone example with `moduleMetadata`
  imports.
- Per-story decorators / args / controls: No args or controls on either side. Angular had an extra `Controlled` export
  not present in React.

## Styling

| Element               | React selector / class                | Angular selector / class               | Gap                                                | Fix                                                          |
| --------------------- | ------------------------------------- | -------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Root wrapper          | `styles.Root`                         | `.tour-root`                           | Matched.                                           | No change.                                                   |
| Start buttons         | `button.Root[data-variant='surface']` | `.tour-button[data-variant='solid']`   | Angular start buttons render solid and omit icons. | Use `data-variant="surface"` and local `tour-sparkles-icon`. |
| Target action buttons | `button.Root` with icons              | `.tour-button` text only               | Angular lacks matching visible icon surface.       | Add local upload/save/more/plus icons where React has them.  |
| Close trigger         | `styles.CloseTrigger` with `XIcon`    | `.tour-close-trigger` with literal `x` | Angular differs visually.                          | Use local `tour-x-icon`.                                     |
| Keyboard hint         | `styles.Hint` with `KeyboardIcon`     | `.tour-hint` text only                 | Angular lacks icon.                                | Add local `tour-keyboard-icon`.                              |
| Action triggers       | `styles.ActionTrigger`                | `.tour-action-trigger`                 | Angular shares button sizing with `.tour-button`.  | Split `.tour-button` styling from `.tour-action-trigger`.    |

## Gap Matrix

| Area            | Gap                                                                     | React reference                            | Angular location                                   | Fix                                                                              |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| Story inventory | Extra Angular `Controlled` story                                        | `tour.stories.tsx` exports no `Controlled` | `packages/angular/src/tour/tour.stories.ts`        | Remove public story export/import.                                               |
| Button variant  | Start buttons use solid variant                                         | `data-variant="surface"`                   | `packages/angular/src/tour/examples/*.ts`          | Change to `surface`.                                                             |
| Icons           | Angular buttons use text or literal `x`                                 | Lucide icons in React examples             | `packages/angular/src/tour/examples/*.ts`          | Add local icon components and import them in examples.                           |
| Button styles   | Angular `.tour-button` sizing does not match shared React button module | `.storybook/modules/button.module.css`     | `packages/angular/src/tour/tour-example-styles.ts` | Mirror shared button dimensions/states and keep action trigger styling separate. |

## Implementation Plan

1. Remove the Angular-only `Controlled` Storybook export from `tour.stories.ts`.
2. Add local standalone icon components for the React-visible tour icons.
3. Update Angular tour examples to use surface start buttons, matching icons, and SVG close icons.
4. Update `tour-example-styles.ts` so `.tour-button` mirrors the shared React button module while `.tour-action-trigger`
   keeps the React tour action styling.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6253 --ci` reached Storybook ready at
      `http://localhost:6253/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries,
      including the now unexported `tour/examples/controlled.ts`, and `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed in this run.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/tour/tour.spec.ts` passed, 1 file / 10 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting: `bun prettier --write` over touched tour files and `docs/story-audit/tour.md` completed.
- [x] `git diff --check`: passed with no output. `git diff --no-index --check /dev/null docs/story-audit/tour.md`
      emitted no whitespace warnings; exit code `1` is expected for a no-index diff with content.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align tour story with react parity`
