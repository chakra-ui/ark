import { Component, type ElementRef, ViewChild, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkPropsDirective } from './ark-props'
import type { ArkProps } from './types'

describe('ArkPropsDirective', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('applies attributes, swaps handlers, clears on empty, and stops dispatch after destroy (criterion 20)', () => {
    let calls = 0
    const firstHandler = (): void => {
      calls += 1
    }
    let secondCalls = 0
    const secondHandler = (): void => {
      secondCalls += 1
    }
    const bag = signal<ArkProps | undefined>({
      id: 'x',
      'aria-label': 'foo',
      onClick: firstHandler,
    })

    @Component({
      standalone: true,
      imports: [ArkPropsDirective],
      template: '<div #target [arkProps]="bag()"></div>',
    })
    class HostComponent {
      @ViewChild('target', { static: true }) target!: ElementRef<HTMLDivElement>
      readonly bag = bag
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    TestBed.tick()

    const el = fixture.componentInstance.target.nativeElement
    expect(el.getAttribute('id')).toBe('x')
    expect(el.getAttribute('aria-label')).toBe('foo')

    el.dispatchEvent(new Event('click'))
    expect(calls).toBe(1)
    expect(secondCalls).toBe(0)

    bag.set({
      id: 'x',
      'aria-label': 'foo',
      onClick: secondHandler,
    })
    TestBed.tick()

    el.dispatchEvent(new Event('click'))
    expect(calls).toBe(1)
    expect(secondCalls).toBe(1)

    bag.set({})
    TestBed.tick()
    expect(el.getAttribute('id')).toBeNull()
    expect(el.getAttribute('aria-label')).toBeNull()

    el.dispatchEvent(new Event('click'))
    expect(secondCalls).toBe(1)

    fixture.destroy()
    el.dispatchEvent(new Event('click'))
    expect(secondCalls).toBe(1)
  })

  it('accepts undefined as the prop bag', () => {
    const bag = signal<ArkProps | undefined>(undefined)

    @Component({
      standalone: true,
      imports: [ArkPropsDirective],
      template: '<div #target [arkProps]="bag()"></div>',
    })
    class HostComponent {
      @ViewChild('target', { static: true }) target!: ElementRef<HTMLDivElement>
      readonly bag = bag
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    TestBed.tick()

    const el = fixture.componentInstance.target.nativeElement
    expect(el.attributes.length).toBe(0)

    fixture.destroy()
  })
})
