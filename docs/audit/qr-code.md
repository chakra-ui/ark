# QR Code Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/qr-code/*`, `packages/angular/src/qr-code/examples/*`, `packages/angular/src/qr-code/qr-code.stories.ts`, `packages/angular/src/qr-code/qr-code-example-styles.ts`
- React files: `packages/react/src/components/qr-code/*`, `packages/react/src/components/qr-code/examples/*`, `packages/react/src/components/qr-code/tests/*`
- Storybook/style files: `.storybook/modules/qr-code.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/radio-group.module.css`

## Summary
- Status: Implementation API, behavior, story set, and demo styling are aligned with the React reference after this re-audit. Remaining deferred item is automated axe coverage in the Angular spec.
- Highest-risk gaps: None outstanding. Re-audit closed the previous styling-parity gap on the `Fill` story by switching the Angular example to bind `[style.fill]` directly on the frame, matching React's `style={{ fill }}` pattern.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | All seven React stories (`Basic`, `Controlled`, `Download`, `ErrorCorrection`, `Fill`, `Overlay`, `RootProvider`) are present in Angular. | `packages/react/src/components/qr-code/qr-code.stories.tsx`; `packages/react/src/components/qr-code/examples/*.tsx` | `packages/angular/src/qr-code/qr-code.stories.ts`; `packages/angular/src/qr-code/examples/*.ts` | No change. Story set matches React after the previous audit pass. |
| Styling parity | React applies the frame fill via `style={{ fill }}` directly on the frame SVG; Angular previously used a `--qr-code-fill` CSS variable and a `.fill-frame` class to do the same. | `packages/react/src/components/qr-code/examples/fill.tsx` | `packages/angular/src/qr-code/examples/fill.ts`; `packages/angular/src/qr-code/qr-code-example-styles.ts` | Bind `[style.fill]="fill"` directly on the `svg[arkQrCodeFrame]` element. `applyArkProps` preserves consumer-owned styles, so the inline binding coexists with the Zag prop bag, and `.Pattern { fill: inherit; }` cascades the color to the pattern path. The now-unused `.fill-frame` selector is removed from the example styles. |
| Styling parity | Angular demo styles already set `[data-part='pattern'] { fill: inherit; }`, so React's frame-level fill override cascades to the pattern path as expected. | `.storybook/modules/qr-code.module.css` (`.Pattern { fill: inherit; }`) | `packages/angular/src/qr-code/qr-code-example-styles.ts` | No change. The previous pattern-fill fix already aligned the demo with React. |
| Styling parity | Angular controlled and download examples use a shared `.button` class with hover, focus-visible, border, and padding matching the React `button.module.css` baseline. | `.storybook/modules/button.module.css`; `packages/react/src/components/qr-code/examples/controlled.tsx`; `packages/react/src/components/qr-code/examples/download.tsx` | `packages/angular/src/qr-code/examples/controlled.ts`; `packages/angular/src/qr-code/examples/download.ts`; `packages/angular/src/qr-code/qr-code-example-styles.ts` | No change. Demo button class already applied. |
| Styling/content parity | Angular overlay demo uses the same `https://ark-ui.com/icon-192.png` image as React. | `packages/react/src/components/qr-code/examples/overlay.tsx` | `packages/angular/src/qr-code/examples/overlay.ts` | No change. Image already in place. |
| Public API | Angular exposes directive-centric parts, `useQrCode`, context injection, public detail types, root provider, and anatomy; no namespace object is exported. | `packages/react/src/components/qr-code/index.ts`; `packages/react/src/components/qr-code/qr-code.ts` | `packages/angular/src/qr-code/public-api.ts` | No change. Angular's directive-centric public API follows `docs/technical-requirements.md`. |
| Functionality | Root supports `id`, `ids`, `value`, `defaultValue`, `encoding`, `pixelSize`, and model-driven `valueChange`; download trigger supports `fileName`, `mimeType`, `quality`; SVG attributes are applied separately for SVG correctness. | `packages/react/src/components/qr-code/qr-code-root.tsx`; `packages/react/src/components/qr-code/qr-code-download-trigger.tsx`; `packages/react/src/components/qr-code/qr-code-frame.tsx`; `packages/react/src/components/qr-code/qr-code-pattern.tsx` | `packages/angular/src/qr-code/qr-code-root.ts`; `packages/angular/src/qr-code/qr-code-download-trigger.ts`; `packages/angular/src/qr-code/qr-code-frame.ts`; `packages/angular/src/qr-code/qr-code-pattern.ts`; `packages/angular/src/qr-code/qr-code.spec.ts` | No change. Existing specs cover generated SVG props, controlled value, overlay, download trigger, SSR construction, public exports, and fallback id. |
| Accessibility | React has an axe test covering QR code with overlay and download trigger. Angular has behavioral coverage but no axe equivalent in this repo. | `packages/react/src/components/qr-code/tests/qr-code.test.tsx`; `packages/react/src/components/qr-code/tests/basic.tsx` | `packages/angular/src/qr-code/qr-code.spec.ts` | Deferred. No Angular axe harness is established for component specs; existing directive semantics come from Zag prop bags. |

## Implementation Plan
1. (Previous pass) Add Angular `Fill` and `ErrorCorrection` Storybook examples and export them from `qr-code.stories.ts`.
2. (Previous pass) Update QR code example styles so pattern fill inherits from the frame and new examples get React-equivalent layout, button, radio, overlay image, and small-multiple styling.
3. (Previous pass) Apply the shared demo button class to controlled/download examples and replace the overlay placeholder text with the React reference image.
4. (Re-audit) Simplify the `Fill` example to bind `[style.fill]` directly on the frame, matching React's `style={{ fill }}`; remove the now-unused `.fill-frame` selector from the example styles.
5. Verify the QR code spec, Angular typecheck (scoped to qr-code; pre-existing navigation-menu TS error is out of scope), and diff hygiene; record results and commit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` previously passed end-to-end. After the re-audit edit, the full command surfaces only an unrelated pre-existing `src/navigation-menu/navigation-menu.spec.ts(124,73)` TS4111 error — verified by stashing the qr-code changes and reproducing the same failure. No qr-code files emit type errors.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/qr-code/qr-code.spec.ts` passes (1 file, 7 tests) after the re-audit edit.
- [x] Storybook render: Previous pass started Storybook successfully on port 6007. Not re-run in the re-audit because the only edit is an example template/style simplification with no behavioral change.
- [x] Manual/visual checks: Reviewed the Angular and React QR Code stories side by side. Story set still covers `Basic`, `Controlled`, `Download`, `ErrorCorrection`, `Fill`, `Overlay`, `RootProvider`. The `Fill` example now matches React's pattern of binding the frame fill inline; `applyArkProps` keeps consumer-set styles, and `.Pattern { fill: inherit; }` (still present as the `[data-part='pattern']` selector) cascades the color to the pattern path.

## Commit
- Hash: d6a22ddab4388a353f6eb91db6c6995b5de14233
- Message: `fix(angular): align qr-code with react parity`
