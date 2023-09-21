import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogDescriptionProps extends HTMLArkProps<'p'> {}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, ref) => {
    const api = useDialogContext()
    const mergedProps = mergeProps(api.descriptionProps, props)

    return <ark.p {...mergedProps} ref={ref} />
  },
)

DialogDescription.displayName = 'DialogDescription'
