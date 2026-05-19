import { ChangeDetectionStrategy, Component } from '@angular/core'
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

const contentSections = [
  ['1. Acceptance of Terms', 'By accessing and using this service, you accept and agree to be bound by the terms.'],
  ['2. Use License', 'Permission is granted to temporarily use this service for personal purposes only.'],
  ['3. User Responsibilities', 'You are responsible for maintaining the confidentiality of your account and password.'],
  ['4. Privacy Policy', 'Your use of this service is also governed by our Privacy Policy.'],
  ['5. Limitations', 'In no event shall we be liable for damages arising out of the use of the service.'],
  ['6. Revisions', 'We may revise these terms of service at any time without notice.'],
  ['7. Governing Law', 'These terms are governed by and construed in accordance with applicable laws.'],
]

@Component({
  selector: 'dialog-inside-scroll-example',
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
    <div arkDialog #root="arkDialog">
      <button type="button" arkDialogTrigger>Open Dialog</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent style="max-height: min(32rem, calc(100vh - 4rem))">
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Terms of Service</h2>
            <p arkDialogDescription>Please review our terms before continuing.</p>
            <div class="scroll-container">
              @for (item of sections; track item[0]) {
                <section class="scroll-section">
                  <h3>{{ item[0] }}</h3>
                  <p>{{ item[1] }}</p>
                </section>
              }
            </div>
            <div class="actions">
              <button type="button" arkDialogCloseTrigger class="button">Decline</button>
              <button type="button" arkDialogCloseTrigger class="button" data-variant="solid">Accept</button>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogInsideScrollExample {
  readonly sections = contentSections
}
