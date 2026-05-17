import { ChangeDetectionStrategy, Component, type ElementRef, input, viewChild } from '@angular/core'

@Component({
  selector: 'ark-frame',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <iframe #frame [attr.srcdoc]="srcdoc()" [attr.title]="title()" [attr.name]="name()"></iframe>
  `,
})
export class ArkFrameComponent {
  readonly srcdoc = input<string | undefined>(undefined)
  readonly title = input<string | undefined>(undefined)
  readonly name = input<string | undefined>(undefined)
  readonly frameElement = viewChild.required<ElementRef<HTMLIFrameElement>>('frame')
}
