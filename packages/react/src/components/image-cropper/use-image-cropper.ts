import * as imageCropper from '@zag-js/image-cropper'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseImageCropperProps extends Optional<Omit<imageCropper.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseImageCropperReturn extends imageCropper.Api<PropTypes> {}

export const useImageCropper = (props?: UseImageCropperProps): UseImageCropperReturn => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: imageCropper.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(imageCropper.machine, machineProps)
  return imageCropper.connect(service, normalizeProps)
}
