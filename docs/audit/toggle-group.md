# Toggle Group Angular Parity Audit

## Scope
- Angular files: `packages/angular/toggle-group/`
- React files: `packages/react/src/components/toggle-group/`
- Storybook/style files: `packages/angular/toggle-group/toggle-group.stories.ts`, `packages/angular/toggle-group/examples/`, `packages/angular/toggle-group/toggle-group-example-styles.ts`, `packages/react/src/components/toggle-group/toggle-group.stories.tsx`, `packages/react/src/components/toggle-group/examples/`, `.storybook/modules/toggle-group.module.css`

## Summary
- Status: Source, story, and styling parity achieved; Angular tests expanded for React-tested multiple selection and loop-focus behavior.
- Highest-risk gaps: Keyboard roving focus and array-valued controlled state.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Tests | Multiple selection accumulation did not have direct Angular parity coverage. | `packages/react/src/components/toggle-group/tests/toggle-group.test.tsx` | `packages/angular/toggle-group/toggle-group.spec.ts` | Added multiple-selection assertion. |
| Tests | Default `loopFocus` keyboard wrapping did not have direct Angular parity coverage. | `packages/react/src/components/toggle-group/tests/toggle-group.test.tsx` | `packages/angular/toggle-group/toggle-group.spec.ts` | Added ArrowRight wrap assertion. |
| Tests | `loopFocus=false` keyboard boundary behavior did not have direct Angular parity coverage. | `packages/react/src/components/toggle-group/tests/toggle-group.test.tsx` | `packages/angular/toggle-group/toggle-group.spec.ts` | Added non-wrapping ArrowRight assertion. |

## Implementation Plan
1. Compare React and Angular root/item APIs, context helpers, root provider, stories, examples, icons, and CSS module selectors.
2. Leave implementation and story files unchanged because they already match React behavior and story inventory.
3. Add focused Angular specs for missing React-tested multiple-selection and keyboard-focus behavior.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; build completed and forms isolation reported `ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci toggle-group/toggle-group.spec.ts` passed, 11 tests.
- [ ] Storybook render: Not run; story surface unchanged.
- [x] Manual/visual checks: Source-level comparison confirmed Angular story inventory, examples, icons, and example styles align with React.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
