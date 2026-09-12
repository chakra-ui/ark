---
'@ark-ui/svelte': major
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/vue': minor
---

**Svelte breaking**: `Dialog`'s `Positioner`, `Root`, `RootProvider`, `Title` and `Trigger` exports are now prefixed
(`DialogPositioner` and so on). `StepsStepChangeDetails` is now `StepChangeDetails`, `ColorPickerColor` is `Color`, and
`TabsContentState` / `TabsTriggerState` are `TabContentState` / `TabTriggerState`. Internals the other frameworks keep
private are no longer exported, including `CheckboxProvider`, `splitCollapsibleProps` and `useTreeViewNodePropsContext`.

Fix `render` receiving empty state in eleven Svelte parts, among them `Accordion.Item`, `Toast.Root` and `Select.Root`.

Add `TimerTickDetails` to every framework, and `JsonTreeViewRootBaseProps` / `JsonTreeViewTreeBaseProps` to react, solid
and vue.
