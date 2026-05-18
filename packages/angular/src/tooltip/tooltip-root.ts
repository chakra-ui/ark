import type * as tooltip from '@zag-js/tooltip'
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
import type { TooltipElementIds, TooltipPositioningOptions, TooltipTriggerValueChangeDetails } from './tooltip.types'
import { ARK_TOOLTIP_CONTEXT, ARK_TOOLTIP_CONTEXT_CARRIER } from './use-tooltip-context'
import { useTooltip, type UseTooltipReturn } from './use-tooltip'

@Directive({
  selector: '[arkTooltip]',
  standalone: true,
  exportAs: 'arkTooltip',
  providers: [
    { provide: ARK_TOOLTIP_CONTEXT, useExisting: forwardRef(() => ArkTooltipRoot) },
    {
      provide: ARK_TOOLTIP_CONTEXT_CARRIER,
      useFactory: (root: ArkTooltipRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkTooltipRoot)],
    },
  ],
})
export class ArkTooltipRoot implements UseTooltipReturn {
  /** The unique identifier of the tooltip. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the tooltip. Useful for composition. */
  readonly ids: InputSignal<Partial<TooltipElementIds> | undefined> = input<Partial<TooltipElementIds> | undefined>(
    undefined,
  )
  /** The controlled open state of the tooltip. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the tooltip when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the tooltip is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The open delay of the tooltip. */
  readonly openDelay: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The close delay of the tooltip. */
  readonly closeDelay: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether to close the tooltip on pointerdown. */
  readonly closeOnPointerDown: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** Whether to close the tooltip when the Escape key is pressed. */
  readonly closeOnEscape: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** Whether the tooltip should close on scroll. */
  readonly closeOnScroll: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** Whether the tooltip should close on click. */
  readonly closeOnClick: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** Whether the tooltip's content is interactive. */
  readonly interactive: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** The positioning options for the tooltip content. */
  readonly positioning: InputSignal<TooltipPositioningOptions | undefined> = input<
    TooltipPositioningOptions | undefined
  >(undefined)
  /** Custom aria-label for the tooltip. */
  readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'aria-label' })
  /** The controlled trigger value. */
  readonly triggerValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The default trigger value when uncontrolled. */
  readonly defaultTriggerValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)

  private readonly machine = useTooltip({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      disabled: this.disabled(),
      openDelay: this.openDelay(),
      closeDelay: this.closeDelay(),
      closeOnPointerDown: this.closeOnPointerDown(),
      closeOnEscape: this.closeOnEscape(),
      closeOnScroll: this.closeOnScroll(),
      closeOnClick: this.closeOnClick(),
      interactive: this.interactive(),
      positioning: this.positioning(),
      'aria-label': this.ariaLabel(),
      triggerValue: this.triggerValue(),
      defaultTriggerValue: this.defaultTriggerValue(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
      onTriggerValueChange: (details: TooltipTriggerValueChangeDetails) => {
        if (this.triggerValue() === details.value) return
        this.triggerValue.set(details.value)
      },
    }),
  })

  readonly state: Signal<tooltip.Service['state']> = this.machine.state
  readonly api: Signal<tooltip.Api> = this.machine.api
  readonly service: tooltip.Service = this.machine.service
  readonly send: tooltip.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkTooltipRoot> = buildRootCarrier<ArkTooltipRoot>({
    root: this,
    rootToken: ARK_TOOLTIP_CONTEXT as ProviderToken<ArkTooltipRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for tooltip part directives to consume via ARK_TOOLTIP_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkTooltipRoot> {
    return this.arkContextCarrier
  }
}
