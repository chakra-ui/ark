import {
  ApplicationRef,
  Component,
  Directive,
  Injector,
  InjectionToken,
  PLATFORM_ID,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { TestBed, type ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_TOUR_CONTEXT,
  ARK_TOUR_CONTEXT_CARRIER,
  ArkTourActionTrigger,
  ArkTourActions,
  ArkTourArrow,
  ArkTourArrowTip,
  ArkTourBackdrop,
  ArkTourCloseTrigger,
  ArkTourContent,
  ArkTourContext,
  ArkTourControl,
  ArkTourDescription,
  ArkTourPositioner,
  ArkTourProgressText,
  ArkTourRoot,
  ArkTourSpotlight,
  ArkTourTitle,
  injectArkTourContext,
  injectArkTourContextCarrier,
  tourAnatomy,
  useTour,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
  type TourApi,
  type TourElementIds,
  type TourFocusOutsideEvent,
  type TourInteractOutsideEvent,
  type TourMachine,
  type TourMachineProps,
  type TourPointerDownOutsideEvent,
  type TourService,
  type TourStatusChangeDetails,
  type TourStepAction,
  type TourStepChangeDetails,
  type TourStepDetails,
  type TourStepEffectArgs,
  type UseTourOptions,
  type UseTourProps,
  type UseTourReturn,
  type WaitOptions,
} from '@ark-ui/angular/tour'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { TourAsyncStepExample } from './examples/async-step'
import { TourBasicExample } from './examples/basic'
import { TourControlledExample } from './examples/controlled'
import { TourEventsExample } from './examples/events'
import { TourKeyboardNavigationExample } from './examples/keyboard-navigation'
import { TourMixedTypesExample } from './examples/mixed-types'
import { TourProgressBarExample } from './examples/progress-bar'
import { TourSkipTourExample } from './examples/skip-tour'
import { TourWaitForClickExample } from './examples/wait-for-click'
import { TourWaitForElementExample } from './examples/wait-for-element'
import { TourWaitForInputExample } from './examples/wait-for-input'

type TourPublicTypeSmoke = [
  TourApi,
  TourElementIds,
  TourFocusOutsideEvent,
  TourInteractOutsideEvent,
  TourMachine,
  TourMachineProps,
  TourPointerDownOutsideEvent,
  TourService,
  TourStatusChangeDetails,
  TourStepAction,
  TourStepChangeDetails,
  TourStepDetails,
  TourStepEffectArgs,
  UseTourOptions,
  UseTourProps,
  UseTourReturn,
  WaitOptions,
]

const LABEL_PREFIX = new InjectionToken<string>('LABEL_PREFIX')

@Directive({ selector: '[tourProbe]', standalone: true, exportAs: 'tourProbe' })
class TourProbe {
  private readonly injector = inject(Injector)

  get capturedRoot(): UseTourReturn {
    return this.injector.get(ARK_TOUR_CONTEXT)
  }

  get capturedLabelPrefix(): string | null {
    return this.injector.get(LABEL_PREFIX, null)
  }
}

const dialogStep = (id: string, title = id, actions: TourStepAction[] = []): TourStepDetails => ({
  id,
  type: 'dialog',
  title,
  description: `${title} description`,
  actions,
})

const flush = async (fixture: ComponentFixture<unknown>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

describe('@ark-ui/angular/tour', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    if (typeof HTMLElement.prototype.scrollIntoView !== 'function') {
      HTMLElement.prototype.scrollIntoView = () => {}
    }
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_TOUR_CONTEXT).toBe('object')
    expect(typeof ARK_TOUR_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkTourContext).toBe('function')
    expect(typeof injectArkTourContextCarrier).toBe('function')
    expect(typeof useTour).toBe('function')
    expect(typeof waitForElement).toBe('function')
    expect(typeof waitForElementValue).toBe('function')
    expect(typeof waitForEvent).toBe('function')
    expect(typeof waitForPromise).toBe('function')
    expect(typeof tourAnatomy).toBe('object')
    expect(ArkTourRoot).toBeDefined()
    expect(ArkTourPositioner).toBeDefined()
    expect(ArkTourContent).toBeDefined()
    expect(ArkTourTitle).toBeDefined()
    expect(ArkTourDescription).toBeDefined()
    expect(ArkTourCloseTrigger).toBeDefined()
    expect(ArkTourActionTrigger).toBeDefined()
    expect(ArkTourActions).toBeDefined()
    expect(ArkTourControl).toBeDefined()
    expect(ArkTourProgressText).toBeDefined()
    expect(ArkTourBackdrop).toBeDefined()
    expect(ArkTourSpotlight).toBeDefined()
    expect(ArkTourArrow).toBeDefined()
    expect(ArkTourArrowTip).toBeDefined()
    expect(ArkTourContext).toBeDefined()
    expect(TourAsyncStepExample).toBeDefined()
    expect(TourBasicExample).toBeDefined()
    expect(TourControlledExample).toBeDefined()
    expect(TourEventsExample).toBeDefined()
    expect(TourKeyboardNavigationExample).toBeDefined()
    expect(TourMixedTypesExample).toBeDefined()
    expect(TourProgressBarExample).toBeDefined()
    expect(TourSkipTourExample).toBeDefined()
    expect(TourWaitForClickExample).toBeDefined()
    expect(TourWaitForElementExample).toBeDefined()
    expect(TourWaitForInputExample).toBeDefined()
    expect(undefined as TourPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useTour({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useTour({ context: () => ({}) }))
    const id = (result.api().getContentProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/tour::/)

    fixture.destroy()
  })

  it('starts, advances, goes back, and dismisses a tour', async () => {
    @Component({
      standalone: true,
      imports: [ArkTourRoot, ArkTourContent],
      template: '<div arkTour #tour="arkTour" [steps]="steps"><div arkTourContent></div></div>',
    })
    class Host {
      readonly steps: TourStepDetails[] = [dialogStep('one'), dialogStep('two'), dialogStep('three')]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    const root = fixture.debugElement.query(By.directive(ArkTourRoot)).injector.get(ArkTourRoot)

    root.api().start()
    await flush(fixture)
    expect(root.api().open).toBe(true)
    expect(root.api().step?.id).toBe('one')

    root.api().next()
    await flush(fixture)
    expect(root.api().step?.id).toBe('two')

    root.api().prev()
    await flush(fixture)
    expect(root.api().step?.id).toBe('one')

    root.api().setStep('three')
    await flush(fixture)
    root.send({ type: 'DISMISS' } as Parameters<TourService['send']>[0])
    await flush(fixture)
    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('renders progress text and action triggers for the current step', async () => {
    @Component({
      standalone: true,
      imports: [ArkTourRoot, ArkTourContent, ArkTourProgressText, ArkTourActions, ArkTourActionTrigger],
      template: `
        <div arkTour #tour="arkTour" [steps]="steps">
          <div arkTourContent>
            <span arkTourProgressText></span>
            <ng-template arkTourActions let-actions>
              @for (action of actions; track action.label) {
                <button arkTourActionTrigger [action]="action"></button>
              }
            </ng-template>
          </div>
        </div>
      `,
    })
    class Host {
      readonly steps: TourStepDetails[] = [
        dialogStep('one', 'One', [{ label: 'Next', action: 'next' }]),
        dialogStep('two', 'Two', [{ label: 'Back', action: 'prev' }]),
      ]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    const root = fixture.debugElement.query(By.directive(ArkTourRoot)).injector.get(ArkTourRoot)

    root.api().start()
    await flush(fixture)

    const progress = fixture.debugElement.query(By.directive(ArkTourProgressText)).nativeElement as HTMLElement
    let actionButton = fixture.debugElement.query(By.directive(ArkTourActionTrigger)).nativeElement as HTMLButtonElement
    expect(progress.textContent).toBe('1 of 2')
    expect(actionButton.textContent).toBe('Next')
    expect(actionButton.getAttribute('data-type')).toBe('next')

    actionButton.click()
    await flush(fixture)

    actionButton = fixture.debugElement.query(By.directive(ArkTourActionTrigger)).nativeElement as HTMLButtonElement
    expect(root.api().step?.id).toBe('two')
    expect(progress.textContent).toBe('2 of 2')
    expect(actionButton.textContent).toBe('Back')

    fixture.destroy()
  })

  it('waitForEvent waits for a conditionally rendered target', async () => {
    vi.useFakeTimers()
    let target: HTMLButtonElement | null = null
    const [promise, cancel] = waitForEvent(() => target, 'click')

    try {
      await vi.advanceTimersByTimeAsync(16)
      target = document.createElement('button')
      document.body.appendChild(target)
      await vi.advanceTimersByTimeAsync(16)

      target.click()
      await expect(promise).resolves.toMatchObject({ type: 'click' })
    } finally {
      cancel()
      target?.remove()
      vi.useRealTimers()
    }
  })

  it('emits step, status, completion, skip, and model outputs', async () => {
    @Component({
      standalone: true,
      imports: [ArkTourRoot, ArkTourContent, ArkTourActions, ArkTourActionTrigger],
      template: `
        <div
          arkTour
          #tour="arkTour"
          [steps]="steps"
          (stepIdChange)="stepIds.push($event)"
          (stepChange)="stepChanges.push($event)"
          (statusChange)="statuses.push($event)"
        >
          <div arkTourContent>
            <ng-template arkTourActions let-actions>
              @for (action of actions; track action.label) {
                <button arkTourActionTrigger [action]="action"></button>
              }
            </ng-template>
          </div>
        </div>
      `,
    })
    class Host {
      readonly statuses: TourStatusChangeDetails[] = []
      readonly stepChanges: TourStepChangeDetails[] = []
      readonly stepIds: Array<string | null | undefined> = []
      readonly steps: TourStepDetails[] = [
        dialogStep('one', 'One', [
          { label: 'Next', action: 'next' },
          { label: 'Skip', action: (actions) => actions.skip() },
        ]),
        dialogStep('two', 'Two', [{ label: 'Finish', action: 'dismiss' }]),
      ]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    const root = fixture.debugElement.query(By.directive(ArkTourRoot)).injector.get(ArkTourRoot)

    root.api().start()
    await flush(fixture)
    root.api().next()
    await flush(fixture)
    root.send({ type: 'DISMISS' } as Parameters<TourService['send']>[0])
    await flush(fixture)

    expect(fixture.componentInstance.stepIds).toContain('one')
    expect(fixture.componentInstance.stepIds).toContain('two')
    expect(fixture.componentInstance.stepChanges.some((details) => details.stepId === 'two' && details.complete)).toBe(
      true,
    )
    expect(fixture.componentInstance.statuses.map((details) => details.status)).toContain('completed')

    root.api().start()
    await flush(fixture)
    root.send({ type: 'SKIP' } as Parameters<TourService['send']>[0])
    await flush(fixture)

    expect(fixture.componentInstance.statuses.map((details) => details.status)).toContain('skipped')
    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('advances async wait steps with deterministic fake events', async () => {
    @Component({
      standalone: true,
      imports: [ArkTourRoot, ArkTourContent],
      template: `
        <div arkTour #tour="arkTour" [steps]="steps">
          <button id="wait-target" type="button">Continue</button>
          <div arkTourContent></div>
        </div>
      `,
    })
    class Host {
      readonly steps: TourStepDetails[] = [
        dialogStep('intro', 'Intro'),
        {
          id: 'wait',
          type: 'wait',
          title: 'Wait',
          description: 'Waiting',
          target: () => document.querySelector<HTMLElement>('#wait-target'),
          effect({ next, show, target }) {
            show()
            const [promise, cancel] = waitForEvent(target, 'click')
            let cancelled = false
            promise
              .then(() => {
                if (!cancelled) next()
              })
              .catch(() => {})
            return () => {
              cancelled = true
              cancel()
            }
          },
        },
        dialogStep('done', 'Done'),
      ]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    const root = fixture.debugElement.query(By.directive(ArkTourRoot)).injector.get(ArkTourRoot)
    const target = fixture.nativeElement.querySelector('#wait-target') as HTMLButtonElement

    root.api().start()
    await flush(fixture)
    root.api().next()
    await flush(fixture)
    expect(root.api().step?.id).toBe('wait')

    target.click()
    await flush(fixture)
    expect(root.api().step?.id).toBe('done')

    fixture.destroy()
  })

  it('propagates context through dynamic portaled content', async () => {
    @Component({
      standalone: true,
      imports: [ArkTourRoot, ArkTourContent, ArkPortalComponent, TourProbe],
      providers: [{ provide: LABEL_PREFIX, useValue: 'from-root-host' }],
      template: `
        <div arkTour #tour="arkTour" [steps]="steps">
          @if (showPortal()) {
            <ark-portal [originInjector]="tour.getContextCarrier().elementInjector">
              <div arkTourContent>
                <span tourProbe></span>
              </div>
            </ark-portal>
          }
        </div>
      `,
    })
    class Host {
      readonly showPortal = signal(false)
      readonly steps: TourStepDetails[] = [dialogStep('one')]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    const root = fixture.debugElement.query(By.directive(ArkTourRoot)).injector.get(ArkTourRoot)

    fixture.componentInstance.showPortal.set(true)
    fixture.detectChanges()
    await flush(fixture)

    const probe = fixture.debugElement.query(By.directive(TourProbe)).injector.get(TourProbe)
    expect(probe.capturedRoot).toBe(root)
    expect(probe.capturedLabelPrefix).toBe('from-root-host')

    fixture.destroy()
  })

  it('orphan [arkTourContent] without ancestor [arkTour] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkTourContent],
      template: '<div arkTourContent></div>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_TOUR_CONTEXT|No provider|NG0201/i)
  })

  it('constructs without throwing under a server platform configuration', () => {
    @Component({
      standalone: true,
      imports: [ArkTourRoot, ArkTourContent],
      template: '<div arkTour [steps]="steps"><div arkTourContent></div></div>',
    })
    class Host {
      readonly steps: TourStepDetails[] = [dialogStep('one')]
    }

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    expect(() => {
      const fixture = TestBed.createComponent(Host)
      fixture.detectChanges()
      fixture.destroy()
    }).not.toThrow()
  })
})
