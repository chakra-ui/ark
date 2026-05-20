# Collapsible Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/src/collapsible/collapsible.stories.ts`
- Angular examples: `packages/angular/src/collapsible/examples/`
- Angular styles: `packages/angular/src/collapsible/collapsible-example-styles.ts`
- React story: `packages/react/src/components/collapsible/collapsible.stories.tsx`
- React examples: `packages/react/src/components/collapsible/examples/`
- React styles: `.storybook/modules/collapsible.module.css`

## Summary
- Status: Fixed story export ordering gap; examples and styling already match the React story surface with Angular-idiomatic selectors and package copy.
- Highest-risk gaps: none remaining after reordering story exports.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Yes, first | Yes, first | Same title, trigger copy, icon, body copy, and uncontrolled root. |
| Disabled | Yes, second | Yes, second | Same disabled root, trigger copy, icon, and body copy. |
| InitialOpen | Yes, third | Yes, third | Same default-open state and body copy. |
| LazyMount | Yes, fourth | Yes, sixth before fix; fourth after fix | Same lazy mount and unmount-on-exit behavior; Angular uses `@if (!collapsible.isUnmounted())` to mirror unmounting in template control flow. |
| Nested | Yes, fifth | Yes, fifth after fix | Same nested sections and styling. Angular package command uses `@ark-ui/angular`, which is intentional framework-specific copy. |
| PartialCollapse | Yes, sixth | Yes, fourth before fix; sixth after fix | Same `collapsedHeight="100px"` and long-form content. |
| RootProvider | Yes, seventh | Yes, seventh | Same output state text and externally managed root provider example. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Hard-coded template copy | One root, one trigger, one content body | None | No change. |
| Disabled | Hard-coded template copy | One disabled root, one trigger, one content body | None | No change. |
| InitialOpen | Hard-coded template copy | One default-open root, one trigger, one content body | None | No change. |
| LazyMount | Hard-coded template copy | One lazy root, one trigger, one conditionally rendered content body | Mount state driven by component state | Angular uses block control flow to remove content when unmounted; no Storybook surface change. |
| Nested | Hard-coded template copy | One parent root containing two nested roots | None | Inner install command names `@ark-ui/angular` instead of `@ark-ui/react`; no change because it is framework-specific copy. |
| PartialCollapse | Hard-coded template copy | One root with three paragraph body | None | No change. |
| RootProvider | `useCollapsible` state | One output plus root provider using returned machine API | State changes when trigger toggles | Angular uses DI/injection context and computed labels; no Storybook surface change. |

## Sections / Structure
- Meta differences: none. Both stories use `title: 'Components / Collapsible'` with no args, argTypes, decorators, parameters, or tags.
- Decorator differences: React re-exports example components directly. Angular wraps each standalone example with `moduleMetadata({ imports: [...] })` and renders the selector, matching neighboring Angular story conventions.
- Per-story decorators / args / controls: no story-specific args or controls in either implementation. Angular story order differed for `LazyMount`, `Nested`, and `PartialCollapse`; fixed to match React.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkCollapsible]` | None; same width, gap, flex layout, color, and max width. | No change. |
| Trigger | `.Trigger` | `[arkCollapsibleTrigger]` | None; same spacing, border, typography, hover, focus, disabled states. | No change. |
| Indicator | `.Indicator` | `[arkCollapsibleIndicator]` | None; same icon sizing, color, and open rotation. | No change. |
| Content | `.Content` | `[arkCollapsibleContent]` | None; same overflow, layout, animations, collapsed-size shadow. | No change. |
| Body | `.Body` | `.collapsible-body` | None; same padding, typography, paragraph spacing, and code styling. | No change. |
| Nested root | `.Nested` | `.collapsible-nested` | None; same top margin and full width. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story ordering | `LazyMount`, `Nested`, and `PartialCollapse` were exported in a different order. | `packages/react/src/components/collapsible/collapsible.stories.tsx` | `packages/angular/src/collapsible/collapsible.stories.ts` | Reorder Angular exports to `Basic`, `Disabled`, `InitialOpen`, `LazyMount`, `Nested`, `PartialCollapse`, `RootProvider`. |

## Implementation Plan
1. Create this audit with inventory, data-source, structure, styling, and gap matrix notes.
2. Reorder Angular story exports to match the React story order.
3. Run focused Collapsible tests, Angular typecheck, Storybook startup, and `git diff --check`.
4. Record verification results and leave committing to the parent orchestrator.

## Deferred (component-level work)
- None.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6013 --ci` reached Storybook ready at `http://localhost:6013/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/collapsible/collapsible.spec.ts` passed, 1 file / 22 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and `forms isolation: ok`.
- [x] Whitespace: `git diff --check` passed. `git diff --check -- packages/angular/src/collapsible/collapsible.stories.ts` passed. `git diff --no-index --check /dev/null docs/story-audit/collapsible.md` produced no whitespace warnings.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align collapsible story with react parity`
