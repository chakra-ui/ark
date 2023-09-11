import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogCloseTriggerProps = HtmlArkProps<'button'>

export const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>(
  (props, ref) => {
    const { closeTriggerProps } = useDialogContext()
    const mergedProps = mergeProps(closeTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DialogCloseTrigger.displayName = 'DialogCloseTrigger'
