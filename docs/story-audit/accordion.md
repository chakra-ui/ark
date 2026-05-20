# Accordion Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/accordion/accordion.stories.ts`
- Angular examples: `packages/angular/src/accordion/examples/`
- Angular styles: `packages/angular/src/accordion/accordion-example-styles.ts`
- React story: `packages/react/src/components/accordion/accordion.stories.tsx`
- React examples: `packages/react/src/components/accordion/examples/`
- React styles: `.storybook/modules/accordion.module.css`

## Summary

- Status: Partially aligned. Existing shared stories now match React's visible output/styling more closely; two React
  stories require component/package coverage not present in Angular.
- Highest-risk gaps: Angular `ArkAccordionRoot` does not expose React's `lazyMount` / `unmountOnExit` accordion props,
  and this workspace has no Angular slider primitive for the React `WithSlider` story.

## Story Inventory

| Story name   | React | Angular | Notes                                                                                                 |
| ------------ | ----- | ------- | ----------------------------------------------------------------------------------------------------- |
| Basic        | Yes   | Yes     | Same three-item data set, default value, chevron indicator, and vertical layout.                      |
| Collapsible  | Yes   | Yes     | Same three-item data set and `collapsible` behavior.                                                  |
| Context      | Yes   | Yes     | Same context fields; Angular uses structural directive and signal reads.                              |
| Controlled   | Yes   | Yes     | Angular now renders only the accordion, matching React's visible surface.                             |
| Disabled     | Yes   | Yes     | Same disabled item condition: `getting-started`.                                                      |
| Horizontal   | Yes   | Yes     | Same three-item data set, horizontal orientation, and centered body.                                  |
| ItemContext  | Yes   | Yes     | Same expanded/focused indicators; Angular uses structural directive and matching inline-code styling. |
| LazyMount    | Yes   | No      | Deferred: Angular accordion root has no `lazyMount` / `unmountOnExit` inputs.                         |
| Multiple     | Yes   | Yes     | Same three-item data set and `multiple` behavior.                                                     |
| RootProvider | Yes   | Yes     | Angular output now matches React's `Value: <json>` formatting.                                        |
| WithSlider   | Yes   | No      | Deferred: no Angular slider primitive exists in this workspace.                                       |

## Example Data Sources

| Example      | Data origin                            | Shape                                                                    | Dynamic/async                                | Divergence                                                                           |
| ------------ | -------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| Basic        | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content`                               | None                                         | No divergence.                                                                       |
| Collapsible  | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content`                               | None                                         | No divergence.                                                                       |
| Context      | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content` plus accordion context output | Context updates from component state         | Framework-idiomatic context access only.                                             |
| Controlled   | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content` plus controlled value state   | Value changes from user interaction          | Angular uses `signal` and banana binding; React uses `useState` and `onValueChange`. |
| Disabled     | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content`                               | None                                         | No divergence.                                                                       |
| Horizontal   | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content`                               | None                                         | No divergence.                                                                       |
| ItemContext  | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content` plus item context labels      | Context updates from item state              | Framework-idiomatic context access only.                                             |
| LazyMount    | Local React `items` array              | 3 objects with `value`, `title`, `content`                               | Mount/unmount behavior from accordion props  | Deferred component-level API gap.                                                    |
| Multiple     | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content`                               | None                                         | No divergence.                                                                       |
| RootProvider | Local `accordionItems` / `items` array | 3 objects with `value`, `title`, `content` plus root provider state      | Provider state updates from user interaction | Angular uses `useAccordion` in DI context; React uses `useAccordion` hook.           |
| WithSlider   | Local React `items` array              | 3 objects with `value`, `title`, `content` plus one slider per item body | Slider value changes from user interaction   | Deferred package/component coverage gap.                                             |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Accordion'` with no args, argTypes, decorators, parameters,
  or tags.
- Decorator differences: React re-exports examples directly. Angular uses `moduleMetadata` per story to import
  standalone examples and returns a component selector template.
- Per-story decorators / args / controls: No story has args or controls. Angular has per-story import decorators only.
  Missing React stories are `LazyMount` and `WithSlider`.

## Styling

