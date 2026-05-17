import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, Directive, TemplateRef, contentChild, input } from '@angular/core'

@Directive({ selector: 'ng-template[arkSwapOn]', standalone: true })
export class ArkSwapOnDirective {}

@Directive({ selector: 'ng-template[arkSwapOff]', standalone: true })
export class ArkSwapOffDirective {}

@Component({
  selector: 'ark-swap',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (active()) {
      <ng-container [ngTemplateOutlet]="onContent() ?? null"></ng-container>
    } @else {
      <ng-container [ngTemplateOutlet]="offContent() ?? null"></ng-container>
    }
  `,
})
export class ArkSwapComponent {
  readonly active = input<boolean>(false)
  protected readonly onContent = contentChild(ArkSwapOnDirective, { read: TemplateRef })
  protected readonly offContent = contentChild(ArkSwapOffDirective, { read: TemplateRef })
}
