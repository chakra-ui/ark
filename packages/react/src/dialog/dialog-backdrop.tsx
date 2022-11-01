import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogBackdropProps = HTMLAtlasProps<'div'>

export const DialogBackdrop = forwardRef<'div', DialogBackdropProps>((props, ref) => {
  const { backdropProps } = useDialogContext()
  return <atlas.div {...backdropProps} {...props} ref={ref} />
})
