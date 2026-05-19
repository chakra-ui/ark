import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, type TemplateRef, afterNextRender, input, signal } from '@angular/core'

@Component({
  selector: 'ark-client-only',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (isClient()) {
      @if (clientTemplate(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl"></ng-container>
      } @else {
        <ng-content />
      }
    } @else if (fallback(); as fb) {
      <ng-container [ngTemplateOutlet]="fb"></ng-container>
    }
  `,
})
export class ArkClientOnlyComponent {
  readonly fallback = input<TemplateRef<unknown> | null>(null)
  readonly clientTemplate = input<TemplateRef<unknown> | null>(null)
  protected readonly isClient = signal(false)

  constructor() {
    afterNextRender(() => {
      // Leave one observable turn for fallback content before the browser-only projection swaps in.
      queueMicrotask(() => {
        this.isClient.set(true)
      })
    })
  }
}
