import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogCloseButtonProps = HTMLAtlasProps<'button'>

export const DialogCloseButton = forwardRef<'button', DialogCloseButtonProps>((props, ref) => {
  const { closeButtonProps } = useDialogContext()
  return <atlas.button {...closeButtonProps} {...props} ref={ref} />
})
