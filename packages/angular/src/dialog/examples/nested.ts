import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
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
  selector: 'dialog-nested-example',
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
    <button type="button" (click)="parentDialog.send({ type: 'OPEN' })">Open Parent Dialog</button>

    <div arkDialogRootProvider [value]="parentDialog" #parent="arkDialogRootProvider">
      <ark-portal [originInjector]="parent.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Parent Dialog</h2>
            <p arkDialogDescription>
              This is the parent dialog. Open a nested dialog to see automatic z-index management.
            </p>
            <div class="body">
              <button type="button" (click)="childDialog.send({ type: 'OPEN' })">Open Nested Dialog</button>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>

    <div arkDialogRootProvider [value]="childDialog" #child="arkDialogRootProvider">
      <ark-portal [originInjector]="child.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Nested Dialog</h2>
            <p arkDialogDescription>This dialog is nested within the parent with proper z-index layering.</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogNestedExample {
  private readonly injector = inject(Injector)
  readonly parentDialog: UseDialogReturn = runInInjectionContext(this.injector, () =>
    useDialog({ context: () => ({}) }),
  )
  readonly childDialog: UseDialogReturn = runInInjectionContext(this.injector, () => useDialog({ context: () => ({}) }))
}
