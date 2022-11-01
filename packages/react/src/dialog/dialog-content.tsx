import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLAtlasProps<'div'>

export const DialogContent = forwardRef<'div', DialogContentProps>((props, ref) => {
  const { contentProps } = useDialogContext()
  return <atlas.div {...contentProps} {...props} ref={ref} />
})
