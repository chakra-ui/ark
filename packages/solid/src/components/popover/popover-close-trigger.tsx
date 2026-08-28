import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PopoverCloseTriggerProps extends HTMLProps<'button'>, PopoverCloseTriggerBaseProps {}

export const PopoverCloseTrigger = (props: PopoverCloseTriggerProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
