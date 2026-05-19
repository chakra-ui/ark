# Clipboard Angular Parity Audit

## Scope
- Angular files: `packages/angular/clipboard/**`
- React files: `packages/react/src/components/clipboard/**`
- Storybook/style files: `packages/angular/clipboard/clipboard.stories.ts`, `packages/angular/clipboard/clipboard-example-styles.ts`, `.storybook/modules/clipboard.module.css`

## Summary
- Status: Re-audit closed remaining story-surface and demo-style drift; Angular clipboard is now at parity with the React reference.
- Highest-risk gaps closed previously: missing `Clipboard.Context` template directive, missing `Context`/`CopyStatus`/`Timeout`/`ValueText` stories, and demo-style drift against `.storybook/modules/clipboard.module.css`.
- Highest-risk gaps closed in this re-audit: extra Angular-only `WithTrigger` story diverged from the React story surface, and `[arkClipboardValueText]` was forced to `display: inline-flex` (React `.ValueText` is text-only with no flex layout).

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | No Angular template directive equivalent for `Clipboard.Context`. | `packages/react/src/components/clipboard/clipboard-context.tsx`, `packages/react/src/components/clipboard/examples/context.tsx` | `packages/angular/clipboard/public-api.ts` | `ArkClipboardContext` + `ClipboardContextTemplate` were added in the prior audit and remain exported. No change. |
| Public API parity | Indicator state needed for ergonomic copied/custom indicator templates. | `Clipboard.Indicator copied={<CheckIcon />}` in React examples | `packages/angular/clipboard/clipboard-indicator.ts` | `copied` signal on `ArkClipboardIndicator` exists; Zag indicator props remain the source of DOM state. No change. |
| Story parity | Angular had an extra `WithTrigger` story not present in React, so the story surface diverged. | `packages/react/src/components/clipboard/clipboard.stories.tsx` (Basic, Context, Controlled, CopyStatus, Timeout, RootProvider, ValueText only). | `packages/angular/clipboard/clipboard.stories.ts`, `packages/angular/clipboard/examples/with-trigger.ts` | Removed the `WithTrigger` story export, deleted the orphan example file, and removed its dedicated spec test. The story import/export order now matches the React file. |
| Story parity | Missing `Context`, `CopyStatus`, `Timeout`, `ValueText` stories. | `packages/react/src/components/clipboard/clipboard.stories.tsx` and matching `examples/*.tsx` | `packages/angular/clipboard/clipboard.stories.ts`, `packages/angular/clipboard/examples/` | Stories were added in the prior audit and remain wired. No change. |
| Story/demo parity | Existing Angular examples used plain text where React shows copy/check icons. | React `basic`, `controlled`, `root-provider`, `timeout`, `value-text`, `copy-status` examples | `packages/angular/clipboard/examples/*.ts` | Icon components and visible state were added in the prior audit. No change. |
| Styling parity | `[arkClipboardValueText]` was grouped with `[arkClipboardIndicator]` and inherited `display: inline-flex` / `align-items` / `justify-content`, but React `.ValueText` is plain inline text with only `font-size`, `line-height`, and `color`. | `.storybook/modules/clipboard.module.css` `.Indicator` vs `.ValueText` blocks | `packages/angular/clipboard/clipboard-example-styles.ts` | Split the selector so only `[arkClipboardIndicator]` receives the inline-flex layout. `[arkClipboardValueText]` keeps font/line-height/color only. |
| Test parity | React `tests/clipboard.test.tsx` covers a11y + copy via `navigator.clipboard.writeText`. Angular `clipboard.spec.ts` already covers public surface, copy-via-trigger, copied indicator state, value-text, SSR safety, forms isolation, missing-provider error, and every story example. | `packages/react/src/components/clipboard/tests/clipboard.test.tsx` | `packages/angular/clipboard/clipboard.spec.ts` | Removed the dedicated `ClipboardWithTriggerExample` test (the asset was deleted alongside the extra story). All remaining behavior coverage is retained. |

## Implementation Plan
1. Re-read the React stories file and confirm story names are `Basic`, `Context`, `Controlled`, `CopyStatus`, `Timeout`, `RootProvider`, `ValueText`.
2. Remove the Angular-only `WithTrigger` story export from `clipboard.stories.ts`.
3. Delete the orphan `examples/with-trigger.ts` and drop its import + dedicated test from `clipboard.spec.ts`.
4. Split the `[arkClipboardIndicator], [arkClipboardValueText]` selector group so `[arkClipboardValueText]` is no longer rendered as inline-flex.
5. Run the Angular clipboard spec and the Angular `tsc` projects to verify.

## Verification
- [x] Typecheck (project tsconfigs): `bunx tsc -p tsconfig.json --noEmit` and `bunx tsc -p tsconfig.spec.json --noEmit` from `packages/angular` both passed with no output.
- [ ] Full package typecheck: `bun run --cwd packages/angular typecheck` fails at the `avatar` ng-packagr entry-point with pre-existing `TS6059` errors about `src/providers/environment` / `src/providers/locale` not being under `rootDir`. This is a repo-wide ng-packagr infra issue unrelated to clipboard; the previous audit also could not run the full build successfully.
- [x] Component tests: `bun run --cwd packages/angular test:ci clipboard/clipboard.spec.ts` — 15 tests passed.
- [ ] Storybook render: Not attempted in this re-audit. Storybook startup is non-interactive in this environment; previous audit recorded an immediate SIGTERM. Style and story changes were source-compared against `.storybook/modules/clipboard.module.css` and `packages/react/src/components/clipboard/clipboard.stories.tsx`.
- [ ] Manual/visual checks: Not run; style diff verified by reading the React module CSS and the Angular example styles side by side.

## Commit
- Hash: Recorded in final status after commit.
- Message: `fix(angular): align clipboard with react parity`
