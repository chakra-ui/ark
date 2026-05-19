import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  ArkDialogBackdrop,
  ArkDialogCloseTrigger,
  ArkDialogContent,
  ArkDialogDescription,
  ArkDialogPositioner,
  ArkDialogRoot,
  ArkDialogTitle,
  ArkDialogTrigger,
} from '@ark-ui/angular/dialog'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { dialogExampleStyles } from '../dialog-example-styles'
import { DialogXIcon } from './icons'

interface User {
  id: string
  name: string
  email: string
}

const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
]

@Component({
  selector: 'dialog-multiple-triggers-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDialogRoot,
    ArkDialogTrigger,
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
    <div arkDialog [(triggerValue)]="triggerValue" #root="arkDialog">
      <div class="button-group">
        @for (user of users; track user.id) {
          <button type="button" arkDialogTrigger [value]="user.id">Edit {{ user.name }}</button>
        }
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <h2 arkDialogTitle>Edit User</h2>
            <p arkDialogDescription>Update the user's information below.</p>
            @if (activeUser(); as user) {
              <div class="body">
                <div class="field">
                  <label>Name</label>
                  <input [value]="user.name" />
                </div>
                <div class="field">
                  <label>Email</label>
                  <input [value]="user.email" />
                </div>
              </div>
              <div class="actions">
                <button type="button" arkDialogCloseTrigger class="button">Cancel</button>
                <button type="button" arkDialogCloseTrigger class="button" data-variant="solid">Save Changes</button>
              </div>
            }
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogMultipleTriggersExample {
  readonly users = users
  readonly triggerValue = signal<string | null | undefined>(undefined)
  readonly activeUser = computed(() => users.find((user) => user.id === this.triggerValue()) ?? null)
}
