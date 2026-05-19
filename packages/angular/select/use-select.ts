import * as select from '@zag-js/select'
import type { CollectionItem } from '@zag-js/collection'
import type { Machine } from '@zag-js/core'
import type { PropTypes } from '@zag-js/types'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { SelectApi, SelectElementIds, SelectMachineProps, SelectSchema, SelectService } from './select.types'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseSelectProps<T extends CollectionItem = CollectionItem> extends OptionalId<
  Omit<SelectMachineProps<T>, 'dir' | 'getRootNode'>
> {}

export type UseSelectApi<T extends CollectionItem = CollectionItem> = SelectApi<PropTypes, T>

export type UseSelectReturn<T extends CollectionItem = CollectionItem> = UseMachineReturn<
  SelectService<T>['state'],
  UseSelectApi<T>,
  SelectService<T>
>

export interface UseSelectOptions<T extends CollectionItem = CollectionItem> {
  context: () => UseSelectProps<T>
}

type SelectContext = Record<string, unknown>

export function useSelect<T extends CollectionItem = CollectionItem>(options: UseSelectOptions<T>): UseSelectReturn<T> {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('select')

  return useMachine<SelectSchema<T>, UseSelectApi<T>>({
    machine: select.machine as unknown as Machine<SelectSchema<T>>,
    context: () => {
      const props = options.context()
      const id = props.id ?? fallbackId
      const merged: Record<string, unknown> = {
        dir: locale.dir,
        locale: locale.locale,
        getRootNode: environment.getRootNode,
        ...props,
        id,
      }
      if (field) {
        const fieldIds = field.ids
        const baseIds = (props.ids ?? {}) as NonNullable<SelectElementIds>
        merged['ids'] = {
          label: fieldIds.label,
          hiddenSelect: fieldIds.control,
          ...baseIds,
        }
        const disabled = Boolean(props.disabled) || field.disabled()
        const invalid = Boolean(props.invalid) || field.invalid()
        const required = Boolean(props.required) || field.required()
        const readOnly = Boolean(props.readOnly) || field.readOnly()
        merged['disabled'] = disabled || undefined
        merged['invalid'] = invalid || undefined
        merged['required'] = required || undefined
        merged['readOnly'] = readOnly || undefined
      }
      return merged as unknown as SelectContext
    },
    connect: (service, normalize) =>
      (select.connect as unknown as (s: SelectService<T>, n: typeof normalize) => UseSelectApi<T>)(
        service as unknown as SelectService<T>,
        normalize,
      ),
  }) as UseSelectReturn<T>
}
