import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { TestBed } from '@angular/core/testing'
import { describe, expect, it } from 'vitest'
import {
  ARK_RATING_GROUP_CONTEXT,
  ArkRatingGroupContext,
  ArkRatingGroupControl,
  ArkRatingGroupHiddenInput,
  ArkRatingGroupItem,
  ArkRatingGroupItemContext,
  ArkRatingGroupLabel,
  ArkRatingGroupRoot,
  ArkRatingGroupRootProvider,
  injectArkRatingGroupContext,
  ratingGroupAnatomy,
  type RatingGroupApi,
  type RatingGroupContextTemplate,
  type RatingGroupHoverChangeDetails,
  type RatingGroupItemContextTemplate,
  type RatingGroupItemProps,
  type RatingGroupItemState,
  type RatingGroupMachine,
  type RatingGroupMachineProps,
  type RatingGroupService,
  type RatingGroupValueChangeDetails,
  type UseRatingGroupOptions,
  type UseRatingGroupProps,
  type UseRatingGroupReturn,
  useRatingGroup,
} from './public-api'
import { RatingGroupBasicExample } from './examples/basic'
import { RatingGroupControlledExample } from './examples/controlled'
import { RatingGroupDisabledExample } from './examples/disabled'
import { RatingGroupFormUsageExample } from './examples/form-usage'
import { RatingGroupHalfStarExample } from './examples/half-star'
import { RatingGroupRootProviderExample } from './examples/root-provider'
import { RatingGroupWithFieldExample } from './examples/with-field'

type RatingGroupPublicTypeSmoke = [
  RatingGroupApi,
  RatingGroupContextTemplate,
  RatingGroupHoverChangeDetails,
  RatingGroupItemContextTemplate,
  RatingGroupItemProps,
  RatingGroupItemState,
  RatingGroupMachine,
  RatingGroupMachineProps,
  RatingGroupService,
  RatingGroupValueChangeDetails,
  UseRatingGroupOptions,
  UseRatingGroupProps,
  UseRatingGroupReturn,
]

@Directive({ selector: '[ratingGroupProbe]', standalone: true, exportAs: 'ratingGroupProbe' })
class RatingGroupProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseRatingGroupReturn {
    return this._injector.get(ARK_RATING_GROUP_CONTEXT)
  }
}

