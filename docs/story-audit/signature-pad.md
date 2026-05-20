# Signature Pad Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/signature-pad/signature-pad.stories.ts`
- Angular examples: `packages/angular/src/signature-pad/examples/basic.ts`, `image-preview.ts`, `root-provider.ts`,
  `with-field.ts`
- Angular styles: `packages/angular/src/signature-pad/signature-pad-example-styles.ts`
- React story: `packages/react/src/components/signature-pad/signature-pad.stories.tsx`
- React examples: `packages/react/src/components/signature-pad/examples/basic.tsx`, `image-preview.tsx`,
  `root-provider.tsx`, `with-field.tsx`
- React styles: `.storybook/modules/signature-pad.module.css`, `.storybook/modules/field.module.css`

## Summary

- Status: aligned after focused styling and field state fixes; story inventory already matched React.
- Highest-risk gaps: resolved Angular `WithField` forced invalid state, missing field root/helper/error styling, and
  Angular-only preview image border/radius.

## Story Inventory

| Story name     | React | Angular | Notes                                                                                                          |
| -------------- | ----- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `Basic`        | Yes   | Yes     | Same story order and label/control/segment/clear/guide structure.                                              |
| `ImagePreview` | Yes   | Yes     | Same `drawEnd` data URL behavior and conditional image preview.                                                |
| `RootProvider` | Yes   | Yes     | Same root-provider structure and `no of paths` output. Angular uses `useSignaturePad` in an injection context. |
| `WithField`    | Yes   | Yes     | Same field composition after removing Angular-only forced invalid state.                                       |

## Example Data Sources

| Example        | Data origin                                          | Shape                                                       | Dynamic/async                                                                  | Divergence                                                                                                |
| -------------- | ---------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `Basic`        | No external data; signature paths are user drawn.    | Root with label, control, SVG segment, clear button, guide. | User pointer input mutates internal paths.                                     | No data divergence.                                                                                       |
| `ImagePreview` | Data URL from signature pad draw-end details.        | `image/png` data URL stored as a string.                    | Async `getDataUrl('image/png')`; preview shown only when the URL is non-empty. | Angular uses a signal; React uses `useState`. No user-visible divergence.                                 |
| `RootProvider` | `useSignaturePad()` machine state.                   | API exposes `paths.length` and controls the root provider.  | User drawing updates path count.                                               | Angular creates the machine via `runInInjectionContext`; framework-idiomatic, no user-visible divergence. |
| `WithField`    | No external data; field context wraps signature pad. | Field root with helper and error text.                      | Error text is hidden unless invalid.                                           | Angular previously forced invalid; fixed to match React's default valid field state.                      |

## Sections / Structure

- Meta differences: both stories use `title: 'Components / Signature Pad'`; neither defines args, argTypes, tags, or
  parameters.
- Decorator differences: React re-exports example components directly; Angular uses `moduleMetadata` imports and render
  templates per story.
- Per-story decorators / args / controls: Angular has one `moduleMetadata` decorator per story and no args or controls.
  React has no per-story decorators, args, or controls.

## Styling

| Element            | React selector / class                | Angular selector / class                                    | Gap                                                                          | Fix                                                                                |
| ------------------ | ------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Root               | `.Root`                               | `[arkSignaturePad]`, `[arkSignaturePadRootProvider]`        | Angular used responsive width rather than React's `--width: 20rem` contract. | Set the same custom width and direct width while keeping existing token fallbacks. |
| Label              | `.Label`                              | `[arkSignaturePadLabel]`                                    | None.                                                                        | No change.                                                                         |
| Control            | `.Control`                            | `[arkSignaturePadControl]`                                  | None.                                                                        | No change.                                                                         |
| Segment            | `.Segment`, `.SegmentPath`            | `[arkSignaturePadSegment]`, `[arkSignaturePadSegment] path` | None.                                                                        | No change.                                                                         |
| Guide              | `.Guide`                              | `[arkSignaturePadGuide]`                                    | None.                                                                        | No change.                                                                         |
| Clear trigger      | `.ClearTrigger`                       | `[arkSignaturePadClearTrigger]`                             | None; Angular includes an extra `[hidden]` rule for directive state.         | No visual change needed.                                                           |
| Preview image      | `.Image`                              | `.signature-pad-image`                                      | Angular added border and radius not present in React.                        | Remove Angular-only border and radius.                                             |
| Field root         | `field.Root`                          | `[arkFieldRoot]`                                            | Angular had no field-root styling in signature pad styles.                   | Add field root disabled and layout styles matching React `field.module.css`.       |
| Field helper/error | `field.HelperText`, `field.ErrorText` | `[arkFieldHelperText]`, `[arkFieldErrorText]`               | Angular had no helper/error text styling in signature pad styles.            | Add helper/error text typography and colors.                                       |

## Gap Matrix

| Area                  | Gap                                                                                        | React reference                                                                           | Angular location                  | Fix                                     |
| --------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------- |
| Story inventory       | None                                                                                       | `signature-pad.stories.tsx` exports `Basic`, `ImagePreview`, `RootProvider`, `WithField`. | `signature-pad.stories.ts`        | No change.                              |
| Field state           | Angular `WithField` forced invalid, showing an error state React does not show by default. | `examples/with-field.tsx` uses `<Field.Root>` without `invalid`.                          | `examples/with-field.ts`          | Remove `[invalid]="true"`.              |
| Field styling         | Field root/helper/error styles missing from signature pad style bundle.                    | `.storybook/modules/field.module.css`                                                     | `signature-pad-example-styles.ts` | Add field selector styles.              |
| Preview image styling | Angular-only border and radius.                                                            | `.Image` only sets width/height/max-width.                                                | `signature-pad-example-styles.ts` | Remove border and radius.               |
| Root sizing           | Angular used `width: min(100%, 20rem)` instead of React `--width` plus fixed width.        | `.Root` in `signature-pad.module.css`                                                     | `signature-pad-example-styles.ts` | Align root custom properties and width. |

## Implementation Plan

1. Remove the Angular-only invalid state from `WithField`.
2. Align shared signature pad root and image styles with the React module.
3. Add field root/helper/error styling used by the `WithField` example.
4. Run focused signature-pad tests, typecheck, Storybook startup, prettier check, and `git diff --check`.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6243 --ci` reached Storybook ready at
      `http://localhost:6243/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: not performed beyond Storybook startup; no browser side-by-side comparison was
      captured.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/signature-pad/signature-pad.spec.ts` passed, 1
      file / 14 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting / whitespace: `bun prettier --check ...signature-pad files... docs/story-audit/signature-pad.md`
      passed; `git diff --check` passed; scoped signature-pad `git diff --check` passed; ignored audit doc no-index
      whitespace check emitted no warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align signature-pad story with react parity`
