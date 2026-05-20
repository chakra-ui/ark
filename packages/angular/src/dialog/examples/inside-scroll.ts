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
  [
    '1. Acceptance of Terms',
    'By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.',
  ],
  [
    '2. Use License',
    'Permission is granted to temporarily use this service for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title.',
  ],
  [
    '3. User Responsibilities',
    'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
  ],
  [
    '4. Privacy Policy',
    'Your use of this service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.',
  ],
  [
    '5. Limitations',
    'In no event shall we be liable for any damages arising out of the use or inability to use the materials on this service.',
  ],
  [
    '6. Revisions',
    'We may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms.',
  ],
  [
    '7. Governing Law',
    'These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts.',
  ],
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
