import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperImageBaseProps extends PolymorphicProps<'img'> {}
export interface ImageCropperImageProps extends HTMLProps<'img'>, ImageCropperImageBaseProps {}

export const ImageCropperImage = (props: ImageCropperImageProps) => {
  const api = useImageCropperContext()
  const mergedProps = mergeProps(() => api().getImageProps(), props)

  return <ark.img {...mergedProps} />
}
