import { ApplicationRef, Component, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { TestBed, type ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_CAROUSEL_CONTEXT,
  ArkCarouselAutoplayIndicator,
  ArkCarouselAutoplayTrigger,
  ArkCarouselContext,
  ArkCarouselControl,
  ArkCarouselIndicator,
  ArkCarouselIndicatorGroup,
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselNextTrigger,
  ArkCarouselPrevTrigger,
  ArkCarouselProgressText,
  ArkCarouselRoot,
  ArkCarouselRootProvider,
  carouselAnatomy,
  injectArkCarouselContext,
  useCarousel,
  type CarouselApi,
  type CarouselAutoplayStatusDetails,
  type CarouselContextTemplate,
  type CarouselDragStatusDetails,
  type CarouselElementIds,
  type CarouselIndicatorProps,
  type CarouselIntlTranslations,
  type CarouselItemProps,
  type CarouselMachine,
  type CarouselMachineProps,
  type CarouselPageChangeDetails,
  type CarouselProgressTextDetails,
  type CarouselService,
  type UseCarouselOptions,
  type UseCarouselProps,
  type UseCarouselReturn,
} from '@ark-ui/angular/carousel'
import { CarouselBasicExample } from './examples/basic'
import { CarouselRootProviderExample } from './examples/root-provider'

type CarouselPublicTypeSmoke = [
  CarouselApi,
  CarouselAutoplayStatusDetails,
  CarouselContextTemplate,
  CarouselDragStatusDetails,
  CarouselElementIds,
  CarouselIndicatorProps,
  CarouselIntlTranslations,
  CarouselItemProps,
  CarouselMachine,
  CarouselMachineProps,
  CarouselPageChangeDetails,
  CarouselProgressTextDetails,
  CarouselService,
  UseCarouselOptions,
  UseCarouselProps,
  UseCarouselReturn,
]

const flush = async (fixture: ComponentFixture<unknown>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

const flushFakeTimers = async (fixture: ComponentFixture<unknown>) => {
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

class StubIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

function installDomStubs(): void {
  if (typeof (Element.prototype as { scrollTo?: unknown }).scrollTo !== 'function') {
    ;(Element.prototype as unknown as { scrollTo: () => void }).scrollTo = () => {}
  }
  if (typeof (Element.prototype as { scrollBy?: unknown }).scrollBy !== 'function') {
    ;(Element.prototype as unknown as { scrollBy: () => void }).scrollBy = () => {}
  }
  ;(globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = StubIntersectionObserver
  ;(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = StubIntersectionObserver
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return this.getAttribute('data-part') === 'item-group' ? 100 : Number(this.dataset.index != null) * 0 + 100
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return 100
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get() {
      return this.getAttribute('data-part') === 'item-group' ? Math.max(this.children.length, 1) * 100 : 100
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return this.getAttribute('data-part') === 'item-group' ? Math.max(this.children.length, 1) * 100 : 100
    },
  })
  HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
    if (this.getAttribute('data-part') === 'item') {
      const index = Number(this.dataset.index ?? 0)
      return rect(index * 100, 0, 100, 100)
    }
    return rect(0, 0, 100, 100)
  }
}

function rect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect
}

describe('@ark-ui/angular/carousel', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    installDomStubs()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_CAROUSEL_CONTEXT).toBe('object')
    expect(typeof injectArkCarouselContext).toBe('function')
    expect(typeof useCarousel).toBe('function')
    expect(typeof carouselAnatomy).toBe('object')
    expect(ArkCarouselRoot).toBeDefined()
    expect(ArkCarouselRootProvider).toBeDefined()
    expect(ArkCarouselItemGroup).toBeDefined()
    expect(ArkCarouselItem).toBeDefined()
    expect(ArkCarouselControl).toBeDefined()
    expect(ArkCarouselPrevTrigger).toBeDefined()
    expect(ArkCarouselNextTrigger).toBeDefined()
    expect(ArkCarouselIndicatorGroup).toBeDefined()
    expect(ArkCarouselIndicator).toBeDefined()
    expect(ArkCarouselAutoplayTrigger).toBeDefined()
    expect(ArkCarouselAutoplayIndicator).toBeDefined()
    expect(ArkCarouselProgressText).toBeDefined()
    expect(ArkCarouselContext).toBeDefined()
    expect(undefined as CarouselPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useCarousel({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useCarousel({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/carousel::/)

    fixture.destroy()
  })

  it('supports next and previous trigger behavior', async () => {
    @Component({
      standalone: true,
      imports: [ArkCarouselRoot, ArkCarouselItemGroup, ArkCarouselItem, ArkCarouselPrevTrigger, ArkCarouselNextTrigger],
      template: `
        <div arkCarousel [slideCount]="3">
          <div arkCarouselItemGroup>
            <div arkCarouselItem [index]="0">1</div>
            <div arkCarouselItem [index]="1">2</div>
            <div arkCarouselItem [index]="2">3</div>
          </div>
          <button type="button" arkCarouselPrevTrigger>Prev</button>
          <button type="button" arkCarouselNextTrigger>Next</button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushFakeTimers(fixture)

    const root = fixture.debugElement.query(By.directive(ArkCarouselRoot)).injector.get(ArkCarouselRoot)
    const [prev, next] = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[]

    expect(root.api().page).toBe(0)
    next.click()
    await flush(fixture)
    expect(root.api().page).toBe(1)
    prev.click()
    await flush(fixture)
    expect(root.api().page).toBe(0)

    fixture.destroy()
  })

  it('selects pages through indicators', async () => {
    @Component({
      standalone: true,
      imports: [ArkCarouselRoot, ArkCarouselIndicatorGroup, ArkCarouselIndicator],
      template: `
        <div arkCarousel [slideCount]="3">
          <div arkCarouselIndicatorGroup>
            <button type="button" arkCarouselIndicator [index]="0">1</button>
            <button type="button" arkCarouselIndicator [index]="1">2</button>
            <button type="button" arkCarouselIndicator [index]="2">3</button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkCarouselRoot)).injector.get(ArkCarouselRoot)
    const indicators = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[]

    indicators[2]?.click()
    await flush(fixture)

    expect(root.api().page).toBe(2)
    expect(indicators[2]?.getAttribute('data-current')).toBe('')
    expect(indicators[0]?.getAttribute('data-current')).toBeNull()

    fixture.destroy()
  })

  it('supports controlled [(page)] with one pageChange emission', async () => {
    @Component({
      standalone: true,
      imports: [ArkCarouselRoot, ArkCarouselNextTrigger],
      template: `
        <div arkCarousel [slideCount]="3" [(page)]="page" (pageChange)="changes.push($event)">
          <button type="button" arkCarouselNextTrigger>Next</button>
        </div>
      `,
    })
    class Host {
      readonly page = signal<number | undefined>(0)
      readonly changes: Array<number | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const next = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    next.click()
    await flush(fixture)

    expect(fixture.componentInstance.page()).toBe(1)
    expect(fixture.componentInstance.changes).toEqual([1])

    fixture.destroy()
  })

  it('updates snap points when slides are added dynamically', async () => {
    @Component({
      standalone: true,
      imports: [ArkCarouselRoot, ArkCarouselItemGroup, ArkCarouselItem],
      template: `
        <div arkCarousel [slideCount]="slides().length" #carousel="arkCarousel">
          <div arkCarouselItemGroup>
            @for (slide of slides(); track slide; let index = $index) {
              <div arkCarouselItem [index]="index">{{ slide }}</div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly slides = signal(['1', '2'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkCarouselRoot)).injector.get(ArkCarouselRoot)
    expect(root.api().pageSnapPoints).toHaveLength(2)

    fixture.componentInstance.slides.set(['1', '2', '3'])
    await flush(fixture)

    const items = fixture.nativeElement.querySelectorAll('[data-part="item"]') as NodeListOf<HTMLElement>
    expect(items).toHaveLength(3)
    expect(root.service.prop('slideCount')).toBe(3)

    fixture.destroy()
  })

  it('starts, stops, and cleans up autoplay timers', async () => {
    vi.useFakeTimers()
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const windowSetIntervalSpy = vi.spyOn(window, 'setInterval')
    const windowClearIntervalSpy = vi.spyOn(window, 'clearInterval')

    @Component({
      standalone: true,
      imports: [ArkCarouselRoot, ArkCarouselItemGroup, ArkCarouselItem, ArkCarouselAutoplayTrigger],
      template: `
        <div arkCarousel [slideCount]="3" [autoplay]="{ delay: 20 }" loop (pageChange)="changes.push($event)">
          <div arkCarouselItemGroup>
            <div arkCarouselItem [index]="0">1</div>
            <div arkCarouselItem [index]="1">2</div>
            <div arkCarouselItem [index]="2">3</div>
          </div>
          <button type="button" arkCarouselAutoplayTrigger>Toggle</button>
        </div>
      `,
    })
    class Host {
      readonly changes: Array<number | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkCarouselRoot)).injector.get(ArkCarouselRoot)
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement

    expect(root.api().isPlaying).toBe(true)

    trigger.click()
    await flushFakeTimers(fixture)
    expect(root.api().isPlaying).toBe(false)

    trigger.click()
    await flushFakeTimers(fixture)
    expect(root.api().isPlaying).toBe(true)
    expect(setIntervalSpy.mock.calls.length + windowSetIntervalSpy.mock.calls.length).toBeGreaterThan(0)

    fixture.destroy()
    expect(clearIntervalSpy.mock.calls.length + windowClearIntervalSpy.mock.calls.length).toBeGreaterThan(0)
  })

  it('applies vertical orientation attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkCarouselRoot,
        ArkCarouselItemGroup,
        ArkCarouselItem,
        ArkCarouselControl,
        ArkCarouselPrevTrigger,
        ArkCarouselNextTrigger,
        ArkCarouselIndicatorGroup,
        ArkCarouselIndicator,
      ],
      template: `
        <div arkCarousel orientation="vertical" [slideCount]="2">
          <div arkCarouselItemGroup>
            <div arkCarouselItem [index]="0">1</div>
            <div arkCarouselItem [index]="1">2</div>
          </div>
          <div arkCarouselControl>
            <button type="button" arkCarouselPrevTrigger>Prev</button>
            <button type="button" arkCarouselNextTrigger>Next</button>
          </div>
          <div arkCarouselIndicatorGroup>
            <button type="button" arkCarouselIndicator [index]="0">1</button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    for (const part of ['root', 'item-group', 'item', 'control', 'prev-trigger', 'next-trigger', 'indicator-group']) {
      const element = fixture.nativeElement.querySelector(`[data-part="${part}"]`) as HTMLElement
      expect(element.getAttribute('data-orientation')).toBe('vertical')
    }

    fixture.destroy()
  })

  it('root-provider shares a useCarousel machine with descendants', async () => {
    @Component({
      standalone: true,
      imports: [ArkCarouselRootProvider, ArkCarouselNextTrigger],
      template: `
        <div arkCarouselRootProvider [value]="carousel">
          <button type="button" arkCarouselNextTrigger>Next</button>
        </div>
      `,
    })
    class Host {
      readonly carousel: UseCarouselReturn = runInInjectionContext(inject(Injector), () =>
        useCarousel({ context: () => ({ slideCount: 3 }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const next = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    next.click()
    await flush(fixture)

    expect(fixture.componentInstance.carousel.api().page).toBe(1)

    fixture.destroy()
  })

  it('CarouselBasicExample renders carousel data attributes', async () => {
    TestBed.configureTestingModule({ imports: [CarouselBasicExample] })
    const fixture = TestBed.createComponent(CarouselBasicExample)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkCarouselRoot)).nativeElement as HTMLElement
    expect(root.getAttribute('data-scope')).toBe('carousel')
    expect(root.getAttribute('data-part')).toBe('root')

    fixture.destroy()
  })

  it('CarouselRootProviderExample shares hook state with trigger directives', async () => {
    TestBed.configureTestingModule({ imports: [CarouselRootProviderExample] })
    const fixture = TestBed.createComponent(CarouselRootProviderExample)
    fixture.detectChanges()
    await flush(fixture)

    expect(fixture.componentInstance.pageLabel()).toBe(1)
    const next = Array.from(fixture.nativeElement.querySelectorAll('button')).at(-1) as HTMLButtonElement
    next.click()
    await flush(fixture)
    expect(fixture.componentInstance.pageLabel()).toBe(2)

    fixture.destroy()
  })
})
