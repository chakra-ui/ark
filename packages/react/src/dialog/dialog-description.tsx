import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof ark.p>

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, ref) => {
    const { descriptionProps } = useDialogContext()
    const mergedProps = mergeProps(descriptionProps, props)

    return <ark.p {...mergedProps} ref={ref} />
  },
)

DialogDescription.displayName = 'DialogDescription'
