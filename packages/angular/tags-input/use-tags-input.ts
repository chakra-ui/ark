import * as tagsInput from '@zag-js/tags-input'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { TagsInputMachineProps } from './tags-input.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseTagsInputProps extends OptionalId<Omit<TagsInputMachineProps, 'dir' | 'getRootNode'>> {}

export type UseTagsInputReturn = UseMachineReturn<tagsInput.Service['state'], tagsInput.Api, tagsInput.Service>

export interface UseTagsInputOptions {
  context: () => UseTagsInputProps
}

type TagsInputContext = Record<string, unknown>
type TagsInputSchema = tagsInput.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  locale: string
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: TagsInputMachineProps['ids']
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
  required?: boolean
} & Omit<UseTagsInputProps, 'id' | 'ids' | 'disabled' | 'invalid' | 'readOnly' | 'required'>

export function useTagsInput(options: UseTagsInputOptions): UseTagsInputReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('tags-input')

  return useMachine<TagsInputSchema, tagsInput.Api>({
    machine: tagsInput.machine,
    context: () => {
      const props = options.context()
      const id = props.id ?? fallbackId
      const merged: MergedContext = {
        dir: locale.dir,
        locale: locale.locale,
        getRootNode: environment.getRootNode,
        ...props,
        id,
      }
      if (field) {
        const fieldIds = field.ids
        const baseIds = (props.ids ?? {}) as NonNullable<TagsInputMachineProps['ids']>
        merged.ids = {
          label: fieldIds.label,
          input: fieldIds.control,
          ...baseIds,
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
      return merged as unknown as TagsInputContext
    },
    connect: (service, normalize) => tagsInput.connect(service, normalize),
  })
}
