import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogTitleProps extends HTMLArkProps<'h2'> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => {
  const api = useDialogContext()
  const mergedProps = mergeProps(api.titleProps, props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

DialogTitle.displayName = 'DialogTitle'
