import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core'

export type ArkPresenceStatus = 'unmounted' | 'mounted' | 'exiting'
export type ArkPresenceState = { status: ArkPresenceStatus }
export interface PresenceProps {
  present?: boolean
  lazyMount?: boolean
  unmountOnExit?: boolean
  skipAnimationOnMount?: boolean
}
export type PresenceInputs = PresenceProps

const initialPresenceState = (present: boolean, lazyMount: boolean): ArkPresenceState => {
  if (present) return { status: 'mounted' }
  return lazyMount ? { status: 'unmounted' } : { status: 'mounted' }
}

const updatePresenceState = (state: ArkPresenceState, present: boolean): ArkPresenceState => {
  if (present) return state.status === 'mounted' ? state : { status: 'mounted' }
  if (state.status === 'unmounted') return state
  return state.status === 'exiting' ? state : { status: 'exiting' }
}

const completePresenceExit = (state: ArkPresenceState, unmountOnExit: boolean): ArkPresenceState => {
  if (state.status !== 'exiting') return state
  return unmountOnExit ? { status: 'unmounted' } : { status: 'mounted' }
}

@Component({
  selector: 'ark-presence',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (status() !== 'unmounted') {
      <span
        data-scope="presence"
        data-part="root"
        [attr.data-state]="dataState()"
        [hidden]="hidden()"
        (animationend)="onExitComplete()"
        (transitionend)="onExitComplete()"
      >
        <ng-container [ngTemplateOutlet]="content() ?? null"></ng-container>
      </span>
    }
  `,
})
export class ArkPresenceComponent {
  readonly present = input(false, { transform: booleanAttribute })
  readonly lazyMount = input(false, { transform: booleanAttribute })
  readonly unmountOnExit = input(false, { transform: booleanAttribute })
  readonly skipAnimationOnMount = input(false, { transform: booleanAttribute })
  readonly content = contentChild<TemplateRef<unknown>>(TemplateRef)
  readonly exitComplete = output<void>()

  private readonly state = signal<ArkPresenceState>({ status: 'unmounted' })
  private hasMounted = false
  readonly status = computed(() => this.state().status)
  readonly hidden = computed(() => !this.present())
  readonly dataState = computed(() => {
    if (this.skipAnimationOnMount() && !this.hasMounted && this.present()) return undefined
    return this.present() ? 'open' : 'closed'
  })

  constructor() {
    let initialized = false
    effect(() => {
      const present = this.present()
      if (!initialized) {
        this.state.set(
          initialPresenceState(
            present,
            untracked(() => this.lazyMount()),
          ),
        )
        initialized = true
        if (present) this.hasMounted = true
        return
      }
      this.state.update((current) => updatePresenceState(current, present))
      if (present) this.hasMounted = true
    })
  }

  onExitComplete(): void {
    const previous = this.state()
    if (previous.status !== 'exiting') return
    this.state.set(completePresenceExit(previous, this.unmountOnExit()))
    this.exitComplete.emit()
  }
}
