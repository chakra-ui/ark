# Tabs Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/tabs/tabs.stories.ts`
- Angular examples: `packages/angular/src/tabs/examples/*.ts`
- Angular styles: `packages/angular/src/tabs/tabs-example-styles.ts`
- React story: `packages/react/src/components/tabs/tabs.stories.tsx`
- React examples: `packages/react/src/components/tabs/examples/*.tsx`
- React styles: `.storybook/modules/tabs.module.css`

## Summary

- Status: Audit complete; focused Angular story-surface fixes applied for markup parity.
- Highest-risk gaps: Resolved Angular-only `Controlled` readout, `Links` content IDs, and `Vertical` content wrapper.

## Story Inventory

| Story name       | React | Angular | Notes                                                                                                                   |
| ---------------- | ----- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Basic            | Yes   | Yes     | Matching order and example intent.                                                                                      |
| Controlled       | Yes   | Yes     | Matching controlled root state after removing Angular-only selected-value output.                                       |
| DisabledTab      | Yes   | Yes     | Matching disabled password trigger.                                                                                     |
| Indicator        | Yes   | Yes     | Matching indicator story; Angular maps CSS module classes through attribute selectors and `:has()`.                     |
| LazyMount        | Yes   | Yes     | Matching `lazyMount` and `unmountOnExit`; Angular uses explicit `isContentUnmounted` blocks to model unmounted content. |
| Links            | Yes   | Yes     | Matching anchor triggers and content markup after removing Angular-only content IDs.                                    |
| ManualActivation | Yes   | Yes     | Matching manual activation mode.                                                                                        |
| RootProvider     | Yes   | Yes     | Matching provider-backed tabs and selected-value output.                                                                |
| Vertical         | Yes   | Yes     | Matching vertical structure after removing extra Angular wrapper.                                                       |

## Example Data Sources

| Example          | Data origin                                          | Shape                                             | Dynamic/async | Divergence                                                                              |
| ---------------- | ---------------------------------------------------- | ------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------- |
| Basic            | Inline tab values and labels                         | Three values: `account`, `password`, `billing`    | None          | None.                                                                                   |
| Controlled       | Inline tab values and labels; local controlled value | Three values plus `string \| null` selected state | None          | None after fix.                                                                         |
| DisabledTab      | Inline tab values and labels                         | Three values; `password` disabled                 | None          | None.                                                                                   |
| Indicator        | Inline tab values and labels                         | Three values plus indicator part                  | None          | Styling is mapped through Angular selectors rather than CSS module classes.             |
| LazyMount        | Inline tab values and labels                         | Three values plus lazy/unmount flags              | None          | Angular uses `#tabs` and `@if` to avoid rendering unmounted content, matching behavior. |
| Links            | Inline tab values and labels                         | Three anchor triggers                             | None          | None after fix.                                                                         |
| ManualActivation | Inline tab values and labels                         | Three values with manual activation               | None          | None.                                                                                   |
| RootProvider     | Inline tab values and labels; `useTabs` state        | Three values plus provider value                  | None          | Angular reads provider value through `tabs.api().value`; framework-idiomatic no-change. |
| Vertical         | Inline tab values and labels                         | Three values with vertical orientation            | None          | None after fix.                                                                         |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Tabs'`; no parameters, decorators, argTypes, args, or tags.
- Decorator differences: React re-exports CSF stories directly from example files. Angular uses per-story
  `moduleMetadata` decorators importing standalone example components.
- Per-story decorators / args / controls: No story args or controls on either side. Angular render templates are one
  standalone example element per story.

## Styling

| Element            | React selector / class | Angular selector / class                                      | Gap                                                                       | Fix                                                                                         |
| ------------------ | ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Root               | `.Root`                | `[arkTabs]`, `[arkTabsRootProvider]` via directive attributes | Angular uses attribute selectors with fallback tokens                     | No change; visual contract matches.                                                         |
| List               | `.List`                | `[arkTabsList]`                                               | None                                                                      | No change.                                                                                  |
| Trigger            | `.Trigger`             | `[arkTabsTrigger]`                                            | Angular includes button reset/link styling for native element differences | No change; required for equivalent rendering.                                               |
| Indicator trigger  | `.TriggerIndicator`    | `[arkTabs]:has([arkTabsIndicator]) [arkTabsTrigger]`          | Class mapping differs                                                     | No change; visual selected-background behavior matches without adding presentation classes. |
| Indicator          | `.Indicator`           | `[arkTabsIndicator]`                                          | None                                                                      | No change.                                                                                  |
| Content            | `.Content`             | `[arkTabsContent]`                                            | None                                                                      | No change.                                                                                  |
| RootProvider stack | global `.stack`        | `.stack` in Angular style string                              | None                                                                      | No change.                                                                                  |

## Gap Matrix

| Area               | Gap                                       | React reference                                              | Angular location                                   | Fix                                                                    |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------- |
| Controlled markup  | Angular-only `<output>` and stack wrapper | `packages/react/src/components/tabs/examples/controlled.tsx` | `packages/angular/src/tabs/examples/controlled.ts` | Fixed: removed output/wrapper while keeping controlled signal binding. |
| Links markup       | Angular-only content `id` attributes      | `packages/react/src/components/tabs/examples/links.tsx`      | `packages/angular/src/tabs/examples/links.ts`      | Fixed: removed content IDs.                                            |
| Vertical structure | Angular-only wrapper around content nodes | `packages/react/src/components/tabs/examples/vertical.tsx`   | `packages/angular/src/tabs/examples/vertical.ts`   | Fixed: removed wrapper so content nodes are direct root children.      |

## Implementation Plan

1. Remove the Angular-only selected-value output and stack wrapper from `TabsControlledExample`.
2. Remove Angular-only content IDs from `TabsLinksExample`.
3. Remove the extra content wrapper from `TabsVerticalExample`.
4. Run focused tabs spec, package typecheck, Storybook startup, formatting/whitespace checks, and record results.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6248 --ci` failed on Angular/Babel cache
      `ENOENT` under `packages/angular/.angular/cache/21.2.11/babel-webpack/...json`; after recreating the cache
      directory, `bun run --cwd packages/angular storybook -- --port 6249 --ci` reached Storybook ready at
      `http://localhost:6249/` and was stopped.
- [ ] Visual check of each story: Not performed; startup smoke passed on retry.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/tabs/tabs.spec.ts` passed: 1 file, 17 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/tabs/examples/controlled.ts packages/angular/src/tabs/examples/links.ts packages/angular/src/tabs/examples/vertical.ts docs/story-audit/tabs.md`
      passed after formatting the audit doc.
- [x] Whitespace: `git diff --check` passed; ignored audit doc no-index whitespace check emitted no whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align tabs story with react parity`
