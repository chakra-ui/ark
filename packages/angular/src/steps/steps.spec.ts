import { ApplicationRef, Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_STEPS_CONTEXT,
  ARK_STEPS_ITEM_CONTEXT,
  ARK_STEPS_ITEM_PROPS_CONTEXT,
  ArkStepsCompletedContent,
  ArkStepsContent,
  ArkStepsContext,
  ArkStepsIndicator,
  ArkStepsItem,
  ArkStepsItemContext,
  ArkStepsList,
  ArkStepsNextTrigger,
  ArkStepsPrevTrigger,
  ArkStepsProgress,
  ArkStepsRoot,
  ArkStepsRootProvider,
  ArkStepsSeparator,
  ArkStepsTrigger,
  injectArkStepsContext,
  injectArkStepsItemContext,
  injectArkStepsItemPropsContext,
  stepsAnatomy,
  useSteps,
  type StepsApi,
  type StepsContextTemplate,
  type StepsElementIds,
  type StepsItemContextTemplate,
  type StepsItemProps,
  type StepsItemState,
  type StepsMachine,
  type StepsMachineProps,
  type StepsService,
  type StepsStepChangeDetails,
  type StepsStepInvalidDetails,
  type UseStepsItemContext,
  type UseStepsItemPropsContext,
  type UseStepsOptions,
  type UseStepsProps,
  type UseStepsReturn,
} from '@ark-ui/angular/steps'

