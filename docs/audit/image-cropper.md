# Image Cropper Angular Parity Audit

## Scope

- Angular files: `packages/angular/src/image-cropper/`
- React files: `packages/react/src/components/image-cropper/`
- Storybook/style files: `packages/angular/src/image-cropper/image-cropper.stories.ts`,
  `packages/angular/src/image-cropper/examples/`, `packages/angular/src/image-cropper/image-cropper-example-styles.ts`,
  `.storybook/modules/image-cropper.module.css`

## Summary

- Status: Fixed in this audit.
- Highest-risk gaps: Angular Storybook coverage only exposed Basic, Controlled, and RootProvider, leaving most React
  demos and edge states unavailable for visual/manual verification. Angular demo styling also omitted the React handle
  wrapper, grid visibility, data display, preview, and fixed-area affordances.

## Gap Matrix

| Area                       | Gap                                                                                                                                                       | React reference                                                         | Angular location                                                     | Fix                                                                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Story parity               | Missing AspectRatio, Circle, Context, ControlledZoom, Events, Fixed, Flip, CropPreview, InitialCrop, MinMaxSize, Reset, Rotation, and ZoomLimits stories. | `packages/react/src/components/image-cropper/image-cropper.stories.tsx` | `packages/angular/src/image-cropper/image-cropper.stories.ts`        | Added matching Angular stories and examples.                                                                                                 |
| Styling parity             | Angular examples styled only a minimal cropper and did not match React layout, handles, grid opacity, preview, or data display states.                    | `.storybook/modules/image-cropper.module.css`                           | `packages/angular/src/image-cropper/image-cropper-example-styles.ts` | Expanded styles to cover layout, toolbar buttons, handles with child marks, selection states, grid, descriptions, preview, and data display. |
| Example behavior           | Angular examples rendered four corner handles manually and skipped the public `imageCropperHandles` export used by React's `ImageCropper.handles`.        | `packages/react/src/components/image-cropper/examples/basic.tsx`        | `packages/angular/src/image-cropper/examples/basic.ts`               | Updated examples to iterate `imageCropperHandles`, rendering all handles with inner marks.                                                   |
| Public API / functionality | Root inputs, models, crop output, root provider, context template, anatomy, public types, and handle/grid parts are already present.                      | `packages/react/src/components/image-cropper/`                          | `packages/angular/src/image-cropper/`                                | No change. Angular `model()` channels intentionally emit model values for banana syntax.                                                     |
| Tests                      | Existing tests covered core parts, models, crop data, fixed area, root provider, and SSR, but not the added examples or edge prop wiring.                 | React examples                                                          | `packages/angular/src/image-cropper/image-cropper.spec.ts`           | Added story/example smoke coverage and prop assertions for aspect ratio, initial crop, constraints, zoom limits, and context controls.       |

## Implementation Plan

1. Update the audit file with concrete parity gaps.
2. Add missing Angular examples and story exports matching React story names.
3. Expand Angular Storybook styles to match the React demo CSS behavior.
4. Add focused Angular specs for new examples and edge prop wiring.
5. Run targeted tests, typecheck, `git diff --check`, then stage and commit only image-cropper files and this audit.

## Verification

- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. Existing ng-packagr export-condition warnings
      were emitted.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/image-cropper/image-cropper.spec.ts` passed: 1 file,
      12 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` started successfully and reported Storybook ready at
      `http://localhost:6006/`; stopped with Ctrl-C after startup smoke.
- [ ] Manual/visual checks: Deferred. No browser side-by-side inspection was performed in this run.

## Commit

- Hash: Pending.
- Message: `fix(angular): align image cropper story parity`
