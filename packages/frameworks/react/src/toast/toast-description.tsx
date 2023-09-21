import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export interface ToastDescriptionProps extends HTMLArkProps<'p'> {}

export const ToastDescription = forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
  (props, ref) => {
    const api = useToastItemContext()
    const mergedProps = mergeProps(api.descriptionProps, props)

    return (
      <ark.p {...mergedProps} ref={ref}>
        {api.description}
      </ark.p>
    )
  },
)

ToastDescription.displayName = 'ToastDescription'
