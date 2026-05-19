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
  ['1. Information We Collect', 'We collect information you provide directly when using the service.'],
  ['2. How We Use Your Information', 'We use the information we collect to provide and improve our services.'],
  ['3. Information Sharing', 'We do not sell your personal information.'],
  ['4. Data Security', 'We use technical and organizational measures to protect your information.'],
  ['5. Your Rights', 'You have the right to access, correct, or delete your personal information.'],
  ['6. Cookies and Tracking', 'We use cookies and similar technologies to enhance your experience.'],
  ['7. Third-Party Services', 'Our service may contain links to third-party websites.'],
  ['8. Children Privacy', 'Our services are not directed to children under 13.'],
  ['9. International Transfers', 'Your information may be transferred to and processed in other countries.'],
  ['10. Changes to This Policy', 'We may update this privacy policy from time to time.'],
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
