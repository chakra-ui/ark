# Marquee Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/marquee/marquee.stories.ts`
- Angular examples: `packages/angular/src/marquee/examples/*.ts`
- Angular styles: `packages/angular/src/marquee/marquee-example-styles.ts`
- React story: `packages/react/src/components/marquee/marquee.stories.tsx`
- React examples: `packages/react/src/components/marquee/examples/*.tsx`
- React styles: `.storybook/modules/marquee.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Fixed. Angular Storybook exports now match React inventory/order, and Programmatic Control buttons use the
  React shared button visual surface.
- Highest-risk gaps: None remaining for Storybook surface parity.

## Story Inventory

| Story name          | React | Angular | Notes                                                                                                                                              |
| ------------------- | ----- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| AutoFill            | Yes   | Yes     | Same compact three-item fruit data and `autoFill`/`spacing="2rem"` behavior.                                                                       |
| Basic               | Yes   | Yes     | Same six-item fruit data and default horizontal marquee.                                                                                           |
| FiniteLoops         | Yes   | Yes     | Same `loopCount=3` counters and status copy.                                                                                                       |
| PauseOnInteraction  | Yes   | Yes     | Same `pauseOnInteraction` root behavior; Angular uses buttons for focusable interaction items.                                                     |
| ProgrammaticControl | Yes   | Yes     | Same `useMarquee`/root-provider control pattern; button styling now matches React's shared button surface.                                         |
| Reverse             | Yes   | Yes     | Same `reverse` root behavior.                                                                                                                      |
| RootProvider        | No    | Removed | Angular-only Storybook export removed from Storybook surface. Example file remains because component specs cover root-provider primitive behavior. |
| Speed               | Yes   | Yes     | Same slow/normal/fast labels and values: `25`, `50`, `100`.                                                                                        |
| Vertical            | Yes   | Yes     | Same `side="bottom"` vertical behavior.                                                                                                            |
| WithEdges           | Yes   | Yes     | Same start/end edges and gradient styling.                                                                                                         |

## Example Data Sources

| Example             | Data origin                                                                     | Shape                                               | Dynamic/async                              | Divergence                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| AutoFill            | React local array; Angular `marqueeExampleItems.slice(0, 3)`                    | Three `{ name, logo }` fruit items                  | None                                       | No change; rendered data matches.                                                                              |
| Basic               | React local array; Angular shared `marqueeExampleItems`                         | Six `{ name, logo }` fruit items                    | None                                       | No change; rendered data matches.                                                                              |
| FiniteLoops         | React local array; Angular shared `marqueeExampleItems`                         | Six fruit items plus loop/completion counters       | Counter state updates from complete events | No change; behavior and copy match.                                                                            |
| PauseOnInteraction  | React local array; Angular shared `marqueeExampleItems`                         | Six fruit items                                     | Pointer/focus interaction pauses marquee   | Angular uses `<button>` items so interaction can be demonstrated; intentional framework-accessibility surface. |
| ProgrammaticControl | React local array; Angular shared `marqueeExampleItems`                         | Six fruit items plus two controls                   | `pause()` and `resume()` calls             | Styling gap only; behavior matches.                                                                            |
| Reverse             | React local array; Angular shared `marqueeExampleItems`                         | Six fruit items                                     | None                                       | No change.                                                                                                     |
| RootProvider        | Angular-only shared `marqueeExampleItems`                                       | Six fruit items                                     | `useMarquee` context sets speed            | Remove from Storybook inventory; example remains for specs.                                                    |
| Speed               | React local array; Angular shared `marqueeExampleItems` plus speed config array | Six fruit items repeated under three speed sections | None                                       | No change; labels and values match.                                                                            |
| Vertical            | React local array; Angular shared `marqueeExampleItems`                         | Six fruit items                                     | None                                       | No change.                                                                                                     |
| WithEdges           | React local array; Angular shared `marqueeExampleItems`                         | Six fruit items plus start/end edges                | None                                       | No change.                                                                                                     |

## Sections / Structure

- Meta differences: Both use `title: 'Components / Marquee'`; neither defines args, argTypes, tags, or parameters.
- Decorator differences: React re-exports example functions directly. Angular uses `moduleMetadata` imports and `render`
  templates for standalone example components.
- Per-story decorators / args / controls: Angular needs one `moduleMetadata` decorator per retained story. No per-story
  args or controls are used in either stack.

## Styling

| Element              | React selector / class                 | Angular selector / class | Gap  | Fix        |
| -------------------- | -------------------------------------- | ------------------------ | ---- | ---------- |
| Root                 | `styles.Root`                          | `.Root`                  | None | No change. |
| Viewport             | `styles.Viewport`                      | `.Viewport`              | None | No change. |
| Content              | `styles.Content`                       | `.Content`               | None | No change. |
| Edge                 | `styles.Edge`                          | `.Edge`                  | None | No change. |
| Item                 | `styles.Item`                          | `.Item`                  | None | No change. |
| Item logo/name       | `styles.ItemLogo`, `styles.ItemName`   | `.ItemLogo`, `.ItemName` | None | No change. |
| Programmatic buttons | `button.Root` from `button.module.css` | `.Button`                | None | Fixed.     |

## Gap Matrix

| Area            | Gap                                                         | React reference                                             | Angular location                                                                                                          | Fix                                                                         |
| --------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Story inventory | Angular has extra `RootProvider` export                     | `packages/react/src/components/marquee/marquee.stories.tsx` | `packages/angular/src/marquee/marquee.stories.ts`                                                                         | Remove Storybook export/import and reorder retained exports to match React. |
| Styling         | Programmatic buttons do not use React shared button surface | `.storybook/modules/button.module.css`                      | `packages/angular/src/marquee/examples/programmatic-control.ts`, `packages/angular/src/marquee/marquee-example-styles.ts` | Add `.Button` styling and apply it to Pause/Resume.                         |

## Implementation Plan

1. Update `marquee.stories.ts` so exports are `AutoFill`, `Basic`, `FiniteLoops`, `PauseOnInteraction`,
   `ProgrammaticControl`, `Reverse`, `Speed`, `Vertical`, `WithEdges`.
2. Remove the Storybook-only `RootProvider` import/export while leaving the example file intact for specs.
3. Add `.Button` styles to `marquee-example-styles.ts` based on React's shared button module.
4. Apply `class="Button"` to the Programmatic Control Pause/Resume buttons.
5. Run focused verification and update this audit.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6233 --ci` reached Storybook ready at
      `http://localhost:6233/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Browser side-by-side review was not performed in this run.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/marquee/marquee.spec.ts` passed, 1 file / 11
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/marquee/marquee.stories.ts packages/angular/src/marquee/examples/programmatic-control.ts packages/angular/src/marquee/marquee-example-styles.ts docs/story-audit/marquee.md`
      passed.
- [x] Whitespace: `git diff --check` passed. `git diff --no-index --check /dev/null docs/story-audit/marquee.md` emitted
      no whitespace warnings; exit code `1` is expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align marquee story with react parity`
