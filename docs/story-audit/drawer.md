# Drawer Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/drawer/drawer.stories.ts`
- Angular examples: `packages/angular/src/drawer/examples/`
- Angular styles: `packages/angular/src/drawer/drawer-example-styles.ts`
- React story: `packages/react/src/components/drawer/drawer.stories.tsx`
- React examples: `packages/react/src/components/drawer/examples/`
- React styles: `.storybook/modules/drawer.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/field.module.css`

## Summary

- Status: Fixed Angular Storybook inventory and focused visible styling gaps against the React drawer stories.
- Highest-risk gaps: Angular had two extra exported stories (`DefaultOpen`, `WithTitleDescription`) and the React shared
  button/field styling used by `Controlled`, `MultipleTriggers`, and `RootProvider` was not represented on the Angular
  story surface.

## Story Inventory

| Story name             | React | Angular              | Notes                                                                              |
| ---------------------- | ----- | -------------------- | ---------------------------------------------------------------------------------- |
| `Basic`                | Yes   | Yes                  | Matches order and rendered content.                                                |
| `SnapPoints`           | Yes   | Yes                  | Matches snap points, default snap point, copy, and ordering.                       |
| `Controlled`           | Yes   | Yes                  | Fixed to use an external state button instead of a drawer trigger, matching React. |
| `Modal`                | Yes   | Yes                  | Matches modal prop and content.                                                    |
| `MultipleTriggers`     | Yes   | Yes                  | Data shape matches; fixed trigger/action button styling.                           |
| `RootProvider`         | Yes   | Yes                  | Fixed API button styling.                                                          |
| `Scrollable`           | Yes   | Yes                  | Matches 50 generated items and scroll styling.                                     |
| `NoDragArea`           | Yes   | Yes                  | Matches no-drag paragraph.                                                         |
| `NonDraggable`         | Yes   | Yes                  | Matches `draggable=false` content.                                                 |
| `IndentBackground`     | Yes   | Yes                  | Matches stack/indent story.                                                        |
| `SwipeDirection`       | Yes   | Yes                  | Matches `swipeDirection="end"` right drawer surface.                               |
| `DefaultOpen`          | No    | Removed from exports | Angular-only story left unexported to match React inventory.                       |
| `WithTitleDescription` | No    | Removed from exports | Angular-only story left unexported to match React inventory.                       |

## Example Data Sources

| Example            | Data origin                | Shape                                                 | Dynamic/async                         | Divergence                                                                           |
| ------------------ | -------------------------- | ----------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| `Basic`            | Hard-coded text in example | Title and paragraph                                   | None                                  | No divergence.                                                                       |
| `SnapPoints`       | Inline snap point literals | `[0.25, 0.5, 1]`, default `0.5`                       | Drawer machine drag state             | No divergence.                                                                       |
| `Controlled`       | Local component state      | Boolean open state                                    | User click updates state              | Angular uses a signal/model binding; visible flow now matches React external button. |
| `Modal`            | Hard-coded content         | Modal root flag and title                             | None                                  | No divergence.                                                                       |
| `MultipleTriggers` | Hard-coded `users` array   | Three `{ id, name, email }` records                   | Trigger value selects active user     | No data divergence; styling fixed.                                                   |
| `RootProvider`     | `useDrawer` options        | `defaultSnapPoint: 0.5`, `snapPoints: [0.25, 0.5, 1]` | API buttons mutate drawer state       | Angular uses `runInInjectionContext` for DI; no user-visible divergence.             |
| `Scrollable`       | Generated array            | 50 items labeled `Item 1` through `Item 50`           | None                                  | No divergence.                                                                       |
| `NoDragArea`       | Hard-coded text            | `data-no-drag` paragraph                              | None                                  | No divergence.                                                                       |
| `NonDraggable`     | Hard-coded text            | Content `draggable=false`                             | None                                  | No divergence.                                                                       |
| `IndentBackground` | Hard-coded content         | Stack, indent background, and indent wrapper          | Swipe progress CSS vars               | No divergence.                                                                       |
| `SwipeDirection`   | Hard-coded content         | Right drawer                                          | Drawer machine maps logical direction | No divergence.                                                                       |

## Sections / Structure

- Meta differences: both stories use `title: 'Components / Drawer'` and no args, tags, argTypes, or parameters.
- Decorator differences: React re-exports function stories; Angular uses per-story `moduleMetadata` imports and render
  templates, matching local Angular Storybook conventions.
