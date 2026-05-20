# Popover Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/popover/popover.stories.ts`
- Angular examples: `packages/angular/src/popover/examples/`
- Angular styles: `packages/angular/src/popover/popover-example-styles.ts`
- React story: `packages/react/src/components/popover/popover.stories.tsx`
- React examples: `packages/react/src/components/popover/examples/`
- React styles: `.storybook/modules/popover.module.css`, `.storybook/modules/dialog.module.css`, shared button/field
  modules

## Summary

- Status: Aligned after fixes. Angular now matches React's public Storybook inventory and order.
- Highest-risk gaps: Closed by adding `WithDialog`, which exercises nested dismissable layers, portal layering, and
  popover arrow rendering inside an active dialog.

## Story Inventory

| Story name          | React | Angular | Notes                                                                                        |
| ------------------- | ----- | ------- | -------------------------------------------------------------------------------------------- |
| Anchor              | Yes   | Yes     | Same surface: trigger plus anchored input.                                                   |
| Arrow               | Yes   | Yes     | Same title, description, close trigger, and arrow.                                           |
| Basic               | Yes   | Yes     | Same title and description.                                                                  |
| CloseBehavior       | Yes   | Yes     | Same close-on-escape/outside behavior.                                                       |
| Context             | Yes   | Yes     | Angular uses `root.api().open`; framework-idiomatic equivalent to React context render prop. |
| Controlled          | Yes   | Yes     | Angular uses `[(open)]`; framework-idiomatic equivalent to React state.                      |
| DefaultOpen         | No    | Removed | Angular-only Storybook export removed; example file remains for spec coverage.               |
| DisableOutsideClick | Yes   | Yes     | Same fixed outside-click behavior.                                                           |
| InitialFocusEl      | Yes   | Yes     | Same form fields and save action.                                                            |
| LazyMount           | Yes   | Yes     | Angular uses `ArkPresenceComponent`; equivalent lazy/unmount story behavior.                 |
| Modal               | Yes   | Yes     | Same modal popover copy.                                                                     |
| MultipleTriggers    | Yes   | Yes     | Same item data: share/export/archive.                                                        |
| Nested              | Yes   | Yes     | Same nested popover copy and right placement.                                                |
| Positioning         | Yes   | Yes     | Same left-start placement and offsets.                                                       |
| RootProvider        | Yes   | Yes     | Same external popover state label and controlled content copy.                               |
| SameWidth           | Yes   | Yes     | Same trigger width and `sameWidth` positioning.                                              |
| WithDialog          | Yes   | Yes     | Added Angular composed dialog + popover story.                                               |

## Example Data Sources

| Example             | Data origin                         | Shape                                                | Dynamic/async                           | Divergence                                                     |
| ------------------- | ----------------------------------- | ---------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| Anchor              | Hard-coded template content         | Trigger plus input anchor                            | None                                    | No change.                                                     |
| Arrow               | Hard-coded template content         | Trigger, content, arrow, close button                | None                                    | No change.                                                     |
| Basic               | Hard-coded template content         | Trigger, title, description                          | None                                    | No change.                                                     |
| CloseBehavior       | Hard-coded template content         | `closeOnEscape` and `closeOnInteractOutside` enabled | None                                    | No change.                                                     |
| Context             | Popover runtime context             | Open boolean displayed as visible/hidden             | State changes with popover              | Angular expression replaces React context callback.            |
| Controlled          | Local component state               | Boolean open state                                   | State changes on trigger/close          | Angular signal model is equivalent.                            |
| DefaultOpen         | Hard-coded Angular-only example     | Starts open via bare `defaultOpen`                   | Initial uncontrolled state              | Keep example file for component spec, remove Storybook export. |
| DisableOutsideClick | Hard-coded template content         | `closeOnInteractOutside=false`                       | None                                    | No change.                                                     |
| InitialFocusEl      | Template ref                        | First-name input returned from callback              | Focus target resolved at runtime        | No change.                                                     |
| LazyMount           | Popover state plus Angular presence | Portal content mounted only while open               | Mount lifecycle changes with open state | Angular presence is equivalent to React `lazyMount`.           |
| Modal               | Hard-coded template content         | Modal popover                                        | None                                    | No change.                                                     |
| MultipleTriggers    | Local `items` array                 | Three `{ id, label, detail }` objects                | Active item derives from trigger value  | No change.                                                     |
| Nested              | Hard-coded template content         | Parent popover plus nested right-placed popover      | Nested content mounts on nested open    | No change.                                                     |
| Positioning         | Inline positioning object           | `left-start`, main/cross offsets of 12               | None                                    | No change.                                                     |
| RootProvider        | `usePopover` return                 | Open/closed label plus root provider                 | State changes via machine API           | No change.                                                     |
| SameWidth           | Inline positioning object           | `sameWidth: true`, trigger min width 200px           | None                                    | No change.                                                     |
| WithDialog          | Hard-coded template content         | Dialog with nested lazy popover and arrow            | Dialog and nested popover open states   | Added; matches React composition.                              |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Popover'`; no tags, args, argTypes, or parameters.
- Decorator differences: React re-exports example functions directly. Angular uses one `moduleMetadata` decorator per
  standalone example.
