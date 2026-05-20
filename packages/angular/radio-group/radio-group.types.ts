import type { Machine as ZagMachine } from '@zag-js/core'
import type { Machine } from '@zag-js/radio-group'

export type {
  Api as RadioGroupApi,
  ElementIds as RadioGroupElementIds,
  ItemProps as RadioGroupItemProps,
  ItemState as RadioGroupItemState,
  Machine as RadioGroupMachine,
  Props as RadioGroupMachineProps,
  Service as RadioGroupService,
  ValueChangeDetails as RadioGroupValueChangeDetails,
} from '@zag-js/radio-group'

export type RadioGroupOrientation = 'horizontal' | 'vertical'

export type RadioGroupSchema = Machine extends ZagMachine<infer S> ? S : never
