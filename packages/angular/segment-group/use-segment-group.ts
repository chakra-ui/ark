import * as segmentGroup from '@zag-js/radio-group'
import type { Machine } from '@zag-js/core'
import { inject } from '@angular/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_FIELD_CONTEXT } from '@ark-ui/angular/field'
import type { SegmentGroupElementIds, SegmentGroupMachineProps } from './segment-group.types'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseSegmentGroupProps extends OptionalId<Omit<SegmentGroupMachineProps, 'dir' | 'getRootNode'>> {}

export type UseSegmentGroupReturn = UseMachineReturn<
  segmentGroup.Service['state'],
  segmentGroup.Api,
  segmentGroup.Service
>

export interface UseSegmentGroupOptions {
  context: () => UseSegmentGroupProps
}

type SegmentGroupContext = Record<string, unknown>
type SegmentGroupSchema = segmentGroup.Machine extends Machine<infer TSchema> ? TSchema : never

export function useSegmentGroup(options: UseSegmentGroupOptions): UseSegmentGroupReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const field = inject(ARK_FIELD_CONTEXT, { optional: true })
  const fallbackId = createArkId('segment-group')

  return useMachine<SegmentGroupSchema, segmentGroup.Api>({
    machine: segmentGroup.machine,
    context: () => {
      const props = options.context()
      const id = props.id ?? fallbackId
      const merged: Record<string, unknown> = {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...props,
        id,
      }
      if (field) {
        const fieldIds = field.ids
        const baseIds = (props.ids ?? {}) as NonNullable<SegmentGroupElementIds>
        merged['ids'] = {
          root: fieldIds.control,
          label: fieldIds.label,
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
      return merged as SegmentGroupContext
    },
    connect: (service, normalize) => segmentGroup.connect(service, normalize),
  })
}
