# Marquee Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/marquee/`, `packages/angular/src/marquee/examples/`, `packages/angular/src/marquee/marquee.stories.ts`
- React files: `packages/react/src/components/marquee/`, `packages/react/src/components/marquee/examples/`, `packages/react/src/components/marquee/marquee.stories.tsx`
- Storybook/style files: `.storybook/modules/marquee.module.css`, `packages/angular/src/marquee/marquee-example-styles.ts`

## Summary
- Status: Mostly aligned. Public directives, root provider, context helper, entry point exports, examples, and core Zag wiring are present. Storybook styling needed closer React parity, and one auto-fill API behavior remains deferred.
- Highest-risk gaps: Angular `[arkMarqueeContent]` does not automatically duplicate projected content the way React `Marquee.Content` does for `autoFill`; Angular examples must render the content copies from `arkMarqueeContext`.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root inputs cover `autoFill`, `defaultPaused`, `delay`, `id`, `ids`, `loopCount`, callbacks, `paused`, `pauseOnInteraction`, `reverse`, `side`, `spacing`, `speed`, and `translations`; parts and root provider are exported. | `packages/react/src/components/marquee/marquee-root.tsx`, `packages/react/src/components/marquee/index.ts` | `packages/angular/src/marquee/marquee-root.ts`, `packages/angular/src/marquee/public-api.ts` | No change. Angular uses signal inputs, `model()` for `paused`, and local `pauseDetailsChange` detail output consistent with neighboring Angular components. |
| Functionality | React `Marquee.Content` maps over `marquee.contentCount`; Angular content is an attribute directive and does not clone user content by itself. | `packages/react/src/components/marquee/marquee-content.tsx` | `packages/angular/src/marquee/marquee-content.ts`, `packages/angular/src/marquee/examples/auto-fill.ts` | Deferred. Current Angular workaround uses `arkMarqueeContext` to render `[index]` copies. A true fix needs a designed Angular structural/content API rather than DOM cloning. |
| Story parity | Angular had all React stories plus an extra `RootProvider` story, but speed and finite-loop labels did not match the React demo text. | `packages/react/src/components/marquee/examples/speed.tsx`, `packages/react/src/components/marquee/examples/finite-loops.tsx` | `packages/angular/src/marquee/examples/speed.ts`, `packages/angular/src/marquee/examples/finite-loops.ts` | Align demo labels with React while keeping the additional root-provider story as useful Angular coverage. |
| Styling parity | Angular demo styles used one generic keyframe, lacked viewport height/width parity, reduced-motion handling, and RTL edge gradients from the React CSS module. | `.storybook/modules/marquee.module.css` | `packages/angular/src/marquee/marquee-example-styles.ts` | Match React selector behavior for root sizing, viewport dimensions, side-specific animations, paused state, reduced motion, and edge gradients. |
| Accessibility | Root/viewport/content/item/edge data attributes and hidden clone semantics are driven by Zag; `pauseOnInteraction` supports focusable items in Angular demo. | `packages/react/src/components/marquee/*` | `packages/angular/src/marquee/*.ts`, `packages/angular/src/marquee/examples/pause-on-interaction.ts` | No change. Existing spec covers pause-on-interaction listener behavior and clone attributes. |
| Tests | Existing spec covers public exports, context DI, orphan errors, props, programmatic controls, controlled pause, destroy cleanup, SSR, and root provider. Styling/text parity changes needed a focused example assertion. | React has no component spec in this folder. | `packages/angular/src/marquee/marquee.spec.ts` | Add a focused Storybook example smoke test for React-matching labels and auto-fill copy rendering. |

## Implementation Plan
1. Align Angular marquee Storybook styles with the React CSS module for root, viewport, content animation selectors, edge gradients, and reduced motion.
2. Align speed and finite-loop example labels with React story copy.
3. Add a focused Angular example test for Storybook label parity and auto-fill rendering through `arkMarqueeContext`.
4. Verify the marquee spec, Angular typecheck, and diff cleanliness.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; includes `tsc`, production `ng build @ark-ui/angular`, and forms isolation check.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/marquee/marquee.spec.ts` passed with 11 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --ci --smoke-test` passed; emitted existing unused-compilation warnings, including unrelated current `packages/angular/listbox/examples/*` files.
- [x] Manual/visual checks: Compared React `.storybook/modules/marquee.module.css` selectors against Angular `marquee-example-styles.ts`; verified root sizing, viewport dimensions, content side animations, paused state, reduced-motion handling, and edge gradients now match the React demo intent.

## Commit
- Hash: recorded in final status
- Message: `fix(angular): align marquee with react parity`
