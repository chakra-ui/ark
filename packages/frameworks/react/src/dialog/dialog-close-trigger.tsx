import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogCloseTriggerProps extends HTMLArkProps<'button'> {}

export const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>(
  (props, ref) => {
    const api = useDialogContext()
    const mergedProps = mergeProps(api.closeTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DialogCloseTrigger.displayName = 'DialogCloseTrigger'
