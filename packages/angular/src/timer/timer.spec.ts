import { Component, Injector, inject, runInInjectionContext } from '@angular/core'
import { TestBed, type ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_TIMER_CONTEXT,
  ArkTimerActionTrigger,
  ArkTimerArea,
  ArkTimerContext,
  ArkTimerControl,
  ArkTimerItem,
  ArkTimerRoot,
  ArkTimerRootProvider,
  ArkTimerSeparator,
  injectArkTimerContext,
  timerAnatomy,
  useTimer,
  type TimerAction,
  type TimerActionTriggerMachineProps,
  type TimerApi,
  type TimerElementIds,
  type TimerIntlTranslations,
  type TimerItemMachineProps,
  type TimerMachine,
  type TimerMachineProps,
  type TimerService,
  type TimerTickDetails,
  type TimerTime,
  type TimerTimePart,
  type UseTimerOptions,
  type UseTimerProps,
  type UseTimerReturn,
} from '@ark-ui/angular/timer'

type TimerPublicTypeSmoke = [
  TimerAction,
  TimerActionTriggerMachineProps,
  TimerApi,
  TimerElementIds,
  TimerIntlTranslations,
  TimerItemMachineProps,
  TimerMachine,
  TimerMachineProps,
  TimerService,
  TimerTickDetails,
  TimerTime,
  TimerTimePart,
  UseTimerOptions,
  UseTimerProps,
  UseTimerReturn,
]

