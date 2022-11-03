import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = HTMLAtlasProps<'p'>

export const DialogDescription = forwardRef<'p', DialogDescriptionProps>((props, ref) => {
  const { descriptionProps } = useDialogContext()
  return <atlas.p {...descriptionProps} {...props} ref={ref} />
})
