import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTitleProps = HTMLArkProps<'h2'>

export const DialogTitle = forwardRef<'h2', DialogTitleProps>((props, ref) => {
  const { titleProps } = useDialogContext()
  const mergedProps = mergeProps(titleProps, props)

  return <ark.h2 {...mergedProps} ref={ref} />
})
