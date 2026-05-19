# QR Code Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/qr-code/*`, `packages/angular/src/qr-code/examples/*`, `packages/angular/src/qr-code/qr-code.stories.ts`, `packages/angular/src/qr-code/qr-code-example-styles.ts`
- React files: `packages/react/src/components/qr-code/*`, `packages/react/src/components/qr-code/examples/*`, `packages/react/src/components/qr-code/tests/*`
- Storybook/style files: `.storybook/modules/qr-code.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/radio-group.module.css`

## Summary
- Status: Implementation API and behavior are largely aligned; Angular Storybook coverage and demo styling trail the React reference.
- Highest-risk gaps: Angular omits the `ErrorCorrection` and `Fill` stories, and its QR pattern demo style forces `currentColor`, preventing React's frame-level fill customization from working.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `ErrorCorrection` story for changing `encoding.ecc`. | `packages/react/src/components/qr-code/qr-code.stories.tsx`; `packages/react/src/components/qr-code/examples/error-correction.tsx` | `packages/angular/src/qr-code/qr-code.stories.ts`; `packages/angular/src/qr-code/examples/` | Add an Angular `ErrorCorrection` example and story. Use native radio controls because Angular does not yet ship `radio-group`. |
| Story parity | Missing `Fill` story for frame-level SVG fill overrides. | `packages/react/src/components/qr-code/examples/fill.tsx` | `packages/angular/src/qr-code/qr-code.stories.ts`; `packages/angular/src/qr-code/examples/` | Add an Angular `Fill` example and story. |
| Styling parity | Angular pattern demo style uses `fill: currentColor`, so a frame `style.fill` override does not cascade like React's `.Pattern { fill: inherit; }`. | `.storybook/modules/qr-code.module.css` | `packages/angular/src/qr-code/qr-code-example-styles.ts` | Change pattern fill to inherit and add focused layout/button/radio/image styles used by the new examples. |
| Styling parity | Angular download trigger and controlled button use browser-default button styling while React applies shared button styles. | `packages/react/src/components/qr-code/examples/download.tsx`; `.storybook/modules/button.module.css`; `.storybook/modules/qr-code.module.css` | `packages/angular/src/qr-code/examples/download.ts`; `packages/angular/src/qr-code/examples/controlled.ts`; `packages/angular/src/qr-code/qr-code-example-styles.ts` | Add demo button classes and apply them in affected Angular examples. |
| Styling/content parity | Angular overlay demo uses text instead of the reference logo image. | `packages/react/src/components/qr-code/examples/overlay.tsx` | `packages/angular/src/qr-code/examples/overlay.ts` | Use the same image content and add image sizing styles. |
| Public API | Angular exposes directive-centric parts, `useQrCode`, context injection, public detail types, root provider, and anatomy; no namespace object is exported. | `packages/react/src/components/qr-code/index.ts`; `packages/react/src/components/qr-code/qr-code.ts` | `packages/angular/src/qr-code/public-api.ts` | No change. Angular's directive-centric public API follows `docs/technical-requirements.md`. |
| Functionality | Root supports `id`, `ids`, `value`, `defaultValue`, `encoding`, `pixelSize`, and model-driven `valueChange`; download trigger supports `fileName`, `mimeType`, `quality`; SVG attributes are applied separately for SVG correctness. | `packages/react/src/components/qr-code/qr-code-root.tsx`; `packages/react/src/components/qr-code/qr-code-download-trigger.tsx`; `packages/react/src/components/qr-code/qr-code-frame.tsx`; `packages/react/src/components/qr-code/qr-code-pattern.tsx` | `packages/angular/src/qr-code/qr-code-root.ts`; `packages/angular/src/qr-code/qr-code-download-trigger.ts`; `packages/angular/src/qr-code/qr-code-frame.ts`; `packages/angular/src/qr-code/qr-code-pattern.ts`; `packages/angular/src/qr-code/qr-code.spec.ts` | No change. Existing specs cover generated SVG props, controlled value, overlay, download trigger, SSR construction, public exports, and fallback id. |
| Accessibility | React has an axe test covering QR code with overlay and download trigger. Angular has behavioral coverage but no axe equivalent in this repo. | `packages/react/src/components/qr-code/tests/qr-code.test.tsx`; `packages/react/src/components/qr-code/tests/basic.tsx` | `packages/angular/src/qr-code/qr-code.spec.ts` | Deferred. No Angular axe harness is established for component specs; existing directive semantics come from Zag prop bags. |

## Implementation Plan
1. Add Angular `Fill` and `ErrorCorrection` Storybook examples and export them from `qr-code.stories.ts`.
2. Update QR code example styles so pattern fill inherits from the frame and new examples get React-equivalent layout, button, radio, overlay image, and small-multiple styling.
3. Apply the shared demo button class to controlled/download examples and replace the overlay placeholder text with the React reference image.
4. Verify the QR code spec, Angular typecheck, and diff hygiene; record results and commit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed, including package build and forms isolation.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/qr-code/qr-code.spec.ts` passed (1 file, 7 tests).
- [x] Storybook render: `bun run --cwd packages/angular storybook` first prompted because port 6006 was occupied. Retried with `bun run --cwd packages/angular storybook -- --port 6007`; after a cache-related failure outside qr-code on the first retry, the second explicit-port run compiled and reported `Storybook ready` at `http://localhost:6007/`.
- [x] Manual/visual checks: Reviewed the Angular and React QR Code stories/source side by side. Angular now exposes `Basic`, `Controlled`, `Download`, `ErrorCorrection`, `Fill`, `Overlay`, and `RootProvider`; the pattern fill now inherits from the frame for the fill story, the overlay uses the same logo image content, and button/radio styling matches the React demo intent.

## Commit
- Hash:
- Message: `fix(angular): align qr-code story parity`
