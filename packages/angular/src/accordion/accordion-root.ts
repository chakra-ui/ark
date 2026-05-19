import type * as accordion from '@zag-js/accordion'
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
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { AccordionElementIds, AccordionFocusChangeDetails } from './accordion.types'
import { ARK_ACCORDION_CONTEXT } from './use-accordion-context'
import { useAccordion, type UseAccordionReturn } from './use-accordion'

function areStringArraysEqual(left: string[] | undefined, right: string[]): boolean {
  return left?.length === right.length && left.every((value, index) => value === right[index])
}

@Directive({
  selector: '[arkAccordion]',
  standalone: true,
  exportAs: 'arkAccordion',
  providers: [{ provide: ARK_ACCORDION_CONTEXT, useExisting: forwardRef(() => ArkAccordionRoot) }],
})
export class ArkAccordionRoot implements UseAccordionReturn {
  /** The unique identifier of the accordion. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the accordion. Useful for composition. */
  readonly ids: InputSignal<AccordionElementIds | undefined> = input<AccordionElementIds | undefined>(undefined)
  /** Whether multiple accordion items can be expanded at the same time. */
  readonly multiple: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether an accordion item can be closed after it has been expanded. */
  readonly collapsible: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled value of the expanded accordion items. */
  readonly value: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial value of the expanded accordion items when uncontrolled. */
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** Whether the accordion items are disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The orientation of the accordion items. */
  readonly orientation: InputSignal<accordion.Props['orientation']> = input<accordion.Props['orientation']>(undefined)

  /** Emits when focus moves between accordion item triggers. Mirrors Zag `onFocusChange`. */
  readonly focusChange: OutputEmitterRef<AccordionFocusChangeDetails> = output<AccordionFocusChangeDetails>()

  private readonly machine = useAccordion({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      multiple: this.multiple(),
      collapsible: this.collapsible(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      disabled: this.disabled(),
      orientation: this.orientation(),
      onValueChange: (details) => {
        if (areStringArraysEqual(this.value(), details.value)) return
        this.value.set(details.value)
      },
      onFocusChange: (details) => {
        this.focusChange.emit(details)
      },
    }),
  })

  readonly state: Signal<accordion.Service['state']> = this.machine.state
  readonly api: Signal<accordion.Api> = this.machine.api
  readonly service: accordion.Service = this.machine.service
  readonly send: accordion.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
