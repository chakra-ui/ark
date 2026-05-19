# Tabs Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/tabs/`
- React files: `packages/react/src/components/tabs/`
- Storybook/style files: `packages/angular/src/tabs/tabs.stories.ts`, `packages/angular/src/tabs/examples/`, `packages/angular/src/tabs/tabs-example-styles.ts`, `packages/react/src/components/tabs/tabs.stories.tsx`, `.storybook/modules/tabs.module.css`

## Summary
- Status: Fixed with verification; manual browser visual review deferred because Storybook port `6007` was already in use.
- Highest-risk gaps: Angular tabs lacked React's render strategy props for lazy-mounted tab content, and Storybook was missing the `LazyMount` and `Links` examples. Angular demo styles also diverged from the React module enough to make indicator and vertical stories visually different.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root and root-provider did not expose render strategy inputs (`lazyMount`, `unmountOnExit`) or an Angular template helper for content mounting. | `packages/react/src/components/tabs/tabs-root.tsx`, `packages/react/src/components/tabs/tabs-root-provider.tsx`, `packages/react/src/components/tabs/tab-content.tsx` | `packages/angular/src/tabs/tabs-root.ts`, `packages/angular/src/tabs/tabs-root-provider.ts`, `packages/angular/src/tabs/use-tabs.ts` | Add boolean inputs and `isContentUnmounted(value)` following the Angular collapsible render-strategy pattern. |
| Story parity | `LazyMount` story was absent. | `packages/react/src/components/tabs/examples/lazy-mount.tsx` | `packages/angular/src/tabs/tabs.stories.ts`, `packages/angular/src/tabs/examples/` | Add an Angular lazy-mount example using root export and `@if` guards. |
| Story parity | `Links` story was absent. | `packages/react/src/components/tabs/examples/links.tsx` | `packages/angular/src/tabs/tabs.stories.ts`, `packages/angular/src/tabs/examples/` | Add an Angular links example using anchor hosts for `arkTabsTrigger`. |
| Styling parity | Angular tab examples used a border-bottom tab style, while React uses pill-like selected states and an absolute indicator background. | `.storybook/modules/tabs.module.css` | `packages/angular/src/tabs/tabs-example-styles.ts` | Align Angular demo styles to React selectors and states. |
| Test parity | Angular specs covered selection, orientation, disabled, controlled, root-provider, and indicator behavior, but not render strategy or link trigger parity. | `packages/react/src/components/tabs/tests/tabs.test.tsx` | `packages/angular/src/tabs/tabs.spec.ts` | Add focused specs for `lazyMount`/`unmountOnExit`, loopFocus false, vertical keyboard navigation, and anchor trigger rendering. |
| Accessibility | Core roles/ARIA flow came from Zag in both implementations. No Angular-specific a11y deviation was found. | `packages/react/src/components/tabs/tests/tabs.test.tsx` | `packages/angular/src/tabs/tabs.spec.ts` | No change beyond preserving Zag prop application in new link and render-strategy tests. |

## Implementation Plan
1. Add render-strategy inputs to root directives and expose `isContentUnmounted(value)` from `useTabs`.
2. Add Angular `LazyMount` and `Links` examples and wire them into Storybook.
3. Align tabs example styles with the React CSS module.
4. Extend tabs specs for render strategy and missing interaction parity.
5. Run focused tabs specs, Angular typecheck if public types changed, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. The command completed `tsc`, production package build, and `check:forms-isolation`; ng-packagr emitted existing export-condition warnings.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/tabs/tabs.spec.ts` passed with 17 tests.
- [x] Formatting/static check: `bunx biome check --write packages/angular/src/tabs docs/audit/tabs.md` passed with no fixes applied. Biome reports an informational `useLiteralKeys` suggestion for the existing `['id']` access in `tabs.spec.ts`, but TypeScript requires bracket access because of `noPropertyAccessFromIndexSignature`.
- [ ] Storybook render: `bun run --cwd packages/angular storybook -- --ci --no-open` compiled the preview to 100%, then failed to bind `::1:6007` because another Storybook process was already using the port.
- [ ] Manual/visual checks: Deferred; browser inspection was blocked by the Storybook port conflict above.

## Commit
- Hash: Recorded in final response after commit creation.
- Message: `fix(angular): align tabs with react parity`
