import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDialogContext } from './dialog-context'

export type DialogContainerProps = HTMLArkProps<'div'>

export const DialogContainer = forwardRef<'div'>((props, ref) => {
  const { containerProps } = useDialogContext()
  const mergedProps = mergeProps(containerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
