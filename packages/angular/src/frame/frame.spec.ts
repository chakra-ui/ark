import { ApplicationRef, Component, PLATFORM_ID, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ArkFrameComponent } from './frame'

@Component({
  standalone: true,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame [srcdoc]="srcdoc()" [title]="title" [name]="name"></ark-frame>
  `,
})
class HostComponent {
  readonly srcdoc = signal<string | undefined>('<p>inner</p>')
  title: string | undefined = 'test-frame'
  name: string | undefined = 'frame-name'
}

@Component({
  standalone: true,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame [head]="frameHead">
      <span data-testid="projected">Projected content</span>
    </ark-frame>

    <ng-template #frameHead>
      <link rel="stylesheet" href="/frame-inherited.css" />
    </ng-template>
  `,
})
class FrameWithHeadComponent {}

describe('ArkFrameComponent', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('renders an iframe element (criterion 32)', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement | null
    expect(iframe).not.toBeNull()

    fixture.destroy()
  })

  const settleFrame = async () => {
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
  }

  it('propagates title and name attributes and writes srcdoc into the iframe document', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    await settleFrame()

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement
    expect(iframe.getAttribute('title')).toBe('test-frame')
    expect(iframe.getAttribute('name')).toBe('frame-name')
    expect(iframe.getAttribute('srcdoc')).toBeNull()
    expect(iframe.contentDocument?.body.innerHTML).toContain('<p>inner</p>')

    fixture.destroy()
  })

  it('rewrites the iframe document when srcdoc changes after mount', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    await settleFrame()

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement
    expect(iframe.contentDocument?.body.innerHTML).toContain('<p>inner</p>')

    fixture.componentInstance.srcdoc.set('<main>updated</main>')
    fixture.detectChanges()
    await settleFrame()

    expect(iframe.contentDocument?.body.innerHTML).toContain('<main>updated</main>')

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration (no browser globals during construction)', () => {
    TestBed.configureTestingModule({
      imports: [ArkFrameComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    expect(() => {
      const component = TestBed.createComponent(ArkFrameComponent)
      component.destroy()
    }).not.toThrow()
  })

  it('renders srcdoc content into the iframe document', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.srcdoc.set(
      '<html><head></head><body><main id="srcdoc-content">Srcdoc</main></body></html>',
    )
    fixture.detectChanges()
    await settleFrame()

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement
    expect(iframe.contentDocument?.querySelector('#srcdoc-content')?.textContent).toBe('Srcdoc')

    fixture.destroy()
  })

  it('projects head content so styles can be inherited into the frame document', async () => {
    TestBed.configureTestingModule({ imports: [FrameWithHeadComponent] })
    const fixture = TestBed.createComponent(FrameWithHeadComponent)
    fixture.detectChanges()
    await settleFrame()

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement
    const stylesheet = iframe.contentDocument?.head.querySelector('link[rel="stylesheet"]')
    expect(stylesheet?.getAttribute('href')).toBe('/frame-inherited.css')
    expect(iframe.contentDocument?.body.querySelector('[data-testid="projected"]')?.textContent).toBe(
      'Projected content',
    )

    fixture.destroy()
  })

  it('cleans up projected content, head content, resize observer, and emits unmount on destroy', async () => {
    const disconnect = vi.fn()
    const observe = vi.fn()
    const originalResizeObserver = globalThis.ResizeObserver
    globalThis.ResizeObserver = class {
      observe(...args: Parameters<ResizeObserver['observe']>): void {
        observe(...args)
      }

      disconnect(): void {
        disconnect()
      }
    } as unknown as typeof ResizeObserver

    @Component({
      standalone: true,
      imports: [ArkFrameComponent],
      template: `
        <ark-frame (unmount)="unmount()">
          <span data-testid="projected">Projected content</span>
        </ark-frame>
      `,
    })
    class DestroyHostComponent {
      readonly unmount = vi.fn()
    }

    try {
      TestBed.configureTestingModule({ imports: [DestroyHostComponent] })
      const fixture = TestBed.createComponent(DestroyHostComponent)
      fixture.detectChanges()
      await settleFrame()

      const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement
      const projected = iframe.contentDocument?.body.querySelector('[data-testid="projected"]')
      expect(projected).not.toBeNull()
      expect(observe).toHaveBeenCalledTimes(1)

      fixture.destroy()

      expect(projected?.parentNode).toBeNull()
      expect(disconnect).toHaveBeenCalledTimes(1)
      expect(fixture.componentInstance.unmount).toHaveBeenCalledTimes(1)
    } finally {
      globalThis.ResizeObserver = originalResizeObserver
    }
  })
})
