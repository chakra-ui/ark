import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogBackdropProps = HTMLAtlasProps<'div'>

export const DialogBackdrop = forwardRef<'div', DialogBackdropProps>((props, ref) => {
  const { backdropProps } = useDialogContext()
  const mergedProps = mergeProps(backdropProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
