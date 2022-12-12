import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContainerProps = HTMLArkProps<'div'>

export const DialogContainer = forwardRef<'div', DialogContainerProps>((props, ref) => {
  const { containerProps } = useDialogContext()
  const mergedProps = mergeProps(containerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
