import * as numberInput from '@zag-js/number-input'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { NumberInputMachineProps } from './number-input.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseNumberInputProps extends OptionalId<Omit<NumberInputMachineProps, 'dir' | 'getRootNode'>> {}

export type UseNumberInputReturn = UseMachineReturn<numberInput.Service['state'], numberInput.Api, numberInput.Service>

export interface UseNumberInputOptions {
  context: () => UseNumberInputProps
}

type NumberInputContext = Record<string, unknown>
type NumberInputSchema = numberInput.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  locale: string
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: NumberInputMachineProps['ids']
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
  required?: boolean
} & Omit<UseNumberInputProps, 'id' | 'ids' | 'disabled' | 'invalid' | 'readOnly' | 'required'>

export function useNumberInput(options: UseNumberInputOptions): UseNumberInputReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('number-input')

  return useMachine<NumberInputSchema, numberInput.Api>({
    machine: numberInput.machine,
    context: () => {
      const props = options.context()
      const merged: MergedContext = {
        dir: locale.dir,
        locale: locale.locale,
        getRootNode: environment.getRootNode,
        ...props,
        id: props.id ?? fallbackId,
      }
      if (field) {
        const fieldIds = field.ids
        merged.ids = {
          label: fieldIds.label,
          input: fieldIds.control,
          ...(props.ids ?? {}),
        }
        const disabled = Boolean(props.disabled) || field.disabled()
        const invalid = Boolean(props.invalid) || field.invalid()
        const readOnly = Boolean(props.readOnly) || field.readOnly()
        const required = Boolean(props.required) || field.required()
        merged.disabled = disabled || undefined
        merged.invalid = invalid || undefined
        merged.readOnly = readOnly || undefined
        merged.required = required || undefined
      }
      return merged as unknown as NumberInputContext
    },
    connect: (service, normalize) => numberInput.connect(service, normalize),
  })
}
