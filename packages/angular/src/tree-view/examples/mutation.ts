import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkTreeViewBranch,
  ArkTreeViewBranchContent,
  ArkTreeViewBranchControl,
  ArkTreeViewBranchIndentGuide,
  ArkTreeViewBranchIndicator,
  ArkTreeViewBranchText,
  ArkTreeViewItem,
  ArkTreeViewItemText,
  ArkTreeViewNodeProvider,
  ArkTreeViewRoot,
  ArkTreeViewTree,
  type TreeViewNodeProps,
} from '@ark-ui/angular/src/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewChevronRightIcon, TreeViewPlusIcon, TreeViewTrashIcon } from './_icons'
import { addNode, childIndexPath, fileTreeCollection, removeNode, type FileTreeNode } from './_tree-data'

@Component({
  selector: 'tree-view-mutation-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ArkTreeViewRoot,
    ArkTreeViewTree,
    ArkTreeViewNodeProvider,
    ArkTreeViewBranch,
    ArkTreeViewBranchControl,
    ArkTreeViewBranchIndicator,
    ArkTreeViewBranchText,
    ArkTreeViewBranchContent,
    ArkTreeViewBranchIndentGuide,
    ArkTreeViewItem,
    ArkTreeViewItemText,
    TreeViewChevronRightIcon,
    TreeViewPlusIcon,
    TreeViewTrashIcon,
  ],
  template: `
    <div arkTreeView [collection]="collection()" #treeView="arkTreeView">
      <div arkTreeViewTree>
        @for (node of collection().rootNode.children ?? []; track node.id; let index = $index) {
          <ng-container
            [ngTemplateOutlet]="nodeTemplate"
            [ngTemplateOutletContext]="{
              $implicit: node,
              indexPath: [index],
              treeViewInjector: treeView.getContextCarrier().elementInjector,
            }"
            [ngTemplateOutletInjector]="treeView.getContextCarrier().elementInjector"
          />
        }
      </div>
    </div>

    <ng-template #actionsTemplate let-node let-indexPath="indexPath">
      <div class="action-group">
        <button class="action" type="button" aria-label="Remove {{ node.name }}" (click)="remove(indexPath, $event)">
          <tree-view-trash-icon />
        </button>
        @if (isBranch(node)) {
          <button
            class="action"
            type="button"
            aria-label="Add child to {{ node.name }}"
            (click)="add(indexPath, $event)"
          >
            <tree-view-plus-icon />
          </button>
        }
      </div>
    </ng-template>

    <ng-template #nodeTemplate let-node let-indexPath="indexPath" let-treeViewInjector="treeViewInjector">
      <ng-container
        arkTreeViewNodeProvider
        [node]="node"
        [indexPath]="indexPath"
        #nodeProvider="arkTreeViewNodeProvider"
      >
        @if (nodeProvider.nodeState().isBranch) {
          <div arkTreeViewBranch>
            <div arkTreeViewBranchControl>
              <span arkTreeViewBranchIndicator><tree-view-chevron-right-icon /></span>
              <span arkTreeViewBranchText>{{ node.name }}</span>
              <ng-container
                [ngTemplateOutlet]="actionsTemplate"
                [ngTemplateOutletContext]="{ $implicit: node, node: node, indexPath: indexPath }"
              />
            </div>
            <div arkTreeViewBranchContent>
              <span arkTreeViewBranchIndentGuide></span>
              @for (child of node.children ?? []; track child.id; let childIndex = $index) {
                <ng-container
                  [ngTemplateOutlet]="nodeTemplate"
                  [ngTemplateOutletContext]="{
                    $implicit: child,
                    indexPath: childIndexPath(indexPath, childIndex),
                    treeViewInjector,
                  }"
                  [ngTemplateOutletInjector]="treeViewInjector"
                />
              }
            </div>
          </div>
        } @else {
          <div arkTreeViewItem>
            <span arkTreeViewItemText>{{ node.name }}</span>
            <ng-container
              [ngTemplateOutlet]="actionsTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, indexPath: indexPath }"
            />
          </div>
        }
      </ng-container>
    </ng-template>
  `,
  styles: [treeViewExampleStyles],
})
export class TreeViewMutationExample {
  readonly collection = signal(fileTreeCollection)
  readonly childIndexPath = childIndexPath

  isBranch(node: FileTreeNode): boolean {
    return this.collection().isBranchNode(node)
  }

  remove(indexPath: TreeViewNodeProps['indexPath'], event: Event): void {
    event.stopPropagation()
    this.collection.update((collection) => removeNode(collection, indexPath))
  }

  add(indexPath: TreeViewNodeProps['indexPath'], event: Event): void {
    event.stopPropagation()
    this.collection.update((collection) => addNode(collection, indexPath))
  }
}
