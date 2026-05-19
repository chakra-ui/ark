# Image Cropper Angular Parity Audit

## Scope

- Angular files: `packages/angular/src/image-cropper/`
- React files: `packages/react/src/components/image-cropper/`
- Storybook/style files:
  - `packages/angular/src/image-cropper/image-cropper.stories.ts`
  - `packages/angular/src/image-cropper/examples/`
  - `packages/angular/src/image-cropper/image-cropper-example-styles.ts`
  - `.storybook/modules/image-cropper.module.css`

## Summary

- Status: Re-audited and aligned. The previous audit's story, styling, and spec gaps remain closed. The only outstanding
  drift was a `defaultZoom: 1.25` seed on the Angular `RootProvider` example that has now been removed for parity with
  the React reference (which constructs `useImageCropper()` with no defaults).
- Highest-risk gaps remaining: None blocking. The React `.storybook/modules/image-cropper.module.css` ships
  `data-position` selectors for `top-left/top-right/bottom-right/bottom-left/top/bottom/left/right`, which Zag does not
  emit — Zag emits `nw/ne/se/sw/n/s/e/w`. The Angular `image-cropper-example-styles.ts` correctly targets the values Zag
  actually renders, so the Angular demo styling is the closer match to Zag's behavior; the React module is the broken
  side but is outside the Angular component scope of this audit.

## Gap Matrix

| Area                       | Gap                                                                                                                                                  | React reference                                                                                                       | Angular location                                                                            | Fix                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Story parity               | All 15 React stories are now mirrored in Angular (Basic, AspectRatio, Circle, Context, ControlledZoom, Events, Fixed, Flip, CropPreview, InitialCrop, MinMaxSize, Reset, RootProvider, Rotation, ZoomLimits). Angular keeps one additive `Controlled` story that consolidates `[(zoom)]`, `[(rotation)]`, and `[(flip)]` plus `(cropChange)` to exercise the model channels in one place. | `packages/react/src/components/image-cropper/image-cropper.stories.tsx`                                               | `packages/angular/src/image-cropper/image-cropper.stories.ts`                              | No change. Additional Angular `Controlled` story is intentional and documents the framework's `model()` parity contract for the Angular test corpus. |
| RootProvider example seed  | Angular `RootProvider` example seeded the machine with `defaultZoom: 1.25`. The React `RootProvider` example calls `useImageCropper()` with no defaults, so the initial zoom is 1.                                       | `packages/react/src/components/image-cropper/examples/root-provider.tsx`                                              | `packages/angular/src/image-cropper/examples/root-provider.ts`                              | Removed the `defaultZoom: 1.25` argument so Angular initializes the example at zoom 1, matching React.                                               |
| Handle iteration parity    | All Angular examples now iterate `imageCropperHandles` and render the inner `<span></span>` mark, matching React's `ImageCropper.handles.map((position) => <ImageCropper.Handle>...<div /></ImageCropper.Handle>)` pattern.                  | `packages/react/src/components/image-cropper/examples/*.tsx`                                                          | `packages/angular/src/image-cropper/examples/*.ts`                                          | No change.                                                                                                                                            |
| Styling parity             | Angular example styles cover layout, viewport, image, selection, handle marks, grid axes, toolbar, descriptions, preview, and data display. Selectors target the actual Zag `data-position` values (`nw/ne/se/sw/n/s/e/w`).             | `.storybook/modules/image-cropper.module.css`                                                                          | `packages/angular/src/image-cropper/image-cropper-example-styles.ts`                        | No change. The Angular styling is more faithful to Zag's actual output than the React module's `top-left/...` selectors; React reference issue is out of scope. |
| Public API / functionality | Root inputs, models (`zoom`, `rotation`, `flip`), `cropChange` output, root provider, anatomy, handle/grid axis inputs, `useImageCropper`, context directive (`arkImageCropperContext`), and exported public types all align with React.            | `packages/react/src/components/image-cropper/`                                                                         | `packages/angular/src/image-cropper/`                                                       | No change. `model()` channels emit value payloads (per `docs/technical-requirements.md` §3), while React emits details payloads — accepted Angular convention. |
| `Context` API shape        | React's `<ImageCropper.Context>` callback receives the live `ImageCropperApi` directly. Angular's `arkImageCropperContext` template receives a `Signal<ImageCropperApi>` accessed as `api()` — required because Angular state is signal-based. | `packages/react/src/components/image-cropper/image-cropper-context.tsx`                                               | `packages/angular/src/image-cropper/image-cropper-context.ts`                               | No change. Signal access is the Angular-idiomatic equivalent; documented in technical requirements §5.                                              |
| Events example payload     | React's `onCropChange={(e) => setCropData(e.crop)}` extracts `e.crop`; Angular's `(cropChange)="cropData.set($event.crop)"` does the same. React's `onZoomChange={(e) => setZoom(e.zoom)}` extracts `e.zoom`; Angular's `(zoomChange)="zoom.set($event)"` uses the model-derived output, which emits the value directly (a `number`). | `packages/react/src/components/image-cropper/examples/events.tsx`                                                     | `packages/angular/src/image-cropper/examples/events.ts`                                     | No change. Model-derived `xChange` emits the next value per technical requirements §3.                                                              |
| Tests                      | Spec covers public surface (constants, directives, types, examples), every example smoke renders, fallback-id format, viewport/image/selection/handle/grid prop application, zoom/rotation/flip round-trip with single emission, crop change emission and crop data, pointer-drag resize, fixed-area lock, edge configuration props (`aspectRatio`/`initialCrop`/min-max size/min-max zoom), `getCroppedImage` null guard, root-provider context delivery, and server-platform construction. | React stories and examples plus React unit tests under `packages/react/src/components/image-cropper/` (no dedicated React spec file in repo) | `packages/angular/src/image-cropper/image-cropper.spec.ts`                                  | No change. Coverage already exceeds the React behavioral surface and the audit-fix workflow's parity bar.                                            |

## Implementation Plan

1. Remove the Angular-specific `defaultZoom: 1.25` argument from the `RootProvider` example so it matches React's
   no-default initialization.
2. Re-run the targeted Vitest spec and the Angular typecheck/build.
3. Update this audit's verification checklist and commit hash.
4. Stage only the changed `packages/angular/src/image-cropper/examples/root-provider.ts` and this audit file; commit.

## Verification

- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed (Angular package build via `ng-packagr`
      succeeded; pre-existing ng-packagr warnings unrelated to image-cropper).
- [x] Component tests: `bun run --cwd packages/angular test:ci src/image-cropper/image-cropper.spec.ts` passed: 1 file,
      12 tests.
- [ ] Storybook render: Not re-run in this re-audit pass; previous audit confirmed Storybook 9 starts successfully and
      lists all image-cropper stories.
- [ ] Manual/visual checks: Deferred. No browser side-by-side inspection was performed in this run.

## Commit

- Hash: Pending.
- Message: `fix(angular): align image-cropper with react parity`
