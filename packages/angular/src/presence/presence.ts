import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core'
import {
  type RenderState,
  type RenderStatus,
  initialState,
  onExitComplete,
  onPresentChange,
} from '../internal/render-strategy'

export type ArkPresenceStatus = RenderStatus
export type ArkPresenceState = RenderState

@Component({
  selector: 'ark-presence',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (status() !== 'unmounted') {
      <ng-container [ngTemplateOutlet]="content() ?? null" [ngTemplateOutletInjector]="elementInjector"></ng-container>
    }
  `,
})
export class ArkPresenceComponent {
  readonly present = input<boolean>(false)
  readonly lazyMount = input<boolean>(false)
  readonly unmountOnExit = input<boolean>(false)
  readonly content = contentChild<TemplateRef<unknown>>(TemplateRef)
  readonly exitComplete = output<void>()

  protected readonly elementInjector = inject(Injector)
  private readonly state = signal<RenderState>({ status: 'unmounted' })
  readonly status = computed(() => this.state().status)

  constructor() {
    let initialized = false
    effect(() => {
      const present = this.present()
      if (!initialized) {
        this.state.set(initialState(present, this.lazyMount()))
        initialized = true
        return
      }
      this.state.update((current) => onPresentChange(current, present))
    })
  }

  onExitComplete(): void {
    this.state.update(onExitComplete)
    this.exitComplete.emit()
  }
}
