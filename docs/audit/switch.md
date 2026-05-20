# Switch Angular Parity Audit

## Scope
- Angular files: `packages/angular/switch/`
- React files: `packages/react/src/components/switch/`
- Storybook/style files: `packages/angular/switch/switch.stories.ts`, `packages/angular/switch/examples/`, `packages/angular/switch/switch-example-styles.ts`, `packages/react/src/components/switch/switch.stories.tsx`, `packages/react/src/components/switch/examples/`, `.storybook/modules/switch.module.css`

## Summary
- Status: Source, story, and styling parity achieved; Angular test coverage expanded for React-tested invalid, required, disabled, and Field integration behavior.
- Highest-risk gaps: Switch is form-bearing, so CVA and hidden input semantics remain the highest-risk surface.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Tests | Disabled root did not have explicit no-toggle/no-emit coverage. | `packages/react/src/components/switch/tests/switch.test.tsx` | `packages/angular/switch/switch.spec.ts` | Added disabled hidden-input click assertion. |
| Tests | Invalid and required hidden input semantics were not directly asserted. | `packages/react/src/components/switch/tests/switch.test.tsx` | `packages/angular/switch/switch.spec.ts` | Added invalid/required hidden-input assertion. |
| Tests | Field required, disabled, invalid, helper, and error integration lacked direct parity coverage. | `packages/react/src/components/switch/tests/switch.test.tsx` | `packages/angular/switch/switch.spec.ts` | Added Field integration assertion. |

## Implementation Plan
1. Compare React and Angular root APIs, descendant parts, context helpers, root provider, stories, examples, and CSS module selectors.
2. Leave implementation and story files unchanged because they already match React behavior and story inventory.
3. Add focused Angular specs for the missing React-tested semantics.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; build completed and forms isolation reported `ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci switch/switch.spec.ts` passed, 11 tests.
- [ ] Storybook render: Not run; story surface unchanged.
- [x] Manual/visual checks: Source-level comparison confirmed Angular story inventory, examples, and switch example styles align with React.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
