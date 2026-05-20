# Toast Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/toast/toast.stories.ts`
- Angular examples: `packages/angular/src/toast/examples/*.ts`
- Angular styles: `packages/angular/src/toast/toast-example-styles.ts`
- React story: `packages/react/src/components/toast/toast.stories.tsx`
- React examples: `packages/react/src/components/toast/examples/*.tsx`
- React styles: `.storybook/modules/toast.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Fixed focused styling and handler parity gaps; story inventory already matched React.
- Highest-risk gaps: Toast examples rely on overlay timing and random promise/description behavior, so Storybook startup
  was used as a smoke check rather than a full visual interaction pass.

## Story Inventory

| Story name    | React | Angular | Notes                                                                                                                                                        |
| ------------- | ----- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Action        | Yes   | Yes     | Matching title, description, info type, action label, placement, and gap. Action handler now logs `Undo` like React.                                         |
| Basic         | Yes   | Yes     | Matching scheduled-meeting copy, info type, close trigger, bottom-end placement, overlap, and 24px gap.                                                      |
| Duration      | Yes   | Yes     | Matching four duration buttons, dynamic copy, clock indicator, close trigger, bottom-end placement, overlap, and 16px gap.                                   |
| MaxToasts     | Yes   | Yes     | Matching `max: 3`, notification copy, five-message batch, info icon, close trigger, overlap, and 16px gap.                                                   |
| Placement     | Yes   | Yes     | Matching top-end placement and button/copy surface.                                                                                                          |
| PromiseToast  | Yes   | Yes     | Matching upload promise states, random success/error behavior, loading/success/error indicators, and close trigger.                                          |
| Types         | Yes   | Yes     | Matching success/error/warning/info buttons, copy, icons, close trigger, and bottom-end placement. Angular button group now uses the React story's 12px gap. |
| Update        | Yes   | Yes     | Matching send/update controls, stored toast id, loading-to-success update, and no close trigger.                                                             |
| VaryingHeight | Yes   | Yes     | Matching four descriptions, random description selection, incrementing notification title, and close trigger.                                                |

## Example Data Sources

| Example       | Data origin                                 | Shape                                                        | Dynamic/async                                                                   | Divergence                                                         |
| ------------- | ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Action        | Inline toast options                        | One info toast with `action: { label, onClick }`             | Click creates toast; action click logs.                                         | No remaining divergence.                                           |
| Basic         | Inline toast options                        | One info toast with title and description                    | Click creates toast.                                                            | No change.                                                         |
| Duration      | Local `durations` array                     | Four `{ label, value }` entries: `1s`, `3s`, `5s`, `∞`       | Click creates duration-specific toast; `Infinity` stays until dismissed.        | No change.                                                         |
| MaxToasts     | Local `messages` array inside batch handler | Five notification descriptions plus single notification path | Click creates one or five toasts; `max: 3` constrains visible stack.            | No change.                                                         |
| Placement     | Inline toast options                        | One info toast at `top-end`                                  | Click creates toast.                                                            | No change.                                                         |
| PromiseToast  | Local `uploadFile` promise                  | Loading/success/error toast states                           | `setTimeout` resolves/rejects with unseeded `Math.random()` after 2s.           | No change; matches React randomness.                               |
| Types         | Inline per-type methods                     | Four typed toasts: success, error, warning, info             | Click creates typed toast and indicator.                                        | No remaining visible divergence after group-gap fix.               |
| Update        | Component field / React ref                 | Stored toast id string                                       | First click creates loading toast; second updates same id to success.           | Angular field is framework-idiomatic equivalent to React `useRef`. |
| VaryingHeight | Local descriptions array                    | Four description strings                                     | Unseeded `Math.random()` selects description; signal/useState increments count. | Angular signal is framework-idiomatic equivalent to React state.   |

## Sections / Structure

- Meta differences: Both stories declare `title: 'Components / Toast'` only. React uses `Meta` from
  `@storybook/react-vite`; Angular uses `Meta`/`StoryObj` from `@storybook/angular`.
- Decorator differences: React re-exports function examples directly. Angular uses per-story `moduleMetadata` imports
  and `render` templates for standalone examples, matching neighboring Angular stories.
- Per-story decorators / args / controls: Neither side defines args, controls, tags, or story-level parameters for
  toast.

## Styling

| Element           | React selector / class                                              | Angular selector / class                          | Gap                                                              | Fix                                                                                                                |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Story buttons     | `button.Root` from `.storybook/modules/button.module.css`           | `.toast-button`                                   | Angular used a simplified hardcoded button surface.              | Expanded `.toast-button` to mirror shared React button layout, states, focus ring, variants, and token usage.      |
| Types button row  | Inline `display: flex; gap: 12px; flexWrap: wrap`                   | `.toast-demo`                                     | Angular reused the default 8px gap.                              | Added `.toast-demo-types` with 12px gap and applied it to the Types example.                                       |
| Toast root        | `styles.Root` from `.storybook/modules/toast.module.css`            | `[data-scope='toast'][data-part='root']`, `.Root` | Angular used hardcoded white/text colors instead of demo tokens. | Switched to `--demo-bg-popover`, `--demo-neutral-fg`, `--demo-neutral-muted`, and matching fallback accent tokens. |
| Action trigger    | `styles.ActionTrigger`                                              | `.ActionTrigger`                                  | Angular border used `currentColor` only.                         | Matched React's `var(--demo-border-emphasized, currentColor)` border color.                                        |
| Icons             | Lucide React icons                                                  | Local standalone SVG icon components              | Framework-specific implementation.                               | No change; visible icon paths match the Lucide outline surface used by React.                                      |
| Toast transitions | `translate`, `scale`, `opacity`, `height`, `box-shadow` transitions | Same selectors on root/data attributes            | No material gap.                                                 | No change.                                                                                                         |

## Gap Matrix

| Area            | Gap                                                                       | React reference                                           | Angular location                                     | Fix                                                                                  |
| --------------- | ------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Button styling  | Angular toast buttons did not match shared React demo buttons.            | `.storybook/modules/button.module.css`                    | `packages/angular/src/toast/toast-example-styles.ts` | Mirrored shared button CSS under `.toast-button`.                                    |
| Theme tokens    | Angular toast root used fixed colors.                                     | `.storybook/modules/toast.module.css`                     | `packages/angular/src/toast/toast-example-styles.ts` | Replaced fixed root colors and trigger backgrounds with React demo tokens/fallbacks. |
| Types layout    | Angular Types row used 8px spacing instead of 12px.                       | `packages/react/src/components/toast/examples/types.tsx`  | `packages/angular/src/toast/examples/types.ts`       | Added `toast-demo-types`.                                                            |
| Action behavior | Angular action handler updated a hidden signal instead of logging `Undo`. | `packages/react/src/components/toast/examples/action.tsx` | `packages/angular/src/toast/examples/action.ts`      | Changed the action callback to `console.log('Undo')`.                                |

## Implementation Plan

1. Confirm React and Angular story inventories, ordering, decorators, and meta configuration.
2. Compare each React example against its Angular counterpart for toast data, dynamic behavior, controls, and rendered
   copy.
3. Compare React toast and shared button CSS modules against Angular toast example styles.
4. Patch only toast example/style files for focused parity gaps.
5. Run focused formatting, spec, typecheck, Storybook startup, and whitespace verification.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6251 --ci` reached Storybook ready at
      `http://localhost:6251/`; stopped after startup.
- [x] Storybook smoke: `curl -I --max-time 2 http://localhost:6251/` returned `HTTP/1.1 200 OK`;
      `curl -I --max-time 2 'http://localhost:6251/iframe.html?id=components-toast--basic&viewMode=story'` returned
      `HTTP/1.1 200 OK`.
- [ ] Visual check of each story: Not performed in browser side-by-side; audit is based on source-level story, data, and
      CSS parity plus Storybook startup smoke.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/toast/toast.spec.ts` passed, 1 file / 10 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --write packages/angular/src/toast/examples/action.ts packages/angular/src/toast/examples/types.ts packages/angular/src/toast/toast-example-styles.ts docs/story-audit/toast.md`
      passed.
- [x] Whitespace: `git diff --check` passed; `git diff --no-index --check /dev/null docs/story-audit/toast.md` emitted
      no whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align toast story with react parity`
