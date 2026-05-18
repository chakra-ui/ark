import {
  Directive,
  EnvironmentInjector,
  Injector,
  type InputSignal,
  type ProviderToken,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as dialog from '@zag-js/dialog'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_DIALOG_CONTEXT, ARK_DIALOG_CONTEXT_CARRIER } from './use-dialog-context'
import type { UseDialogReturn } from './use-dialog'

@Directive({
  selector: '[arkDialogRootProvider]',
  standalone: true,
  exportAs: 'arkDialogRootProvider',
  providers: [
    { provide: ARK_DIALOG_CONTEXT, useExisting: forwardRef(() => ArkDialogRootProvider) },
    {
      provide: ARK_DIALOG_CONTEXT_CARRIER,
      useFactory: (provider: ArkDialogRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkDialogRootProvider)],
    },
  ],
})
export class ArkDialogRootProvider implements UseDialogReturn {
  /** The dialog machine returned by useDialog(). */
  readonly value: InputSignal<UseDialogReturn> = input.required<UseDialogReturn>()
  readonly state: Signal<dialog.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<dialog.Api> = computed(() => this.value().api())
  readonly send: dialog.Service['send'] = (event) => this.value().send(event)

  get service(): dialog.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkDialogRootProvider> =
    buildRootCarrier<ArkDialogRootProvider>({
      root: this,
      rootToken: ARK_DIALOG_CONTEXT as ProviderToken<ArkDialogRootProvider>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for dialog part directives to consume via ARK_DIALOG_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkDialogRootProvider> {
    return this.arkContextCarrier
  }
}