type StepsPublicTypeSmoke = [
  StepsApi,
  StepsContextTemplate,
  StepsElementIds,
  StepsItemContextTemplate,
  StepsItemProps,
  StepsItemState,
  StepsMachine,
  StepsMachineProps,
  StepsService,
  StepsStepChangeDetails,
  StepsStepInvalidDetails,
  UseStepsItemContext,
  UseStepsItemPropsContext,
  UseStepsOptions,
  UseStepsProps,
  UseStepsReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

@Directive({ selector: '[stepsProbe]', standalone: true, exportAs: 'stepsProbe' })
class StepsProbe {
  private readonly injector = inject(Injector)
  get captured(): UseStepsReturn {
    return this.injector.get(ARK_STEPS_CONTEXT)
  }
}

@Directive({ selector: '[stepsItemProbe]', standalone: true, exportAs: 'stepsItemProbe' })
class StepsItemProbe {
  readonly item = injectArkStepsItemContext()
  readonly itemProps = injectArkStepsItemPropsContext()
}

describe('@ark-ui/angular/steps', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_STEPS_CONTEXT).toBe('object')
    expect(typeof ARK_STEPS_ITEM_CONTEXT).toBe('object')
    expect(typeof ARK_STEPS_ITEM_PROPS_CONTEXT).toBe('object')
    expect(typeof injectArkStepsContext).toBe('function')
    expect(typeof injectArkStepsItemContext).toBe('function')
    expect(typeof injectArkStepsItemPropsContext).toBe('function')
    expect(typeof useSteps).toBe('function')
    expect(typeof stepsAnatomy).toBe('object')
    expect(ArkStepsRoot).toBeDefined()
    expect(ArkStepsRootProvider).toBeDefined()
    expect(ArkStepsList).toBeDefined()
    expect(ArkStepsItem).toBeDefined()
    expect(ArkStepsTrigger).toBeDefined()
    expect(ArkStepsIndicator).toBeDefined()
    expect(ArkStepsSeparator).toBeDefined()
    expect(ArkStepsContent).toBeDefined()
    expect(ArkStepsCompletedContent).toBeDefined()
    expect(ArkStepsProgress).toBeDefined()
    expect(ArkStepsNextTrigger).toBeDefined()
    expect(ArkStepsPrevTrigger).toBeDefined()
    expect(ArkStepsContext).toBeDefined()
    expect(ArkStepsItemContext).toBeDefined()
    expect(undefined as StepsPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useSteps({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useSteps({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/steps::/)

    fixture.destroy()
  })

  it('applies current, completed, and incomplete state attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkStepsRoot,
        ArkStepsList,
        ArkStepsItem,
        ArkStepsTrigger,
        ArkStepsIndicator,
        ArkStepsSeparator,
        ArkStepsContent,
        ArkStepsCompletedContent,
        ArkStepsProgress,
      ],
      template: `
        <div arkSteps [count]="3" [step]="1">
          <ol arkStepsList>
            @for (index of [0, 1, 2]; track index) {
              <li arkStepsItem [index]="index">
                <button arkStepsTrigger>Step {{ index }}</button>
                <span arkStepsIndicator></span>
                <span arkStepsSeparator></span>
              </li>
            }
          </ol>
          @for (index of [0, 1, 2]; track index) {
            <div arkStepsContent [index]="index">Content {{ index }}</div>
          }
          <div arkStepsCompletedContent>Done</div>
          <div arkStepsProgress></div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkStepsRoot)).injector.get(ArkStepsRoot)
    const items = fixture.nativeElement.querySelectorAll('[data-part="item"]') as NodeListOf<HTMLElement>
    const triggers = fixture.nativeElement.querySelectorAll('[data-part="trigger"]') as NodeListOf<HTMLButtonElement>
    const indicators = fixture.nativeElement.querySelectorAll('[data-part="indicator"]') as NodeListOf<HTMLElement>
    const contents = fixture.nativeElement.querySelectorAll('[data-part="content"]') as NodeListOf<HTMLElement>
    const progress = fixture.nativeElement.querySelector('[data-part="progress"]') as HTMLElement

    expect(root.api().value).toBe(1)
    expect(items[1]?.getAttribute('aria-current')).toBe('step')
    expect(triggers[0]?.getAttribute('data-complete')).toBe('')
    expect(triggers[1]?.getAttribute('data-current')).toBe('')
    expect(triggers[2]?.getAttribute('data-incomplete')).toBe('')
    expect(indicators[0]?.getAttribute('data-complete')).toBe('')
    expect(indicators[1]?.getAttribute('data-current')).toBe('')
    expect(indicators[2]?.getAttribute('data-incomplete')).toBe('')
    expect(contents[0]?.hidden).toBe(true)
    expect(contents[1]?.hidden).toBe(false)
    expect(contents[2]?.hidden).toBe(true)
    expect(progress.getAttribute('role')).toBe('progressbar')
    expect(progress.getAttribute('aria-valuenow')).toBe('33.33333333333333')

    fixture.destroy()
  })

  it('supports next and previous trigger behavior', async () => {
    @Component({
      standalone: true,
      imports: [ArkStepsRoot, ArkStepsNextTrigger, ArkStepsPrevTrigger],
      template: `
        <div arkSteps [count]="3" [defaultStep]="1">
          <button arkStepsPrevTrigger>Back</button>
          <button arkStepsNextTrigger>Next</button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkStepsRoot)).injector.get(ArkStepsRoot)
    const [prev, next] = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[]

    expect(root.api().value).toBe(1)
    next.click()
    await flush(fixture)
    expect(root.api().value).toBe(2)
    prev.click()
    await flush(fixture)
    expect(root.api().value).toBe(1)

    fixture.destroy()
  })

  it('supports controlled [(step)] changes with one model emission', async () => {
    @Component({
      standalone: true,
      imports: [ArkStepsRoot, ArkStepsNextTrigger],
      template: `
        <div arkSteps [count]="3" [(step)]="step" (stepChange)="changes.push($event)">
          <button arkStepsNextTrigger>Next</button>
        </div>
      `,
    })
    class Host {
      readonly step = signal<number | undefined>(0)
      readonly changes: Array<number | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const next = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    next.click()
    await flush(fixture)
    fixture.componentInstance.step.set(1)
    await flush(fixture)

    expect(fixture.componentInstance.step()).toBe(1)
    expect(fixture.componentInstance.changes).toEqual([1])

    fixture.destroy()
  })

  it('applies vertical orientation attributes', async () => {
    @Component({
      standalone: true,
      imports: [ArkStepsRoot, ArkStepsList, ArkStepsItem, ArkStepsTrigger, ArkStepsSeparator, ArkStepsContent],
      template: `
        <div arkSteps [count]="2" orientation="vertical">
          <ol arkStepsList>
            @for (index of [0, 1]; track index) {
              <li arkStepsItem [index]="index">
                <button arkStepsTrigger>Step {{ index }}</button>
                <span arkStepsSeparator></span>
              </li>
            }
          </ol>
          <div arkStepsContent [index]="0">One</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.nativeElement.querySelector('[data-part="root"]') as HTMLElement
    const list = fixture.nativeElement.querySelector('[data-part="list"]') as HTMLElement
    const trigger = fixture.nativeElement.querySelector('[data-part="trigger"]') as HTMLElement
    const separator = fixture.nativeElement.querySelector('[data-part="separator"]') as HTMLElement
    const content = fixture.nativeElement.querySelector('[data-part="content"]') as HTMLElement

    expect(root.getAttribute('data-orientation')).toBe('vertical')
    expect(list.getAttribute('aria-orientation')).toBe('vertical')
    expect(trigger.getAttribute('data-orientation')).toBe('vertical')
    expect(separator.getAttribute('data-orientation')).toBe('vertical')
    expect(content.getAttribute('data-orientation')).toBe('vertical')

    fixture.destroy()
  })

  it('injects root and item contexts for descendants', async () => {
    @Component({
      standalone: true,
      imports: [ArkStepsRoot, ArkStepsItem, StepsProbe, StepsItemProbe],
      template: `
        <div arkSteps [count]="2">
          <span stepsProbe></span>
          <div arkStepsItem [index]="1">
            <span stepsItemProbe></span>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkStepsRoot)).injector.get(ArkStepsRoot)
    const probe = fixture.debugElement.query(By.directive(StepsProbe)).injector.get(StepsProbe)
    const itemProbe = fixture.debugElement.query(By.directive(StepsItemProbe)).injector.get(StepsItemProbe)

    expect(probe.captured).toBe(root)
    expect(itemProbe.itemProps()).toEqual({ index: 1 })
    expect(itemProbe.item().index).toBe(1)
    expect(itemProbe.item().incomplete).toBe(true)

    fixture.destroy()
  })

  it('root provider proxies an externally-created steps machine', async () => {
    @Component({
      standalone: true,
      imports: [ArkStepsRootProvider, ArkStepsNextTrigger, StepsProbe],
      template: `
        <div arkStepsRootProvider [value]="steps">
          <span stepsProbe></span>
          <button arkStepsNextTrigger>Next</button>
        </div>
      `,
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly steps = runInInjectionContext(this.injector, () => useSteps({ context: () => ({ count: 2 }) }))
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const provider = fixture.debugElement.query(By.directive(ArkStepsRootProvider)).injector.get(ArkStepsRootProvider)
    const probe = fixture.debugElement.query(By.directive(StepsProbe)).injector.get(StepsProbe)
    const next = fixture.nativeElement.querySelector('button') as HTMLButtonElement

    expect(probe.captured).toBe(provider)
    expect(provider.api().value).toBe(0)
    next.click()
    await flush(fixture)
    expect(provider.api().value).toBe(1)

    fixture.destroy()
  })
})
