import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseImageCropperReturn } from './use-image-cropper'
import { ImageCropperProvider } from './use-image-cropper-context'

interface RootProviderProps {
  value: UseImageCropperReturn
}

export interface ImageCropperRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface ImageCropperRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    ImageCropperRootProviderBaseProps {}

export const ImageCropperRootProvider = (props: ImageCropperRootProviderProps) => {
  const [{ value: imageCropper }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => imageCropper().getRootProps(), localProps)

  return (
    <ImageCropperProvider value={imageCropper}>
      <ark.div {...mergedProps} />
    </ImageCropperProvider>
  )
}
