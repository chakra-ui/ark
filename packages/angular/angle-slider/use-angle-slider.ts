import * as angleSlider from '@zag-js/angle-slider'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { AngleSliderMachineProps } from './angle-slider.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseAngleSliderProps extends OptionalId<Omit<AngleSliderMachineProps, 'dir' | 'getRootNode'>> {}

export type UseAngleSliderReturn = UseMachineReturn<angleSlider.Service['state'], angleSlider.Api, angleSlider.Service>

export interface UseAngleSliderOptions {
  context: () => UseAngleSliderProps
}

type AngleSliderContext = Record<string, unknown>
type AngleSliderSchema = angleSlider.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: AngleSliderMachineProps['ids']
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
} & Omit<UseAngleSliderProps, 'id' | 'ids' | 'disabled' | 'invalid' | 'readOnly'>

export function useAngleSlider(options: UseAngleSliderOptions): UseAngleSliderReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('angle-slider')

  return useMachine<AngleSliderSchema, angleSlider.Api>({
    machine: angleSlider.machine,
    context: () => {
      const props = options.context()
      const merged: MergedContext = {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...props,
        id: props.id ?? fallbackId,
      }
      if (field) {
        const fieldIds = field.ids
        merged.ids = {
          label: fieldIds.label,
          hiddenInput: fieldIds.control,
          ...(props.ids ?? {}),
        }
        const disabled = Boolean(props.disabled) || field.disabled()
        const invalid = Boolean(props.invalid) || field.invalid()
        const readOnly = Boolean(props.readOnly) || field.readOnly()
        merged.disabled = disabled || undefined
        merged.invalid = invalid || undefined
        merged.readOnly = readOnly || undefined
      }
      return merged as unknown as AngleSliderContext
    },
    connect: (service, normalize) => angleSlider.connect(service, normalize),
  })
}
