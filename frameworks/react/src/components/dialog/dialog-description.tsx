import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogDescriptionProps extends HTMLArkProps<'div'> {}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, ref) => {
    const dialog = useDialogContext()
    const mergedProps = mergeProps(dialog.descriptionProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DialogDescription.displayName = 'DialogDescription'
