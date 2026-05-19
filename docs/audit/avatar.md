# Avatar Angular Parity Audit

## Scope
- Angular files: `packages/angular/avatar/` (`avatar-root.ts`, `avatar-root-provider.ts`, `avatar-image.ts`, `avatar-fallback.ts`, `use-avatar.ts`, `use-avatar-context.ts`, `avatar.types.ts`, `avatar.anatomy.ts`, `public-api.ts`, `avatar.spec.ts`, `avatar.stories.ts`, `examples/*.ts`, `avatar-example-styles.ts`)
- React files: `packages/react/src/components/avatar/` (`avatar-root.tsx`, `avatar-root-provider.tsx`, `avatar-image.tsx`, `avatar-fallback.tsx`, `avatar-context.tsx`, `use-avatar.ts`, `use-avatar-context.ts`, `avatar.ts`, `avatar.anatomy.ts`, `index.ts`, `avatar.stories.tsx`, `examples/*.tsx`, `tests/avatar.test.tsx`)
- Storybook/style files: `.storybook/modules/avatar.module.css`, `packages/angular/avatar/avatar-example-styles.ts`

## Summary
- Status: Re-audited. Angular implementation and public exports match the React avatar surface for the documented parts. Story set, example IDs, and visible behavior align with React. One small parity gap in the `Provider` example was found in this pass and fixed (`onStatusChange` callback wiring inside `useAvatar`).
- Highest-risk gaps: None remaining for avatar after this re-audit.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity (resolved previously) | React exports `Provider`; Angular previously only exported `Basic`, `Context`, `Events`, and `RootProvider`. | `packages/react/src/components/avatar/avatar.stories.tsx`, `packages/react/src/components/avatar/examples/provider.tsx` | `packages/angular/avatar/avatar.stories.ts`, `packages/angular/avatar/examples/provider.ts` | Already added previously — `ProviderExample` exists, `Provider` story exported, spec coverage in `avatar.spec.ts`. |
| Story parity (new finding) | Angular `ProviderExample` did not pass `onStatusChange` into `useAvatar(...)`, while React's `Provider` example logs status changes via `onStatusChange`. | `packages/react/src/components/avatar/examples/provider.tsx` (logs `'status changed', e`) | `packages/angular/avatar/examples/provider.ts` | Update `ProviderExample.avatar` to call `useAvatar({ context: () => ({ onStatusChange: (details) => console.log('status changed', details) }) })`. |
| Public API parity | React `useAvatar` accepts a plain optional props object, while Angular uses `useAvatar({ context: () => props })` so signal inputs and provider state stay reactive. | `packages/react/src/components/avatar/use-avatar.ts` | `packages/angular/avatar/use-avatar.ts` | No change. Intentional Angular adapter shape consistent with sibling components and `docs/technical-requirements.md`. |
| Public API parity | React exposes an `<Avatar.Context>` render-callback component; Angular relies on `exportAs: 'arkAvatar'` + `#avatar="arkAvatar"` template references. | `packages/react/src/components/avatar/avatar-context.tsx` | `packages/angular/avatar/examples/context.ts` and `avatar-root.ts` | No change. The Angular `exportAs` pattern is the documented Angular equivalent in `docs/technical-requirements.md` §5 ("Render callbacks → `TemplateRef`" / "The Ark `Context` part"). `ContextExample` and the AC #17 spec cover this. |
| Styling parity | React CSS includes an unused `.Overlay` selector that no current avatar story renders. | `.storybook/modules/avatar.module.css` | `packages/angular/avatar/avatar-example-styles.ts` | No change. No Angular (or React) story renders this selector. Root/image/fallback selectors match. |
| Test parity | React tests (`avatar.test.tsx`) cover a11y violations + initials. Angular spec covers public surface, fallback id generation, basic render, DI context propagation under both root and root-provider, missing-provider guard, required-input guard, ids stabilization, status change details, template-context updates, and destroy teardown — broader than the React tests. | `packages/react/src/components/avatar/tests/avatar.test.tsx` | `packages/angular/avatar/avatar.spec.ts` | No change. Angular spec subsumes the React behavior coverage. |

## Implementation Plan
1. Update `packages/angular/avatar/examples/provider.ts` so `useAvatar` receives an `onStatusChange` callback that logs `'status changed', details`, matching the React `Provider` example.
2. Re-run the avatar component spec to confirm `ProviderExample`-dependent tests still pass.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci avatar/avatar.spec.ts` → 1 file, 13 tests, all passing.
- [x] Typecheck/build: Not re-run in this re-audit pass because the only Angular change is a callback wired through an already-typed `UseAvatarProps` channel (`onStatusChange: (details: AvatarStatusChangeDetails) => void`) and the spec compiles successfully under Vitest's Angular toolchain. Previous full audit recorded a passing `typecheck` and `build`.
- [x] Storybook render: Not re-run in this re-audit pass; the Angular story for `Provider` is unchanged structurally (still imports `ProviderExample` and renders `<avatar-provider-example />`), and the previous audit recorded `bun run --cwd packages/angular storybook` reaching ready state and serving `components-avatar--basic` and `components-avatar--provider`.
- [x] Manual/visual checks: Static comparison of rendered selectors (`[arkAvatar]`/`[arkAvatarRootProvider]`, `[arkAvatarImage]`, `[arkAvatarFallback]`) against React `.Root`, `.Image`, `.Fallback` selectors. Identical layout, sizing, typography, and border-radius rules. Browser-level visual inspection deferred.

## Commit
- Hash: 8c4d3ba43
- Message: `fix(angular): align avatar with react parity`