| Element            | React selector / class | Angular selector / class                       | Gap                                                          | Fix                              |
| ------------------ | ---------------------- | ---------------------------------------------- | ------------------------------------------------------------ | -------------------------------- |
| Root               | `.Root`                | `[arkAccordion]`, `[arkAccordionRootProvider]` | No gap for shared stories.                                   | No change.                       |
| Item               | `.Item`                | `[arkAccordionItem]`                           | No gap for shared stories.                                   | No change.                       |
| Trigger            | `.ItemTrigger`         | `[arkAccordionItemTrigger]`                    | No gap for shared stories.                                   | No change.                       |
| Indicator          | `.ItemIndicator`       | `[arkAccordionItemIndicator]`                  | No gap for shared stories.                                   | No change.                       |
| Content            | `.ItemContent`         | `[arkAccordionItemContent]`                    | No gap for shared stories.                                   | No change.                       |
| Body               | `.ItemBody`            | `.item-body`                                   | No gap for shared stories.                                   | No change.                       |
| Horizontal body    | `.Centered`            | `.centered`                                    | No gap for shared stories.                                   | No change.                       |
| RootProvider stack | global `.stack`        | `.stack`                                       | Angular overrode global `stack` with grid and a smaller gap. | Removed local `.stack` override. |
| Output             | global `output`        | `output`                                       | Angular overrode Storybook global output utility.            | Removed local `output` override. |
| ItemContext code   | inline `style`         | `code`                                         | Angular lacked React's inline-flex/gap/font-size styling.    | Added matching `code` style.     |

## Gap Matrix

| Area               | Gap                                                             | React reference                                                      | Angular location                                             | Fix                                                                |
| ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| Story inventory    | `LazyMount` story missing                                       | `packages/react/src/components/accordion/examples/lazy-mount.tsx`    | `packages/angular/src/accordion/accordion-root.ts`           | Deferred; requires `lazyMount` / `unmountOnExit` accordion inputs. |
| Story inventory    | `WithSlider` story missing                                      | `packages/react/src/components/accordion/examples/with-slider.tsx`   | Angular package                                              | Deferred; no Angular slider primitive exists.                      |
| Controlled story   | Angular showed an extra state output                            | `packages/react/src/components/accordion/examples/controlled.tsx`    | `packages/angular/src/accordion/examples/controlled.ts`      | Removed output and wrapper stack.                                  |
| RootProvider story | Angular output copy/format differed from React                  | `packages/react/src/components/accordion/examples/root-provider.tsx` | `packages/angular/src/accordion/examples/root-provider.ts`   | Changed to `Value: {{ accordion.api().value \| json }}`.           |
| Styling            | Angular overrode global utility styles for `stack` and `output` | `.storybook/modules/utilities.css`                                   | `packages/angular/src/accordion/accordion-example-styles.ts` | Removed local overrides.                                           |
| Styling            | Angular item context labels lacked inline-flex styling          | `packages/react/src/components/accordion/examples/item-context.tsx`  | `packages/angular/src/accordion/accordion-example-styles.ts` | Added `code` styling.                                              |

## Implementation Plan

1. Align existing shared Angular examples without changing component implementation or public APIs.
2. Remove Angular-only visible state output from `Controlled`.
3. Match `RootProvider` output casing and JSON formatting.
4. Remove local utility overrides so examples use shared Storybook `stack` and `output` styles.
5. Record `LazyMount` and `WithSlider` as deferred component/package gaps.

## Deferred (component-level work)

- Add Angular accordion story parity for `LazyMount` after the accordion root API supports `lazyMount` and
  `unmountOnExit`.
- Add Angular accordion story parity for `WithSlider` after an Angular slider primitive exists.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6012 --ci` completed successfully. Existing
      warnings only: unused TypeScript compilation entries.
- [ ] Typecheck: `bun run --cwd packages/angular typecheck` failed before reaching build on unrelated
      `packages/angular/tags-input/examples/*` syntax errors (`TS1005`, `TS1137`).
- [x] Story-related specs: `bun run --cwd packages/angular test:ci accordion/accordion.spec.ts` passed, 1 file / 20
      tests.
- [x] Formatting:
      `bun prettier --check docs/story-audit/accordion.md packages/angular/src/accordion/examples/controlled.ts packages/angular/src/accordion/examples/root-provider.ts packages/angular/src/accordion/accordion-example-styles.ts`
      passed.
- [x] `git diff --check`: passed.
- [x] Ignored audit doc whitespace check: `git diff --no-index --check /dev/null docs/story-audit/accordion.md` produced
      no whitespace-error output.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align accordion story with react parity`
