# Navigation Menu Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/navigation-menu/navigation-menu.stories.ts`
- Angular examples: `packages/angular/src/navigation-menu/examples/`
- Angular styles: `packages/angular/src/navigation-menu/navigation-menu-example-styles.ts`
- React story: `packages/react/src/components/navigation-menu/navigation-menu.stories.tsx`
- React examples: `packages/react/src/components/navigation-menu/examples/`
- React styles: `.storybook/modules/navigation-menu.module.css`

## Summary

- Status: Fixed one Angular-only story export and two small example-surface divergences.
- Highest-risk gaps: None remaining at the Storybook surface.

## Story Inventory

| Story name    | React | Angular | Notes                                                             |
| ------------- | ----- | ------- | ----------------------------------------------------------------- |
| Basic         | Yes   | Yes     | Same order and visible menu structure.                            |
| Controlled    | Yes   | Yes     | Same order and controlled value output surface.                   |
| Context       | Yes   | Yes     | Same order and `value: none` fallback.                            |
| RootProvider  | Yes   | Yes     | Same order and raw hook value output surface.                     |
| Viewport      | Yes   | Yes     | Same order, visible link labels, and viewport href surface.       |
| WithIndicator | No    | No      | Removed from public Angular Storybook list; example file remains. |

## Example Data Sources

| Example       | Data origin                                         | Shape                                                                   | Dynamic/async                            | Divergence                                                           |
| ------------- | --------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------- |
| Basic         | Hard-coded links in React JSX and Angular template. | `features` has 2 links, `docs` has 3 links, `about` is a direct link.   | None.                                    | No visible divergence.                                               |
| Controlled    | Local controlled value state plus hard-coded links. | `features` has 2 links, `docs` has 2 links, `about` is a direct link.   | User interaction updates value.          | No visible divergence.                                               |
| Context       | Root context/API plus hard-coded links.             | `features` has 2 links, `docs` has 2 links, `about` is a direct link.   | User interaction updates context output. | No visible divergence.                                               |
| RootProvider  | `useNavigationMenu` hook plus hard-coded links.     | `features` has 2 links, `docs` has 2 links, `about` is a direct link.   | User interaction updates hook output.    | Fixed: Angular now renders the raw empty value like React.           |
| Viewport      | Hard-coded grouped link labels.                     | `products` 6+4, `company` 4+3, `developers` 6+4, `pricing` direct link. | User interaction moves viewport content. | Fixed: Angular viewport content links now use `href="#"` like React. |
| WithIndicator | Angular-only hard-coded menu.                       | 2 menu items, global indicator, item indicators.                        | User interaction updates indicators.     | Removed from public story inventory.                                 |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Navigation Menu'`; neither defines args, argTypes, tags,
  decorators, or custom parameters.
- Decorator differences: React re-exports example components directly. Angular wraps each story in `moduleMetadata` and
  a render template, which is framework-idiomatic and unchanged.
- Per-story decorators / args / controls: No story-specific args or controls in either stack. Angular `WithIndicator` no
  longer appears in the public Storybook inventory.

## Styling

| Element         | React selector / class                                                  | Angular selector / class                                                                                                                        | Gap                                                                   | Fix                                   |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------- |
| Root            | `.Root`                                                                 | `[arkNavigationMenu]`                                                                                                                           | No material gap.                                                      | No change.                            |
| List/item       | `.List`, `.Item`                                                        | `[arkNavigationMenuList]`, `[arkNavigationMenuItem]`                                                                                            | No material gap.                                                      | No change.                            |
| Trigger/link    | `.Trigger`, `.Link`                                                     | `[arkNavigationMenuTrigger]`, `[arkNavigationMenuLink]`                                                                                         | No material gap.                                                      | No change.                            |
| Content links   | `.ContentLink`                                                          | `[arkNavigationMenuContent] [arkNavigationMenuLink]`                                                                                            | No material gap.                                                      | No change.                            |
| Indicator/arrow | `.Indicator`, `.Arrow`                                                  | `[arkNavigationMenuIndicator]`, `[arkNavigationMenuArrow]`                                                                                      | No material gap for React-backed stories.                             | No change.                            |
| Viewport        | `.ViewportPositioner`, `.Viewport`, `.ViewportContent`, `.ViewportLink` | `[arkNavigationMenuViewportPositioner]`, `[arkNavigationMenuViewport]`, `.navigation-menu__viewport-content`, `.navigation-menu__viewport-link` | Layout and animation match; href attributes differ in example markup. | Normalize viewport link hrefs to `#`. |

## Gap Matrix

| Area                     | Gap                                                                    | React reference                                                      | Angular location                                           | Fix                                                           |
| ------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Story inventory          | `WithIndicator` exists only in Angular Storybook.                      | `navigation-menu.stories.tsx` exports five stories.                  | `navigation-menu.stories.ts` exports six stories.          | Remove `WithIndicator` import/export from Angular story file. |
| RootProvider copy/state  | Initial output renders `open: none` instead of React's raw hook value. | `examples/root-provider.tsx` renders `open: {navigationMenu.value}`. | `examples/root-provider.ts` computes `none`.               | Return the raw value with an empty fallback.                  |
| Viewport link attributes | Angular viewport links use unique fragment ids.                        | `examples/viewport.tsx` renders all viewport links with `href="#"`.  | `examples/viewport.ts` hard-codes per-link fragment hrefs. | Change viewport content links to `href="#"`.                  |

## Implementation Plan

1. Completed: Removed the Angular-only `WithIndicator` story import/export while leaving the component file untouched
   for existing local tests/API coverage.
2. Completed: Updated `RootProvider` output to render the hook value without the `none` fallback.
3. Completed: Updated viewport content links to use `href="#"` like React.
4. Completed: Ran focused formatting/checks, story spec, typecheck, Storybook startup, and `git diff --check`.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6234 --ci` reached Storybook ready at
      `http://localhost:6234/`; stopped after startup. Existing warnings only.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/navigation-menu/navigation-menu.spec.ts` passed,
      1 file / 22 tests.
- [ ] Typecheck: `bun run --cwd packages/angular typecheck` failed on unrelated dirty menu work: `src/menu/menu.spec.ts`
      references missing `MenuRootProviderExample.openLabel` at lines 750 and 754.
- [x] Formatting:
      `bun prettier --write packages/angular/src/navigation-menu/navigation-menu.stories.ts packages/angular/src/navigation-menu/examples/root-provider.ts packages/angular/src/navigation-menu/examples/viewport.ts packages/angular/src/navigation-menu/navigation-menu.spec.ts docs/story-audit/navigation-menu.md`
      passed.
- [x] `git diff --check`: passed.
- [x] Navigation-menu scoped `git diff --check`: passed.
- [x] Ignored audit doc whitespace check: `git diff --no-index --check /dev/null docs/story-audit/navigation-menu.md`
      emitted no whitespace warnings; exit code `1` is expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align navigation-menu story with react parity`
