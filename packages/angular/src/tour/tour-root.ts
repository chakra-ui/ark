import type * as tour from '@zag-js/tour'
import {
  Directive,
  EnvironmentInjector,
  Injector,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type ProviderToken,
  type Signal,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  output,
} from '@angular/core'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  TourElementIds,
  TourFocusOutsideEvent,
  TourInteractOutsideEvent,
  TourIntlTranslations,
  TourPoint,
  TourPointerDownOutsideEvent,
  TourStatusChangeDetails,
  TourStepChangeDetails,
  TourStepDetails,
  TourStepsChangeDetails,
} from './tour.types'
import { ARK_TOUR_CONTEXT, ARK_TOUR_CONTEXT_CARRIER } from './use-tour-context'
import { useTour, type UseTourReturn } from './use-tour'

@Directive({
  selector: '[arkTour]',
  standalone: true,
  exportAs: 'arkTour',
  providers: [
    { provide: ARK_TOUR_CONTEXT, useExisting: forwardRef(() => ArkTourRoot) },
    {
      provide: ARK_TOUR_CONTEXT_CARRIER,
      useFactory: (root: ArkTourRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkTourRoot)],
    },
  ],
})
export class ArkTourRoot implements UseTourReturn {
  /** The unique identifier of the tour. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the tour. Useful for composition. */
  readonly ids: InputSignal<TourElementIds | undefined> = input<TourElementIds | undefined>(undefined)
  /** The steps of the tour. */
  readonly steps: InputSignal<TourStepDetails[] | undefined> = input<TourStepDetails[] | undefined>(undefined)
  /** The controlled id of the currently highlighted step. */
  readonly stepId: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** Whether to close the tour when the user clicks outside the tour. */
  readonly closeOnInteractOutside: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  })
  /** Whether to close the tour when the escape key is pressed. */
  readonly closeOnEscape: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether left/right arrow keys navigate between steps. */
  readonly keyboardNavigation: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  })
  /** Whether interaction with the rest of the page is prevented while the tour is open. */
  readonly preventInteraction: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** The offsets to apply to the spotlight. */
  readonly spotlightOffset: InputSignal<TourPoint | undefined> = input<TourPoint | undefined>(undefined)
  /** The radius of the spotlight clip path. */
  readonly spotlightRadius: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Localized strings for the tour. */
  readonly translations: InputSignal<TourIntlTranslations | undefined> = input<TourIntlTranslations | undefined>(
    undefined,
  )

  /** Emits details when focus moves outside the tour content. */
  readonly focusOutside: OutputEmitterRef<TourFocusOutsideEvent> = output<TourFocusOutsideEvent>()
  /** Emits details when an interaction happens outside the tour content. */
  readonly interactOutside: OutputEmitterRef<TourInteractOutsideEvent> = output<TourInteractOutsideEvent>()
  /** Emits details when the pointer is pressed outside the tour content. */
  readonly pointerDownOutside: OutputEmitterRef<TourPointerDownOutsideEvent> = output<TourPointerDownOutsideEvent>()
  /** Emits when the tour status changes, including completion and skips. */
  readonly statusChange: OutputEmitterRef<TourStatusChangeDetails> = output<TourStatusChangeDetails>()
  /** Emits details when the highlighted step changes. */
  readonly stepChange: OutputEmitterRef<TourStepChangeDetails> = output<TourStepChangeDetails>()
  /** Emits details when the step list changes. */
  readonly stepsChange: OutputEmitterRef<TourStepsChangeDetails> = output<TourStepsChangeDetails>()

  private lastStepDetails: string | null | undefined

  private readonly machine = useTour({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      steps: this.steps(),
      stepId: this.stepId(),
      closeOnInteractOutside: this.closeOnInteractOutside(),
      closeOnEscape: this.closeOnEscape(),
      keyboardNavigation: this.keyboardNavigation(),
      preventInteraction: this.preventInteraction(),
      spotlightOffset: this.spotlightOffset(),
      spotlightRadius: this.spotlightRadius(),
      translations: this.translations(),
      onFocusOutside: (event) => this.focusOutside.emit(event),
      onInteractOutside: (event) => this.interactOutside.emit(event),
      onPointerDownOutside: (event) => this.pointerDownOutside.emit(event),
      onStatusChange: (details) => this.statusChange.emit(details),
      onStepChange: (details) => {
        const currentStepId = this.stepId()
        if (currentStepId !== undefined && currentStepId !== details.stepId) {
          this.stepId.set(details.stepId)
        }
        if (this.lastStepDetails !== details.stepId) {
          this.lastStepDetails = details.stepId
          this.stepChange.emit(details)
        }
      },
      onStepsChange: (details) => this.stepsChange.emit(details),
    }),
  })

  readonly state: Signal<tour.Service['state']> = this.machine.state
  readonly api: Signal<tour.Api> = this.machine.api
  readonly service: tour.Service = this.machine.service
  readonly send: tour.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkTourRoot> = buildRootCarrier<ArkTourRoot>({
    root: this,
    rootToken: ARK_TOUR_CONTEXT as ProviderToken<ArkTourRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for tour part directives to consume via ARK_TOUR_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkTourRoot> {
    return this.arkContextCarrier
  }
}
