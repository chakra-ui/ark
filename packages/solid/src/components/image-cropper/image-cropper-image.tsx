import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import type { ImageState } from '@zag-js/image-cropper'

export interface ImageCropperImageState extends ImageState {}

export interface ImageCropperImageBaseProps extends PolymorphicProps<'img', ImageCropperImageState> {}
export interface ImageCropperImageProps extends HTMLProps<'img'>, ImageCropperImageBaseProps {}

export const ImageCropperImage = (props: ImageCropperImageProps) => {
  const api = useImageCropperContext()
  const mergedProps = mergeProps(() => api().getImageProps(), props)

  return <ark.img {...mergedProps} state={api().getImageState()} />
}
