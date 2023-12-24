import { defineComponent } from 'vue'
import { PopoverProvider } from './popover-context'
import { emits, props } from './popover.props'
import { usePopover, type UsePopoverProps } from './use-popover'

export interface PopoverProps extends UsePopoverProps {}

export const Popover = defineComponent<PopoverProps>(
  (props, { slots, emit }) => {
    const api = usePopover(props, emit)
    PopoverProvider(api)

    return () => slots.default?.(api.value)
  },
  {
    name: 'Popover',
    props,
    emits,
  },
)
