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
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { DialogElementIds } from './dialog.types'
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
  /** The dialog's role. */
  readonly role: InputSignal<'dialog' | 'alertdialog' | undefined> = input<'dialog' | 'alertdialog' | undefined>(
    undefined,
  )

  private readonly machine = useDialog({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      modal: this.modal(),
      closeOnInteractOutside: this.closeOnInteractOutside(),
      closeOnEscape: this.closeOnEscape(),
      preventScroll: this.preventScroll(),
      role: this.role(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
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
