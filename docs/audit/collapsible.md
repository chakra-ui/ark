# Collapsible Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/collapsible/`
- React files: `packages/react/src/components/collapsible/`
- Storybook/style files: `packages/angular/src/collapsible/collapsible.stories.ts`, `packages/angular/src/collapsible/examples/`, `packages/angular/src/collapsible/collapsible-example-styles.ts`, `.storybook/modules/collapsible.module.css`

## Summary
- Status: Fixed with one documented Angular-specific mounting limitation.
- Highest-risk gaps: Angular now exposes render-strategy state, includes the missing `InitialOpen` story, and aligns the Storybook example styling with React. Automatic `Collapsible.Content` host removal remains template-controlled because Angular attribute directives cannot remove consumer-owned host elements safely.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | `lazyMount`, `unmountOnExit`, and `onExitComplete` are part of React `UseCollapsibleProps`, but Angular root/use hook do not expose render-strategy inputs or an exit-complete output. | `packages/react/src/components/collapsible/use-collapsible.ts`, `packages/react/src/components/collapsible/split-collapsible-props.ts` | `packages/angular/src/collapsible/use-collapsible.ts`, `packages/angular/src/collapsible/collapsible-root.ts` | Add render-strategy inputs to root/use hook, expose `isUnmounted` as a signal for template-controlled content mounting, and add `(exitComplete)`. |
| Story parity | React exports `InitialOpen`; Angular does not. | `packages/react/src/components/collapsible/collapsible.stories.tsx`, `packages/react/src/components/collapsible/examples/initial-open.tsx` | `packages/angular/src/collapsible/collapsible.stories.ts`, `packages/angular/src/collapsible/examples/` | Add `CollapsibleInitialOpenExample` and story export. |
| Story parity | Angular lazy-mount story gates on `api().visible`, which removes content on every close and does not demonstrate `lazyMount`/`unmountOnExit` inputs. | `packages/react/src/components/collapsible/examples/lazy-mount.tsx` | `packages/angular/src/collapsible/examples/lazy-mount.ts` | Use `lazyMount unmountOnExit` inputs and `isUnmounted()` for template-controlled mounting. |
| Styling parity | Angular example CSS lacks React root width/max-width, content animations, body padding wrapper, nested spacing class, indicator color, and collapsed-size shadow. | `.storybook/modules/collapsible.module.css` | `packages/angular/src/collapsible/collapsible-example-styles.ts`, `packages/angular/src/collapsible/examples/*.ts` | Align Angular example styles and add body/nested classes in examples. |
| Test parity | React covers lazy mount and unmount-on-exit behavior; Angular tests cover basic toggling but not render strategy. | `packages/react/src/components/collapsible/tests/collapsible.test.tsx` | `packages/angular/src/collapsible/collapsible.spec.ts` | Add Angular specs for `isUnmounted`, lazy mount, and unmount-on-exit template usage. |
| Functionality parity | React `Collapsible.Content` automatically returns `null` when unmounted; Angular's content part is an attribute directive on a consumer-owned host and cannot remove that host by itself. | `packages/react/src/components/collapsible/collapsible-content.tsx` | `packages/angular/src/collapsible/collapsible-content.ts` | Deferred: expose `isUnmounted()` for Angular template control; automatic host removal would require a separate structural/template API beyond the current directive-centric surface. |

## Implementation Plan
1. Add render-strategy inputs and `isUnmounted` signal to Angular `useCollapsible`, root, and root-provider.
2. Add the missing `InitialOpen` example/story and update existing examples to use React-equivalent body/nested markup.
3. Align Angular Storybook CSS with the React CSS module selectors and states.
4. Add focused Angular tests for render-strategy parity and the new initial-open story.
5. Run focused tests, typecheck, diff check, then commit only collapsible-related files and this audit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by pre-existing date-input import errors for `@ark-ui/angular/locale` in `src/date-input/examples/localized.ts` and `src/date-input/examples/rtl.ts`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/collapsible/collapsible.spec.ts` passed, 22 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007 --host 127.0.0.1` attempted; preview build blocked by the same date-input `@ark-ui/angular/locale` export errors.
- [x] Manual/visual checks: Compared `.storybook/modules/collapsible.module.css` to `packages/angular/src/collapsible/collapsible-example-styles.ts` and updated Angular selectors, body wrappers, animation states, nested spacing, disabled/focus states, and collapsed-size styling. Browser visual inspection was not completed because Storybook startup is blocked by unrelated date-input errors.

## Commit
- Hash: See final response.
- Message: `fix(angular): align collapsible with react parity`
