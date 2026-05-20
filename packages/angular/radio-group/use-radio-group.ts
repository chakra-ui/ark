import * as radioGroup from '@zag-js/radio-group'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELDSET_CONTEXT } from '@ark-ui/angular/fieldset'
import type {
  RadioGroupElementIds,
  RadioGroupMachineProps,
  RadioGroupSchema,
  RadioGroupService,
} from './radio-group.types'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseRadioGroupProps extends OptionalId<Omit<RadioGroupMachineProps, 'dir' | 'getRootNode'>> {}

export type UseRadioGroupReturn = UseMachineReturn<RadioGroupService['state'], radioGroup.Api, RadioGroupService>

export interface UseRadioGroupOptions {
  context: () => UseRadioGroupProps
}

type RadioGroupContext = Record<string, unknown>

export function useRadioGroup(options: UseRadioGroupOptions): UseRadioGroupReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fieldset = inject(ARK_FIELDSET_CONTEXT, { optional: true })
  const fallbackId = createArkId('radio-group')

  return useMachine<RadioGroupSchema, radioGroup.Api>({
    machine: radioGroup.machine as unknown as Machine<RadioGroupSchema>,
    context: () => {
      const props = options.context()
      const id = props.id ?? fallbackId
      const merged: Record<string, unknown> = {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...props,
        id,
      }
      if (fieldset) {
        const baseIds = (props.ids ?? {}) as NonNullable<RadioGroupElementIds>
        merged['ids'] = {
          label: fieldset.ids.legend,
          ...baseIds,
        }
        const disabled = Boolean(props.disabled) || fieldset.disabled()
        const invalid = Boolean(props.invalid) || fieldset.invalid()
        merged['disabled'] = disabled || undefined
        merged['invalid'] = invalid || undefined
      }
      return merged as RadioGroupContext
    },
    connect: (service, normalize) => radioGroup.connect(service as RadioGroupService, normalize),
  })
}
