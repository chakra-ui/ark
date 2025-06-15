export type { CheckedChangeDetails as SwitchCheckedChangeDetails } from '@zag-js/switch'
export { default as SwitchContext, type SwitchContextProps } from './switch-context.svelte'
export { default as SwitchControl, type SwitchControlBaseProps, type SwitchControlProps } from './switch-control.svelte'
export {
  default as SwitchHiddenInput,
  type SwitchHiddenInputBaseProps,
  type SwitchHiddenInputProps,
} from './switch-hidden-input.svelte'
export { default as SwitchLabel, type SwitchLabelBaseProps, type SwitchLabelProps } from './switch-label.svelte'
export { default as SwitchRoot, type SwitchRootBaseProps, type SwitchRootProps } from './switch-root.svelte'
export {
  default as SwitchRootProvider,
  type SwitchRootProviderBaseProps,
  type SwitchRootProviderProps,
} from './switch-root-provider.svelte'
export { default as SwitchThumb, type SwitchThumbBaseProps, type SwitchThumbProps } from './switch-thumb.svelte'
export { switchAnatomy } from './switch.anatomy'
export { useSwitch, type UseSwitchProps, type UseSwitchReturn } from './use-switch.svelte'
export { useSwitchContext, type UseSwitchContext } from './use-switch-context'

export * as Switch from './switch'