- Per-story decorators / args / controls: no story-level args or controls in either stack. Angular portals carry the
  root/provider injector, which is Angular-specific and required for DI context.

## Styling

| Element                                        | React selector / class                     | Angular selector / class                 | Gap                                                                                                             | Fix                                                           |
| ---------------------------------------------- | ------------------------------------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Drawer trigger                                 | `drawer.Trigger`                           | `[arkDrawerTrigger]`                     | Already matched drawer module trigger styling.                                                                  | No change.                                                    |
| External buttons                               | `button.Root`                              | `.button`                                | Controlled/root-provider buttons were unstyled; multiple trigger action buttons used close-trigger positioning. | Added `.button` styles and applied them to matching controls. |
| Button groups                                  | `button.Group`, `hstack`                   | `.button-group`, `.hstack`               | Angular groups lacked explicit center alignment.                                                                | Added `align-items: center`.                                  |
| Solid action                                   | `button.Root[data-variant='solid']`        | `.button[data-variant='solid']`          | Save action was not styled as the React solid action.                                                           | Added solid variant and applied `data-variant="solid"`.       |
| Field root/input                               | `field.Root`, `field.Label`, `field.Input` | `.field`, `.field label`, `.field input` | Angular field spacing/input states were only approximate.                                                       | Mirrored React field sizing, focus ring, and colors.          |
| Backdrop, content, grabber, scrollable, indent | `drawer.module.css`                        | drawer part selectors and classes        | Already closely translated.                                                                                     | No change.                                                    |

## Gap Matrix

| Area                     | Gap                                                                          | React reference                                           | Angular location                                                                        | Fix                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Story inventory          | Extra `DefaultOpen` and `WithTitleDescription` exports                       | `packages/react/src/components/drawer/drawer.stories.tsx` | `packages/angular/src/drawer/drawer.stories.ts`                                         | Removed those exports/imports from the Angular story.                                       |
| Controlled example       | Trigger button was inside the drawer root instead of a standalone controller | `examples/controlled.tsx`                                 | `examples/controlled.ts`                                                                | Moved the button outside the root and toggled the bound signal directly.                    |
| Shared buttons           | React button module styles were absent from Angular API buttons/actions      | `button.module.css`                                       | `drawer-example-styles.ts`, `multiple-triggers.ts`, `root-provider.ts`, `controlled.ts` | Added `.button` styles and applied them to matching controls.                               |
| Multiple trigger actions | Cancel/save buttons received close-icon positioning                          | `examples/multiple-triggers.tsx`                          | `examples/multiple-triggers.ts`                                                         | Added `.button` class to override icon close-trigger positioning; added solid save variant. |
| Field styling            | React field module focus/sizing not fully represented                        | `field.module.css`                                        | `drawer-example-styles.ts`                                                              | Updated `.field` and `.field input` styling.                                                |

## Implementation Plan

1. Remove Angular-only Storybook exports so the story inventory and order match React.
2. Align `Controlled` with React's external state button pattern while keeping Angular signal/model binding.
3. Add local translations of React shared button and field CSS to the drawer example styles.
4. Apply those classes to `MultipleTriggers`, `RootProvider`, and `Controlled`.
5. Run focused verification and record results.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6014` reached `Storybook ready!` at
      `http://localhost:6014/`; `curl -I --max-time 2 http://localhost:6014/` and
      `curl -I --max-time 2 'http://localhost:6014/iframe.html?id=components-drawer--basic&viewMode=story'` both
      returned `HTTP/1.1 200 OK`. Storybook was stopped after startup. Existing unused TypeScript compilation and
      `DefinePlugin` warnings were present.
- [ ] Visual check of each story: not performed in-browser side by side; the Storybook server and Basic iframe were
      smoke-checked over HTTP.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/drawer/drawer.spec.ts` passed, 1 file / 26 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/drawer/drawer.stories.ts packages/angular/src/drawer/examples/controlled.ts packages/angular/src/drawer/examples/multiple-triggers.ts packages/angular/src/drawer/examples/root-provider.ts packages/angular/src/drawer/drawer-example-styles.ts docs/story-audit/drawer.md`
      passed.
- [x] Whitespace: `git diff --check` passed; drawer-scoped `git diff --check -- ...drawer files...` passed; ignored
      audit doc no-index whitespace check passed with no output.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align drawer story with react parity`
