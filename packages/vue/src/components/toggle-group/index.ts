export type { ValueChangeDetails as ToggleGroupValueChangeDetails } from '@zag-js/toggle-group'
export { default as ToggleGroupContext, type ToggleGroupContextProps } from './toggle-group-context.vue'
export {
  default as ToggleGroupItem,
  type ToggleGroupItemBaseProps,
  type ToggleGroupItemProps,
} from './toggle-group-item.vue'
export {
  default as ToggleGroupRootProvider,
  type ToggleGroupRootProviderBaseProps,
  type ToggleGroupRootProviderProps,
} from './toggle-group-root-provider.vue'
export {
  default as ToggleGroupRoot,
  type ToggleGroupRootBaseProps,
  type ToggleGroupRootEmits,
  type ToggleGroupRootProps,
} from './toggle-group-root.vue'
export { toggleGroupAnatomy } from './toggle-group.anatomy.ts'
export { useToggleGroup, type UseToggleGroupProps, type UseToggleGroupReturn } from './use-toggle-group.ts'
export { useToggleGroupContext, type UseToggleGroupContext } from './use-toggle-group-context.ts'

export * as ToggleGroup from './toggle-group.ts'
