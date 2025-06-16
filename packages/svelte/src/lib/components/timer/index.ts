export type { TickDetails as TimerTickDetails } from '@zag-js/timer'
export {
  default as TimerActionTrigger,
  type TimerActionTriggerBaseProps,
  type TimerActionTriggerProps,
} from './timer-action-trigger.svelte'
export { default as TimerArea, type TimerAreaBaseProps, type TimerAreaProps } from './timer-area.svelte'
export { default as TimerContext, type TimerContextProps } from './timer-context.svelte'
export { default as TimerControl, type TimerControlBaseProps, type TimerControlProps } from './timer-control.svelte'
export { default as TimerItem, type TimerItemBaseProps, type TimerItemProps } from './timer-item.svelte'
export {
  default as TimerRootProvider,
  type TimerRootProviderBaseProps,
  type TimerRootProviderProps,
} from './timer-root-provider.svelte'
export { default as TimerRoot, type TimerRootBaseProps, type TimerRootProps } from './timer-root.svelte'
export {
  default as TimerSeparator,
  type TimerSeparatorBaseProps,
  type TimerSeparatorProps,
} from './timer-separator.svelte'
export { timerAnatomy } from './timer.anatomy'
export { useTimerContext, type UseTimerContext } from './use-timer-context'
export { useTimer, type UseTimerProps, type UseTimerReturn } from './use-timer.svelte'

export * as Timer from './timer'
