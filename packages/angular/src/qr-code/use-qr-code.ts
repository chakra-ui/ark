import * as qrCode from '@zag-js/qr-code'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseQrCodeProps extends OptionalId<Omit<qrCode.Props, 'dir' | 'getRootNode'>> {}

export type UseQrCodeReturn = UseMachineReturn<qrCode.Service['state'], qrCode.Api, qrCode.Service>

export interface UseQrCodeOptions {
  context: () => UseQrCodeProps
}

type QrCodeContext = Record<string, unknown>
type QrCodeSchema = qrCode.Machine extends Machine<infer TSchema> ? TSchema : never

export function useQrCode(options: UseQrCodeOptions): UseQrCodeReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('qr-code')

  return useMachine<QrCodeSchema, qrCode.Api>({
    machine: qrCode.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as QrCodeContext
    },
    connect: (service, normalize) => qrCode.connect(service, normalize),
  })
}
