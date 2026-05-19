import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_JSON_TREE_VIEW_CONTEXT,
  ARK_JSON_TREE_VIEW_OPTIONS,
  ArkJsonTreeViewKeyNode,
  ArkJsonTreeViewNode,
  ArkJsonTreeViewRoot,
  ArkJsonTreeViewRootProvider,
  ArkJsonTreeViewTree,
  ArkJsonTreeViewValueNode,
  injectArkJsonTreeViewContext,
  injectArkJsonTreeViewOptions,
  useJsonTreeView,
  type JsonNode,
  type JsonTreeViewApi,
  type JsonTreeViewCheckedChangeDetails,
  type JsonTreeViewElementIds,
  type JsonTreeViewExpandedChangeDetails,
  type JsonTreeViewFocusChangeDetails,
  type JsonTreeViewNode,
  type JsonTreeViewOptions,
  type JsonTreeViewSelectionChangeDetails,
  type JsonTreeViewService,
  type JsonTreeViewValueNode,
  type JsonTreeViewValueTemplate,
  type UseJsonTreeViewOptions,
  type UseJsonTreeViewProps,
  type UseJsonTreeViewReturn,
} from './public-api'

type JsonTreeViewPublicTypeSmoke = [
  JsonNode,
  JsonTreeViewApi,
  JsonTreeViewCheckedChangeDetails,
  JsonTreeViewElementIds,
  JsonTreeViewExpandedChangeDetails,
  JsonTreeViewFocusChangeDetails,
  JsonTreeViewNode,
  JsonTreeViewOptions,
  JsonTreeViewSelectionChangeDetails,
  JsonTreeViewService,
  JsonTreeViewValueNode,
  JsonTreeViewValueTemplate,
  UseJsonTreeViewOptions,
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
]

@Directive({ selector: '[jsonTreeViewProbe]', standalone: true, exportAs: 'jsonTreeViewProbe' })
class JsonTreeViewProbe {
  private readonly injector = inject(Injector)
  readonly context = injectArkJsonTreeViewContext()
  readonly options = injectArkJsonTreeViewOptions()

  get captured(): UseJsonTreeViewReturn {
    return this.injector.get(ARK_JSON_TREE_VIEW_CONTEXT)
  }
}

