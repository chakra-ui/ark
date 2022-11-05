import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = HTMLAtlasProps<'p'>

export const DialogDescription = forwardRef<'p', DialogDescriptionProps>((props, ref) => {
  const { descriptionProps } = useDialogContext()
  const mergedProps = mergeProps(descriptionProps, props)

  return <atlas.p {...mergedProps} ref={ref} />
})
