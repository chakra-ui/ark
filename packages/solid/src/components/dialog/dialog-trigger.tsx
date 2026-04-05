import { mergeProps } from '@zag-js/solid'
import type { TriggerProps } from '@zag-js/dialog'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
export interface DialogTriggerProps extends Assign<HTMLProps<'button'>, DialogTriggerBaseProps> {}

export const DialogTrigger = (props: DialogTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getTriggerProps(triggerProps),
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    localProps,
  )

  return <ark.button {...mergedProps} />
}
