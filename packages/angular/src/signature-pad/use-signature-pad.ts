import * as signaturePad from '@zag-js/signature-pad'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseSignaturePadProps extends OptionalId<Omit<signaturePad.Props, 'dir' | 'getRootNode'>> {}

export type UseSignaturePadReturn = UseMachineReturn<
  signaturePad.Service['state'],
  signaturePad.Api,
  signaturePad.Service
>

export interface UseSignaturePadOptions {
  context: () => UseSignaturePadProps
}

type SignaturePadContext = Record<string, unknown>
type SignaturePadSchema = signaturePad.Machine extends Machine<infer TSchema> ? TSchema : never
type MergedContext = {
  dir: 'ltr' | 'rtl'
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: signaturePad.Props['ids']
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
} & Omit<UseSignaturePadProps, 'id' | 'ids' | 'disabled' | 'readOnly' | 'required'>

export function useSignaturePad(options: UseSignaturePadOptions): UseSignaturePadReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = injectArkFieldContextOptional()
  const fallbackId = createArkId('signature-pad')

  return useMachine<SignaturePadSchema, signaturePad.Api>({
    machine: signaturePad.machine,
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
      }

      return merged as unknown as SignaturePadContext
    },
    connect: (service, normalize) => signaturePad.connect(service, normalize),
  })
}
