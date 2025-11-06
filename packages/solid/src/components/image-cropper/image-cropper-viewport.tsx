import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperViewportBaseProps extends PolymorphicProps<'div'> {}
export interface ImageCropperViewportProps extends HTMLProps<'div'>, ImageCropperViewportBaseProps {}

export const ImageCropperViewport = (props: ImageCropperViewportProps) => {
  const api = useImageCropperContext()
  const mergedProps = mergeProps(() => api().getViewportProps(), props)

  return <ark.div {...mergedProps} />
}
