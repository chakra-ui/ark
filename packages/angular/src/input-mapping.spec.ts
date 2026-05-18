import { Component, viewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkFocusTrapDirective } from './focus-trap/focus-trap'
import { ArkPresenceComponent } from './presence/presence'
import { ArkSwapRootComponent } from './swap/swap'

describe('Ark boolean input mapping', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it.each([
    ['bare attribute', '<div arkFocusTrap></div>'],
    ['string attribute', '<div arkFocusTrap="true"></div>'],
  ])('maps %s to true for directive boolean inputs', (_label, template) => {
    @Component({
      standalone: true,
      imports: [ArkFocusTrapDirective],
      template,
    })
    class HostComponent {
      readonly directive = viewChild.required(ArkFocusTrapDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().arkFocusTrap()).toBe(true)
  })

  it.each([
    ['lazyMount', '<ark-presence lazyMount><ng-template>content</ng-template></ark-presence>'],
    ['unmountOnExit', '<ark-presence unmountOnExit><ng-template>content</ng-template></ark-presence>'],
  ])('maps %s as a bare component boolean input', (_label, template) => {
    @Component({
      standalone: true,
      imports: [ArkPresenceComponent],
      template,
    })
    class HostComponent {
      readonly presence = viewChild.required(ArkPresenceComponent)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(
      fixture.componentInstance.presence().lazyMount() || fixture.componentInstance.presence().unmountOnExit(),
    ).toBe(true)
  })

  it('maps the swap root state through a property binding', () => {
    @Component({
      standalone: true,
      imports: [ArkSwapRootComponent],
      template: '<ark-swap [swap]="true"></ark-swap>',
    })
    class HostComponent {
      readonly swap = viewChild.required(ArkSwapRootComponent)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.swap().swap()).toBe(true)
  })
})
