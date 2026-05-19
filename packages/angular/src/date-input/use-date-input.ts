import * as dateInput from '@zag-js/date-input'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseDateInputProps extends OptionalId<Omit<dateInput.Props, 'dir' | 'getRootNode'>> {}

export type UseDateInputReturn = UseMachineReturn<dateInput.Service['state'], dateInput.Api, dateInput.Service>

export interface UseDateInputOptions {
  context: () => UseDateInputProps
}

type DateInputContext = Record<string, unknown>
type DateInputSchema = dateInput.Machine extends Machine<infer TSchema> ? TSchema : never

export function useDateInput(options: UseDateInputOptions): UseDateInputReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = injectArkFieldContextOptional()
  const fallbackId = createArkId('date-input')

  return useMachine<DateInputSchema, dateInput.Api>({
    machine: dateInput.machine,
    context: () => {
      const props = options.context()
      const merged: dateInput.Props = {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode as () => ShadowRoot | Document | Node,
        id: props.id ?? fallbackId,
        locale: props.locale ?? locale.locale,
      }

      if (field) {
        merged.ids = {
          label: () => field.ids.label,
          hiddenInput: () => field.ids.control,
          ...(props.ids ?? {}),
        }
        merged.disabled = Boolean(props.disabled) || field.disabled() || undefined
        merged.readOnly = Boolean(props.readOnly) || field.readOnly() || undefined
        merged.required = Boolean(props.required) || field.required() || undefined
        merged.invalid = Boolean(props.invalid) || field.invalid() || undefined
      }

      return merged as unknown as DateInputContext
    },
    connect: (service, normalize) => dateInput.connect(service, normalize),
  })
}
