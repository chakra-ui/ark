import type * as marquee from '@zag-js/marquee'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { MarqueeElementIds, MarqueeIntlTranslations, MarqueePauseStatusDetails } from './marquee.types'
import { ARK_MARQUEE_CONTEXT } from './use-marquee-context'
import { useMarquee, type UseMarqueeReturn } from './use-marquee'

@Directive({
  selector: '[arkMarquee]',
  standalone: true,
  exportAs: 'arkMarquee',
  providers: [{ provide: ARK_MARQUEE_CONTEXT, useExisting: forwardRef(() => ArkMarqueeRoot) }],
})
export class ArkMarqueeRoot implements UseMarqueeReturn {
  /** The unique identifier of the marquee. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the marquee elements. Useful for composition. */
  readonly ids: InputSignal<Partial<MarqueeElementIds> | undefined> = input<Partial<MarqueeElementIds> | undefined>(
    undefined,
  )
  /** Localized strings for accessibility labels. */
  readonly translations: InputSignal<MarqueeIntlTranslations | undefined> = input<MarqueeIntlTranslations | undefined>(
    undefined,
  )
  /** The side the marquee scrolls towards. */
  readonly side: InputSignal<marquee.Props['side'] | undefined> = input<marquee.Props['side'] | undefined>(undefined)
  /** The animation speed in pixels per second. */
  readonly speed: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The delay before the animation starts, in seconds. */
  readonly delay: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The number of animation loops. Use 0 for infinite looping. */
  readonly loopCount: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The spacing between marquee items. */
  readonly spacing: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether to duplicate content to fill the container. */
  readonly autoFill: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to pause the marquee on hover or focus. */
  readonly pauseOnInteraction: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Whether to reverse the animation direction. */
  readonly reverse: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled pause state. */
  readonly paused: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial pause state when uncontrolled. */
  readonly defaultPaused: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  /** Emits details when the pause state changes. */
  readonly pauseDetailsChange: OutputEmitterRef<MarqueePauseStatusDetails> = output<MarqueePauseStatusDetails>()
  /** Emits when the marquee completes one loop iteration. */
  readonly loopComplete: OutputEmitterRef<void> = output<void>()
  /** Emits when a finite marquee animation completes. */
  readonly complete: OutputEmitterRef<void> = output<void>()

  private lastPauseDetails: boolean | undefined

  private readonly machine = useMarquee({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      translations: this.translations(),
      side: this.side(),
      speed: this.speed(),
      delay: this.delay(),
      loopCount: this.loopCount(),
      spacing: this.spacing(),
      autoFill: this.autoFill(),
      pauseOnInteraction: this.pauseOnInteraction(),
      reverse: this.reverse(),
      paused: this.paused(),
      defaultPaused: this.defaultPaused(),
      onPauseChange: (details) => {
        const currentPaused = this.paused()
        if (currentPaused !== undefined && currentPaused !== details.paused) {
          this.paused.set(details.paused)
        }
        if (this.lastPauseDetails !== details.paused) {
          this.lastPauseDetails = details.paused
          this.pauseDetailsChange.emit(details)
        }
      },
      onLoopComplete: () => this.loopComplete.emit(),
      onComplete: () => this.complete.emit(),
    }),
  })

  readonly state: Signal<marquee.Service['state']> = this.machine.state
  readonly api: Signal<marquee.Api> = this.machine.api
  readonly service: marquee.Service = this.machine.service
  readonly send: marquee.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
