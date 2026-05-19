import { Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_TREE_VIEW_CONTEXT,
  ARK_TREE_VIEW_NODE_CONTEXT,
  ARK_TREE_VIEW_NODE_PROPS_CONTEXT,
  ArkTreeViewNodeProvider,
  ArkTreeViewRoot,
  ArkTreeViewRootProvider,
  createTreeCollection,
  injectArkTreeViewContext,
  injectArkTreeViewNodeContext,
  injectArkTreeViewNodePropsContext,
  treeViewAnatomy,
  useTreeView,
  type TreeViewApi,
  type TreeViewCheckedChangeDetails,
  type TreeViewElementIds,
  type TreeViewExpandedChangeDetails,
  type TreeViewFocusChangeDetails,
  type TreeViewIntlTranslations,
  type TreeViewLoadChildrenCompleteDetails,
  type TreeViewLoadChildrenDetails,
  type TreeViewLoadChildrenErrorDetails,
  type TreeViewMachine,
  type TreeViewMachineProps,
  type TreeViewNodeProps,
  type TreeViewNodeState,
  type TreeViewRenameCompleteDetails,
  type TreeViewRenameStartDetails,
  type TreeViewScrollToIndexDetails,
  type TreeViewSelectionChangeDetails,
  type TreeViewService,
  type UseTreeViewOptions,
  type UseTreeViewProps,
  type UseTreeViewReturn,
} from './public-api'

interface Node {
  id: string
  label: string
  children?: Node[]
}

type TreeViewPublicTypeSmoke = [
  TreeViewApi,
  TreeViewCheckedChangeDetails,
  TreeViewElementIds,
  TreeViewExpandedChangeDetails<Node>,
  TreeViewFocusChangeDetails<Node>,
  TreeViewIntlTranslations,
  TreeViewLoadChildrenCompleteDetails<Node>,
  TreeViewLoadChildrenDetails<Node>,
  TreeViewLoadChildrenErrorDetails<Node>,
  TreeViewMachine,
  TreeViewMachineProps<Node>,
  TreeViewNodeProps,
  TreeViewNodeState,
  TreeViewRenameCompleteDetails,
  TreeViewRenameStartDetails<Node>,
  TreeViewScrollToIndexDetails<Node>,
  TreeViewSelectionChangeDetails<Node>,
  TreeViewService,
  UseTreeViewOptions<Node>,
  UseTreeViewProps<Node>,
  UseTreeViewReturn<Node>,
]

const collection = createTreeCollection<Node>({
  rootNode: {
    id: 'ROOT',
    label: 'Root',
    children: [
      { id: 'src', label: 'src', children: [{ id: 'src/index.ts', label: 'index.ts' }] },
      { id: 'package.json', label: 'package.json' },
    ],
  },
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.label,
  nodeToChildren: (node) => node.children ?? [],
})

function requireNode(value: string): Node {
  const node = collection.findNode(value)
  if (!node) throw new Error(`Expected test tree to contain node "${value}"`)
  return node
}

@Directive({ selector: '[treeViewProbe]', standalone: true, exportAs: 'treeViewProbe' })
class TreeViewProbe {
  private readonly injector = inject(Injector)
  get captured(): UseTreeViewReturn<Node> {
    return this.injector.get(ARK_TREE_VIEW_CONTEXT) as UseTreeViewReturn<Node>
  }
}

@Directive({ selector: '[treeViewNodeProbe]', standalone: true, exportAs: 'treeViewNodeProbe' })
class TreeViewNodeProbe {
  readonly nodeState = injectArkTreeViewNodeContext()
  readonly nodeProps = injectArkTreeViewNodePropsContext<Node>()
}

