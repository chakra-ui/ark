import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PopoverCloseTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    PopoverCloseTriggerBaseProps {}

export const PopoverCloseTrigger = (props: PopoverCloseTriggerProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
