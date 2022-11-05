import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogCloseButtonProps = HTMLAtlasProps<'button'>

export const DialogCloseButton = forwardRef<'button', DialogCloseButtonProps>((props, ref) => {
  const { closeButtonProps } = useDialogContext()
  const mergedProps = mergeProps(closeButtonProps, props)

  return <atlas.button {...mergedProps} ref={ref} />
})
