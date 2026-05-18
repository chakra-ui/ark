import { ApplicationRef, Component, PLATFORM_ID, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
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
})
