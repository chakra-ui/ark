import * as ratingGroup from '@zag-js/rating-group'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import type { RatingGroupMachineProps } from './rating-group.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseRatingGroupProps extends OptionalId<Omit<RatingGroupMachineProps, 'dir' | 'getRootNode'>> {}

export type UseRatingGroupReturn = UseMachineReturn<ratingGroup.Service['state'], ratingGroup.Api, ratingGroup.Service>

export interface UseRatingGroupOptions {
  context: () => UseRatingGroupProps
}

type RatingGroupSchema = ratingGroup.Machine extends Machine<infer TSchema> ? TSchema : never

type MergedContext = {
  dir: 'ltr' | 'rtl'
  getRootNode: () => ShadowRoot | Document | Node | undefined
  id: string
  ids?: RatingGroupMachineProps['ids']
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
} & Omit<UseRatingGroupProps, 'id' | 'ids' | 'disabled' | 'readOnly' | 'required'>

export function useRatingGroup(options: UseRatingGroupOptions): UseRatingGroupReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = injectArkFieldContextOptional()
  const fallbackId = createArkId('rating-group')

  return useMachine<RatingGroupSchema, ratingGroup.Api>({
    machine: ratingGroup.machine,
    context: () => {
      const props = options.context()
      const id = props.id ?? fallbackId
      const merged: MergedContext = {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...props,
        id,
      }
      if (field) {
        const fieldIds = field.ids
        const baseIds = (props.ids ?? {}) as NonNullable<RatingGroupMachineProps['ids']>
        merged.ids = {
          label: fieldIds.label,
          hiddenInput: fieldIds.control,
          ...baseIds,
        }
        const disabled = Boolean(props.disabled) || field.disabled()
        const readOnly = Boolean(props.readOnly) || field.readOnly()
        const required = Boolean(props.required) || field.required()
        merged.disabled = disabled || undefined
        merged.readOnly = readOnly || undefined
        merged.required = required || undefined
      }
      return merged as Partial<RatingGroupSchema['props']>
    },
    connect: (service, normalize) => ratingGroup.connect(service, normalize),
  })
}
