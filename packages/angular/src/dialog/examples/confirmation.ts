import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  computed,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
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
  selector: 'dialog-confirmation-example',
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
    <button type="button" (click)="parentOpen.set(true)">Open Form</button>

    <div arkDialogRootProvider [value]="parentDialog" #parent="arkDialogRootProvider">
      <ark-portal [originInjector]="parent.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Edit Content</h2>
            <p arkDialogDescription>
              Make changes to your content. You'll be asked to confirm before closing if there are unsaved changes.
            </p>
            <div class="body">
              <textarea
                [value]="formContent()"
                (input)="formContent.set($any($event.target).value)"
                placeholder="Enter some text..."
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>

    <div arkDialogRootProvider [value]="confirmDialog" #confirm="arkDialogRootProvider">
      <ark-portal [originInjector]="confirm.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Unsaved Changes</h2>
            <p arkDialogDescription>You have unsaved changes. Are you sure you want to close without saving?</p>
            <div class="actions">
              <button type="button" (click)="confirmOpen.set(false)">Keep Editing</button>
              <button type="button" data-variant="solid" (click)="discardChanges()">Discard Changes</button>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogConfirmationExample {
  private readonly injector = inject(Injector)
  readonly formContent = signal('')
  readonly parentOpen = signal(false)
  readonly confirmOpen = signal(false)
  readonly parentDialog: UseDialogReturn = runInInjectionContext(this.injector, () =>
    useDialog({
      context: () => ({
        open: this.parentOpen(),
        onOpenChange: (details) => {
          if (!details.open && this.formContent().trim()) {
            this.confirmOpen.set(true)
            return
          }
          this.parentOpen.set(details.open)
        },
      }),
    }),
  )
  readonly confirmDialog: UseDialogReturn = runInInjectionContext(this.injector, () =>
    useDialog({
      context: () => ({ open: this.confirmOpen(), onOpenChange: (details) => this.confirmOpen.set(details.open) }),
    }),
  )
  readonly hasUnsavedChanges = computed(() => Boolean(this.formContent().trim()))

  discardChanges(): void {
    this.confirmOpen.set(false)
    this.parentOpen.set(false)
    this.formContent.set('')
  }
}
