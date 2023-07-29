import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTitleProps = ComponentPropsWithoutRef<typeof ark.h2>

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => {
  const { titleProps } = useDialogContext()
  const mergedProps = mergeProps(titleProps, props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

DialogTitle.displayName = 'DialogTitle'
