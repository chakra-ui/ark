import * as imageCropper from '@zag-js/image-cropper'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseImageCropperProps extends Optional<Omit<imageCropper.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseImageCropperReturn extends Accessor<imageCropper.Api<PropTypes>> {}

export const useImageCropper = (props: MaybeAccessor<UseImageCropperProps> = {}): UseImageCropperReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const imageCropperProps = runIfFn(props)

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...imageCropperProps,
  }))

  const service = useMachine(imageCropper.machine as any, machineProps)
  return createMemo(() => imageCropper.connect(service as any, normalizeProps))
}
