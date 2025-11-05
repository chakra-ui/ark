import type { GridProps } from '@zag-js/image-cropper'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperGridBaseProps extends PolymorphicProps<'div'>, GridProps {}
export interface ImageCropperGridProps extends HTMLProps<'div'>, ImageCropperGridBaseProps {}

export const ImageCropperGrid = (props: ImageCropperGridProps) => {
  const api = useImageCropperContext()
  const mergedProps = mergeProps(() => api().getGridProps({ axis: props.axis }), props)

  return <ark.div {...mergedProps} />
}
