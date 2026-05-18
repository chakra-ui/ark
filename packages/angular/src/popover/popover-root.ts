import type * as popover from '@zag-js/popover'
import {
  Directive,
  EnvironmentInjector,
  Injector,
  type ProviderToken,
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
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { PopoverElementIds, PopoverPositioningOptions, PopoverTriggerValueChangeDetails } from './popover.types'
import { ARK_POPOVER_CONTEXT, ARK_POPOVER_CONTEXT_CARRIER } from './use-popover-context'
import { usePopover, type UsePopoverReturn } from './use-popover'

@Directive({
  selector: '[arkPopover]',
  standalone: true,
  exportAs: 'arkPopover',
  providers: [
    { provide: ARK_POPOVER_CONTEXT, useExisting: forwardRef(() => ArkPopoverRoot) },
    {
      provide: ARK_POPOVER_CONTEXT_CARRIER,
      useFactory: (root: ArkPopoverRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkPopoverRoot)],
    },
  ],
})
export class ArkPopoverRoot implements UsePopoverReturn {
  /** The unique identifier of the popover. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the popover. Useful for composition. */
  readonly ids: InputSignal<Partial<PopoverElementIds> | undefined> = input<Partial<PopoverElementIds> | undefined>(
    undefined,
  )
  /** The controlled open state of the popover. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the popover when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the popover renders as a modal overlay. */
  readonly modal: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the popover content is portalled. */
  readonly portalled: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to auto-focus the first focusable element inside the popover when opened. */
  readonly autoFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to restore focus to the previously focused element when closed. */
  readonly restoreFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to close the popover when the outside is clicked. */
  readonly closeOnInteractOutside: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  })
  /** Whether to close the popover when the escape key is pressed. */
  readonly closeOnEscape: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** The positioning options for the popover content. */
  readonly positioning: InputSignal<PopoverPositioningOptions | undefined> = input<
    PopoverPositioningOptions | undefined
  >(undefined)
  /** Element to receive focus when the popover is opened. */
  readonly initialFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** Element to receive focus when the popover is closed. */
  readonly finalFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** The controlled trigger value. */
  readonly triggerValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The default trigger value when uncontrolled. */
  readonly defaultTriggerValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)

  private readonly machine = usePopover({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      modal: this.modal(),
      portalled: this.portalled(),
      autoFocus: this.autoFocus(),
      restoreFocus: this.restoreFocus(),
      closeOnInteractOutside: this.closeOnInteractOutside(),
      closeOnEscape: this.closeOnEscape(),
      positioning: this.positioning(),
      initialFocusEl: this.initialFocusEl(),
      finalFocusEl: this.finalFocusEl(),
      triggerValue: this.triggerValue(),
      defaultTriggerValue: this.defaultTriggerValue(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
      onTriggerValueChange: (details: PopoverTriggerValueChangeDetails) => {
        if (this.triggerValue() === details.value) return
        this.triggerValue.set(details.value)
      },
    }),
  })

  readonly state: Signal<popover.Service['state']> = this.machine.state
  readonly api: Signal<popover.Api> = this.machine.api
  readonly service: popover.Service = this.machine.service
  readonly send: popover.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkPopoverRoot> = buildRootCarrier<ArkPopoverRoot>({
    root: this,
    rootToken: ARK_POPOVER_CONTEXT as ProviderToken<ArkPopoverRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for popover part directives to consume via ARK_POPOVER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkPopoverRoot> {
    return this.arkContextCarrier
  }
}
