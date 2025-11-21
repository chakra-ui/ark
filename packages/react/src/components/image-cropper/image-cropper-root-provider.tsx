import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseImageCropperReturn } from './use-image-cropper'
import { ImageCropperProvider } from './use-image-cropper-context'

interface RootProviderProps {
  value: UseImageCropperReturn
}

export interface ImageCropperRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ImageCropperRootProviderProps extends HTMLProps<'div'>, ImageCropperRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const ImageCropperRootProvider = forwardRef<HTMLDivElement, ImageCropperRootProviderProps>((props, ref) => {
  const [{ value: imageCropper }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(imageCropper.getRootProps(), localProps)

  return (
    <ImageCropperProvider value={imageCropper}>
      <ark.div {...mergedProps} ref={ref} />
    </ImageCropperProvider>
  )
})

ImageCropperRootProvider.displayName = 'ImageCropperRootProvider'