describe('@ark-ui/angular/json-tree-view', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_JSON_TREE_VIEW_CONTEXT).toBe('object')
    expect(typeof ARK_JSON_TREE_VIEW_OPTIONS).toBe('object')
    expect(typeof injectArkJsonTreeViewContext).toBe('function')
    expect(typeof injectArkJsonTreeViewOptions).toBe('function')
    expect(typeof useJsonTreeView).toBe('function')
    expect(ArkJsonTreeViewRoot).toBeDefined()
    expect(ArkJsonTreeViewRootProvider).toBeDefined()
    expect(ArkJsonTreeViewTree).toBeDefined()
    expect(ArkJsonTreeViewNode).toBeDefined()
    expect(ArkJsonTreeViewKeyNode).toBeDefined()
    expect(ArkJsonTreeViewValueNode).toBeDefined()
    expect(undefined as JsonTreeViewPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('builds a json tree collection through useJsonTreeView', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const jsonTreeView = runInInjectionContext(injector, () =>
      useJsonTreeView({
        context: () => ({
          data: {
            object: { nested: true },
            array: [1, 2],
            primitive: 'value',
            error: new Error('boom'),
            fn: function sum(a: number, b: number) {
              return a + b
            },
            map: new Map([['name', 'ark']]),
            set: new Set(['angular']),
          },
          defaultExpandedDepth: 1,
        }),
      }),
    )

    const rootNode = jsonTreeView.api().collection.getNodeChildren(jsonTreeView.api().collection.rootNode)[0]

    expect(rootNode.type).toBe('object')
    expect(jsonTreeView.api().expandedValue).toEqual([jsonTreeView.api().collection.getNodeValue(rootNode)])
    expect(jsonTreeView.options()).toEqual({
      maxPreviewItems: undefined,
      collapseStringsAfterLength: undefined,
      quotesOnKeys: undefined,
      groupArraysAfterLength: undefined,
      showNonenumerable: undefined,
    })

    fixture.destroy()
  })

  it('renders object, array, and primitive nodes through the tree renderer', () => {
    @Component({
      standalone: true,
      imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
      template: `
        <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="2" quotesOnKeys>
          <div arkJsonTreeViewTree></div>
        </div>
      `,
    })
    class Host {
      readonly data = {
        name: 'Ada',
        tags: ['compiler', 'math'],
        nested: { active: true },
      }
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkJsonTreeViewRoot)).injector.get(ArkJsonTreeViewRoot)
    const text = (fixture.nativeElement as HTMLElement).textContent ?? ''
    const keys = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('[data-kind="key"]')).map(
      (node) => node.textContent,
    )

    expect(root.api().collection.getNodeChildren(root.api().collection.rootNode)).toHaveLength(1)
    expect(text).toContain('Ada')
    expect(text).toContain('compiler')
    expect(keys).toContain('"name"')
    expect(keys).toContain('"tags"')

    fixture.destroy()
  })

  it('renders error, function, map, and set values', () => {
    @Component({
      standalone: true,
      imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
      template: `
        <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="2">
          <div arkJsonTreeViewTree></div>
        </div>
      `,
    })
    class Host {
      readonly data = {
        error: new Error('boom'),
        fn: () => 'ok',
        map: new Map([['name', 'ark']]),
        set: new Set(['angular']),
      }
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const text = (fixture.nativeElement as HTMLElement).textContent ?? ''

    expect(text).toContain('Error')
    expect(text).toContain('fn')
    expect(text).toContain('Map')
    expect(text).toContain('Set')

    fixture.destroy()
  })

  it('delegates expansion and selection changes to the tree view machine', () => {
    @Component({
      standalone: true,
      imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
      template: `
        <div
          arkJsonTreeView
          [data]="data"
          [defaultExpandedDepth]="1"
          (expandedValueChange)="expandedValues.push($event)"
          (selectedValueChange)="selectedValues.push($event)"
        >
          <div arkJsonTreeViewTree></div>
        </div>
      `,
    })
    class Host {
      readonly data = { child: { name: 'Ada' } }
      readonly expandedValues: string[][] = []
      readonly selectedValues: string[][] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkJsonTreeViewRoot)).injector.get(ArkJsonTreeViewRoot)
    const child = root.api().collection.getNodeChildren(root.api().collection.rootNode)[0]
    const value = root.api().collection.getNodeValue(child)

    root.api().setExpandedValue([])
    root.api().setSelectedValue([value])
    fixture.detectChanges()

    expect(fixture.componentInstance.expandedValues).toEqual([[]])
    expect(fixture.componentInstance.selectedValues).toEqual([[value]])
    expect(root.api().expandedValue).toEqual([])
    expect(root.api().selectedValue).toEqual([value])

    fixture.destroy()
  })

  it('supports controlled expansion and render-value templates', () => {
    @Component({
      standalone: true,
      imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
      template: `
        <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="1" [(expandedValue)]="expandedValue">
          <div arkJsonTreeViewTree [renderValue]="renderValue"></div>
        </div>

        <ng-template #renderValue let-node>
          <strong class="custom-value">{{ node.value }}</strong>
        </ng-template>
      `,
    })
    class Host {
      readonly data = { email: 'ada@example.com' }
      readonly expandedValue = signal<string[] | undefined>(undefined)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkJsonTreeViewRoot)).injector.get(ArkJsonTreeViewRoot)
    const branch = root.api().collection.getNodeChildren(root.api().collection.rootNode)[0]
    fixture.componentInstance.expandedValue.set([root.api().collection.getNodeValue(branch)])
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().expandedValue).toEqual([root.api().collection.getNodeValue(branch)])
    const customValues = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.custom-value')).map(
      (node) => node.textContent,
    )

    expect(customValues.some((value) => value?.includes('ada@example.com'))).toBe(true)

    fixture.destroy()
  })

  it('root provider exposes an externally-created json tree view context', () => {
    @Component({
      standalone: true,
      imports: [ArkJsonTreeViewRootProvider, JsonTreeViewProbe],
      template: '<div arkJsonTreeViewRootProvider [value]="jsonTreeView"><span jsonTreeViewProbe></span></div>',
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly jsonTreeView = runInInjectionContext(this.injector, () =>
        useJsonTreeView({
          context: () => ({
            data: { name: 'Ada' },
            quotesOnKeys: true,
          }),
        }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const provider = fixture.debugElement
      .query(By.directive(ArkJsonTreeViewRootProvider))
      .injector.get(ArkJsonTreeViewRootProvider)
    const probe = fixture.debugElement.query(By.directive(JsonTreeViewProbe)).injector.get(JsonTreeViewProbe)

    expect(probe.captured).toBe(provider)
    expect(probe.context).toBe(provider)
    expect(probe.options().quotesOnKeys).toBe(true)

    fixture.destroy()
  })

  it('public-api imports tree-view only through the package entry point', () => {
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public-api.ts'), 'utf-8')

    expect(source).toContain("from '@ark-ui/angular/src/tree-view'")
    expect(source).not.toMatch(/from ['"]\.\.?\/tree-view/)
  })
})
