import * as combobox from '@zag-js/combobox'
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
import type {
  ComboboxApi,
  ComboboxElementIds,
  ComboboxMachineProps,
  ComboboxSchema,
  ComboboxService,
} from './combobox.types'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseComboboxProps<T extends CollectionItem = CollectionItem> extends OptionalId<
  Omit<ComboboxMachineProps<T>, 'dir' | 'getRootNode'>
> {}

export type UseComboboxApi<T extends CollectionItem = CollectionItem> = ComboboxApi<PropTypes, T>

export type UseComboboxReturn<T extends CollectionItem = CollectionItem> = UseMachineReturn<
  ComboboxService<T>['state'],
  UseComboboxApi<T>,
  ComboboxService<T>
>

export interface UseComboboxOptions<T extends CollectionItem = CollectionItem> {
  context: () => UseComboboxProps<T>
}

type ComboboxContext = Record<string, unknown>

export function useCombobox<T extends CollectionItem = CollectionItem>(
  options: UseComboboxOptions<T>,
): UseComboboxReturn<T> {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('combobox')

  return useMachine<ComboboxSchema<T>, UseComboboxApi<T>>({
    machine: combobox.machine as unknown as Machine<ComboboxSchema<T>>,
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
        const baseIds = ((props as { ids?: ComboboxElementIds }).ids ?? {}) as NonNullable<ComboboxElementIds>
        merged['ids'] = {
          label: fieldIds.label,
          input: fieldIds.control,
          ...baseIds,
        }
        const p = props as { disabled?: boolean; invalid?: boolean; required?: boolean; readOnly?: boolean }
        const disabled = Boolean(p.disabled) || field.disabled()
        const invalid = Boolean(p.invalid) || field.invalid()
        const required = Boolean(p.required) || field.required()
        const readOnly = Boolean(p.readOnly) || field.readOnly()
        merged['disabled'] = disabled || undefined
        merged['invalid'] = invalid || undefined
        merged['required'] = required || undefined
        merged['readOnly'] = readOnly || undefined
      }
      return merged as unknown as ComboboxContext
    },
    connect: (service, normalize) =>
      (combobox.connect as unknown as (s: ComboboxService<T>, n: typeof normalize) => UseComboboxApi<T>)(
        service as unknown as ComboboxService<T>,
        normalize,
      ),
  }) as UseComboboxReturn<T>
}
