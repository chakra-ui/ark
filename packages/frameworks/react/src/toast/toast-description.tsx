import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastDescriptionProps = HTMLArkProps<'p'>

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
