import * as zagSwitch from '@zag-js/switch'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import type { SwitchMachineProps } from './switch.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseSwitchProps extends OptionalId<Omit<SwitchMachineProps, 'dir' | 'getRootNode'>> {}

export type UseSwitchReturn = UseMachineReturn<zagSwitch.Service['state'], zagSwitch.Api, zagSwitch.Service>

export interface UseSwitchOptions {
  context: () => UseSwitchProps
}

type SwitchContext = Record<string, unknown>
type SwitchSchema = zagSwitch.Machine extends Machine<infer TSchema> ? TSchema : never

export function useSwitch(options: UseSwitchOptions): UseSwitchReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = injectArkFieldContextOptional()
  const fallbackId = createArkId('switch')

  return useMachine<SwitchSchema, zagSwitch.Api>({
    machine: zagSwitch.machine,
    context: () => {
      const props = options.context()
      const merged: Record<string, unknown> = {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...props,
        id: props.id ?? fallbackId,
      }
      if (field) {
        const fieldIds = field.ids
        merged['ids'] = {
          label: fieldIds.label,
          hiddenInput: fieldIds.control,
          ...(props.ids ?? {}),
        }
        merged['disabled'] = Boolean(props.disabled) || field.disabled() || undefined
        merged['invalid'] = Boolean(props.invalid) || field.invalid() || undefined
        merged['readOnly'] = Boolean(props.readOnly) || field.readOnly() || undefined
        merged['required'] = Boolean(props.required) || field.required() || undefined
      }
      return merged as SwitchContext
    },
    connect: (service, normalize) => zagSwitch.connect(service, normalize),
  })
}
