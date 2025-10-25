import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { splitImageCropperProps } from './split-image-cropper-props'
import { type UseImageCropperProps, useImageCropper } from './use-image-cropper'
import { ImageCropperProvider } from './use-image-cropper-context'

export interface ImageCropperRootBaseProps extends UseImageCropperProps, PolymorphicProps {}
export interface ImageCropperRootProps extends HTMLProps<'div'>, ImageCropperRootBaseProps {}

export const ImageCropperRoot = forwardRef<HTMLDivElement, ImageCropperRootProps>((props, ref) => {
  const [useImageCropperProps, localProps] = splitImageCropperProps(props)
  const imageCropper = useImageCropper(useImageCropperProps)
  const mergedProps = mergeProps(imageCropper.getRootProps(), localProps)

  return (
    <ImageCropperProvider value={imageCropper}>
      <ark.div {...mergedProps} ref={ref} />
    </ImageCropperProvider>
  )
})

ImageCropperRoot.displayName = 'ImageCropperRoot'
