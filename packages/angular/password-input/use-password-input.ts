import * as passwordInput from '@zag-js/password-input'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { PasswordInputMachineProps } from './password-input.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UsePasswordInputProps extends OptionalId<Omit<PasswordInputMachineProps, 'dir' | 'getRootNode'>> {}

export type UsePasswordInputReturn = UseMachineReturn<
  passwordInput.Service['state'],
  passwordInput.Api,
  passwordInput.Service
>

export interface UsePasswordInputOptions {
  context: () => UsePasswordInputProps
}

type PasswordInputContext = Record<string, unknown>
type PasswordInputSchema = passwordInput.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  locale: string
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: PasswordInputMachineProps['ids']
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
  required?: boolean
} & Omit<UsePasswordInputProps, 'id' | 'ids' | 'disabled' | 'invalid' | 'readOnly' | 'required'>

export function usePasswordInput(options: UsePasswordInputOptions): UsePasswordInputReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('password-input')

  return useMachine<PasswordInputSchema, passwordInput.Api>({
    machine: passwordInput.machine,
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
      return merged as unknown as PasswordInputContext
    },
    connect: (service, normalize) => passwordInput.connect(service, normalize),
  })
}
