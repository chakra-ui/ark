import {
  ApplicationRef,
  Component,
  Directive,
  Injector,
  PLATFORM_ID,
  inject,
  runInInjectionContext,
} from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_SCROLL_AREA_CONTEXT,
  ARK_SCROLL_AREA_SCROLLBAR_CONTEXT,
  ArkScrollAreaContent,
  ArkScrollAreaCorner,
  ArkScrollAreaRoot,
  ArkScrollAreaRootProvider,
  ArkScrollAreaScrollbar,
  ArkScrollAreaThumb,
  ArkScrollAreaViewport,
  injectArkScrollAreaContext,
  injectArkScrollAreaScrollbarContext,
  scrollAreaAnatomy,
  useScrollArea,
  type ScrollAreaApi,
  type ScrollAreaElementIds,
  type ScrollAreaMachine,
  type ScrollAreaMachineProps,
  type ScrollAreaScrollEasingFunction,
  type ScrollAreaScrollRecord,
  type ScrollAreaScrollbarEasing,
  type ScrollAreaScrollbarHiddenState,
  type ScrollAreaScrollbarProps,
  type ScrollAreaScrollbarState,
  type ScrollAreaScrollToDetails,
  type ScrollAreaScrollToEdge,
  type ScrollAreaScrollToEdgeDetails,
  type ScrollAreaService,
  type ScrollAreaThumbProps,
  type UseScrollAreaOptions,
  type UseScrollAreaProps,
  type UseScrollAreaReturn,
  type UseScrollAreaScrollbarContext,
} from '@ark-ui/angular/scroll-area'
import { ScrollAreaBasicExample } from './examples/basic'
import { ScrollAreaBothDirectionsExample } from './examples/both-directions'
import { ScrollAreaHorizontalExample } from './examples/horizontal'
import { ScrollAreaNestedExample } from './examples/nested'
import { ScrollAreaRootProviderExample } from './examples/root-provider'

type ScrollAreaPublicTypeSmoke = [
  ScrollAreaApi,
  ScrollAreaElementIds,
  ScrollAreaMachine,
  ScrollAreaMachineProps,
  ScrollAreaScrollEasingFunction,
  ScrollAreaScrollRecord<boolean>,
  ScrollAreaScrollbarEasing,
  ScrollAreaScrollbarHiddenState,
  ScrollAreaScrollbarProps,
  ScrollAreaScrollbarState,
  ScrollAreaScrollToDetails,
  ScrollAreaScrollToEdge,
  ScrollAreaScrollToEdgeDetails,
  ScrollAreaService,
  ScrollAreaThumbProps,
  UseScrollAreaOptions,
  UseScrollAreaProps,
  UseScrollAreaReturn,
  UseScrollAreaScrollbarContext,
]

@Directive({ selector: '[scrollAreaProbe]', standalone: true, exportAs: 'scrollAreaProbe' })
class ScrollAreaProbe {
  private readonly injector = inject(Injector)
  get capturedRoot(): UseScrollAreaReturn {
    return this.injector.get(ARK_SCROLL_AREA_CONTEXT)
  }
}

@Directive({ selector: '[scrollAreaScrollbarProbe]', standalone: true, exportAs: 'scrollAreaScrollbarProbe' })
class ScrollAreaScrollbarProbe {
  private readonly injector = inject(Injector)
  get capturedScrollbar(): UseScrollAreaScrollbarContext {
    return this.injector.get(ARK_SCROLL_AREA_SCROLLBAR_CONTEXT)
  }
}

const flushRender = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  fixture.detectChanges()
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
}

