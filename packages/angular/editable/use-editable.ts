import * as editable from '@zag-js/editable'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { EditableMachineProps } from './editable.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseEditableProps extends OptionalId<Omit<EditableMachineProps, 'dir' | 'getRootNode'>> {}

export type UseEditableReturn = UseMachineReturn<editable.Service['state'], editable.Api, editable.Service>

export interface UseEditableOptions {
  context: () => UseEditableProps
}

type EditableContext = Record<string, unknown>
type EditableSchema = editable.Machine extends Machine<infer TSchema> ? TSchema : never

export function useEditable(options: UseEditableOptions): UseEditableReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('editable')

  return useMachine<EditableSchema, editable.Api>({
    machine: editable.machine,
    context: () => {
      const props = options.context()
      const merged: Record<string, unknown> = {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...props,
        id: props.id ?? fallbackId,
      }
      if (field) {
        const fieldIds = field.ids
        merged['ids'] = {
          label: fieldIds.label,
          input: fieldIds.control,
          ...(props.ids ?? {}),
        }
        merged['disabled'] = Boolean(props.disabled) || field.disabled()
        merged['invalid'] = Boolean(props.invalid) || field.invalid()
        merged['readOnly'] = Boolean(props.readOnly) || field.readOnly()
        merged['required'] = Boolean(props.required) || field.required()
      }
      return merged as EditableContext
    },
    connect: (service, normalize) => editable.connect(service, normalize),
  })
}
