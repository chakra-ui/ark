export type { ValueChangeDetails as ToggleGroupValueChangeDetails } from '@zag-js/toggle-group'
export { default as ToggleGroupContext, type ToggleGroupContextProps } from './toggle-group-context.svelte'
export {
  default as ToggleGroupItem,
  type ToggleGroupItemBaseProps,
  type ToggleGroupItemProps,
} from './toggle-group-item.svelte'
export {
  default as ToggleGroupRoot,
  type ToggleGroupRootBaseProps,
  type ToggleGroupRootProps,
} from './toggle-group-root.svelte'
export {
  default as ToggleGroupRootProvider,
  type ToggleGroupRootProviderBaseProps,
  type ToggleGroupRootProviderProps,
} from './toggle-group-root-provider.svelte'
export { toggleGroupAnatomy } from './toggle-group.anatomy.ts'
export { useToggleGroup, type UseToggleGroupProps, type UseToggleGroupReturn } from './use-toggle-group.svelte.ts'
export { useToggleGroupContext, type UseToggleGroupContext } from './use-toggle-group-context.ts'

export * as ToggleGroup from './toggle-group.ts'
