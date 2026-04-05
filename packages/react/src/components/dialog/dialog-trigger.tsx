import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/dialog'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DialogTriggerProps extends Assign<HTMLProps<'button'>, DialogTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const dialog = useDialogContext()
  const presence = usePresenceContext()

  const triggerPropsRaw = dialog.getTriggerProps(triggerProps)
  const mergedProps = mergeProps(
    {
      ...triggerPropsRaw,
      'aria-controls': presence.unmounted ? undefined : triggerPropsRaw['aria-controls'],
    },
    localProps,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

DialogTrigger.displayName = 'DialogTrigger'
