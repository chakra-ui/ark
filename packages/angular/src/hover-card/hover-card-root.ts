import type * as hoverCard from '@zag-js/hover-card'
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
import type {
  HoverCardElementIds,
  HoverCardPositioningOptions,
  HoverCardTriggerValueChangeDetails,
} from './hover-card.types'
import { ARK_HOVER_CARD_CONTEXT, ARK_HOVER_CARD_CONTEXT_CARRIER } from './use-hover-card-context'
import { useHoverCard, type UseHoverCardReturn } from './use-hover-card'

@Directive({
  selector: '[arkHoverCard]',
  standalone: true,
  exportAs: 'arkHoverCard',
  providers: [
    { provide: ARK_HOVER_CARD_CONTEXT, useExisting: forwardRef(() => ArkHoverCardRoot) },
    {
      provide: ARK_HOVER_CARD_CONTEXT_CARRIER,
      useFactory: (root: ArkHoverCardRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkHoverCardRoot)],
    },
  ],
})
export class ArkHoverCardRoot implements UseHoverCardReturn {
  /** The unique identifier of the hover card. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the hover card. Useful for composition. */
  readonly ids: InputSignal<Partial<HoverCardElementIds> | undefined> = input<Partial<HoverCardElementIds> | undefined>(
    undefined,
  )
  /** The controlled open state of the hover card. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the hover card when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the hover card is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The duration from when the mouse enters the trigger until the hover card opens. */
  readonly openDelay: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The duration from when the mouse leaves the trigger or content until the hover card closes. */
  readonly closeDelay: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The positioning options for the hover card content. */
  readonly positioning: InputSignal<HoverCardPositioningOptions | undefined> = input<
    HoverCardPositioningOptions | undefined
  >(undefined)
  /** The controlled trigger value. */
  readonly triggerValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The default trigger value when uncontrolled. */
  readonly defaultTriggerValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)

  private readonly machine = useHoverCard({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open() ?? this.defaultOpen(),
      defaultOpen: this.defaultOpen(),
      disabled: this.disabled(),
      openDelay: this.openDelay(),
      closeDelay: this.closeDelay(),
      positioning: this.positioning(),
      triggerValue: this.triggerValue(),
      defaultTriggerValue: this.defaultTriggerValue(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
      onTriggerValueChange: (details: HoverCardTriggerValueChangeDetails) => {
        if (this.triggerValue() === details.value) return
        this.triggerValue.set(details.value)
      },
    }),
  })

  readonly state: Signal<hoverCard.Service['state']> = this.machine.state
  readonly api: Signal<hoverCard.Api> = this.machine.api
  readonly service: hoverCard.Service = this.machine.service
  readonly send: hoverCard.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkHoverCardRoot> = buildRootCarrier<ArkHoverCardRoot>({
    root: this,
    rootToken: ARK_HOVER_CARD_CONTEXT as ProviderToken<ArkHoverCardRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for hover card part directives to consume via ARK_HOVER_CARD_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkHoverCardRoot> {
    return this.arkContextCarrier
  }
}
