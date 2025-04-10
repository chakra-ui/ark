export type { TickDetails as TimerTickDetails } from '@zag-js/timer'
export {
  default as TimerActionTrigger,
  type TimerActionTriggerBaseProps as ActionTriggerBaseProps,
  type TimerActionTriggerProps as ActionTriggerProps,
} from './timer-action-trigger.svelte'
export {
  default as TimerArea,
  type TimerAreaBaseProps as AreaBaseProps,
  type TimerAreaProps,
} from './timer-area.svelte'
export {
  default as TimerControl,
  type TimerControlBaseProps as ControlBaseProps,
  type TimerControlProps as ControlProps,
} from './timer-control.svelte'
export {
  default as TimerItem,
  type TimerItemBaseProps as ItemBaseProps,
  type TimerItemProps,
} from './timer-item.svelte'
export {
  default as TimerRootProvider,
  type TimerRootProviderBaseProps as RootProviderBaseProps,
  type TimerRootProviderProps as RootProviderProps,
} from './timer-root-provider.svelte'
export {
  default as TimerRoot,
  type TimerRootBaseProps as RootBaseProps,
  type TimerRootProps,
} from './timer-root.svelte'
export {
  default as TimerSeparator,
  type TimerSeparatorBaseProps as SeparatorBaseProps,
  type TimerSeparatorProps,
} from './timer-separator.svelte'
export { timerAnatomy } from './timer.anatomy'
export { useTimerContext, type UseTimerContext } from './use-timer-context'
export { useTimer, type UseTimerProps, type UseTimerReturn } from './use-timer.svelte'

export * as Timer from './timer'
