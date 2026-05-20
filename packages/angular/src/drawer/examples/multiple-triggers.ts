import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerGrabber,
  ArkDrawerGrabberIndicator,
  ArkDrawerPositioner,
  ArkDrawerRoot,
  ArkDrawerTitle,
  ArkDrawerTrigger,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { drawerExampleStyles } from '../drawer-example-styles'
import { DrawerXIcon } from './icons'

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
  selector: 'drawer-multiple-triggers-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDrawerRoot,
    ArkDrawerTrigger,
    ArkDrawerBackdrop,
    ArkDrawerPositioner,
    ArkDrawerContent,
    ArkDrawerGrabber,
    ArkDrawerGrabberIndicator,
    ArkDrawerTitle,
    ArkDrawerCloseTrigger,
    ArkPortalComponent,
    DrawerXIcon,
  ],
  template: `
    <div arkDrawer swipeDirection="end" (triggerValueChange)="onTriggerValueChange($event)" #root="arkDrawer">
      <div class="button-group">
        @for (user of users; track user.id) {
          <button type="button" class="button" arkDrawerTrigger [value]="user.id">Edit {{ user.name }}</button>
        }
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDrawerBackdrop></div>
        <div arkDrawerPositioner>
          <div arkDrawerContent>
            <div arkDrawerGrabber>
              <span arkDrawerGrabberIndicator></span>
            </div>
            <h2 arkDrawerTitle>Edit User</h2>
            @if (activeUser(); as user) {
              <div class="stack">
                <div class="field">
                  <label>Name</label>
                  <input [value]="user.name" />
                </div>
                <div class="field">
                  <label>Email</label>
                  <input [value]="user.email" />
                </div>
                <div class="button-group">
                  <button type="button" class="button" arkDrawerCloseTrigger>Cancel</button>
                  <button type="button" class="button" data-variant="solid" arkDrawerCloseTrigger>Save Changes</button>
                </div>
              </div>
            }
            <button type="button" arkDrawerCloseTrigger aria-label="Close">
              <drawer-x-icon />
            </button>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [drawerExampleStyles],
})
export class DrawerMultipleTriggersExample {
  readonly users = users
  readonly activeUser = signal<User | null>(null)

  onTriggerValueChange(value: string | null | undefined): void {
    this.activeUser.set(this.users.find((user) => user.id === value) ?? null)
  }
}
