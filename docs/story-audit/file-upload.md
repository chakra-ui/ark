# File Upload Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/file-upload/file-upload.stories.ts`
- Angular examples: `packages/angular/file-upload/examples/`
- Angular styles: `packages/angular/file-upload/file-upload-example-styles.ts`
- React story: `packages/react/src/components/file-upload/file-upload.stories.tsx`
- React examples: `packages/react/src/components/file-upload/examples/`
- React styles: `.storybook/modules/file-upload.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/field.module.css`

## Summary
- Status: Aligned the Angular Storybook surface with the React story inventory and tightened example markup/styling parity.
- Highest-risk gaps: Full package typecheck is currently blocked by unrelated combobox worktree edits before file-upload-specific validation can complete.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| AcceptedFileTypes | Yes | Yes | Aligned order and visual fallback/error icon surface. |
| Basic | Yes | Yes | Aligned compact item styling and trigger/delete icon surface. |
| ClearTrigger | Yes | Yes | Aligned trigger icon and clear-trigger sizing. |
| DirectoryUpload | Yes | Yes | Aligned folder/file icon surface. |
| Dropzone | Yes | Yes | Angular uses `with-dropzone.ts` as the example file but exports the React story name. |
| ErrorHandling | Yes | Yes | Aligned accepted/rejected section icon surface and PDF fallback icon. |
| FormUsage | Yes | Yes | Angular uses native form submit handling instead of `react-hook-form`; same hidden input name and submit surface. |
| InitialFiles | Yes | Yes | Aligned default file payload text, name, and type. |
| MediaCapture | Yes | Yes | Aligned camera/file/delete icon surface. |
| PastingFiles | Yes | Yes | Angular uses `useFileUpload` and paste handler equivalent to React. |
| RejectedFiles | Yes | Yes | Aligned accepted/rejected section icon surface. |
| RootProvider | Yes | Yes | Aligned root-provider external clear button and dropzone example structure. |
| TransformFiles | Yes | Yes | Angular demonstrates async image compression with browser canvas APIs instead of React's `image-conversion` dependency. |
| WithField | Yes | Yes | Aligned field helper/error styling and dropzone item structure. |
| MaxFiles | No | Removed from story exports | Kept example file because the Angular spec imports it directly. |
| WithImagePreview | No | Removed from story exports | Kept example file because the Angular spec imports it directly. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| AcceptedFileTypes | Runtime files from file input/dropzone | Accepted `File[]`, rejected file rejections with `errors` | User-selected files | No change beyond Angular template syntax. |
| Basic | Runtime files | Accepted `File[]`, max 5 | User-selected files | No divergence. |
| ClearTrigger | Runtime files | Accepted `File[]`, max 5, PNG/JPEG accept filter | User-selected files | No divergence. |
| DirectoryUpload | Runtime directory files | Accepted `File[]` with optional `webkitRelativePath` | User-selected directory | No divergence. |
| Dropzone | Runtime files | Accepted `File[]`, max 5 | Drop/click selected files | Angular file remains named `with-dropzone.ts`; story export is `Dropzone`. |
| ErrorHandling | Runtime files and local `errorMessages` map | Accepted files and rejected file errors | User-selected files, validation errors | No divergence. |
| FormUsage | Native form and hidden input | Hidden input named `files` | Submit event prevented in Angular demo | React uses `react-hook-form`; Angular stays framework-idiomatic. |
| InitialFiles | Hard-coded `new File(...)` | One `README.md` text/plain file | Static initial file | Payload text aligned to React. |
| MediaCapture | Runtime capture files | Accepted `File[]`, capture environment | Device/browser capture | No divergence. |
| PastingFiles | `useFileUpload` plus clipboard data | Accepted image files, max 3 | Clipboard paste handler | No divergence. |
| RejectedFiles | Runtime files and `fileReject` event | Accepted/rejected groups, max 2 | User-selected files, console logging on reject | No divergence. |
| RootProvider | `useFileUpload` root provider | Accepted `File[]`, max 5 | External clear button | No divergence. |
| TransformFiles | Runtime files transformed by callback | Image `File[]`, max 5 | Async canvas compression | React uses `image-conversion`; Angular avoids undeclared dependency and uses browser APIs. |
| WithField | Runtime files inside field root | Accepted `File[]`, max 5 | User-selected files | No divergence. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / File Upload'` with no shared args, argTypes, tags, parameters, or decorators.
- Decorator differences: React re-exports example components directly. Angular uses `moduleMetadata` imports and render templates per story, matching neighboring Angular story conventions.
- Per-story decorators / args / controls: No story-specific args or controls in either stack. Angular story order now follows React.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkFileUpload]`, `[arkFileUploadRootProvider]` | Already aligned. | No change. |
| Trigger | `.Trigger` | `[arkFileUploadTrigger]` | Angular examples lacked icon children. | Added local SVG icon components and trigger sizing. |
| Clear trigger | `.ClearTrigger` | `[arkFileUploadClearTrigger]` | Angular padding was smaller. | Matched React padding and icon sizing. |
| Dropzone | `.Dropzone`, `.DropzoneIcon`, `.DropzoneContent` | `[arkFileUploadDropzone]`, `.dropzone-icon`, `.dropzone-content` | Angular used text placeholders for icons in several examples. | Added SVG icon components and matching icon dimensions. |
| Items | `.Item`, `.ItemCompact` | `[arkFileUploadItem]`, `.compact` | Basic lacked compact class and examples used text placeholders. | Added `compact` and preview/delete icons. |
| Sections | `.Section`, `.SectionTitle` | `.section`, `.section-title` | Angular lacked status icons. | Added status icon styles and markup. |
| Form button | `button.Root[data-variant='solid']` | `.demo-button[data-variant='solid']` | Angular submit/clear buttons were unstyled. | Added local demo button styling. |
| Field textarea/helper/error | `field.Textarea`, field helper/error classes | `.field-textarea`, `[arkFieldHelperText]`, `[arkFieldErrorText]` | Pasting textarea and field text styling was incomplete. | Added field-compatible local styles. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | Angular exposed `MaxFiles` and `WithImagePreview` without React counterparts. | `file-upload.stories.tsx` exports 14 stories. | `file-upload.stories.ts` | Removed those exports/imports from Storybook while keeping example files for specs. |
| Story order | Angular began with `Basic`; React begins with `AcceptedFileTypes`. | React export order. | `file-upload.stories.ts` | Reordered exports to match React. |
| Icons | Angular used text placeholders like `+`, `x`, `file`, `pdf`, `!`. | React Lucide icons in each example. | Angular examples | Added local SVG icon components and applied them throughout surfaced stories. |
| RootProvider | Angular used a trigger; React demonstrates dropzone plus external clear. | `examples/root-provider.tsx` | `examples/root-provider.ts` | Switched to dropzone, preview rows, size text, and styled clear button. |
| TransformFiles | Angular transform callback was a no-op. | `examples/transform-files.tsx` | `examples/transform-files.ts` | Added async canvas-based image compression with fallback to original file. |

## Implementation Plan
1. Compare React and Angular story inventories, example structures, data sources, and CSS modules.
2. Remove Angular-only story exports while preserving directly tested example files.
3. Add local Angular SVG icon components and apply them to surfaced file-upload examples.
4. Align Angular demo styles for triggers, clear trigger, item previews, status icons, buttons, field text, and textarea.
5. Verify with the file-upload spec, Storybook startup, typecheck attempt, and `git diff --check`.

## Deferred (component-level work)
- None.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6007` reached Storybook ready at `http://localhost:6007/`. Stopped after startup confirmation.
- [ ] Visual check of each story: Not performed with browser automation in this run.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci file-upload/file-upload.spec.ts` passed, 1 file and 22 tests.
- [ ] Angular package typecheck: `bun run --cwd packages/angular typecheck` failed before file-upload validation on unrelated `combobox/examples/highlight-matching-text.ts(2,39): Cannot find module '@ark-ui/angular/highlight'`.
- [x] Diff whitespace: `git diff --check` passed.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align file-upload story with react parity`
