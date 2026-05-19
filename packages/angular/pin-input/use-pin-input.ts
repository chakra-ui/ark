import * as pinInput from '@zag-js/pin-input'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { PinInputMachineProps } from './pin-input.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UsePinInputProps extends OptionalId<Omit<PinInputMachineProps, 'dir' | 'getRootNode'>> {}

export type UsePinInputReturn = UseMachineReturn<pinInput.Service['state'], pinInput.Api, pinInput.Service>

export interface UsePinInputOptions {
  context: () => UsePinInputProps
}

type PinInputContext = Record<string, unknown>
type PinInputSchema = pinInput.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  locale: string
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: PinInputMachineProps['ids']
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
  required?: boolean
} & Omit<UsePinInputProps, 'id' | 'ids' | 'disabled' | 'invalid' | 'readOnly' | 'required'>

export function usePinInput(options: UsePinInputOptions): UsePinInputReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('pin-input')

  return useMachine<PinInputSchema, pinInput.Api>({
    machine: pinInput.machine,
    context: () => {
      const props = options.context()
      const id = props.id ?? fallbackId
      // Pin Input composes a root id as `pin-input:${id}` and uses it in an
      // unquoted CSS attribute selector for `data-ownedby`. Provide an explicit
      // colon-free root id so the selector survives both browser and jsdom
      // selector parsers when ids contain double-colon separators.
      const safeRootId = `ark-pin-input-${String(id).replace(/[^a-zA-Z0-9_-]/g, '-')}`
      const baseIds = (props.ids ?? {}) as NonNullable<PinInputMachineProps['ids']>
      const merged: MergedContext = {
        dir: locale.dir,
        locale: locale.locale,
        getRootNode: environment.getRootNode,
        ...props,
        id,
        ids: {
          ...baseIds,
          root: baseIds.root ?? safeRootId,
        },
      }
      if (field) {
        const fieldIds = field.ids
        merged.ids = {
          label: fieldIds.label,
          hiddenInput: fieldIds.control,
          ...(merged.ids ?? {}),
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
      return merged as unknown as PinInputContext
    },
    connect: (service, normalize) => pinInput.connect(service, normalize),
  })
}
