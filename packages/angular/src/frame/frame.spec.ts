import { Component, PLATFORM_ID } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkFrameComponent } from './frame'

@Component({
  standalone: true,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame [srcdoc]="srcdoc" [title]="title" [name]="name"></ark-frame>
  `,
})
class HostComponent {
  srcdoc: string | undefined = '<p>inner</p>'
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

  it('propagates srcdoc, title, and name attributes to the iframe', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement
    expect(iframe.getAttribute('srcdoc')).toBe('<p>inner</p>')
    expect(iframe.getAttribute('title')).toBe('test-frame')
    expect(iframe.getAttribute('name')).toBe('frame-name')

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
