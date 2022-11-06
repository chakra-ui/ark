import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = HTMLArkProps<'p'>

export const DialogDescription = forwardRef<'p', DialogDescriptionProps>((props, ref) => {
  const { descriptionProps } = useDialogContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return <ark.p {...mergedProps} ref={ref} />
})
