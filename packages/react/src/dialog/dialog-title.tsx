import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDialogContext } from './dialog-context'

export type DialogTitleProps = HTMLArkProps<'h2'>

export const DialogTitle = forwardRef<'h2'>((props, ref) => {
  const { titleProps } = useDialogContext()
  const mergedProps = mergeProps(titleProps, props)

  return <ark.h2 {...mergedProps} ref={ref} />
})
