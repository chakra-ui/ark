import type * as toggleGroup from '@zag-js/toggle-group'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ToggleGroupElementIds, ToggleGroupOrientation, ToggleGroupValueChangeDetails } from './toggle-group.types'
import { ARK_TOGGLE_GROUP_CONTEXT } from './use-toggle-group-context'
import { useToggleGroup, type UseToggleGroupReturn } from './use-toggle-group'

@Directive({
  selector: '[arkToggleGroup]',
  standalone: true,
  exportAs: 'arkToggleGroup',
  providers: [{ provide: ARK_TOGGLE_GROUP_CONTEXT, useExisting: forwardRef(() => ArkToggleGroupRoot) }],
})
export class ArkToggleGroupRoot implements UseToggleGroupReturn {
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  readonly elementIds: InputSignal<ToggleGroupElementIds | undefined> = input<ToggleGroupElementIds | undefined>(
    undefined,
    { alias: 'ids' },
  )
  readonly value: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  readonly loopFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  readonly rovingFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  readonly multiple: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  readonly deselectable: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  readonly orientation: InputSignal<ToggleGroupOrientation | undefined> = input<ToggleGroupOrientation | undefined>(
    undefined,
  )

  private readonly machine = useToggleGroup({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      disabled: this.disabled() || undefined,
      loopFocus: this.loopFocus(),
      rovingFocus: this.rovingFocus(),
      multiple: this.multiple() || undefined,
      deselectable: this.deselectable(),
      orientation: this.orientation(),
      onValueChange: (details: ToggleGroupValueChangeDetails) => this.value.set(details.value),
    }),
  })

  readonly state: Signal<toggleGroup.Service['state']> = this.machine.state
  readonly api: Signal<toggleGroup.Api> = this.machine.api
  readonly service: toggleGroup.Service = this.machine.service
  readonly send: toggleGroup.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
