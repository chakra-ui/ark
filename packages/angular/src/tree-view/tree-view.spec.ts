import { Component, Directive, Injector, inject, runInInjectionContext, signal, type Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_TREE_VIEW_CONTEXT,
  ARK_TREE_VIEW_NODE_CONTEXT,
  ARK_TREE_VIEW_NODE_PROPS_CONTEXT,
  ArkTreeViewBranch,
  ArkTreeViewBranchContent,
  ArkTreeViewBranchControl,
  ArkTreeViewBranchIndentGuide,
  ArkTreeViewBranchIndicator,
  ArkTreeViewBranchText,
  ArkTreeViewBranchTrigger,
  ArkTreeViewItem,
  ArkTreeViewItemIndicator,
  ArkTreeViewItemText,
  ArkTreeViewLabel,
  ArkTreeViewNodeCheckbox,
  ArkTreeViewNodeCheckboxIndicator,
  ArkTreeViewNodeProvider,
  ArkTreeViewNodeRenameInput,
  ArkTreeViewRoot,
  ArkTreeViewRootProvider,
  ArkTreeViewTree,
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
import { TreeViewAsyncLoadingExample } from './examples/async-loading'
import { TreeViewBasicExample } from './examples/basic'
import { TreeViewCheckboxTreeExample } from './examples/checkbox-tree'
import { TreeViewControlledExpandedExample } from './examples/controlled-expanded'
import { TreeViewControlledSelectedExample } from './examples/controlled-selected'
import { TreeViewDisabledNodeExample } from './examples/disabled-node'
import { TreeViewExpandCollapseAllExample } from './examples/expand-collapse-all'
import { TreeViewFilteringExample } from './examples/filtering'
import { TreeViewLinksExample } from './examples/links'
import { TreeViewMutationExample } from './examples/mutation'
import { TreeViewRenameNodeExample } from './examples/rename-node'
import { TreeViewRootProviderExample } from './examples/root-provider'

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

describe('@ark-ui/angular/src/tree-view', () => {
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
    expect(ArkTreeViewTree).toBeDefined()
    expect(ArkTreeViewLabel).toBeDefined()
    expect(ArkTreeViewItem).toBeDefined()
    expect(ArkTreeViewItemText).toBeDefined()
    expect(ArkTreeViewItemIndicator).toBeDefined()
    expect(ArkTreeViewBranch).toBeDefined()
    expect(ArkTreeViewBranchContent).toBeDefined()
    expect(ArkTreeViewBranchControl).toBeDefined()
    expect(ArkTreeViewBranchTrigger).toBeDefined()
    expect(ArkTreeViewBranchText).toBeDefined()
    expect(ArkTreeViewBranchIndicator).toBeDefined()
    expect(ArkTreeViewBranchIndentGuide).toBeDefined()
    expect(ArkTreeViewNodeCheckbox).toBeDefined()
    expect(ArkTreeViewNodeCheckboxIndicator).toBeDefined()
    expect(ArkTreeViewNodeRenameInput).toBeDefined()
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

  it('part directives apply tree, label, branch, and item props from provider context', () => {
    @Component({
      standalone: true,
      imports: [
        ArkTreeViewRoot,
        ArkTreeViewTree,
        ArkTreeViewLabel,
        ArkTreeViewNodeProvider,
        ArkTreeViewBranch,
        ArkTreeViewBranchControl,
        ArkTreeViewBranchTrigger,
        ArkTreeViewBranchText,
        ArkTreeViewBranchIndicator,
        ArkTreeViewBranchContent,
        ArkTreeViewBranchIndentGuide,
        ArkTreeViewItem,
        ArkTreeViewItemText,
        ArkTreeViewItemIndicator,
      ],
      template: `
        <div
          arkTreeView
          [collection]="collection"
          [defaultExpandedValue]="['src']"
          [defaultSelectedValue]="['package.json']"
        >
          <h3 arkTreeViewLabel>Files</h3>
          <div arkTreeViewTree>
            <ng-container arkTreeViewNodeProvider [node]="branch" [indexPath]="[0]">
              <div arkTreeViewBranch>
                <div arkTreeViewBranchControl>
                  <span arkTreeViewBranchIndicator></span>
                  <span arkTreeViewBranchText>src</span>
                  <button arkTreeViewBranchTrigger type="button">toggle</button>
                </div>
                <div arkTreeViewBranchContent>
                  <span arkTreeViewBranchIndentGuide></span>
                </div>
              </div>
            </ng-container>
            <ng-container arkTreeViewNodeProvider [node]="item" [indexPath]="[1]">
              <div arkTreeViewItem>
                <span arkTreeViewItemIndicator></span>
                <span arkTreeViewItemText>package.json</span>
              </div>
            </ng-container>
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly branch = requireNode('src')
      readonly item = requireNode('package.json')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const label = fixture.nativeElement.querySelector('[data-part="label"]') as HTMLElement
    const tree = fixture.nativeElement.querySelector('[data-part="tree"]') as HTMLElement
    const branch = fixture.nativeElement.querySelector('[data-part="branch"]') as HTMLElement
    const branchControl = fixture.nativeElement.querySelector('[data-part="branch-control"]') as HTMLElement
    const branchContent = fixture.nativeElement.querySelector('[data-part="branch-content"]') as HTMLElement
    const item = fixture.nativeElement.querySelector('[data-part="item"]') as HTMLElement
    const itemIndicator = fixture.nativeElement.querySelector('[data-part="item-indicator"]') as HTMLElement

    expect(label.id).toBeTruthy()
    expect(tree.getAttribute('role')).toBe('tree')
    expect(branch.getAttribute('data-state')).toBe('open')
    expect(branchControl.getAttribute('data-value')).toBe('src')
    expect(branchContent.hidden).toBe(false)
    expect(item.getAttribute('aria-selected')).toBe('true')
    expect(itemIndicator.hidden).toBe(false)

    fixture.destroy()
  })

  it('supports explicit node and indexPath inputs without a node provider', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRoot, ArkTreeViewItem, ArkTreeViewItemText],
      template: `
        <div arkTreeView [collection]="collection">
          <div arkTreeViewItem [node]="item" [indexPath]="[1]">
            <span arkTreeViewItemText [node]="item" [indexPath]="[1]">package.json</span>
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly item = requireNode('package.json')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const item = fixture.nativeElement.querySelector('[data-part="item"]') as HTMLElement
    const itemText = fixture.nativeElement.querySelector('[data-part="item-text"]') as HTMLElement

    expect(item.getAttribute('data-value')).toBe('package.json')
    expect(itemText.getAttribute('data-part')).toBe('item-text')

    fixture.destroy()
  })

  it('toggles branch expansion and content visibility through branch trigger clicks', () => {
    @Component({
      standalone: true,
      imports: [
        ArkTreeViewRoot,
        ArkTreeViewNodeProvider,
        ArkTreeViewBranch,
        ArkTreeViewBranchTrigger,
        ArkTreeViewBranchContent,
      ],
      template: `
        <div arkTreeView [collection]="collection" (expandedValueChange)="expandedValues.push($event)">
          <ng-container arkTreeViewNodeProvider [node]="branch" [indexPath]="[0]">
            <div arkTreeViewBranch>
              <button arkTreeViewBranchTrigger type="button">toggle</button>
              <div arkTreeViewBranchContent>content</div>
            </div>
          </ng-container>
        </div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly branch = requireNode('src')
      readonly expandedValues: string[][] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const trigger = fixture.nativeElement.querySelector('[data-part="branch-trigger"]') as HTMLButtonElement
    const content = fixture.nativeElement.querySelector('[data-part="branch-content"]') as HTMLElement

    expect(trigger.getAttribute('data-state')).toBe('closed')
    expect(content.hidden).toBe(true)

    trigger.click()
    fixture.detectChanges()

    expect(fixture.componentInstance.expandedValues).toEqual([['src']])
    expect(trigger.getAttribute('data-state')).toBe('open')
    expect(content.hidden).toBe(false)

    trigger.click()
    fixture.detectChanges()

    expect(fixture.componentInstance.expandedValues).toEqual([['src'], []])
    expect(trigger.getAttribute('data-state')).toBe('closed')
    expect(content.hidden).toBe(true)

    fixture.destroy()
  })

  it('updates selection and checked state through item and node checkbox parts', () => {
    @Component({
      standalone: true,
      imports: [
        ArkTreeViewRoot,
        ArkTreeViewNodeProvider,
        ArkTreeViewItem,
        ArkTreeViewItemIndicator,
        ArkTreeViewItemText,
        ArkTreeViewNodeCheckbox,
        ArkTreeViewNodeCheckboxIndicator,
      ],
      template: `
        <div
          arkTreeView
          [collection]="collection"
          [defaultCheckedValue]="[]"
          (selectedValueChange)="selectedValues.push($event)"
          (checkedValueChange)="checkedValues.push($event)"
        >
          <ng-container arkTreeViewNodeProvider [node]="item" [indexPath]="[1]">
            <div arkTreeViewItem>
              <span arkTreeViewNodeCheckbox>
                <span arkTreeViewNodeCheckboxIndicator state="checked">checked</span>
                <span arkTreeViewNodeCheckboxIndicator state="unchecked">unchecked</span>
              </span>
              <span arkTreeViewItemIndicator>selected</span>
              <span arkTreeViewItemText>package.json</span>
            </div>
          </ng-container>
        </div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly item = requireNode('package.json')
      readonly selectedValues: string[][] = []
      readonly checkedValues: string[][] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const item = fixture.nativeElement.querySelector('[data-part="item"]') as HTMLElement
    const checkbox = fixture.nativeElement.querySelector('[data-part="node-checkbox"]') as HTMLElement
    const selectedIndicator = fixture.nativeElement.querySelector('[data-part="item-indicator"]') as HTMLElement
    const checkedIndicator = fixture.nativeElement.querySelector(
      '[arkTreeViewNodeCheckboxIndicator][state="checked"]',
    ) as HTMLElement
    const uncheckedIndicator = fixture.nativeElement.querySelector(
      '[arkTreeViewNodeCheckboxIndicator][state="unchecked"]',
    ) as HTMLElement

    expect(selectedIndicator.hidden).toBe(true)
    expect(checkbox.getAttribute('aria-checked')).toBe('false')
    expect(checkedIndicator.hidden).toBe(true)
    expect(uncheckedIndicator.hidden).toBe(false)

    item.click()
    fixture.detectChanges()

    expect(fixture.componentInstance.selectedValues).toEqual([['package.json']])
    expect(item.getAttribute('aria-selected')).toBe('true')
    expect(selectedIndicator.hidden).toBe(false)

    checkbox.click()
    fixture.detectChanges()

    expect(fixture.componentInstance.checkedValues).toEqual([['package.json']])
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
    expect(checkedIndicator.hidden).toBe(false)
    expect(uncheckedIndicator.hidden).toBe(true)

    fixture.destroy()
  })

  it('submits rename input changes through node rename input props', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRoot, ArkTreeViewNodeProvider, ArkTreeViewItem, ArkTreeViewNodeRenameInput],
      template: `
        <div
          arkTreeView
          [collection]="collection"
          [canRename]="canRename"
          (renameStart)="renameStarts.push($event.value)"
          (renameComplete)="renameCompletions.push($event.label)"
        >
          <ng-container arkTreeViewNodeProvider [node]="item" [indexPath]="[1]">
            <div arkTreeViewItem></div>
            <input arkTreeViewNodeRenameInput />
          </ng-container>
        </div>
      `,
    })
    class Host {
      readonly collection = collection
      readonly item = requireNode('package.json')
      readonly canRename = () => true
      readonly renameStarts: string[] = []
      readonly renameCompletions: string[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTreeViewRoot)).injector.get(ArkTreeViewRoot<Node>)
    const input = fixture.nativeElement.querySelector('[data-part="node-rename-input"]') as HTMLInputElement

    expect(input.hidden).toBe(true)

    root.api().startRenaming('package.json')
    fixture.detectChanges()

    expect(fixture.componentInstance.renameStarts).toEqual(['package.json'])
    expect(input.hidden).toBe(false)

    input.value = 'package-lock.json'
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    fixture.detectChanges()

    expect(fixture.componentInstance.renameCompletions).toEqual(['package-lock.json'])
    expect(input.hidden).toBe(true)

    fixture.destroy()
  })

  it('throws a contextual error when a node part has no node props source', () => {
    @Component({
      standalone: true,
      imports: [ArkTreeViewRoot, ArkTreeViewItem],
      template: '<div arkTreeView [collection]="collection"><div arkTreeViewItem></div></div>',
    })
    class Host {
      readonly collection = collection
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)

    expect(() => fixture.detectChanges()).toThrow(
      'ArkTreeViewItem requires [node] and [indexPath] inputs or an ancestor [arkTreeViewNodeProvider].',
    )

    fixture.destroy()
  })

  it('compiles every story example and renders tree items', () => {
    const examples: Array<Type<unknown>> = [
      TreeViewAsyncLoadingExample,
      TreeViewBasicExample,
      TreeViewCheckboxTreeExample,
      TreeViewControlledExpandedExample,
      TreeViewControlledSelectedExample,
      TreeViewDisabledNodeExample,
      TreeViewExpandCollapseAllExample,
      TreeViewFilteringExample,
      TreeViewLinksExample,
      TreeViewMutationExample,
      TreeViewRenameNodeExample,
      TreeViewRootProviderExample,
    ]

    for (const Example of examples) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [Example] })
      const fixture = TestBed.createComponent(Example)
      fixture.detectChanges()

      expect(fixture.nativeElement.querySelector('[role="tree"]')).toBeTruthy()
      expect(fixture.nativeElement.querySelectorAll('[role="treeitem"]').length).toBeGreaterThan(0)

      fixture.destroy()
    }
  })
})
