import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogUnderlayProps = HTMLAtlasProps<'div'>

export const DialogUnderlay = forwardRef<'div', DialogUnderlayProps>((props, ref) => {
  const { underlayProps } = useDialogContext()
  return <atlas.div {...underlayProps} {...props} ref={ref} />
})