describe('@ark-ui/angular/rating-group', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_RATING_GROUP_CONTEXT).toBe('object')
    expect(typeof injectArkRatingGroupContext).toBe('function')
    expect(typeof useRatingGroup).toBe('function')
    expect(typeof ratingGroupAnatomy).toBe('object')
    expect(ArkRatingGroupRoot).toBeDefined()
    expect(ArkRatingGroupRootProvider).toBeDefined()
    expect(ArkRatingGroupLabel).toBeDefined()
    expect(ArkRatingGroupControl).toBeDefined()
    expect(ArkRatingGroupContext).toBeDefined()
    expect(ArkRatingGroupItem).toBeDefined()
    expect(ArkRatingGroupItemContext).toBeDefined()
    expect(ArkRatingGroupHiddenInput).toBeDefined()
    expect(undefined as RatingGroupPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkRatingGroup] receives the Root directive instance via ARK_RATING_GROUP_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkRatingGroupRoot, RatingGroupProbe],
      template: `
        <div arkRatingGroup>
          <span ratingGroupProbe></span>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkRatingGroupRoot))
    const probeDebug = fixture.debugElement.query(By.directive(RatingGroupProbe))
    const rootInstance = rootDebug.injector.get(ArkRatingGroupRoot)
    const probeInstance = probeDebug.injector.get(RatingGroupProbe)

    expect(probeInstance.captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('an orphan [arkRatingGroupItem] without an ancestor [arkRatingGroup] throws a missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkRatingGroupItem],
      template: '<span arkRatingGroupItem [index]="1"></span>',
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })

    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_RATING_GROUP_CONTEXT|No provider|NG0201/i)
  })

  it('clicking an item updates api().value, the hidden input, and emits (valueChange) exactly once', () => {
    @Component({
      standalone: true,
      imports: [
        ArkRatingGroupRoot,
        ArkRatingGroupControl,
        ArkRatingGroupContext,
        ArkRatingGroupItem,
        ArkRatingGroupHiddenInput,
      ],
      template: `
        <div arkRatingGroup name="review" (valueChange)="emissions.push($event)">
          <div arkRatingGroupControl>
            <ng-template arkRatingGroupContext let-api>
              @for (item of api().items; track item) {
                <span arkRatingGroupItem [index]="item"></span>
              }
            </ng-template>
            <input arkRatingGroupHiddenInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<number | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).injector.get(ArkRatingGroupRoot)
    const items = fixture.debugElement.queryAll(By.directive(ArkRatingGroupItem))
    const input = fixture.debugElement.query(By.directive(ArkRatingGroupHiddenInput)).nativeElement as HTMLInputElement

    expect(root.api().value).toBe(-1)
    expect(input.name).toBe('review')
    ;(items[2].nativeElement as HTMLElement).click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(3)
    expect(input.value).toBe('3')
    expect(fixture.componentInstance.emissions).toEqual([3])
    expect('valueChange' in root).toBe(false)

    fixture.destroy()
  })

  it('controlled [(value)] round-trips a host signal and does not re-emit when the same value is written twice', () => {
    @Component({
      standalone: true,
      imports: [ArkRatingGroupRoot],
      template: '<div arkRatingGroup [(value)]="value" (valueChange)="emissions.push($event)"></div>',
    })
    class Host {
      readonly value = signal<number | undefined>(0)
      readonly emissions: Array<number | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).injector.get(ArkRatingGroupRoot)

    fixture.componentInstance.value.set(4)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(4)
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.value.set(4)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(4)
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('[defaultValue] property binding starts the rating group with that value', () => {
    @Component({
      standalone: true,
      imports: [ArkRatingGroupRoot],
      template: '<div arkRatingGroup [defaultValue]="3"></div>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).injector.get(ArkRatingGroupRoot)
    expect(root.api().value).toBe(3)

    fixture.destroy()
  })

  it('static defaultValue attribute is transformed to a number', () => {
    @Component({
      standalone: true,
      imports: [ArkRatingGroupRoot],
      template: '<div arkRatingGroup defaultValue="2"></div>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).injector.get(ArkRatingGroupRoot)
    expect(root.api().value).toBe(2)

    fixture.destroy()
  })

  it('clicking a disabled rating group does not change value', () => {
    @Component({
      standalone: true,
      imports: [ArkRatingGroupRoot, ArkRatingGroupContext, ArkRatingGroupItem],
      template: `
        <div arkRatingGroup disabled [defaultValue]="2">
          <ng-template arkRatingGroupContext let-api>
            @for (item of api().items; track item) {
              <span arkRatingGroupItem [index]="item"></span>
            }
          </ng-template>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).injector.get(ArkRatingGroupRoot)
    const item = fixture.debugElement.queryAll(By.directive(ArkRatingGroupItem))[4].nativeElement as HTMLElement

    expect(root.api().value).toBe(2)
    expect(root.api().count).toBe(5)

    item.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(2)

    fixture.destroy()
  })

  it('arkRatingGroupItemContext exposes item state to an inline template', () => {
    @Component({
      standalone: true,
      imports: [ArkRatingGroupRoot, ArkRatingGroupContext, ArkRatingGroupItem, ArkRatingGroupItemContext],
      template: `
        <div arkRatingGroup [defaultValue]="2.5" allowHalf>
          <ng-template arkRatingGroupContext let-api>
            @for (item of api().items; track item) {
              <span arkRatingGroupItem [index]="item">
                <ng-template arkRatingGroupItemContext let-state>
                  <span class="indicator" [attr.data-half]="state().half ? '' : null"></span>
                </ng-template>
              </span>
            }
          </ng-template>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const indicators = Array.from(fixture.nativeElement.querySelectorAll('.indicator')) as HTMLElement[]
    expect(indicators[2].getAttribute('data-half')).toBe('')

    fixture.destroy()
  })

  it('works as a ControlValueAccessor for reactive forms', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkRatingGroupRoot, ArkRatingGroupContext, ArkRatingGroupItem],
      template: `
        <div arkRatingGroup [formControl]="control">
          <ng-template arkRatingGroupContext let-api>
            @for (item of api().items; track item) {
              <span arkRatingGroupItem [index]="item"></span>
            }
          </ng-template>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<number | null>(2)
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).injector.get(ArkRatingGroupRoot)
    expect(root.api().value).toBe(2)

    fixture.componentInstance.control.setValue(4)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe(4)

    const firstItem = fixture.debugElement.queryAll(By.directive(ArkRatingGroupItem))[0].nativeElement as HTMLElement
    firstItem.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.value).toBe(1)

    fixture.destroy()
  })

  it('RatingGroupBasicExample renders root, control, items, and hidden input with rating-group data parts', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [RatingGroupBasicExample] })
    const fixture = TestBed.createComponent(RatingGroupBasicExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).nativeElement as HTMLElement
    const controlEl = fixture.debugElement.query(By.directive(ArkRatingGroupControl)).nativeElement as HTMLElement
    const items = fixture.debugElement.queryAll(By.directive(ArkRatingGroupItem))
    const input = fixture.debugElement.query(By.directive(ArkRatingGroupHiddenInput)).nativeElement as HTMLInputElement

    expect(rootEl.getAttribute('data-scope')).toBe('rating-group')
    expect(rootEl.getAttribute('data-part')).toBe('root')
    expect(controlEl.getAttribute('data-part')).toBe('control')
    expect(items).toHaveLength(5)
    expect(input.value).toBe('3')

    fixture.destroy()
  })

  it('RatingGroupControlledExample wires [(value)] to a host signal', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [RatingGroupControlledExample] })
    const fixture = TestBed.createComponent(RatingGroupControlledExample)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRatingGroupRoot)).injector.get(ArkRatingGroupRoot)
    expect(root.api().value).toBe(0)

    fixture.componentInstance.value.set(5)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(5)

    fixture.destroy()
  })

  it('example variants render their expected root directives', () => {
    const cases = [
      RatingGroupDisabledExample,
      RatingGroupFormUsageExample,
      RatingGroupHalfStarExample,
      RatingGroupRootProviderExample,
      RatingGroupWithFieldExample,
    ]

    for (const Example of cases) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [Example] })
      const fixture = TestBed.createComponent(Example)
      fixture.detectChanges()

      const root = fixture.debugElement.query(By.css('[arkRatingGroup], [arkRatingGroupRootProvider]'))
        .nativeElement as HTMLElement
      expect(root.getAttribute('data-scope')).toBe('rating-group')

      fixture.destroy()
    }
  })
})
