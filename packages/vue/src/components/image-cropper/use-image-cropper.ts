import * as imageCropper from '@zag-js/image-cropper'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './image-cropper.types'

export interface UseImageCropperProps extends Optional<Omit<imageCropper.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseImageCropperReturn extends ComputedRef<imageCropper.Api<PropTypes>> {}

export const useImageCropper = (props: MaybeRef<UseImageCropperProps> = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<imageCropper.Props>(() => {
    const localProps = toValue<UseImageCropperProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onZoomChange(details) {
        emit?.('zoomChange', details)
        emit?.('update:zoom', details.zoom)
        localProps.onZoomChange?.(details)
      },
      onRotationChange(details) {
        emit?.('rotationChange', details)
        emit?.('update:rotation', details.rotation)
        localProps.onRotationChange?.(details)
      },
      onFlipChange(details) {
        emit?.('flipChange', details)
        emit?.('update:flip', details.flip)
        localProps.onFlipChange?.(details)
      },
      onCropChange(details) {
        emit?.('cropChange', details)
        emit?.('update:crop', details.crop)
        localProps.onCropChange?.(details)
      },
    }
  })

  const service = useMachine(imageCropper.machine, context)
  return computed(() => imageCropper.connect(service, normalizeProps))
}
