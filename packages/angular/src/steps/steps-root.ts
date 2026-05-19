import type * as steps from '@zag-js/steps'
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
import type { StepsElementIds, StepsStepChangeDetails, StepsStepInvalidDetails } from './steps.types'
import { ARK_STEPS_CONTEXT } from './use-steps-context'
import { useSteps, type UseStepsReturn } from './use-steps'

@Directive({
  selector: '[arkSteps]',
  standalone: true,
  exportAs: 'arkSteps',
  providers: [{ provide: ARK_STEPS_CONTEXT, useExisting: forwardRef(() => ArkStepsRoot) }],
})
export class ArkStepsRoot implements UseStepsReturn {
  /** The unique identifier of the steps machine. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the steps elements. Useful for composition. */
  readonly ids: InputSignal<StepsElementIds | undefined> = input<StepsElementIds | undefined>(undefined)
  /** The controlled current step index. */
  readonly step: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The initial step index when uncontrolled. */
  readonly defaultStep: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The total number of steps. */
  readonly count: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether steps must be completed in order. */
  readonly linear: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The orientation of the steps. */
  readonly orientation: InputSignal<steps.Props['orientation']> = input<steps.Props['orientation']>(undefined)
  /** Returns whether the step at the provided index is valid. */
  readonly isStepValid: InputSignal<steps.Props['isStepValid'] | undefined> = input<
    steps.Props['isStepValid'] | undefined
  >(undefined)
  /** Returns whether the step at the provided index can be skipped. */
  readonly isStepSkippable: InputSignal<steps.Props['isStepSkippable'] | undefined> = input<
    steps.Props['isStepSkippable'] | undefined
  >(undefined)

  /** Emits details when the current step changes. */
  readonly stepDetailsChange: OutputEmitterRef<StepsStepChangeDetails> = output<StepsStepChangeDetails>()
  /** Emits when all steps are completed. */
  readonly stepComplete: OutputEmitterRef<void> = output<void>()
  /** Emits details when navigation to a step is blocked. */
  readonly stepInvalid: OutputEmitterRef<StepsStepInvalidDetails> = output<StepsStepInvalidDetails>()

  private lastStepDetails: number | undefined

  private readonly machine = useSteps({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      step: this.step(),
      defaultStep: this.defaultStep(),
      count: this.count(),
      linear: this.linear(),
      orientation: this.orientation(),
      isStepValid: this.isStepValid(),
      isStepSkippable: this.isStepSkippable(),
      onStepChange: (details) => {
        const currentStep = this.step()
        if (currentStep !== undefined && currentStep !== details.step) {
          this.step.set(details.step)
        }
        if (this.lastStepDetails !== details.step) {
          this.lastStepDetails = details.step
          this.stepDetailsChange.emit(details)
        }
      },
      onStepComplete: () => {
        this.stepComplete.emit()
      },
      onStepInvalid: (details) => {
        this.stepInvalid.emit(details)
      },
    }),
  })

  readonly state: Signal<steps.Service['state']> = this.machine.state
  readonly api: Signal<steps.Api> = this.machine.api
  readonly service: steps.Service = this.machine.service
  readonly send: steps.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
