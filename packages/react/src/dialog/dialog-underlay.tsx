import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'
export type DialogUnderlayProps = HTMLAtlasProps<'div'>

export const DialogUnderlay = forwardRef<'div', DialogUnderlayProps>((props, ref) => {
  const { underlayProps } = useDialogContext()
  const mergedProps = mergeProps(underlayProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
