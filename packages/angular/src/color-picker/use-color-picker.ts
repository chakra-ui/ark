import * as colorPicker from '@zag-js/color-picker'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseColorPickerProps extends OptionalId<Omit<colorPicker.Props, 'dir' | 'getRootNode'>> {}

export type UseColorPickerReturn = UseMachineReturn<colorPicker.Service['state'], colorPicker.Api, colorPicker.Service>

export interface UseColorPickerOptions {
  context: () => UseColorPickerProps
}

type ColorPickerContext = Record<string, unknown>
type ColorPickerSchema = colorPicker.Machine extends Machine<infer TSchema> ? TSchema : never
type MergedContext = {
  dir: 'ltr' | 'rtl'
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: colorPicker.Props['ids']
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
} & Omit<UseColorPickerProps, 'id' | 'ids' | 'disabled' | 'readOnly' | 'required' | 'invalid'>

export function useColorPicker(options: UseColorPickerOptions): UseColorPickerReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = injectArkFieldContextOptional()
  const fallbackId = createArkId('color-picker')

  return useMachine<ColorPickerSchema, colorPicker.Api>({
    machine: colorPicker.machine,
    context: () => {
      const props = options.context()
      const merged: MergedContext = {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      }

      if (field) {
        merged.ids = {
          label: field.ids.label,
          hiddenInput: field.ids.control,
          ...(props.ids ?? {}),
        }
        merged.disabled = Boolean(props.disabled) || field.disabled() || undefined
        merged.readOnly = Boolean(props.readOnly) || field.readOnly() || undefined
        merged.required = Boolean(props.required) || field.required() || undefined
        merged.invalid = Boolean(props.invalid) || field.invalid() || undefined
      }

      return merged as unknown as ColorPickerContext
    },
    connect: (service, normalize) => colorPicker.connect(service, normalize),
  })
}
