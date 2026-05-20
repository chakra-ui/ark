# Hover Card Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/hover-card/hover-card.stories.ts`
- Angular examples: `packages/angular/src/hover-card/examples/`
- Angular styles: `packages/angular/src/hover-card/hover-card-example-styles.ts`
- React story: `packages/react/src/components/hover-card/hover-card.stories.tsx`
- React examples: `packages/react/src/components/hover-card/examples/`
- React styles: `.storybook/modules/hover-card.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Fixed. Story inventory already matched React; rendered-surface gaps in Context, Controlled, and RootProvider
  were aligned.
- Highest-risk gaps: Resolved. Context now renders chevron icons, Controlled applies the shared button visual contract,
  and RootProvider output copy uses React's boolean string format.

## Story Inventory

| Story name       | React | Angular | Notes                                                   |
| ---------------- | ----- | ------- | ------------------------------------------------------- |
| Basic            | Yes   | Yes     | Same order and profile content.                         |
| Controlled       | Yes   | Yes     | Angular button needed shared button styling.            |
| Delay            | Yes   | Yes     | Same `openDelay` / `closeDelay` values.                 |
| Positioning      | Yes   | Yes     | Same right placement and `gutter: 12`.                  |
| Context          | Yes   | Yes     | Angular needed chevron icon parity for open state.      |
| MultipleTriggers | Yes   | Yes     | Same three-profile dataset and active profile behavior. |
| RootProvider     | Yes   | Yes     | Angular needed boolean output copy parity.              |

## Example Data Sources

| Example          | Data origin                                               | Shape                                       | Dynamic/async                                       | Divergence                                                                       |
| ---------------- | --------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| Basic            | Hard-coded inline profile content                         | Sarah Chen avatar, username, bio, stats     | None                                                | No data divergence.                                                              |
| Controlled       | Hard-coded inline profile content plus local open state   | Boolean open state and Sarah Chen profile   | Local state toggled by button                       | Button styling differed before fix.                                              |
| Delay            | Hard-coded inline profile content                         | Sarah Chen profile                          | Delay props only: `openDelay=200`, `closeDelay=500` | No data divergence.                                                              |
| Positioning      | Hard-coded inline profile content plus positioning object | `placement: right`, `gutter: 12`            | None                                                | No data divergence.                                                              |
| Context          | Hard-coded inline profile content plus root open state    | Sarah Chen profile and open-state indicator | Reads hover-card open state                         | Angular used text glyphs before fix; React uses chevron icons.                   |
| MultipleTriggers | Local hard-coded profile array                            | Three profiles: sarah, alex, jordan         | Active profile follows trigger value                | Angular uses `triggerValue` signal instead of React callback; no surface change. |
| RootProvider     | Hard-coded inline profile content plus `useHoverCard` API | Hover-card API object and open output       | API state changes on hover                          | Angular output copy differed before fix.                                         |

## Sections / Structure

- Meta differences: None. Both stories use `title: 'Components / Hover Card'` with no args, argTypes, parameters, tags,
  or decorators at meta level.
- Decorator differences: React re-exports component examples directly. Angular uses per-story `moduleMetadata` imports
  and renders each standalone example selector; this is Angular Storybook boilerplate and requires no change.
- Per-story decorators / args / controls: No story args or controls on either side. Angular per-story imports match the
  referenced example components.

## Styling

| Element           | React selector / class                                         | Angular selector / class                        | Gap                                              | Fix                                   |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| Trigger link      | `styles.Trigger`                                               | `[arkHoverCardTrigger]`                         | Icon sizing was missing for trigger descendants. | Add descendant SVG sizing.            |
| Content           | `styles.Content`                                               | `[arkHoverCardContent]`                         | No gap.                                          | No change.                            |
| Arrow / tip       | `styles.Arrow`, `styles.ArrowTip`                              | `[arkHoverCardArrow]`, `[arkHoverCardArrowTip]` | No gap.                                          | No change.                            |
| Profile body      | `Body`, `Header`, `Avatar`, `Name`, `Username`, `Bio`, `Stats` | Matching class names                            | No gap.                                          | No change.                            |
| Follow button     | `styles.FollowButton`                                          | `.FollowButton`                                 | No gap.                                          | No change.                            |
| Controlled toggle | `button.Root`                                                  | Unclassed `<button>`                            | Missing shared button surface.                   | Add `.button` styles and apply class. |
| Paragraph         | `styles.Paragraph`                                             | `.Paragraph`                                    | No gap.                                          | No change.                            |

## Gap Matrix

| Area         | Gap                                                                             | React reference                                                       | Angular location                                            | Fix                                                                |
| ------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| Controlled   | Toggle button did not use the shared button visual contract.                    | `packages/react/src/components/hover-card/examples/controlled.tsx`    | `packages/angular/src/hover-card/examples/controlled.ts`    | Add `class="button"` and matching styles.                          |
| Context      | Open-state indicator used `^` / `v` text instead of chevron icons.              | `packages/react/src/components/hover-card/examples/context.tsx`       | `packages/angular/src/hover-card/examples/context.ts`       | Add local chevron icon components and render them from open state. |
| RootProvider | Output label rendered `Open: open` / `Open: closed` instead of boolean strings. | `packages/react/src/components/hover-card/examples/root-provider.tsx` | `packages/angular/src/hover-card/examples/root-provider.ts` | Change computed label to `true` / `false`.                         |

## Implementation Plan

1. Add hover-card chevron icon components for the Context example.
2. Update Context to render chevron icons based on `root.api().open`.
3. Add shared `.button` styling to hover-card example styles and apply it to the Controlled toggle.
4. Add trigger descendant SVG sizing to mirror React CSS.
5. Change RootProvider output copy to boolean strings.
6. Run focused hover-card verification and record results.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6225 --ci` reached Storybook ready at
      `http://localhost:6225/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Not performed in browser; startup compiled the story set successfully.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/hover-card/hover-card.spec.ts` passed, 1 file /
      24 tests. The first run failed on stale example assertions for text glyphs and `open`/`closed`; assertions were
      updated to the new React-parity icon and boolean surfaces.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --write packages/angular/src/hover-card/examples/context.ts packages/angular/src/hover-card/examples/controlled.ts packages/angular/src/hover-card/examples/root-provider.ts packages/angular/src/hover-card/examples/icons.ts packages/angular/src/hover-card/hover-card-example-styles.ts docs/story-audit/hover-card.md`
      passed.
- [x] Whitespace: `git diff --check` passed.
      `git diff --no-index --check /dev/null packages/angular/src/hover-card/examples/icons.ts` and
      `git diff --no-index --check /dev/null docs/story-audit/hover-card.md` emitted no whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align hover-card story with react parity`
