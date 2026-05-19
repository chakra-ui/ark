import * as listbox from '@zag-js/listbox'
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
import type { ListboxMachineProps, ListboxSchema, ListboxService } from './listbox.types'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseListboxProps<T extends CollectionItem = CollectionItem> extends OptionalId<
  Omit<ListboxMachineProps<T>, 'dir' | 'getRootNode'>
> {}

export type UseListboxApi<T extends CollectionItem = CollectionItem> = listbox.Api<PropTypes, T>

export type UseListboxReturn<T extends CollectionItem = CollectionItem> = UseMachineReturn<
  ListboxService<T>['state'],
  UseListboxApi<T>,
  ListboxService<T>
>

export interface UseListboxOptions<T extends CollectionItem = CollectionItem> {
  context: () => UseListboxProps<T>
}

type ListboxContext = Record<string, unknown>

export function useListbox<T extends CollectionItem = CollectionItem>(
  options: UseListboxOptions<T>,
): UseListboxReturn<T> {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('listbox')

  return useMachine<ListboxSchema<T>, UseListboxApi<T>>({
    machine: listbox.machine as unknown as Machine<ListboxSchema<T>>,
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
        const fieldProps = props as unknown as Record<string, unknown>
        const fieldIds = field.ids
        merged['ids'] = {
          label: fieldIds.label,
          content: fieldIds.control,
          ...(props.ids ?? {}),
        }
        const disabled = Boolean(fieldProps['disabled']) || field.disabled()
        const invalid = Boolean(fieldProps['invalid']) || field.invalid()
        const required = Boolean(fieldProps['required']) || field.required()
        merged['disabled'] = disabled || undefined
        merged['invalid'] = invalid || undefined
        merged['required'] = required || undefined
      }
      return merged as unknown as ListboxContext
    },
    connect: (service, normalize) =>
      (listbox.connect as unknown as (s: ListboxService<T>, n: typeof normalize) => UseListboxApi<T>)(
        service as unknown as ListboxService<T>,
        normalize,
      ),
  }) as UseListboxReturn<T>
}
