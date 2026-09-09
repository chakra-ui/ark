import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import type { SelectionState } from '@zag-js/image-cropper'

export interface ImageCropperSelectionState extends SelectionState {}

export interface ImageCropperSelectionBaseProps extends PolymorphicProps<'div', ImageCropperSelectionState> {}
export interface ImageCropperSelectionProps extends HTMLProps<'div'>, ImageCropperSelectionBaseProps {}

export const ImageCropperSelection = (props: ImageCropperSelectionProps) => {
  const api = useImageCropperContext()
  const mergedProps = mergeProps(() => api().getSelectionProps(), props)

  return <ark.div {...mergedProps} state={api().getSelectionState()} />
}
