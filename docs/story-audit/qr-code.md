# QR Code Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/qr-code/qr-code.stories.ts`
- Angular examples: `packages/angular/src/qr-code/examples/*.ts`
- Angular styles: `packages/angular/src/qr-code/qr-code-example-styles.ts`
- React story: `packages/react/src/components/qr-code/qr-code.stories.tsx`
- React examples: `packages/react/src/components/qr-code/examples/*.tsx`
- React styles: `.storybook/modules/qr-code.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/radio-group.module.css`

## Summary

- Status: Story inventory already matches React; focused fixes align visible copy, root-provider layout, and demo
  styling.
- Highest-risk gaps: QR sizing styles must preserve Angular's generated `--qrcode-*` custom properties while matching
  React's 100px demo surface.

## Story Inventory

| Story name      | React | Angular | Notes                                                              |
| --------------- | ----- | ------- | ------------------------------------------------------------------ |
| Basic           | Yes   | Yes     | Same order and default value.                                      |
| Controlled      | Yes   | Yes     | Same value update behavior; Angular button copy needed parity.     |
| Download        | Yes   | Yes     | Same file name and MIME type.                                      |
| ErrorCorrection | Yes   | Yes     | Same four ECC levels and horizontal radio layout.                  |
| Fill            | Yes   | Yes     | Same two fill colors.                                              |
| Overlay         | Yes   | Yes     | Same high ECC setting and Ark UI logo image.                       |
| RootProvider    | Yes   | Yes     | Same provider pattern; Angular layout needed stack wrapper parity. |

## Example Data Sources

| Example         | Data origin              | Shape                                        | Dynamic/async                      | Divergence                                                                                              |
| --------------- | ------------------------ | -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Basic           | Hard-coded default value | URL string `http://ark-ui.com`               | None                               | No change.                                                                                              |
| Controlled      | Local component state    | URL string; button sets Chakra UI URL        | User click updates state           | Button text differed before fix.                                                                        |
| Download        | Hard-coded props         | PNG filename and MIME type                   | Download trigger interaction       | No change.                                                                                              |
| ErrorCorrection | Local array              | `['L', 'M', 'Q', 'H']`                       | User radio change updates encoding | Angular uses native radios instead of React RadioGroup primitive; acceptable story-surface translation. |
| Fill            | Local array              | Two hex colors, mapped to QR frame fill      | None                               | No change.                                                                                              |
| Overlay         | Hard-coded image         | `https://ark-ui.com/icon-192.png`, alt text  | External image load                | No change.                                                                                              |
| RootProvider    | `useQrCode` state        | URL string `http://ark-ui.com`; output value | None                               | Angular output reads `qrCode.api().value`; framework-idiomatic equivalent to React `qrCode.value`.      |

## Sections / Structure

- Meta differences: Both stories only set `title: 'Components / QR Code'`.
- Decorator differences: React re-exports example components directly; Angular uses per-story `moduleMetadata` imports
  and render templates, matching local Storybook patterns.
- Per-story decorators / args / controls: Neither side defines story args, controls, decorators beyond Angular import
  metadata, or extra parameters.

## Styling

| Element     | React selector / class       | Angular selector / class                   | Gap                                                                                                              | Fix                                                                                         |
| ----------- | ---------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Root        | `qr-code.module.css` `.Root` | `[data-scope='qr-code'][data-part='root']` | Angular root used generated width/height only and missed React color/layout variables.                           | Add React root layout, color, and 100px demo size while preserving generated fallback vars. |
| Frame       | `.Frame`                     | `[data-part='frame']`                      | Angular used generated dimensions and inherited fill without setting neutral foreground.                         | Add React frame size/fill using QR demo size.                                               |
| Pattern     | `.Pattern`                   | `[data-part='pattern']`                    | Already equivalent.                                                                                              | No change.                                                                                  |
| Overlay     | `.Overlay`                   | `[data-part='overlay']`                    | Angular used fixed 32px, white background, 4px radius; React uses computed one-third size and popover token.     | Use `--qr-code-overlay-size`, `var(--demo-bg-popover)`, and `0.25rem` radius/padding.       |
| Button      | `button.module.css` `.Root`  | `.button`                                  | Angular button surface was close but missed gap, user-select, disabled, aria-expanded, and focus offset details. | Expand `.button` to mirror shared React button module.                                      |
| Radio group | `radio-group.module.css`     | `.radio-*` native controls                 | Native Angular translation already matched layout; focus/checked styling retained.                               | Keep native controls, align sizing and text tokens.                                         |

## Gap Matrix

| Area                | Gap                                                                     | React reference                                                                     | Angular location                                         | Fix                                                         |
| ------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| Controlled copy     | Button text was `Set value`.                                            | `Set to chakra-ui.com` in `controlled.tsx`.                                         | `packages/angular/src/qr-code/examples/controlled.ts`    | Update button label.                                        |
| RootProvider layout | React wraps provider and output in `.stack`.                            | `root-provider.tsx`                                                                 | `packages/angular/src/qr-code/examples/root-provider.ts` | Add `.stack` wrapper around provider and output.            |
| QR styling          | Angular sizing/background tokens diverged from React module.            | `.storybook/modules/qr-code.module.css`                                             | `qr-code-example-styles.ts`                              | Translate React selectors to Angular data attributes.       |
| Shared controls     | Button/radio states were slightly less complete than React CSS modules. | `.storybook/modules/button.module.css`, `.storybook/modules/radio-group.module.css` | `qr-code-example-styles.ts`                              | Align hover, focus, disabled, sizing, gap, and text styles. |

## Implementation Plan

1. Update the controlled story button text to match React.
2. Wrap the root-provider example in `.stack` to match React's structure.
3. Update QR demo styles to mirror React's QR module while preserving Angular generated custom properties.
4. Expand button and native radio styles to match the React shared control modules.
5. Run QR-specific tests, typecheck, Storybook startup, formatting/whitespace checks, and record results.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6241 --ci` reached Storybook ready at
      `http://localhost:6241/`; stopped after startup. Existing unused TypeScript compilation and `DefinePlugin`
      warnings only.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/qr-code/qr-code.spec.ts` passed, 1 file / 7
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --write docs/story-audit/qr-code.md packages/angular/src/qr-code/examples/controlled.ts packages/angular/src/qr-code/examples/root-provider.ts packages/angular/src/qr-code/qr-code-example-styles.ts`
      passed.
- [x] Whitespace: `git diff --check` passed; ignored audit doc no-index whitespace check emitted no warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align qr-code story with react parity`
