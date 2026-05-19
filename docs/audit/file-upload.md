# File Upload Angular Parity Audit

## Scope
- Angular files: `packages/angular/file-upload/`
- React files: `packages/react/src/components/file-upload/`
- Storybook/style files: `packages/angular/file-upload/file-upload.stories.ts`, `packages/angular/file-upload/file-upload-example-styles.ts`, `.storybook/modules/file-upload.module.css`

## Summary
- Status: Fixed implementation, accessibility, Storybook, and demo styling gaps found during the audit.
- Highest-risk gaps: hidden input field descriptions were not applied; item name/size parts rendered empty when consumers supplied no content; unmatched item previews remained visible; Angular lacked the `acceptedFiles` model channel expected by the package technical requirements; Angular Storybook covered only 5 of React's 14 reference stories.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | `acceptedFiles` was an input only, so consumers could not use `[(acceptedFiles)]` for controlled selection. | `packages/react/src/components/file-upload/file-upload-root.tsx`, `packages/react/src/components/file-upload/use-file-upload.ts` | `packages/angular/file-upload/file-upload-root.ts` | Converted `acceptedFiles` to a `model()` channel and update it from `onFileChange`. |
| Accessibility parity | Field helper/error text IDs were not mirrored onto the hidden file input. | `packages/react/src/components/file-upload/file-upload-hidden-input.tsx`, `packages/react/src/components/file-upload/tests/file-upload.test.tsx` | `packages/angular/file-upload/file-upload-hidden-input.ts` | Merged `ARK_FIELD_CONTEXT.ariaDescribedby()` into hidden input props. |
| Functionality parity | Empty item-name and item-size-text parts stayed empty instead of rendering file name and formatted size. | `packages/react/src/components/file-upload/file-upload-item-name.tsx`, `packages/react/src/components/file-upload/file-upload-item-size-text.tsx` | `packages/angular/file-upload/file-upload-item-name.ts`, `packages/angular/file-upload/file-upload-item-size-text.ts` | Added default host text while preserving consumer-authored content. |
| Functionality parity | Non-matching item previews stayed visible unless every template manually checked `matches()`. | `packages/react/src/components/file-upload/file-upload-item-preview.tsx` | `packages/angular/file-upload/file-upload-item-preview.ts` | Added `hidden` for previews whose `type` does not match the current file MIME type. |
| Story parity | Missing React reference stories: `AcceptedFileTypes`, `ClearTrigger`, `DirectoryUpload`, `ErrorHandling`, `FormUsage`, `InitialFiles`, `MediaCapture`, `PastingFiles`, `RejectedFiles`, `TransformFiles`, `WithField`. | `packages/react/src/components/file-upload/file-upload.stories.tsx`, `packages/react/src/components/file-upload/examples/` | `packages/angular/file-upload/file-upload.stories.ts`, `packages/angular/file-upload/examples/` | Added Angular examples and story exports; retained existing `MaxFiles` as an Angular-only extra. |
| Styling parity | Angular demo CSS was much simpler than the React CSS module and missed dropzone, item, rejected, action, section, focus, disabled, and error states. | `.storybook/modules/file-upload.module.css` | `packages/angular/file-upload/file-upload-example-styles.ts` | Expanded attribute-selector styles to match React demo layout and states. |
| Test parity | Angular specs did not cover default item text, hidden preview behavior, `acceptedFiles` two-way binding, field descriptions, or the added stories. | `packages/react/src/components/file-upload/tests/file-upload.test.tsx` | `packages/angular/file-upload/file-upload.spec.ts` | Added focused specs for the fixed behavior and Storybook example compilation. |

## Implementation Plan
1. Align the Angular root/control surface with React and Angular package conventions.
2. Patch hidden input and item part behavior without changing directive names or Zag integration.
3. Add missing Angular Storybook examples and update example styling against the React CSS module.
4. Extend component specs for the parity fixes and compile coverage.
5. Run focused verification and record results.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed, including production build and `check:forms-isolation`.
- [x] Component tests: `bun run --cwd packages/angular test:ci file-upload/file-upload.spec.ts` passed: 22 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` reached "Storybook ready!" at `http://localhost:6006/`; existing unused-compilation and `process.env.NODE_ENV` warnings were emitted.
- [x] Manual/visual checks: Compared Angular examples/styles against React `file-upload.stories.tsx`, React examples, and `.storybook/modules/file-upload.module.css`; no browser screenshot pass was run.

## Commit
- Hash: recorded in final status
- Message: `fix(angular): align file-upload with react parity`