describe('@ark-ui/angular/scroll-area', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_SCROLL_AREA_CONTEXT).toBe('object')
    expect(typeof ARK_SCROLL_AREA_SCROLLBAR_CONTEXT).toBe('object')
    expect(typeof injectArkScrollAreaContext).toBe('function')
    expect(typeof injectArkScrollAreaScrollbarContext).toBe('function')
    expect(typeof useScrollArea).toBe('function')
    expect(typeof scrollAreaAnatomy).toBe('object')
    expect(ArkScrollAreaRoot).toBeDefined()
    expect(ArkScrollAreaRootProvider).toBeDefined()
    expect(ArkScrollAreaViewport).toBeDefined()
    expect(ArkScrollAreaContent).toBeDefined()
    expect(ArkScrollAreaScrollbar).toBeDefined()
    expect(ArkScrollAreaThumb).toBeDefined()
    expect(ArkScrollAreaCorner).toBeDefined()
    expect(ScrollAreaBasicExample).toBeDefined()
    expect(ScrollAreaHorizontalExample).toBeDefined()
    expect(ScrollAreaBothDirectionsExample).toBeDefined()
    expect(ScrollAreaNestedExample).toBeDefined()
    expect(ScrollAreaRootProviderExample).toBeDefined()
    expect(undefined as ScrollAreaPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useScrollArea({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useScrollArea({ context: () => ({}) }))
    const id = (result.api().getRootProps() as Record<string, unknown>).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/scroll-area::/)

    fixture.destroy()
  })

  it('applies root, viewport, content, scrollbar, thumb, and corner attributes', () => {
    @Component({
      standalone: true,
      imports: [
        ArkScrollAreaRoot,
        ArkScrollAreaViewport,
        ArkScrollAreaContent,
        ArkScrollAreaScrollbar,
        ArkScrollAreaThumb,
        ArkScrollAreaCorner,
      ],
      template: `
        <div arkScrollArea id="area">
          <div arkScrollAreaViewport>
            <div arkScrollAreaContent>Content</div>
          </div>
          <div arkScrollAreaScrollbar orientation="vertical">
            <div arkScrollAreaThumb></div>
          </div>
          <div arkScrollAreaCorner></div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkScrollAreaRoot)).nativeElement as HTMLElement
    const viewport = fixture.debugElement.query(By.directive(ArkScrollAreaViewport)).nativeElement as HTMLElement
    const content = fixture.debugElement.query(By.directive(ArkScrollAreaContent)).nativeElement as HTMLElement
    const scrollbar = fixture.debugElement.query(By.directive(ArkScrollAreaScrollbar)).nativeElement as HTMLElement
    const thumb = fixture.debugElement.query(By.directive(ArkScrollAreaThumb)).nativeElement as HTMLElement
    const corner = fixture.debugElement.query(By.directive(ArkScrollAreaCorner)).nativeElement as HTMLElement

    expect(root.dataset.scope).toBe('scroll-area')
    expect(root.dataset.part).toBe('root')
    expect(root.getAttribute('role')).toBe('presentation')
    expect(viewport.dataset.part).toBe('viewport')
    expect(viewport.dataset.ownedby).toBe(root.id)
    expect(content.dataset.part).toBe('content')
    expect(scrollbar.dataset.part).toBe('scrollbar')
    expect(scrollbar.dataset.orientation).toBe('vertical')
    expect(scrollbar.dataset.ownedby).toBe(root.id)
    expect(thumb.dataset.part).toBe('thumb')
    expect(thumb.dataset.orientation).toBe('vertical')
    expect(thumb.dataset.ownedby).toBe(root.id)
    expect(corner.dataset.part).toBe('corner')
    expect(corner.dataset.ownedby).toBe(root.id)

    fixture.destroy()
  })

  it('provides horizontal and vertical scrollbar contexts', () => {
    @Component({
      standalone: true,
      imports: [ArkScrollAreaRoot, ArkScrollAreaScrollbar, ScrollAreaScrollbarProbe],
      template: `
        <div arkScrollArea>
          <div arkScrollAreaScrollbar orientation="vertical">
            <span scrollAreaScrollbarProbe #vertical="scrollAreaScrollbarProbe"></span>
          </div>
          <div arkScrollAreaScrollbar orientation="horizontal">
            <span scrollAreaScrollbarProbe #horizontal="scrollAreaScrollbarProbe"></span>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const probes = fixture.debugElement.queryAll(By.directive(ScrollAreaScrollbarProbe))
    const vertical = probes[0].injector.get(ScrollAreaScrollbarProbe).capturedScrollbar
    const horizontal = probes[1].injector.get(ScrollAreaScrollbarProbe).capturedScrollbar

    expect(vertical.orientation()).toBe('vertical')
    expect(horizontal.orientation()).toBe('horizontal')

    fixture.destroy()
  })

  it('keeps nested scroll areas isolated by nearest root context', () => {
    @Component({
      standalone: true,
      imports: [
        ArkScrollAreaRoot,
        ArkScrollAreaViewport,
        ArkScrollAreaContent,
        ArkScrollAreaScrollbar,
        ArkScrollAreaThumb,
        ScrollAreaProbe,
      ],
      template: `
        <div arkScrollArea id="outer">
          <span scrollAreaProbe></span>
          <div arkScrollAreaViewport>
            <div arkScrollAreaContent>
              <div arkScrollArea id="inner">
                <span scrollAreaProbe></span>
                <div arkScrollAreaScrollbar>
                  <div arkScrollAreaThumb></div>
                </div>
              </div>
            </div>
          </div>
          <div arkScrollAreaScrollbar>
            <div arkScrollAreaThumb></div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const roots = fixture.debugElement.queryAll(By.directive(ArkScrollAreaRoot))
    const probes = fixture.debugElement.queryAll(By.directive(ScrollAreaProbe))
    const thumbs = fixture.debugElement.queryAll(By.directive(ArkScrollAreaThumb))
    const outerRoot = roots[0].injector.get(ArkScrollAreaRoot)
    const innerRoot = roots[1].injector.get(ArkScrollAreaRoot)
    const outerProbeRoot = probes[0].injector.get(ScrollAreaProbe).capturedRoot
    const innerProbeRoot = probes[1].injector.get(ScrollAreaProbe).capturedRoot
    const innerThumb = thumbs[0].nativeElement as HTMLElement
    const outerThumb = thumbs[1].nativeElement as HTMLElement

    expect(outerProbeRoot).toBe(outerRoot)
    expect(innerProbeRoot).toBe(innerRoot)
    expect(innerThumb.dataset.ownedby).toBe('scroll-area-inner')
    expect(outerThumb.dataset.ownedby).toBe('scroll-area-outer')

    fixture.destroy()
  })

  it('constructs on the server platform without touching browser-only setup', () => {
    @Component({
      standalone: true,
      imports: [ArkScrollAreaRoot, ArkScrollAreaViewport, ArkScrollAreaContent],
      template: `
        <div arkScrollArea>
          <div arkScrollAreaViewport>
            <div arkScrollAreaContent>Content</div>
          </div>
        </div>
      `,
    })
    class Host {}

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

  it('cleans up observers and wheel listeners on destroy', async () => {
    const resizeDisconnect = vi.fn()
    const intersectionDisconnect = vi.fn()
    const addListener = vi.spyOn(HTMLElement.prototype, 'addEventListener')
    const removeListener = vi.spyOn(HTMLElement.prototype, 'removeEventListener')
    const PreviousResizeObserver = window.ResizeObserver
    const PreviousIntersectionObserver = window.IntersectionObserver

    class MockResizeObserver {
      observe(): void {}
      disconnect(): void {
        resizeDisconnect()
      }
    }

    class MockIntersectionObserver {
      observe(): void {}
      disconnect(): void {
        intersectionDisconnect()
      }
    }

    window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

    @Component({
      standalone: true,
      imports: [
        ArkScrollAreaRoot,
        ArkScrollAreaViewport,
        ArkScrollAreaContent,
        ArkScrollAreaScrollbar,
        ArkScrollAreaThumb,
      ],
      template: `
        <div arkScrollArea>
          <div arkScrollAreaViewport>
            <div arkScrollAreaContent>Content</div>
          </div>
          <div arkScrollAreaScrollbar orientation="vertical">
            <div arkScrollAreaThumb></div>
          </div>
          <div arkScrollAreaScrollbar orientation="horizontal">
            <div arkScrollAreaThumb></div>
          </div>
        </div>
      `,
    })
    class Host {}

    try {
      TestBed.configureTestingModule({ imports: [Host] })
      const fixture = TestBed.createComponent(Host)
      await flushRender(fixture)

      expect(addListener.mock.calls.some(([eventName]) => eventName === 'wheel')).toBe(true)

      fixture.destroy()

      expect(resizeDisconnect).toHaveBeenCalled()
      expect(intersectionDisconnect).toHaveBeenCalled()
      expect(removeListener.mock.calls.some(([eventName]) => eventName === 'wheel')).toBe(true)
    } finally {
      window.ResizeObserver = PreviousResizeObserver
      window.IntersectionObserver = PreviousIntersectionObserver
      addListener.mockRestore()
      removeListener.mockRestore()
    }
  })

  it('applies root-provider value to host and descendants', () => {
    @Component({
      standalone: true,
      imports: [
        ArkScrollAreaRootProvider,
        ArkScrollAreaViewport,
        ArkScrollAreaContent,
        ArkScrollAreaScrollbar,
        ArkScrollAreaThumb,
      ],
      template: `
        <div arkScrollAreaRootProvider [value]="scrollArea">
          <div arkScrollAreaViewport>
            <div arkScrollAreaContent>Content</div>
          </div>
          <div arkScrollAreaScrollbar>
            <div arkScrollAreaThumb></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly scrollArea = runInInjectionContext(inject(Injector), () =>
        useScrollArea({ context: () => ({ id: 'provided' }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkScrollAreaRootProvider)).nativeElement as HTMLElement
    const viewport = fixture.debugElement.query(By.directive(ArkScrollAreaViewport)).nativeElement as HTMLElement
    const thumb = fixture.debugElement.query(By.directive(ArkScrollAreaThumb)).nativeElement as HTMLElement

    expect(root.id).toBe('scroll-area-provided')
    expect(root.dataset.part).toBe('root')
    expect(viewport.dataset.ownedby).toBe('scroll-area-provided')
    expect(thumb.dataset.ownedby).toBe('scroll-area-provided')

    fixture.destroy()
  })
})
