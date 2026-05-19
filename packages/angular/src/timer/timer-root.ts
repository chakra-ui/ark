import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  effect,
  forwardRef,
  inject,
  input,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import type * as timer from '@zag-js/timer'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { TimerElementIds, TimerIntlTranslations, TimerTickDetails } from './timer.types'
import { ARK_TIMER_CONTEXT } from './use-timer-context'
import { useTimer, type UseTimerReturn } from './use-timer'

@Directive({
  selector: '[arkTimer]',
  standalone: true,
  exportAs: 'arkTimer',
  providers: [{ provide: ARK_TIMER_CONTEXT, useExisting: forwardRef(() => ArkTimerRoot) }],
})
export class ArkTimerRoot implements UseTimerReturn {
  /** The unique identifier of the timer. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the timer elements. Useful for composition. */
  readonly ids: InputSignal<Partial<TimerElementIds> | undefined> = input<Partial<TimerElementIds> | undefined>(
    undefined,
  )
  /** Whether the timer should start automatically. */
  readonly autoStart: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the timer should count down, decrementing the timer on each tick. */
  readonly countdown: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The interval in milliseconds to update the timer count. */
  readonly interval: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The total duration of the timer in milliseconds. */
  readonly startMs: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The target count of the timer in milliseconds. */
  readonly targetMs: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Localized strings for accessibility labels. */
  readonly translations: InputSignal<TimerIntlTranslations | undefined> = input<TimerIntlTranslations | undefined>(
    undefined,
  )

  /** Emits when the timer completes. */
  readonly complete: OutputEmitterRef<void> = output<void>()
  /** Emits details when the timer ticks. */
  readonly tick: OutputEmitterRef<TimerTickDetails> = output<TimerTickDetails>()

  private hasAutoStarted = false

  private readonly machine = useTimer({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      countdown: this.countdown() || undefined,
      interval: this.interval(),
      startMs: this.startMs(),
      targetMs: this.targetMs(),
      translations: this.translations(),
      onComplete: () => {
        this.complete.emit()
      },
      onTick: (details) => {
        this.tick.emit(details)
      },
    }),
  })

  readonly state: Signal<timer.Service['state']> = this.machine.state
  readonly api: Signal<timer.Api> = this.machine.api
  readonly service: timer.Service = this.machine.service
  readonly send: timer.Service['send'] = this.machine.send

  constructor() {
    effect(() => {
      if (this.hasAutoStarted || !this.autoStart()) return
      this.hasAutoStarted = true
      // Keep autoStart out of reactive context patches so input changes do not restart the timer.
      this.api().start()
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
