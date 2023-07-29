import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastDescriptionProps = ComponentPropsWithoutRef<typeof ark.p>

export const ToastDescription = forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
  (props, ref) => {
    const { descriptionProps, description } = useToastItemContext()
    const mergedProps = mergeProps(descriptionProps, props)

    return (
      <ark.p {...mergedProps} ref={ref}>
        {description}
      </ark.p>
    )
  },
)

ToastDescription.displayName = 'ToastDescription'
