import type * as dialog from '@zag-js/dialog'
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
  DialogElementIds,
  DialogFocusOutsideEvent,
  DialogInteractOutsideEvent,
  DialogPointerDownOutsideEvent,
  DialogTriggerValueChangeDetails,
} from './dialog.types'
import { ARK_DIALOG_CONTEXT, ARK_DIALOG_CONTEXT_CARRIER } from './use-dialog-context'
import { useDialog, type UseDialogReturn } from './use-dialog'

@Directive({
  selector: '[arkDialog]',
  standalone: true,
  exportAs: 'arkDialog',
  providers: [
    { provide: ARK_DIALOG_CONTEXT, useExisting: forwardRef(() => ArkDialogRoot) },
    {
      provide: ARK_DIALOG_CONTEXT_CARRIER,
      useFactory: (root: ArkDialogRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkDialogRoot)],
    },
  ],
})
export class ArkDialogRoot implements UseDialogReturn {
  /** The unique identifier of the dialog. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the dialog. Useful for composition. */
  readonly ids: InputSignal<Partial<DialogElementIds> | undefined> = input<Partial<DialogElementIds> | undefined>(
    undefined,
  )
  /** Human readable label for the dialog, in event the dialog title is not rendered. */
  readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'aria-label' })
  /** The controlled open state of the dialog. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the dialog when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the dialog renders as a modal overlay. */
  readonly modal: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to close the dialog when the outside is clicked. */
  readonly closeOnInteractOutside: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  })
  /** Whether to close the dialog when the escape key is pressed. */
  readonly closeOnEscape: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to prevent scrolling behind the dialog when it's opened. */
  readonly preventScroll: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to trap focus inside the dialog when it's opened. */
  readonly trapFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to restore focus to the element that had focus before the dialog was opened. */
  readonly restoreFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Element to receive focus when the dialog is opened. */
  readonly initialFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** Element to receive focus when the dialog is closed. */
  readonly finalFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** Elements that remain interactive and do not dismiss the dialog. */
  readonly persistentElements: InputSignal<(() => Element | null)[] | undefined> = input<
    (() => Element | null)[] | undefined
  >(undefined)
  /** The dialog's role. */
  readonly role: InputSignal<'dialog' | 'alertdialog' | undefined> = input<'dialog' | 'alertdialog' | undefined>(
    undefined,
  )
  /** The controlled value of the trigger that currently opened the dialog. */
  readonly triggerValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial trigger value when uncontrolled. */
  readonly defaultTriggerValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)

  /** Emits details when the escape key is pressed. */
  readonly escapeKeyDown: OutputEmitterRef<KeyboardEvent> = output<KeyboardEvent>()
  /** Emits details when focus moves outside the dialog content. */
  readonly focusOutside: OutputEmitterRef<DialogFocusOutsideEvent> = output<DialogFocusOutsideEvent>()
  /** Emits details when an interaction happens outside the dialog content. */
  readonly interactOutside: OutputEmitterRef<DialogInteractOutsideEvent> = output<DialogInteractOutsideEvent>()
  /** Emits details when pointer down occurs outside the dialog content. */
  readonly pointerDownOutside: OutputEmitterRef<DialogPointerDownOutsideEvent> = output<DialogPointerDownOutsideEvent>()
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

  private readonly machine = useDialog({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      'aria-label': this.ariaLabel(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      modal: this.modal(),
      closeOnInteractOutside: this.closeOnInteractOutside(),
      closeOnEscape: this.closeOnEscape(),
      preventScroll: this.preventScroll(),
      trapFocus: this.trapFocus(),
      restoreFocus: this.restoreFocus(),
      initialFocusEl: this.initialFocusEl(),
      finalFocusEl: this.finalFocusEl(),
      persistentElements: this.persistentElements(),
      role: this.role(),
      triggerValue: this.triggerValue(),
      defaultTriggerValue: this.defaultTriggerValue(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
      onTriggerValueChange: (details: DialogTriggerValueChangeDetails) => {
        if (this.triggerValue() !== details.value) {
          this.triggerValue.set(details.value)
        }
      },
      onEscapeKeyDown: (event) => this.escapeKeyDown.emit(event),
      onFocusOutside: (event) => this.focusOutside.emit(event),
      onInteractOutside: (event) => this.interactOutside.emit(event),
      onPointerDownOutside: (event) => this.pointerDownOutside.emit(event),
      onRequestDismiss: (event) => this.requestDismiss.emit(event),
    }),
  })

  readonly state: Signal<dialog.Service['state']> = this.machine.state
  readonly api: Signal<dialog.Api> = this.machine.api
  readonly service: dialog.Service = this.machine.service
  readonly send: dialog.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkDialogRoot> = buildRootCarrier<ArkDialogRoot>({
    root: this,
    rootToken: ARK_DIALOG_CONTEXT as ProviderToken<ArkDialogRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for dialog part directives to consume via ARK_DIALOG_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkDialogRoot> {
    return this.arkContextCarrier
  }
}
