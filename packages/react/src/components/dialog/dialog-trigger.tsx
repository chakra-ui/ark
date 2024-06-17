import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogTriggerBaseProps extends PolymorphicProps {}
export interface DialogTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    DialogTriggerBaseProps {}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => {
  const dialog = useDialogContext()
  const presence = usePresenceContext()

  const mergedProps = mergeProps(
    {
      ...dialog.getTriggerProps(),
      'aria-controls': presence.unmounted ? undefined : dialog.getTriggerProps()['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

DialogTrigger.displayName = 'DialogTrigger'
