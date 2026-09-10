import type { RootState } from '@zag-js/image-cropper'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseImageCropperReturn } from './use-image-cropper.ts'
import { ImageCropperProvider } from './use-image-cropper-context.ts'

interface RootProviderProps {
  value: UseImageCropperReturn
}

export interface ImageCropperRootProviderState extends RootState {}

export interface ImageCropperRootProviderBaseProps extends PolymorphicProps<'div', ImageCropperRootProviderState> {}
export interface ImageCropperRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, ImageCropperRootProviderBaseProps {}

export const ImageCropperRootProvider = (props: ImageCropperRootProviderProps) => {
  const [{ value: imageCropper }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => imageCropper().getRootProps(), localProps)

  return (
    <ImageCropperProvider value={imageCropper}>
      <ark.div {...mergedProps} state={imageCropper().getRootState()} />
    </ImageCropperProvider>
  )
}
