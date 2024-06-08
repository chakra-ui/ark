import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogTitleProps extends HTMLArkProps<'h2'> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

DialogTitle.displayName = 'DialogTitle'
