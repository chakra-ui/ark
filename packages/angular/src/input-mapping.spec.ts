import { Component, Directive, booleanAttribute, input, model, signal, viewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'

@Directive({ selector: '[arkFixturePlain]', standalone: true })
class PlainDirective {
  readonly disabled = input(false, { transform: booleanAttribute })
}

@Directive({ selector: '[arkFixtureDefault]', standalone: true })
class DefaultDirective {
  readonly defaultChecked = input(false, { transform: booleanAttribute, alias: 'defaultChecked' })
}

@Directive({ selector: '[arkFixtureControlled]', standalone: true })
class ControlledDirective {
  readonly checked = model<boolean>(false)
}

describe('input mapping', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('plain boolean input accepts bare attribute form (criterion 6)', () => {
    @Component({
      standalone: true,
      imports: [PlainDirective],
      template: '<div arkFixturePlain disabled></div>',
    })
    class HostComponent {
      readonly directive = viewChild.required(PlainDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().disabled()).toBe(true)
  })

  it('plain boolean input accepts string attribute form (criterion 6)', () => {
    @Component({
      standalone: true,
      imports: [PlainDirective],
      template: '<div arkFixturePlain disabled="true"></div>',
    })
    class HostComponent {
      readonly directive = viewChild.required(PlainDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().disabled()).toBe(true)
  })

  it('uncontrolled default boolean input accepts bare attribute form', () => {
    @Component({
      standalone: true,
      imports: [DefaultDirective],
      template: '<div arkFixtureDefault defaultChecked></div>',
    })
    class HostComponent {
      readonly directive = viewChild.required(DefaultDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().defaultChecked()).toBe(true)
  })

  it('uncontrolled default boolean input accepts string attribute form', () => {
    @Component({
      standalone: true,
      imports: [DefaultDirective],
      template: '<div arkFixtureDefault defaultChecked="true"></div>',
    })
    class HostComponent {
      readonly directive = viewChild.required(DefaultDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().defaultChecked()).toBe(true)
  })

  it('controlled model channel works via property binding (criterion 7)', () => {
    @Component({
      standalone: true,
      imports: [ControlledDirective],
      template: '<div arkFixtureControlled [checked]="value()"></div>',
    })
    class HostComponent {
      readonly value = signal(true)
      readonly directive = viewChild.required(ControlledDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().checked()).toBe(true)

    fixture.componentInstance.value.set(false)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().checked()).toBe(false)
  })

  it('controlled model channel works via banana syntax (criterion 7)', () => {
    @Component({
      standalone: true,
      imports: [ControlledDirective],
      template: '<div arkFixtureControlled [(checked)]="value"></div>',
    })
    class HostComponent {
      value = true
      readonly directive = viewChild.required(ControlledDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().checked()).toBe(true)

    fixture.componentInstance.directive().checked.set(false)
    fixture.detectChanges()

    expect(fixture.componentInstance.value).toBe(false)
  })

  it('controlled model channel preserves default when no binding is supplied (criterion 7)', () => {
    @Component({
      standalone: true,
      imports: [ControlledDirective],
      template: '<div arkFixtureControlled></div>',
    })
    class HostComponent {
      readonly directive = viewChild.required(ControlledDirective)
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive().checked()).toBe(false)
  })
})
