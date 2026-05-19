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
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  PopoverElementIds,
  PopoverFocusOutsideEvent,
  PopoverInteractOutsideEvent,
  PopoverIntlTranslations,
  PopoverPointerDownOutsideEvent,
  PopoverPositioningOptions,
  PopoverTriggerValueChangeDetails,
} from './popover.types'
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
  /** Elements that remain interactive and do not dismiss the popover. */
  readonly persistentElements: InputSignal<(() => Element | null)[] | undefined> = input<
    (() => Element | null)[] | undefined
  >(undefined)
  /** Localized strings for popover accessibility labels. */
  readonly translations: InputSignal<PopoverIntlTranslations | undefined> = input<PopoverIntlTranslations | undefined>(
    undefined,
  )
  /** The controlled trigger value. */
  readonly triggerValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The default trigger value when uncontrolled. */
  readonly defaultTriggerValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)

  /** Emits details when the escape key is pressed. */
  readonly escapeKeyDown: OutputEmitterRef<KeyboardEvent> = output<KeyboardEvent>()
  /** Emits details when focus moves outside the popover content. */
  readonly focusOutside: OutputEmitterRef<PopoverFocusOutsideEvent> = output<PopoverFocusOutsideEvent>()
  /** Emits details when an interaction happens outside the popover content. */
  readonly interactOutside: OutputEmitterRef<PopoverInteractOutsideEvent> = output<PopoverInteractOutsideEvent>()
  /** Emits details when pointer down occurs outside the popover content. */
  readonly pointerDownOutside: OutputEmitterRef<PopoverPointerDownOutsideEvent> =
    output<PopoverPointerDownOutsideEvent>()
  /** Emits when this layer is closed due to a parent layer being closed. */
  readonly requestDismiss: OutputEmitterRef<
    CustomEvent<{
      originalLayer: HTMLElement
      targetLayer: HTMLElement | undefined
      originalIndex: number
      targetIndex: number
    }>
  > = output<
    CustomEvent<{
      originalLayer: HTMLElement
      targetLayer: HTMLElement | undefined
      originalIndex: number
      targetIndex: number
    }>
  >()

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
      persistentElements: this.persistentElements(),
      translations: this.translations(),
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
      onEscapeKeyDown: (event) => this.escapeKeyDown.emit(event),
      onFocusOutside: (event) => this.focusOutside.emit(event),
      onInteractOutside: (event) => this.interactOutside.emit(event),
      onPointerDownOutside: (event) => this.pointerDownOutside.emit(event),
      onRequestDismiss: (event) => this.requestDismiss.emit(event),
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