const flush = async (fixture: ComponentFixture<unknown>) => {
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

const useTimerFakes = () => {
  vi.useFakeTimers({
    toFake: ['setTimeout', 'clearTimeout', 'requestAnimationFrame', 'cancelAnimationFrame', 'performance'],
  })
}

const advance = async (fixture: ComponentFixture<unknown>, ms: number) => {
  const frameCount = Math.ceil(ms / 16)
  for (let index = 0; index < frameCount; index++) {
    vi.advanceTimersToNextFrame()
  }
  await flush(fixture)
}

describe('@ark-ui/angular/timer', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_TIMER_CONTEXT).toBe('object')
    expect(typeof injectArkTimerContext).toBe('function')
    expect(typeof useTimer).toBe('function')
    expect(typeof timerAnatomy).toBe('object')
    expect(ArkTimerRoot).toBeDefined()
    expect(ArkTimerRootProvider).toBeDefined()
    expect(ArkTimerArea).toBeDefined()
    expect(ArkTimerItem).toBeDefined()
    expect(ArkTimerSeparator).toBeDefined()
    expect(ArkTimerControl).toBeDefined()
    expect(ArkTimerActionTrigger).toBeDefined()
    expect(ArkTimerContext).toBeDefined()
    expect(undefined as TimerPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useTimer({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useTimer({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/timer::/)

    fixture.destroy()
  })

  it('starts, pauses, resumes, and resets from action triggers', async () => {
    useTimerFakes()

    @Component({
      standalone: true,
      imports: [ArkTimerRoot, ArkTimerArea, ArkTimerItem, ArkTimerControl, ArkTimerActionTrigger],
      template: `
        <div arkTimer [interval]="1000" [targetMs]="10000">
          <div arkTimerArea>
            <span arkTimerItem type="seconds"></span>
          </div>
          <div arkTimerControl>
            <button arkTimerActionTrigger action="start">Start</button>
            <button arkTimerActionTrigger action="pause">Pause</button>
            <button arkTimerActionTrigger action="resume">Resume</button>
            <button arkTimerActionTrigger action="reset">Reset</button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTimerRoot)).injector.get(ArkTimerRoot)
    const seconds = fixture.nativeElement.querySelector('[data-type="seconds"]') as HTMLElement
    const trigger = (action: TimerAction) =>
      fixture.nativeElement.querySelector(`button[action="${action}"]`) as HTMLButtonElement

    expect(seconds.textContent).toBe('00')

    trigger('start').click()
    await flush(fixture)
    expect(root.api().running).toBe(true)

    await advance(fixture, 1000)
    expect(seconds.textContent).toBe('01')

    trigger('pause').click()
    await flush(fixture)
    expect(root.api().paused).toBe(true)

    await advance(fixture, 3000)
    expect(seconds.textContent).toBe('01')

    trigger('resume').click()
    await flush(fixture)
    await advance(fixture, 1000)
    expect(seconds.textContent).toBe('02')

    trigger('pause').click()
    await flush(fixture)
    trigger('reset').click()
    await flush(fixture)

    expect(root.api().running).toBe(false)
    expect(root.api().paused).toBe(false)
    expect(seconds.textContent).toBe('00')

    fixture.destroy()
  })

  it('renders countdown and count-up display state', async () => {
    useTimerFakes()

    @Component({
      standalone: true,
      imports: [ArkTimerRoot, ArkTimerArea, ArkTimerItem],
      template: `
        <div arkTimer autoStart countdown [interval]="1000" [startMs]="2000" data-testid="down">
          <div arkTimerArea>
            <span arkTimerItem type="seconds"></span>
          </div>
        </div>
        <div arkTimer autoStart [interval]="1000" [startMs]="1000" [targetMs]="4000" data-testid="up">
          <div arkTimerArea>
            <span arkTimerItem type="seconds"></span>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const secondItems = fixture.nativeElement.querySelectorAll('[data-type="seconds"]') as NodeListOf<HTMLElement>
    expect(secondItems[0].textContent).toBe('02')
    expect(secondItems[1].textContent).toBe('01')

    await advance(fixture, 1000)

    expect(secondItems[0].textContent).toBe('01')
    expect(secondItems[1].textContent).toBe('02')

    fixture.destroy()
  })

  it('emits tick and complete outputs', async () => {
    useTimerFakes()

    @Component({
      standalone: true,
      imports: [ArkTimerRoot, ArkTimerActionTrigger],
      template: `
        <div
          arkTimer
          [interval]="1000"
          [targetMs]="1000"
          (tick)="ticks.push($event)"
          (complete)="completed = completed + 1"
        >
          <button arkTimerActionTrigger action="start">Start</button>
        </div>
      `,
    })
    class Host {
      readonly ticks: TimerTickDetails[] = []
      completed = 0
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const start = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    start.click()
    await flush(fixture)

    await advance(fixture, 1000)
    expect(fixture.componentInstance.ticks).toHaveLength(1)
    expect(fixture.componentInstance.ticks[0].value).toBe(1000)
    expect(fixture.componentInstance.completed).toBe(0)

    await advance(fixture, 1000)
    expect(fixture.componentInstance.completed).toBe(1)

    fixture.destroy()
  })

  it('cleans up the running interval when the fixture is destroyed', async () => {
    useTimerFakes()

    @Component({
      standalone: true,
      imports: [ArkTimerRoot],
      template: '<div arkTimer autoStart [interval]="1000" [targetMs]="100000" (tick)="ticks = ticks + 1"></div>',
    })
    class Host {
      ticks = 0
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    await advance(fixture, 1000)
    expect(fixture.componentInstance.ticks).toBe(1)

    const host = fixture.componentInstance
    fixture.destroy()
    await vi.advanceTimersByTimeAsync(3000)

    expect(host.ticks).toBe(1)
  })

  it('supports root-provider machines', async () => {
    useTimerFakes()

    @Component({
      standalone: true,
      imports: [ArkTimerRootProvider, ArkTimerArea, ArkTimerItem, ArkTimerActionTrigger],
      template: `
        <div arkTimerRootProvider [value]="timer">
          <div arkTimerArea>
            <span arkTimerItem type="seconds"></span>
          </div>
          <button arkTimerActionTrigger action="start">Start</button>
        </div>
      `,
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly timer = runInInjectionContext(this.injector, () =>
        useTimer({ context: () => ({ interval: 1000, targetMs: 10000 }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTimerRootProvider)).injector.get(ArkTimerRootProvider)
    const seconds = fixture.nativeElement.querySelector('[data-type="seconds"]') as HTMLElement
    const start = fixture.nativeElement.querySelector('button') as HTMLButtonElement

    expect(root.api().time.seconds).toBe(0)
    expect(seconds.textContent).toBe('00')

    start.click()
    await flush(fixture)
    await advance(fixture, 1000)

    expect(fixture.componentInstance.timer.api().time.seconds).toBe(1)
    expect(seconds.textContent).toBe('01')

    fixture.destroy()
  })
})
