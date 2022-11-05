import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLAtlasProps<'div'>

export const DialogContent = forwardRef<'div', DialogContentProps>((props, ref) => {
  const { contentProps } = useDialogContext()
  const mergedProps = mergeProps(contentProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
