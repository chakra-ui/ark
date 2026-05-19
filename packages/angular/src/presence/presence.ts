import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  type Injector,
  PLATFORM_ID,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core'

export type ArkPresenceStatus = 'unmounted' | 'mounted' | 'closed' | 'exiting'
export type ArkPresenceState = { status: ArkPresenceStatus }
export interface PresenceProps {
  immediate?: boolean
  present?: boolean
  lazyMount?: boolean
  unmountOnExit?: boolean
  skipAnimationOnMount?: boolean
  originInjector?: Injector | null
}
export type PresenceInputs = PresenceProps

const initialPresenceState = (present: boolean, lazyMount: boolean): ArkPresenceState => {
  if (present) return { status: 'mounted' }
  return lazyMount ? { status: 'unmounted' } : { status: 'closed' }
}

const updatePresenceState = (state: ArkPresenceState, present: boolean): ArkPresenceState => {
  if (present) return state.status === 'mounted' ? state : { status: 'mounted' }
  if (state.status === 'unmounted' || state.status === 'closed') return state
  return state.status === 'exiting' ? state : { status: 'exiting' }
}

const completePresenceExit = (state: ArkPresenceState, unmountOnExit: boolean): ArkPresenceState => {
  if (state.status !== 'exiting') return state
  return unmountOnExit ? { status: 'unmounted' } : { status: 'closed' }
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
        #presenceNode
        data-scope="presence"
        data-part="root"
        [attr.data-state]="dataState()"
        [hidden]="hidden()"
        (animationcancel)="onExitComplete($event)"
        (animationend)="onExitComplete($event)"
        (transitionend)="onExitComplete($event)"
      >
        <ng-container
          [ngTemplateOutlet]="content() ?? null"
          [ngTemplateOutletInjector]="originInjector() ?? null"
        ></ng-container>
      </span>
    }
  `,
})
export class ArkPresenceComponent {
  readonly immediate = input(false, { transform: booleanAttribute })
  readonly present = input(false, { transform: booleanAttribute })
  readonly lazyMount = input(false, { transform: booleanAttribute })
  readonly unmountOnExit = input(false, { transform: booleanAttribute })
  readonly skipAnimationOnMount = input(false, { transform: booleanAttribute })
  readonly originInjector = input<PresenceProps['originInjector']>(undefined)
  readonly content = contentChild<TemplateRef<unknown>>(TemplateRef)
  readonly exitComplete = output<void>()

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private readonly destroyRef = inject(DestroyRef)
  private readonly presenceNode = viewChild<ElementRef<HTMLElement>>('presenceNode')
  private readonly state = signal<ArkPresenceState>({ status: 'unmounted' })
  private readonly skipInitialOpenState = signal(false)
  private exitFrame: number | null = null
  readonly status = computed(() => this.state().status)
  readonly hidden = computed(() => !this.present() && this.status() !== 'exiting')
  readonly dataState = computed(() => {
    if (this.skipInitialOpenState() && this.present()) return undefined
    return this.present() ? 'open' : 'closed'
  })

  constructor() {
    this.destroyRef.onDestroy(() => this.cancelNoMotionExitCompletion())

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
        this.skipInitialOpenState.set(this.skipAnimationOnMount() && present)
        return
      }
      this.state.update((current) => updatePresenceState(current, present))
      if (!present) this.skipInitialOpenState.set(false)
    })
    effect(() => {
      const status = this.status()
      const present = this.present()
      const immediate = this.immediate()
      if (status === 'exiting' && !present) {
        this.scheduleNoMotionExitCompletion(immediate)
        return
      }
      this.cancelNoMotionExitCompletion()
    })
  }

  onExitComplete(event?: Event): void {
    if (event && event.target !== event.currentTarget) return
    const previous = this.state()
    if (previous.status !== 'exiting') return
    this.state.set(completePresenceExit(previous, this.unmountOnExit()))
    this.exitComplete.emit()
  }

  private scheduleNoMotionExitCompletion(immediate: boolean): void {
    if (!this.isBrowser || this.exitFrame !== null) return
    const completeIfNoMotion = () => {
      this.exitFrame = null
      const node = this.presenceNode()?.nativeElement
      if (!node || this.present() || this.status() !== 'exiting') return
      if (hasExitMotion(node)) return
      this.onExitComplete()
    }
    if (immediate) {
      queueMicrotask(completeIfNoMotion)
      return
    }
    this.exitFrame = requestAnimationFrame(completeIfNoMotion)
  }

  private cancelNoMotionExitCompletion(): void {
    if (this.exitFrame === null || !this.isBrowser) return
    cancelAnimationFrame(this.exitFrame)
    this.exitFrame = null
  }
}

const hasExitMotion = (node: HTMLElement): boolean => {
  const styles = getComputedStyle(node)
  if (styles.display === 'none') return false
  return hasActiveAnimation(styles) || hasActiveTransition(styles)
}

const hasActiveAnimation = (styles: CSSStyleDeclaration): boolean => {
  const names = splitCssList(styles.animationName)
  const durations = splitCssList(styles.animationDuration)
  return names.some((name, index) => name !== 'none' && parseCssTime(durations[index] ?? durations[0]) > 0)
}

const hasActiveTransition = (styles: CSSStyleDeclaration): boolean => {
  const properties = splitCssList(styles.transitionProperty)
  const durations = splitCssList(styles.transitionDuration)
  return properties.some((property, index) => property !== 'none' && parseCssTime(durations[index] ?? durations[0]) > 0)
}

const splitCssList = (value: string): string[] => value.split(',').map((item) => item.trim())

const parseCssTime = (value = '0s'): number => {
  if (value.endsWith('ms')) return Number.parseFloat(value)
  if (value.endsWith('s')) return Number.parseFloat(value) * 1000
  return Number.parseFloat(value) || 0
}
