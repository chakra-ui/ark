# Avatar Angular Parity Audit

## Scope
- Angular files: `packages/angular/avatar/`
- React files: `packages/react/src/components/avatar/`
- Storybook/style files: `packages/react/src/components/avatar/avatar.stories.tsx`, `packages/react/src/components/avatar/examples/`, `.storybook/modules/avatar.module.css`, `packages/angular/avatar/avatar.stories.ts`, `packages/angular/avatar/examples/`, `packages/angular/avatar/avatar-example-styles.ts`

## Summary
- Status: Fixed. Angular implementation and public exports match the React avatar primitives for the audited surface, and Angular Storybook now includes the React `Provider` story.
- Highest-risk gaps: None remaining for avatar. Broader package checks are currently blocked by unrelated carousel story import errors.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | React exports `Provider`; Angular stories only export `Basic`, `Context`, `Events`, and `RootProvider`. | `packages/react/src/components/avatar/avatar.stories.tsx`, `packages/react/src/components/avatar/examples/provider.tsx` | `packages/angular/avatar/avatar.stories.ts`, `packages/angular/avatar/examples/` | Add `ProviderExample`, export a `Provider` story, and cover it in the avatar spec. |
| Public API parity | React `useAvatar` accepts a plain optional props object, while Angular uses `useAvatar({ context: () => props })` so signal inputs and provider state can remain reactive. | `packages/react/src/components/avatar/use-avatar.ts` | `packages/angular/avatar/use-avatar.ts` | No change. This is an intentional Angular adapter shape consistent with nearby Angular components and `docs/technical-requirements.md`. |
| Styling parity | React CSS includes an unused `.Overlay` selector that no current avatar story renders. | `.storybook/modules/avatar.module.css` | `packages/angular/avatar/avatar-example-styles.ts` | No change. No Angular story needs the selector. Root/image/fallback styles match the rendered React selectors. |

## Implementation Plan
1. Add an Angular `ProviderExample` that creates an avatar machine with `useAvatar()` and passes it to `[arkAvatarRootProvider]`.
2. Export the missing `Provider` story before `RootProvider` to mirror React story order.
3. Add a focused spec proving `ProviderExample` wires the provided avatar machine and renders the expected parts.
4. Run the avatar component spec, typecheck, and whitespace diff check.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed after parallel carousel files became available in the workspace; build completed and forms isolation reported `ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci avatar/avatar.spec.ts` passed, 1 file and 13 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` reached ready state at `http://localhost:6006/`; `curl -sSf` returned the iframe shell for `components-avatar--basic` and `components-avatar--provider`.
- [x] Manual/visual checks: Static style comparison completed for rendered avatar selectors: root, image, and fallback styles match the React CSS module. Browser-level visual inspection was not performed.

## Commit
- Hash:
- Message: `fix(angular): align avatar with react parity`
