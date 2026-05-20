# Scroll Area Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/scroll-area/scroll-area.stories.ts`
- Angular examples: `packages/angular/src/scroll-area/examples/`
- Angular styles: `packages/angular/src/scroll-area/scroll-area-example-styles.ts`
- React story: `packages/react/src/components/scroll-area/scroll-area.stories.tsx`
- React examples: `packages/react/src/components/scroll-area/examples/`
- React styles: `.storybook/modules/scroll-area.module.css`, `.storybook/modules/utilities.css`

## Summary

- Status: Fixed Storybook order and `RootProvider` layout/style parity.
- Highest-risk gaps: None remaining after aligning Angular's `BothDirections` / `Horizontal` order and replacing the
  bespoke `RootProvider` action wrapper with React's `stack` and `hstack` structure.

## Story Inventory

| Story name       | React           | Angular         | Notes                                     |
| ---------------- | --------------- | --------------- | ----------------------------------------- |
| `Basic`          | Present, first  | Present, first  | No change.                                |
| `BothDirections` | Present, second | Present, second | Reordered Angular before `Horizontal`.    |
| `Horizontal`     | Present, third  | Present, third  | Reordered Angular after `BothDirections`. |
| `Nested`         | Present, fourth | Present, fourth | No change.                                |
| `RootProvider`   | Present, fifth  | Present, fifth  | Align wrapper/action layout.              |

## Example Data Sources

| Example          | Data origin                                                | Shape                                                          | Dynamic/async                             | Divergence                                                                            |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| `Basic`          | Inline lorem text in each example                          | Single paragraph                                               | None                                      | Angular stores the string in a readonly field; rendered text matches React.           |
| `BothDirections` | Inline lorem paragraphs                                    | Three paragraphs, each `50vw` wide                             | None                                      | Angular stores paragraphs in a readonly array and loops; rendered data matches React. |
| `Horizontal`     | Inline lorem text                                          | Single wide paragraph                                          | None                                      | No material divergence.                                                               |
| `Nested`         | Inline nested scroll-area content                          | Outer and inner scroll area with paragraphs                    | None                                      | No material divergence.                                                               |
| `RootProvider`   | `useScrollArea` / `useScrollArea({ context: () => ({}) })` | Root provider with top/bottom action buttons and one paragraph | Button click handlers call `scrollToEdge` | Angular uses `api()` signal access as expected; wrapper/style differs.                |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Scroll Area'`; neither sets parameters, tags, args, argTypes,
  or story-level controls.
- Decorator differences: React re-exports function examples directly; Angular uses `moduleMetadata` imports and `render`
  templates for standalone example components.
- Per-story decorators / args / controls: No story-specific args or controls in either stack.

## Styling

| Element                     | React selector / class                              | Angular selector / class                                              | Gap                                                               | Fix                              |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------- |
| Root                        | `.Root`                                             | `.scroll-area-root`                                                   | No material gap; dimensions/colors match.                         | No change.                       |
| Viewport                    | `.Viewport`                                         | `.scroll-area-viewport`                                               | No material gap; focus, outline, radius, overflow behavior match. | No change.                       |
| Content                     | `.Content`                                          | `.scroll-area-content`                                                | No material gap.                                                  | No change.                       |
| Paragraph                   | `.Paragraph` plus inline `width: 50vw` where needed | `.scroll-area-paragraph`, `.scroll-area-paragraph--wide`              | No material gap.                                                  | No change.                       |
| Scrollbar / thumb / corner  | `.Scrollbar`, `.Thumb`, `.Corner`                   | `.scroll-area-scrollbar`, `.scroll-area-thumb`, `.scroll-area-corner` | No material gap.                                                  | No change.                       |
| Root provider action layout | `.stack` > `.hstack`                                | `.scroll-area-actions`                                                | Angular uses component-only wrapper and custom spacing.           | Use `stack` / `hstack` wrappers. |
| Root provider buttons       | Plain `<button>` inside `.hstack`                   | `.scroll-area-actions button`                                         | Angular adds custom button style not present in React.            | Remove bespoke button style.     |

## Gap Matrix

| Area                        | Gap                                                         | React reference                        | Angular location                | Fix                                             |
| --------------------------- | ----------------------------------------------------------- | -------------------------------------- | ------------------------------- | ----------------------------------------------- |
| Story order                 | `Horizontal` and `BothDirections` are swapped.              | `scroll-area.stories.tsx` export order | `scroll-area.stories.ts`        | Reorder Angular exports/imports to match React. |
| RootProvider layout         | Angular has actions above root without React's outer stack. | `examples/root-provider.tsx`           | `examples/root-provider.ts`     | Wrap with `stack` and `hstack`.                 |
| RootProvider button styling | Angular adds custom button dimensions/border/background.    | Plain React buttons under global reset | `scroll-area-example-styles.ts` | Remove `.scroll-area-actions` rules.            |

## Implementation Plan

1. Reorder Angular `BothDirections` and `Horizontal` import/export blocks to match React.
2. Update Angular `RootProvider` template to use `stack` and `hstack` wrappers with plain buttons.
3. Remove Angular-only `.scroll-area-actions` styles.
4. Run focused scroll-area spec, typecheck, Storybook startup, formatting/whitespace checks, and record results.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6242 --ci` reached `Storybook ready!` at
      `http://localhost:6242/`; stopped after startup. Existing unused TypeScript compilation warnings and
      `DefinePlugin` warning only.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/scroll-area/scroll-area.spec.ts` passed, 1 file /
      9 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Format:
      `bun prettier --write packages/angular/src/scroll-area/scroll-area.stories.ts packages/angular/src/scroll-area/examples/root-provider.ts packages/angular/src/scroll-area/scroll-area-example-styles.ts docs/story-audit/scroll-area.md`
      completed.
- [x] `git diff --check`: passed.
- [x] Audit doc whitespace: `git diff --no-index --check /dev/null docs/story-audit/scroll-area.md` emitted no
      whitespace warnings; exit code `1` is expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align scroll-area story with react parity`
