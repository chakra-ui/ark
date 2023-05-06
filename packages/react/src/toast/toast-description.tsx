import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useToastItemContext } from './toast-item-context'

export type ToastDescriptionProps = HTMLArkProps<'p'>

export const ToastDescription = forwardRef<'p', ToastDescriptionProps>((props, ref) => {
  const { descriptionProps, description } = useToastItemContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return (
    <ark.p {...mergedProps} ref={ref}>
      {description}
    </ark.p>
  )
})
