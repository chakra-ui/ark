import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogDescriptionBaseProps extends PolymorphicProps {}
export interface DialogDescriptionProps extends HTMLProps<'div'>, DialogDescriptionBaseProps {}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, ref) => {
    const dialog = useDialogContext()
    const mergedProps = mergeProps(dialog.getDescriptionProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DialogDescription.displayName = 'DialogDescription'
