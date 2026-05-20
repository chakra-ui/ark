# Image Cropper Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/image-cropper/image-cropper.stories.ts`
- Angular examples: `packages/angular/src/image-cropper/examples/`
- Angular styles: `packages/angular/src/image-cropper/image-cropper-example-styles.ts`
- React story: `packages/react/src/components/image-cropper/image-cropper.stories.tsx`
- React examples: `packages/react/src/components/image-cropper/examples/`
- React styles: `.storybook/modules/image-cropper.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Fixed. Angular now exposes the same Storybook inventory as React and uses local SVG icons/styles for the
  React-equivalent control surface.
- Highest-risk gaps: None remaining at the story-surface level.

## Story Inventory

| Story name       | React | Angular | Notes                                                                            |
| ---------------- | ----- | ------- | -------------------------------------------------------------------------------- |
| `Basic`          | Yes   | Yes     | Same image source and cropper parts.                                             |
| `AspectRatio`    | Yes   | Yes     | Same three ratios; Angular needed icon parity.                                   |
| `Circle`         | Yes   | Yes     | Same `cropShape="circle"`.                                                       |
| `Context`        | Yes   | Yes     | Same context zoom controls; Angular needed icon parity.                          |
| `Controlled`     | No    | Removed | Removed from Angular Storybook surface and deleted the orphaned Angular example. |
| `ControlledZoom` | Yes   | Yes     | Same controlled zoom state; Angular needed icon parity.                          |
| `Events`         | Yes   | Yes     | Same crop and zoom display.                                                      |
| `Fixed`          | Yes   | Yes     | Same fixed crop area.                                                            |
| `Flip`           | Yes   | Yes     | Same horizontal/vertical state; Angular needed icon/copy parity.                 |
| `CropPreview`    | Yes   | Yes     | Same root-provider crop preview and data URL output.                             |
| `InitialCrop`    | Yes   | Yes     | Same initial crop `{ x: 50, y: 30, width: 200, height: 120 }`.                   |
| `MinMaxSize`     | Yes   | Yes     | Same min/max dimensions.                                                         |
| `Reset`          | Yes   | Yes     | Same root-provider reset controls; Angular needed icon parity.                   |
| `RootProvider`   | Yes   | Yes     | Same `useImageCropper` provider pattern; Angular needed icon parity.             |
| `Rotation`       | Yes   | Yes     | Same rotation model; Angular needed icon/copy parity.                            |
| `ZoomLimits`     | Yes   | Yes     | Same min/max zoom and clamp behavior; Angular needed icon parity.                |

## Example Data Sources

| Example                        | Data origin                              | Shape                                                                          | Dynamic/async                   | Divergence                                                                               |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------- |
| `Basic`, `Circle`, `Fixed`     | Hard-coded Unsplash image URL            | One image, cropper handles from `ImageCropper.handles` / `imageCropperHandles` | None                            | No behavior divergence.                                                                  |
| `AspectRatio`                  | Local hard-coded ratio options           | Three ratios: `16:9`, `1:1`, `9:16`                                            | Local selected ratio state      | Angular uses signal state; React uses `useState`. No change.                             |
| `Context`, `RootProvider`      | Cropper context API                      | Zoom controls plus visible zoom meter                                          | User events mutate context zoom | Angular uses template context / DI-backed hook. No change.                               |
| `ControlledZoom`, `ZoomLimits` | Local numeric state                      | Zoom number with optional min/max                                              | User events clamp/update zoom   | Angular uses `model()` two-way binding. No change.                                       |
| `Events`                       | Cropper output events                    | Crop `{ x, y, width, height }` and zoom number                                 | User crop/zoom updates display  | Angular model output emits zoom value directly; React handler reads `e.zoom`. No change. |
| `Flip`                         | Local flip state                         | `{ horizontal, vertical }`                                                     | User events toggle values       | Angular uses signal model binding. No change.                                            |
| `CropPreview`                  | `getCroppedImage({ output: 'dataUrl' })` | Optional preview data URL                                                      | Async crop operation            | No behavior divergence.                                                                  |
| `InitialCrop`, `MinMaxSize`    | Literal crop constraints                 | Crop rect or numeric min/max props                                             | None                            | No behavior divergence.                                                                  |
| `Reset`                        | Cropper API                              | Zoom, rotate, flip, reset controls                                             | User events call API methods    | No behavior divergence.                                                                  |
| `Rotation`                     | Local rotation state                     | Number in degrees                                                              | User events add/subtract 90     | Angular display copy needed parity.                                                      |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Image Cropper'`; neither defines parameters, args, argTypes,
  tags, or decorators at the meta level.
