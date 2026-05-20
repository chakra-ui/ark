import * as checkbox from '@zag-js/checkbox'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { CheckboxCheckedChangeDetails, CheckboxMachineProps } from './checkbox.types'
import { injectArkCheckboxGroupContextOptional } from './use-checkbox-group-context'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseCheckboxProps extends OptionalId<Omit<CheckboxMachineProps, 'dir' | 'getRootNode'>> {}

export type UseCheckboxReturn = UseMachineReturn<checkbox.Service['state'], checkbox.Api, checkbox.Service>

export interface UseCheckboxOptions {
  context: () => UseCheckboxProps
}

type CheckboxContext = Record<string, unknown>
type CheckboxSchema = checkbox.Machine extends Machine<infer TSchema> ? TSchema : never

export function useCheckbox(options: UseCheckboxOptions = { context: () => ({}) }): UseCheckboxReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const group = injectArkCheckboxGroupContextOptional()
  const fallbackId = createArkId('checkbox')

  return useMachine<CheckboxSchema, checkbox.Api>({
    machine: checkbox.machine,
    context: () => {
      const ownProps = options.context()
      const groupProps = group?.getItemProps({ value: ownProps.value })
      const groupCheckedChange = groupProps?.onCheckedChange
      const ownCheckedChange = ownProps.onCheckedChange
      const ids = {
        label: field?.ids.label,
        hiddenInput: field?.ids.control,
        ...(ownProps.ids ?? {}),
      }

      return {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...groupProps,
        ...ownProps,
        id: ownProps.id ?? fallbackId,
        ids,
        checked: ownProps.checked ?? groupProps?.checked,
        name: ownProps.name ?? groupProps?.name,
        disabled:
          Boolean(groupProps?.disabled) || Boolean(ownProps.disabled) || Boolean(field?.disabled()) || undefined,
        invalid: Boolean(groupProps?.invalid) || Boolean(ownProps.invalid) || Boolean(field?.invalid()) || undefined,
        readOnly:
          Boolean(groupProps?.readOnly) || Boolean(ownProps.readOnly) || Boolean(field?.readOnly()) || undefined,
        required: Boolean(ownProps.required) || Boolean(field?.required()) || undefined,
        onCheckedChange: (details: CheckboxCheckedChangeDetails) => {
          groupCheckedChange?.()
          ownCheckedChange?.(details)
        },
      } as CheckboxContext
    },
    connect: (service, normalize) => checkbox.connect(service, normalize),
  })
}
