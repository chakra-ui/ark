import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = HtmlArkProps<'p'>

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, ref) => {
    const { descriptionProps } = useDialogContext()
    const mergedProps = mergeProps(descriptionProps, props)

    return <ark.p {...mergedProps} ref={ref} />
  },
)

DialogDescription.displayName = 'DialogDescription'