- Decorator differences: React re-exports example functions directly. Angular wraps each standalone example with
  `moduleMetadata({ imports: [...] })` and a template render, matching local Angular story conventions.
- Per-story decorators / args / controls: No per-story args or controls. Angular had one extra `Controlled` export with
  no React equivalent.

## Styling

| Element       | React selector / class                                  | Angular selector / class                                      | Gap                                                                                                           | Fix                                                                        |
| ------------- | ------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Layout        | `.Layout`                                               | `.layout`, `:host`                                            | Angular grid layout was visually close but not the same flex column contract.                                 | Align `.layout` and `.root` to column flex with matching gaps/max-widths.  |
| Root          | `.Root`                                                 | `.root`, `[arkImageCropper]`, `[arkImageCropperRootProvider]` | Angular root mostly matched but missed explicit flex-column color contract.                                   | Add React-equivalent root display/color treatment.                         |
| Buttons       | `button.Root`, `button.Group`                           | `.toolbar button`                                             | Angular buttons missed React shared sizing, gap, hover, focus, disabled, icon sizing, and solid hover states. | Expand button styles to match shared React button module.                  |
| Icons         | `lucide-react` icons                                    | No local icon components                                      | Angular rendered punctuation/text where React rendered icons.                                                 | Add local Angular SVG icon components and wire them into control examples. |
| Data display  | `.DataDisplay`, `.DataItem`                             | `.data-display`, `.data-item`                                 | Angular wrapped the display and used grid items.                                                              | Match React flex display without wrapping and column item layout.          |
| Cropper parts | `.Viewport`, `.Image`, `.Selection`, `.Handle`, `.Grid` | data-scope selectors                                          | Visual contract was already aligned, with Angular using Zag's `nw/n/ne/...` handle positions.                 | Keep Angular handle selectors for actual emitted data attributes.          |

## Gap Matrix

| Area                | Gap                                     | React reference                                        | Angular location                                     | Fix                                                               |
| ------------------- | --------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------- |
| Story inventory     | Extra `Controlled` story                | `image-cropper.stories.tsx` has no `Controlled` export | `image-cropper.stories.ts`, `examples/controlled.ts` | Removed Storybook export/import and deleted the orphaned example. |
| Control icons       | Missing icons in multiple controls      | React examples import lucide icons                     | Angular examples                                     | Add `examples/icons.ts` and import needed icons.                  |
| Button visual state | Shared button styles not fully mirrored | `.storybook/modules/button.module.css`                 | `image-cropper-example-styles.ts`                    | Expand button CSS.                                                |
| Rotation copy       | Shows `deg` instead of degree symbol    | `Rotation` displays `rotation°`                        | `examples/rotation.ts`                               | Match React copy.                                                 |
| Flip/crop copy      | Longer or differently cased button copy | React `Horizontal`, `Vertical`, `Crop Image`           | Angular examples                                     | Match React visible copy.                                         |

## Implementation Plan

1. Remove Angular's `Controlled` story export and import from the Storybook file.
2. Delete the orphaned Angular `Controlled` example and update the image-cropper story smoke test list.
3. Add local image-cropper icon components matching the lucide icons used by React examples.
4. Import and render icons in control examples while preserving Angular signal/model patterns.
5. Align shared example styles for layout, buttons, icons, and event data display.
6. Run focused tests, typecheck, Storybook startup, and whitespace checks; record results here.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6214 --ci` reached Storybook ready at
      `http://localhost:6214/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries
      outside image-cropper and `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/image-cropper/image-cropper.spec.ts` passed, 1
      file / 12 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting: `bun prettier --write ...image-cropper files... docs/story-audit/image-cropper.md` passed.
- [x] Whitespace: `git diff --check` passed. Image-cropper scoped `git diff --check` passed. No-index checks for new
      `examples/icons.ts` and ignored `docs/story-audit/image-cropper.md` emitted no whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align image-cropper story with react parity`
