# Clipboard Angular Parity Audit

## Scope
- Angular files: `packages/angular/clipboard/**`
- React files: `packages/react/src/components/clipboard/**`
- Storybook/style files: `packages/angular/clipboard/clipboard.stories.ts`, `packages/angular/clipboard/clipboard-example-styles.ts`, `.storybook/modules/clipboard.module.css`

## Summary
- Status: Fixed story/API/demo parity gaps for the Angular clipboard component.
- Highest-risk gaps: Angular did not expose a context template directive equivalent to React `Clipboard.Context`, was missing four React reference stories, and its Storybook styling diverged from the React clipboard CSS module.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | No Angular template directive equivalent for `Clipboard.Context`. | `packages/react/src/components/clipboard/clipboard-context.tsx`, `packages/react/src/components/clipboard/examples/context.tsx` | `packages/angular/clipboard/public-api.ts` | Added `ArkClipboardContext` and `ClipboardContextTemplate`, exported through the clipboard public API. |
| Public API parity | Indicator state was not directly readable from the exported directive, making copied/custom indicator templates clumsy. | `Clipboard.Indicator copied={<CheckIcon />}` in React examples | `packages/angular/clipboard/clipboard-indicator.ts` | Added a `copied` signal on `ArkClipboardIndicator` while keeping Zag indicator props as the source of DOM state. |
| Story parity | Missing `Context`, `CopyStatus`, `Timeout`, and `ValueText` stories. | `packages/react/src/components/clipboard/clipboard.stories.tsx` and matching `examples/*.tsx` | `packages/angular/clipboard/clipboard.stories.ts`, `packages/angular/clipboard/examples/` | Added Angular examples and story exports for the missing stories. |
| Story/demo parity | Existing Angular examples used plain text where React shows copy/check icons and did not include controlled/root-provider auxiliary UI. | React `basic`, `controlled`, `root-provider`, `timeout`, `value-text`, `copy-status` examples | `packages/angular/clipboard/examples/*.ts` | Added clipboard icon components and updated examples to mirror visible React states. |
| Styling parity | Angular demo styles framed the whole control and used different padding/borders/focus treatment from React CSS. | `.storybook/modules/clipboard.module.css` | `packages/angular/clipboard/clipboard-example-styles.ts` | Updated selectors, spacing, trigger/input borders, hover/focus/disabled states, value text, and stack/button helpers to match the React module more closely. |
| Test parity | Angular tests covered core copy behavior but not the newly matched stories/context API. | `packages/react/src/components/clipboard/tests/clipboard.test.tsx` | `packages/angular/clipboard/clipboard.spec.ts` | Added public-surface smoke coverage plus story-level tests for context, copy status, timeout, and value text. |

## Implementation Plan
1. Add an Angular `arkClipboardContext` template directive that exposes the clipboard API signal using the same context-template pattern as other Angular components.
2. Export the context directive/template type and expose copied state from `ArkClipboardIndicator` for ergonomic copied/custom indicator templates.
3. Add the missing React-parity Storybook examples and wire them into `clipboard.stories.ts`.
4. Align Angular clipboard example styles with the React clipboard CSS module.
5. Expand clipboard specs around the new public API and story parity.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. The command emitted existing ng-packagr export-condition warnings.
- [x] Component tests: `bun run --cwd packages/angular test:ci clipboard/clipboard.spec.ts` passed, 16 tests.
- [ ] Storybook render: Attempted `bun run --cwd packages/angular storybook`; the noninteractive run terminated immediately with SIGTERM before a boot banner.
- [ ] Manual/visual checks: Not run; style changes were source-compared against `.storybook/modules/clipboard.module.css`.

## Commit
- Hash: Recorded in final status after commit.
- Message: `fix(angular): align clipboard with react parity`