describe('@ark-ui/angular/tree-view', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_TREE_VIEW_CONTEXT).toBe('object')
    expect(typeof ARK_TREE_VIEW_NODE_CONTEXT).toBe('object')
    expect(typeof ARK_TREE_VIEW_NODE_PROPS_CONTEXT).toBe('object')
    expect(typeof injectArkTreeViewContext).toBe('function')
    expect(typeof injectArkTreeViewNodeContext).toBe('function')
    expect(typeof injectArkTreeViewNodePropsContext).toBe('function')
    expect(typeof useTreeView).toBe('function')
    expect(typeof treeViewAnatomy).toBe('object')
    expect(ArkTreeViewRoot).toBeDefined()
    expect(ArkTreeViewRootProvider).toBeDefined()
    expect(ArkTreeViewNodeProvider).toBeDefined()
    expect(undefined as TreeViewPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useTreeView creates api, state, service, and send with a fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useTreeView<Node>({ context: () => ({ collection }) }))
    const rootProps = result.api().getRootProps() as { id?: unknown }

    expect(typeof rootProps.id).toBe('string')
    expect(rootProps.id).toMatch(/tree-view::/)
    expect(typeof result.state()).toBe('object')
    expect(typeof result.service.send).toBe('function')
    expect(result.send).toBe(result.service.send)

    fixture.destroy()
  })

  it('descendant probe under [arkTreeView] receives the root directive via context', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRoot, TreeViewProbe],
      template: '<div arkTreeView [collection]="collection"><span treeViewProbe></span></div>',
    })
    class Host {
      readonly collection = collection
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTreeViewRoot)).injector.get(ArkTreeViewRoot)
    const probe = fixture.debugElement.query(By.directive(TreeViewProbe)).injector.get(TreeViewProbe)

    expect(probe.captured).toBe(root)

    fixture.destroy()
  })

  it('root provider proxies an externally-created tree view machine', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRootProvider, TreeViewProbe],
      template: '<div arkTreeViewRootProvider [value]="treeView"><span treeViewProbe></span></div>',
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly treeView = runInInjectionContext(this.injector, () =>
        useTreeView<Node>({ context: () => ({ collection }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const provider = fixture.debugElement
      .query(By.directive(ArkTreeViewRootProvider))
      .injector.get(ArkTreeViewRootProvider)
    const probe = fixture.debugElement.query(By.directive(TreeViewProbe)).injector.get(TreeViewProbe)

    expect(probe.captured).toBe(provider)
    expect(provider.api().collection).toBe(collection)

    fixture.destroy()
  })

  it('seeds uncontrolled default state and emits model/detail callbacks once per api change', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRoot],
      template: `
        <div
          arkTreeView
          [collection]="collection"
          [defaultExpandedValue]="['src']"
          [defaultSelectedValue]="['package.json']"
          [defaultCheckedValue]="['src/index.ts']"
          defaultFocusedValue="src"
          (expandedValueChange)="expandedValues.push($event)"
          (expandedChange)="expandedDetails.push($event.expandedValue)"
          (selectedValueChange)="selectedValues.push($event)"
          (selectionChange)="selectionDetails.push($event.selectedValue)"
          (checkedValueChange)="checkedValues.push($event)"
          (checkedChange)="checkedDetails.push($event.checkedValue)"
          (focusedValueChange)="focusedValues.push($event)"
          (focusChange)="focusDetails.push($event.focusedValue)"
        ></div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly expandedValues: string[][] = []
      readonly expandedDetails: string[][] = []
      readonly selectedValues: string[][] = []
      readonly selectionDetails: string[][] = []
      readonly checkedValues: string[][] = []
      readonly checkedDetails: string[][] = []
      readonly focusedValues: Array<string | null | undefined> = []
      readonly focusDetails: Array<string | null> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTreeViewRoot)).injector.get(ArkTreeViewRoot<Node>)

    expect(root.api().expandedValue).toEqual(['src'])
    expect(root.api().selectedValue).toEqual(['package.json'])
    expect(root.api().checkedValue).toEqual(['src/index.ts'])

    root.api().setExpandedValue(['src', 'package.json'])
    root.api().setSelectedValue(['src/index.ts'])
    root.api().setChecked(['package.json'])
    root.send({ type: 'NODE.FOCUS', id: 'package.json' } as Parameters<typeof root.send>[0])
    fixture.detectChanges()

    expect(fixture.componentInstance.expandedValues).toEqual([['src', 'package.json']])
    expect(fixture.componentInstance.expandedDetails).toEqual([['src', 'package.json']])
    expect(fixture.componentInstance.selectedValues).toEqual([['src/index.ts']])
    expect(fixture.componentInstance.selectionDetails).toEqual([['src/index.ts']])
    expect(fixture.componentInstance.checkedValues).toEqual([['package.json']])
    expect(fixture.componentInstance.checkedDetails).toEqual([['package.json']])
    expect(fixture.componentInstance.focusedValues).toEqual(['package.json'])
    expect(fixture.componentInstance.focusDetails).toEqual(['package.json'])

    fixture.destroy()
  })

  it('controlled model values round-trip through the machine bridge', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRoot],
      template: `
        <div
          arkTreeView
          [collection]="collection"
          [(expandedValue)]="expanded"
          [(selectedValue)]="selected"
          [(checkedValue)]="checked"
          [(focusedValue)]="focused"
        ></div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly expanded = signal<string[] | undefined>(['src'])
      readonly selected = signal<string[] | undefined>(['package.json'])
      readonly checked = signal<string[] | undefined>([])
      readonly focused = signal<string | null | undefined>('src')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTreeViewRoot)).injector.get(ArkTreeViewRoot<Node>)

    expect(root.api().expandedValue).toEqual(['src'])
    expect(root.api().selectedValue).toEqual(['package.json'])
    expect(root.api().checkedValue).toEqual([])

    root.api().setExpandedValue([])
    root.api().setSelectedValue(['src/index.ts'])
    root.api().setChecked(['src/index.ts'])
    root.send({ type: 'NODE.FOCUS', id: 'package.json' } as Parameters<typeof root.send>[0])
    fixture.detectChanges()

    expect(fixture.componentInstance.expanded()).toEqual([])
    expect(fixture.componentInstance.selected()).toEqual(['src/index.ts'])
    expect(fixture.componentInstance.checked()).toEqual(['src/index.ts'])
    expect(fixture.componentInstance.focused()).toBe('package.json')

    fixture.componentInstance.expanded.set(['src'])
    fixture.componentInstance.selected.set([])
    fixture.componentInstance.checked.set([])
    fixture.componentInstance.focused.set('src/index.ts')
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().expandedValue).toEqual(['src'])
    expect(root.api().selectedValue).toEqual([])
    expect(root.api().checkedValue).toEqual([])
    expect(root.api().getNodeState({ node: requireNode('src/index.ts'), indexPath: [0, 0] }).focused).toBe(true)

    fixture.destroy()
  })

  it('node provider exposes node props and computed node state', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRoot, ArkTreeViewNodeProvider, TreeViewNodeProbe],
      template: `
        <div arkTreeView [collection]="collection" [defaultExpandedValue]="['src']" [defaultSelectedValue]="['src']">
          <ng-container arkTreeViewNodeProvider [node]="node" [indexPath]="[0]">
            <span treeViewNodeProbe></span>
          </ng-container>
        </div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly node = requireNode('src')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const probe = fixture.debugElement.query(By.directive(TreeViewNodeProbe)).injector.get(TreeViewNodeProbe)

    expect(probe.nodeProps().node).toBe(fixture.componentInstance.node)
    expect(probe.nodeProps().indexPath).toEqual([0])
    expect(probe.nodeState().value).toBe('src')
    expect(probe.nodeState().expanded).toBe(true)
    expect(probe.nodeState().selected).toBe(true)

    fixture.destroy()
  })
})
