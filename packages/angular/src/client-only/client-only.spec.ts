import { ApplicationRef, Component, PLATFORM_ID } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkClientOnlyComponent } from './client-only'

@Component({
  standalone: true,
  imports: [ArkClientOnlyComponent],
  template: `
    <ark-client-only [fallback]="fb">
      <span data-testid="client">Client</span>
    </ark-client-only>
    <ng-template #fb><span data-testid="fallback">Fallback</span></ng-template>
  `,
})
class HostComponent {}

describe('ArkClientOnlyComponent', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('renders fallback content before the browser render callback runs', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const fallback = fixture.nativeElement.querySelector('[data-testid="fallback"]')
    const client = fixture.nativeElement.querySelector('[data-testid="client"]')
    expect(fallback).not.toBeNull()
    expect(client).toBeNull()
  })

  it('renders client content after browser render', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    const client = fixture.nativeElement.querySelector('[data-testid="client"]')
    const fallback = fixture.nativeElement.querySelector('[data-testid="fallback"]')
    expect(client).not.toBeNull()
    expect(fallback).toBeNull()

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration (SSR-safe)', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    expect(() => {
      const fixture = TestBed.createComponent(HostComponent)
      fixture.detectChanges()
      fixture.destroy()
    }).not.toThrow()
  })

  it('applies display: contents on the host element', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const host = fixture.nativeElement.querySelector('ark-client-only') as HTMLElement
    expect(host.getAttribute('style')).toContain('display: contents')

    fixture.destroy()
  })
})
