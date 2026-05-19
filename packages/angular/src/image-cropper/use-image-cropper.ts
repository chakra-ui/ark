import * as imageCropper from '@zag-js/image-cropper'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseImageCropperProps extends OptionalId<Omit<imageCropper.Props, 'dir' | 'getRootNode'>> {}

export type UseImageCropperReturn = UseMachineReturn<
  imageCropper.Service['state'],
  imageCropper.Api,
  imageCropper.Service
>

export interface UseImageCropperOptions {
  context: () => UseImageCropperProps
}

type ImageCropperContext = Record<string, unknown>
type ImageCropperSchema = imageCropper.Machine extends Machine<infer TSchema> ? TSchema : never

export function useImageCropper(options: UseImageCropperOptions): UseImageCropperReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('image-cropper')

  return useMachine<ImageCropperSchema, imageCropper.Api>({
    machine: imageCropper.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as ImageCropperContext
    },
    connect: (service, normalize) => imageCropper.connect(service, normalize),
  })
}
