import * as slider from '@zag-js/slider'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { SliderElementIds, SliderMachineProps } from './slider.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseSliderProps extends OptionalId<Omit<SliderMachineProps, 'dir' | 'getRootNode'>> {}

export type UseSliderReturn = UseMachineReturn<slider.Service['state'], slider.Api, slider.Service>

export interface UseSliderOptions {
  context: () => UseSliderProps
}

type SliderContext = Record<string, unknown>
type SliderSchema = slider.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: SliderMachineProps['ids']
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
} & Omit<UseSliderProps, 'id' | 'ids' | 'disabled' | 'invalid' | 'readOnly'>

export function useSlider(options: UseSliderOptions): UseSliderReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('slider')

  return useMachine<SliderSchema, slider.Api>({
    machine: slider.machine,
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
        const baseIds = (props.ids ?? {}) as NonNullable<SliderElementIds>
        merged.ids = {
          label: fieldIds.label,
          hiddenInput: baseIds.hiddenInput,
          ...baseIds,
        }
        const disabled = Boolean(props.disabled) || field.disabled()
        const invalid = Boolean(props.invalid) || field.invalid()
        const readOnly = Boolean(props.readOnly) || field.readOnly()
        merged.disabled = disabled || undefined
        merged.invalid = invalid || undefined
        merged.readOnly = readOnly || undefined
      }
      return merged as unknown as SliderContext
    },
    connect: (service, normalize) => slider.connect(service, normalize),
  })
}