- Per-story decorators / args / controls: No story-level args or controls on either side.

## Styling

| Element                         | React selector / class     | Angular selector / class                       | Gap              | Fix                                                                        |
| ------------------------------- | -------------------------- | ---------------------------------------------- | ---------------- | -------------------------------------------------------------------------- |
| Popover content                 | `.Content`                 | `[arkPopoverContent]`                          | No material gap. | No change.                                                                 |
| Popover arrow                   | `.Arrow`, `.ArrowTip`      | `[arkPopoverArrow]`, `[arkPopoverArrowTip]`    | No material gap. | No change.                                                                 |
| Popover title/description       | `.Title`, `.Description`   | `[arkPopoverTitle]`, `[arkPopoverDescription]` | No material gap. | No change.                                                                 |
| Close trigger                   | `.CloseTrigger`            | `[arkPopoverCloseTrigger]`                     | No material gap. | No change.                                                                 |
| Initial-focus body              | `.Body`                    | `.body`                                        | No material gap. | No change.                                                                 |
| Dialog content for `WithDialog` | Dialog CSS module classes  | Angular dialog example styles                  | Closed.          | Reused Angular dialog example styles in the new composed example.          |
| Shared buttons                  | Shared `button.module.css` | `[arkPopoverTrigger]`, `.popover-button`       | Closed.          | Updated Popover example styles to match shared button states and variants. |
| Anchor input                    | Shared `field.module.css`  | `.field`                                       | Closed.          | Added `.field` class to the anchor input.                                  |

## Gap Matrix

| Area            | Gap                                              | React reference                                                  | Angular location                                         | Fix                                                                   |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| Story inventory | Missing `WithDialog`                             | `packages/react/src/components/popover/examples/with-dialog.tsx` | `packages/angular/src/popover/popover.stories.ts`        | Added `PopoverWithDialogExample` and exported `WithDialog`.           |
| Story inventory | Extra `DefaultOpen` Storybook export             | React has no `DefaultOpen` export                                | `packages/angular/src/popover/popover.stories.ts`        | Removed Storybook export/import only; left example for spec coverage. |
| Story order     | Angular order starts with `Basic`                | React order starts `Anchor`, `Arrow`, `Basic`                    | `packages/angular/src/popover/popover.stories.ts`        | Reordered Angular exports to match React.                             |
| Styling         | Popover triggers rendered coral-solid by default | React shared neutral `button.Root`                               | `packages/angular/src/popover/popover-example-styles.ts` | Updated shared button selectors, states, variants, and group gap.     |

## Implementation Plan

1. Add `packages/angular/src/popover/examples/with-dialog.ts` using Angular dialog/popover directives, portals,
   presence-driven lazy popover mounting, and existing popover/dialog styles.
2. Update `packages/angular/src/popover/popover.stories.ts` to remove the `DefaultOpen` Storybook export, import
   `PopoverWithDialogExample`, add `WithDialog`, and match React story order.
3. Run focused formatting/checks, Popover specs, package typecheck, Storybook startup, and `git diff --check`.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Formatting:
      `bun prettier --write packages/angular/src/popover/popover.stories.ts packages/angular/src/popover/examples/anchor.ts packages/angular/src/popover/examples/initial-focus.ts packages/angular/src/popover/examples/with-dialog.ts packages/angular/src/popover/popover-example-styles.ts docs/story-audit/popover.md`
      passed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/popover/popover.spec.ts` passed, 1 file / 21
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6235 --ci` reached Storybook ready at
      `http://localhost:6235/`; stopped afterward. Existing unused TypeScript compilation warnings and `DefinePlugin`
      warning only.
- [ ] Visual check of each story: Not performed in browser side-by-side.
- [x] `git diff --check`: Passed.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align popover story with react parity`
