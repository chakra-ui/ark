import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = HTMLArkProps<'p'>

export const DialogDescription = forwardRef<'p'>((props, ref) => {
  const { descriptionProps } = useDialogContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return <ark.p {...mergedProps} ref={ref} />
})
