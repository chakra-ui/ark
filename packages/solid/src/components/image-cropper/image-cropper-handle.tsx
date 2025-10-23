import type { HandlePosition } from '@zag-js/image-cropper'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperHandleBaseProps extends PolymorphicProps<'div'> {
  /**
   * The position of the handle
   */
  position: HandlePosition
}
export interface ImageCropperHandleProps extends HTMLProps<'div'>, ImageCropperHandleBaseProps {}

export const ImageCropperHandle = (props: ImageCropperHandleProps) => {
  const api = useImageCropperContext()
  const mergedProps = mergeProps(() => api().getHandleProps({ position: props.position }), props)

  return <ark.div {...mergedProps} />
}
