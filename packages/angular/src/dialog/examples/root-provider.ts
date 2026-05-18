import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkDialogBackdrop,
  ArkDialogCloseTrigger,
  ArkDialogContent,
  ArkDialogDescription,
  ArkDialogPositioner,
  ArkDialogRootProvider,
  ArkDialogTitle,
  useDialog,
  type UseDialogReturn,
} from '@ark-ui/angular/dialog'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { dialogExampleStyles } from '../dialog-example-styles'
import { DialogXIcon } from './icons'

@Component({
  selector: 'dialog-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDialogRootProvider,
    ArkDialogBackdrop,
    ArkDialogPositioner,
    ArkDialogContent,
    ArkDialogTitle,
    ArkDialogDescription,
    ArkDialogCloseTrigger,
    ArkPortalComponent,
    DialogXIcon,
  ],
  template: `
    <div class="stack">
      <button type="button" (click)="dialog.send({ type: 'OPEN' })">Dialog is {{ openLabel() }}</button>
      <div arkDialogRootProvider [value]="dialog" #provider="arkDialogRootProvider">
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkDialogBackdrop></div>
          <div arkDialogPositioner>
            <div arkDialogContent>
              <button type="button" arkDialogCloseTrigger aria-label="Close">
                <dialog-x-icon />
              </button>
              <h2 arkDialogTitle>Controlled Externally</h2>
              <p arkDialogDescription>This dialog is controlled via the useDialog hook.</p>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogRootProviderExample {
  readonly dialog: UseDialogReturn = runInInjectionContext(inject(Injector), () => useDialog({ context: () => ({}) }))
  readonly openLabel = computed(() => (this.dialog.api().open ? 'open' : 'closed'))
}
