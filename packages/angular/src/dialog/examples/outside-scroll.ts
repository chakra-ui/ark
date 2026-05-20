import { ChangeDetectionStrategy, Component, type ElementRef, viewChild } from '@angular/core'
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
    '1. Information We Collect',
    'We collect information you provide directly, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, and payment information.',
  ],
  [
    '2. How We Use Your Information',
    'We use the information we collect to provide and improve our services, process transactions, send communications, and personalize your experience.',
  ],
  [
    '3. Information Sharing',
    'We do not sell your personal information. We may share information with service providers who assist in our operations, or when required by law.',
  ],
  [
    '4. Data Security',
    'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.',
  ],
  [
    '5. Your Rights',
    'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.',
  ],
  [
    '6. Cookies and Tracking',
    'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver targeted content. You can manage cookie preferences in your browser settings.',
  ],
  [
    '7. Third-Party Services',
    'Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.',
  ],
  [
    '8. Children Privacy',
    'Our services are not directed to children under 13. We do not knowingly collect personal information from children without parental consent.',
  ],
  [
    '9. International Transfers',
    'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.',
  ],
  [
    '10. Changes to This Policy',
    'We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email.',
  ],
  [
    '11. Data Retention',
    'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.',
  ],
  [
    '12. Contact Us',
    'If you have questions about this privacy policy or our data practices, please contact our privacy team through the support channels provided on our website.',
  ],
]

@Component({
  selector: 'dialog-outside-scroll-example',
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
    <div arkDialog [initialFocusEl]="initialFocusEl" #root="arkDialog">
      <button type="button" arkDialogTrigger>Open Dialog</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner class="outside-scroll">
          <div arkDialogContent #content style="margin: 4rem auto; max-height: none">
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Privacy Policy</h2>
            <p arkDialogDescription>
              This layout allows the dialog to extend beyond the viewport while keeping the outer container scrollable.
            </p>
            <div class="body">
              @for (item of sections; track item[0]) {
                <section class="scroll-section">
                  <h3>{{ item[0] }}</h3>
                  <p>{{ item[1] }}</p>
                </section>
              }
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogOutsideScrollExample {
  private readonly content = viewChild<ElementRef<HTMLDivElement>>('content')
  readonly initialFocusEl = () => this.content()?.nativeElement ?? null
  readonly sections = contentSections
}
