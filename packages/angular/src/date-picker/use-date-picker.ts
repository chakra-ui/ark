import * as datePicker from '@zag-js/date-picker'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseDatePickerProps extends OptionalId<Omit<datePicker.Props, 'dir' | 'getRootNode'>> {}

export type UseDatePickerReturn = UseMachineReturn<datePicker.Service['state'], datePicker.Api, datePicker.Service>

export interface UseDatePickerOptions {
  context: () => UseDatePickerProps
}

type DatePickerContext = Record<string, unknown>
type DatePickerSchema = datePicker.Machine extends Machine<infer TSchema> ? TSchema : never

export function useDatePicker(options: UseDatePickerOptions): UseDatePickerReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = injectArkFieldContextOptional()
  const fallbackId = createArkId('date-picker')

  return useMachine<DatePickerSchema, datePicker.Api>({
    machine: datePicker.machine,
    context: () => {
      const props = options.context()
      const merged: datePicker.Props = {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode as datePicker.Props['getRootNode'],
        id: props.id ?? fallbackId,
        locale: props.locale ?? locale.locale,
      }

      if (field) {
        merged.ids = {
          label: () => field.ids.label,
          input: () => field.ids.control,
          ...(props.ids ?? {}),
        }
        merged.disabled = Boolean(props.disabled) || field.disabled() || undefined
        merged.readOnly = Boolean(props.readOnly) || field.readOnly() || undefined
        merged.required = Boolean(props.required) || field.required() || undefined
        merged.invalid = Boolean(props.invalid) || field.invalid() || undefined
      }

      return merged as unknown as DatePickerContext
    },
    connect: (service, normalize) => datePicker.connect(service, normalize),
  })
}
