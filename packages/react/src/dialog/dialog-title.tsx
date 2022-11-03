import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTitleProps = HTMLAtlasProps<'h2'>

export const DialogTitle = forwardRef<'h2', DialogTitleProps>((props, ref) => {
  const { titleProps } = useDialogContext()
  return <atlas.h2 {...titleProps} {...props} ref={ref} />
})
