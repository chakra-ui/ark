# Timer Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/timer/timer.stories.ts`
- Angular examples: `packages/angular/src/timer/examples/*.ts`
- Angular styles: `packages/angular/src/timer/timer-example-styles.ts`
- React story: `packages/react/src/components/timer/timer.stories.tsx`
- React examples: `packages/react/src/components/timer/examples/*.tsx`
- React styles: `.storybook/modules/timer.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Aligned after focused story-surface fixes.
- Highest-risk gaps: Resolved. Angular action triggers now include React-equivalent play/pause/reset icons, `Basic` uses
  React's `Play` copy, shared button states are mirrored, and RootProvider applies the provider root flex/gap surface.

## Story Inventory

| Story name   | React | Angular | Notes                                                       |
| ------------ | ----- | ------- | ----------------------------------------------------------- |
| Basic        | Yes   | Yes     | Same order; Angular start button copy/icon needed parity.   |
| Countdown    | Yes   | Yes     | Same order; button icons needed parity.                     |
| Interval     | Yes   | Yes     | Same order; button icons needed parity.                     |
| Events       | Yes   | Yes     | Same order; signal-based ticks are Angular-idiomatic.       |
| Pomodoro     | Yes   | Yes     | Same order; signal state matches React `useState` behavior. |
| RootProvider | Yes   | Yes     | Same order; provider root layout needed parity.             |

## Example Data Sources

| Example      | Data origin             | Shape                                                                           | Dynamic/async                                                   | Divergence                                                                                           |
| ------------ | ----------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Basic        | Hard-coded timer props  | `targetMs=60 * 60 * 1000`, `startMs=40 * 60 * 1000`; days/hours/minutes/seconds | Timer machine ticks after user action                           | Angular text-only buttons and `Start` copy differed from React `Play`.                               |
| Countdown    | Hard-coded timer props  | `countdown`, `startMs=5 * 60 * 1000`; minutes/seconds                           | Timer machine countdown after user action                       | Text-only buttons only.                                                                              |
| Interval     | Hard-coded timer props  | `interval=100`, `targetMs=60 * 1000`; seconds/milliseconds                      | Timer machine ticks at 100ms after user action                  | Text-only buttons only.                                                                              |
| Events       | Local component state   | `targetMs=60 * 1000`; tick count output                                         | `tick` increments state, `complete` logs to console             | Angular signal state is equivalent to React `useState`; text-only buttons only.                      |
| Pomodoro     | Local component state   | Work/break duration toggles, cycle output                                       | `complete` toggles work/break and increments cycles after break | Angular signal state is equivalent to React `useState`; text-only buttons only.                      |
| RootProvider | `useTimer` hook/machine | `targetMs=60 * 60 * 1000`; JSON output of time                                  | Timer machine controlled by action triggers                     | Angular `useTimer({ context: () => ... })` is framework-idiomatic; provider layout spacing differed. |

## Sections / Structure

- Meta differences: None. Both titles are `Components / Timer`; neither defines parameters, decorators, tags, args, or
  argTypes.
- Decorator differences: Angular uses `moduleMetadata` per story to import standalone examples; React re-exports example
  functions. This is expected framework wiring.
- Per-story decorators / args / controls: No args or controls on either side.

## Styling

| Element    | React selector / class          | Angular selector / class | Gap                                                                       | Fix                                                                               |
| ---------- | ------------------------------- | ------------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Root       | `styles.Root`, global `stack`   | `.timer-root`            | RootProvider inner root lacked provider root flex/gap.                    | Add `.timer-stack` wrapper and apply `.timer-root` to the provider root.          |
| Area       | `styles.Area`                   | `.timer-area`            | None.                                                                     | No change.                                                                        |
| Item group | `styles.ItemGroup`              | `.timer-item-group`      | None.                                                                     | No change.                                                                        |
| Item       | `styles.Item`                   | `.timer-item`            | None.                                                                     | No change.                                                                        |
| Label      | `styles.ItemLabel`              | `.timer-label`           | None.                                                                     | No change.                                                                        |
| Separator  | `styles.Separator`              | `.timer-separator`       | None.                                                                     | No change.                                                                        |
| Control    | global `hstack`                 | `.timer-control`         | Equivalent layout.                                                        | No change.                                                                        |
| Buttons    | `button.Root` plus Lucide icons | `.timer-button`          | Angular lacked icons and some shared button sizing/focus/disabled states. | Add Angular SVG icon components and align `.timer-button` with shared button CSS. |
| Output     | Plain `output`                  | `.timer-output`          | Angular explicit color/size is acceptable and keeps output readable.      | No change.                                                                        |

## Gap Matrix

| Area                | Gap                                                          | React reference                                          | Angular location                                       | Fix                                                                                 |
| ------------------- | ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Button content      | Angular action triggers were text-only.                      | React imports `PlayIcon`, `PauseIcon`, `RotateCcwIcon`.  | `packages/angular/src/timer/examples/*.ts`             | Add local Angular icon components and include them in trigger content.              |
| Basic button copy   | Angular used `Start`; React uses `Play`.                     | `packages/react/src/components/timer/examples/basic.tsx` | `packages/angular/src/timer/examples/basic.ts`         | Change start trigger copy to `Play`.                                                |
| Button styling      | Angular used a smaller simplified button style.              | `.storybook/modules/button.module.css`                   | `packages/angular/src/timer/timer-example-styles.ts`   | Mirror shared button dimensions, gap, focus, disabled, SVG sizing, and transitions. |
| RootProvider layout | Angular provider root did not carry the React root flex/gap. | `styles.Root` on `Timer.RootProvider`                    | `packages/angular/src/timer/examples/root-provider.ts` | Add a stack wrapper and apply `.timer-root` to the root provider element.           |

## Implementation Plan

1. Add timer-local standalone SVG icon components for play, pause, and reset.
2. Import icons into each Angular timer example and render them inside matching action triggers.
3. Align `Basic` start trigger text with React's `Play`.
4. Update RootProvider wrapper/provider classes to match React's outer stack plus provider root layout.
5. Expand timer example button CSS to match React shared button styling.
6. Run focused timer tests, typecheck, Storybook startup, Prettier, and `git diff --check`.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6250 --ci` reached Storybook ready at
      `http://localhost:6250/`; stopped the server afterward. Existing unused-entry and `DefinePlugin`
      `process.env.NODE_ENV` warnings only.
- [ ] Visual check of each story: Not performed; startup smoke check only.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/timer/timer.spec.ts` passed, 1 file / 7 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/timer/examples/basic.ts packages/angular/src/timer/examples/countdown.ts packages/angular/src/timer/examples/events.ts packages/angular/src/timer/examples/interval.ts packages/angular/src/timer/examples/pomodoro.ts packages/angular/src/timer/examples/root-provider.ts packages/angular/src/timer/examples/icons.ts packages/angular/src/timer/timer-example-styles.ts docs/story-audit/timer.md`
      passed.
- [x] Whitespace: `git diff --check` passed. Timer-scoped
      `git diff --check -- packages/angular/src/timer/timer.stories.ts packages/angular/src/timer/examples packages/angular/src/timer/timer-example-styles.ts`
      passed. Ignored-doc `git diff --no-index --check /dev/null docs/story-audit/timer.md` emitted no whitespace
      warnings; exit code `1` was expected for a no-index difference.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align timer story with react parity`
