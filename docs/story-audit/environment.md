# Environment Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/providers/environment/environment.stories.ts`
- Angular examples: `packages/angular/src/providers/environment/examples/`
- Angular styles: inline example styles only
- React story: `packages/react/src/providers/environment/environment.stories.tsx`
- React examples: `packages/react/src/providers/environment/examples/`
- React styles: none

## Summary

- Status: Aligned after replacing the Angular public story exports with `Basic` and `ShadowRoot`, adding Angular
  equivalents, and updating the shared usage output.
- Highest-risk gaps: `ShadowRoot` parity depends on Angular's native Shadow DOM encapsulation and the Angular
  portal/environment provider behavior rather than React's `attachShadow` plus `EnvironmentProvider`.

## Story Inventory

| Story name | React | Angular | Notes                                                                                                                                                                                                      |
| ---------- | ----- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic      | Yes   | Yes     | React renders `Usage` inside `react-frame-component` and a default `EnvironmentProvider`; Angular renders local usage inside `ArkFrameComponent`, which provides the frame document as the environment.    |
| ShadowRoot | Yes   | Yes     | React attaches a shadow root, provides it as the environment, and renders `PrintEnvironment` through `Portal`; Angular uses native Shadow DOM encapsulation with an equivalent provider and portal target. |
| Setup      | No    | No      | Angular no longer exposes this as a story. The unexported setup example file remains, matching React's unexported `setup.tsx` helper pattern.                                                              |
| Usage      | No    | No      | Angular no longer exposes this as a story. The unexported usage example remains as the `Basic` helper, matching React.                                                                                     |

## Example Data Sources

| Example    | Data origin                                                      | Shape                                                                            | Dynamic/async                                                                      | Divergence                                                                                             |
| ---------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Basic      | React imports local `Usage`; Angular reuses local usage content. | One iframe titled `IFrame Context` containing a serialized root node.            | React frame mounts asynchronously; Angular `ark-frame` mounts after render.        | Angular uses `ArkFrameComponent`, which provides an iframe document environment for projected content. |
| ShadowRoot | Runtime DOM root.                                                | One shadow-root environment with serialized root node rendered through a portal. | React uses `useEffect` after `ref`; Angular resolves its shadow root after render. | Angular uses native `ViewEncapsulation.ShadowDom` instead of manually calling `attachShadow`.          |
| Setup      | Hard-coded provider snippet.                                     | One paragraph explaining configured root-node resolution.                        | None.                                                                              | Not a React story export.                                                                              |
| Usage      | Injected environment.                                            | One root-node display.                                                           | None.                                                                              | Angular now renders JSON in a `pre`, matching React's helper output.                                   |

## Sections / Structure

- Meta differences: Both stories use `title: 'Utilities / Environment'`; neither defines args, argTypes, tags,
  parameters, or decorators.
- Decorator differences: React re-exports functions directly. Angular uses `moduleMetadata` per story to import
  standalone example components.
- Per-story decorators / args / controls: No args or controls on either side. Angular now exports `Basic`, `ShadowRoot`
  in React order.

## Styling

| Element          | React selector / class                           | Angular selector / class                                  | Gap                            | Fix                                                                       |
| ---------------- | ------------------------------------------------ | --------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| Basic frame      | Inline `width="100%" height="300px"` on `Frame`. | `.frame` on `ark-frame`.                                  | None after fix.                | Added `EnvironmentBasicExample` with width `100%` and height `300px`.     |
| Root-node output | `<pre>`                                          | `<pre>`                                                   | None after fix.                | Updated usage output to `<pre>` with `JSON.stringify`.                    |
| Shadow root host | Inline `<div ref={setRef}>`.                     | `environment-shadow-root-example` with Shadow DOM.        | Framework-specific host shape. | No change; Angular-native shadow root is the closest equivalent.          |
| Portal output    | React `Portal` targets the environment root.     | `ArkPortalComponent` with explicit `portalTarget` target. | None after fix.                | Renders through `ark-portal` with the resolved shadow root as the target. |

## Gap Matrix

| Area             | Gap                                                                       | React reference                                                     | Angular location                                                    | Fix                                                                           |
| ---------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Story inventory  | Angular exported `Setup` and `Usage` instead of `Basic` and `ShadowRoot`. | `packages/react/src/providers/environment/environment.stories.tsx`  | `packages/angular/src/providers/environment/environment.stories.ts` | Replace public story exports with `Basic` and `ShadowRoot`.                   |
| Basic story      | Missing iframe environment demo.                                          | `packages/react/src/providers/environment/examples/basic.tsx`       | `packages/angular/src/providers/environment/examples/`              | Add `basic.ts` using `ArkFrameComponent` and local `EnvironmentUsageExample`. |
| Usage output     | Angular displayed only `nodeName`; React serializes the root node.        | `packages/react/src/providers/environment/examples/usage.tsx`       | `packages/angular/src/providers/environment/examples/usage.ts`      | Render JSON in a `pre`.                                                       |
| ShadowRoot story | Missing shadow-root environment demo.                                     | `packages/react/src/providers/environment/examples/shadow-root.tsx` | `packages/angular/src/providers/environment/examples/`              | Add `shadow-root.ts` with Shadow DOM environment provider and portal output.  |

## Implementation Plan

1. Add `EnvironmentBasicExample` that renders local environment usage inside `ArkFrameComponent`.
2. Update `EnvironmentUsageExample` to serialize `getRootNode()` in a `pre`.
3. Add `EnvironmentShadowRootExample` with Angular Shadow DOM encapsulation, environment provider, and
   `ArkPortalComponent`.
4. Update `environment.stories.ts` to export `Basic` and `ShadowRoot` in React order.
5. Run focused verification and record results.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6242 --ci` reached `Storybook ready!` at
      `http://localhost:6242/`; the smoke script stopped Storybook afterward.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/providers/environment/environment.spec.ts`
      passed, 1 file / 4 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production package build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --write packages/angular/src/providers/environment/environment.stories.ts packages/angular/src/providers/environment/examples/basic.ts packages/angular/src/providers/environment/examples/shadow-root.ts packages/angular/src/providers/environment/examples/usage.ts docs/story-audit/environment.md`
      completed.
- [x] Diff check: `git diff --check` passed. No-index whitespace checks for new `basic.ts`, `shadow-root.ts`, and
      ignored `docs/story-audit/environment.md` emitted no whitespace-error output.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align environment story with react parity`
