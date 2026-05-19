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
} from '@ark-ui/angular/src/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewChevronRightIcon, TreeViewFileIcon, TreeViewFolderIcon, TreeViewFolderOpenIcon } from './_icons'
import { childIndexPath, fileTreeCollection, type FileTreeNode } from './_tree-data'

@Component({
  selector: 'tree-view-filtering-example',
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
    TreeViewFileIcon,
    TreeViewFolderIcon,
    TreeViewFolderOpenIcon,
  ],
  template: `
    <input class="filter-input" placeholder="Search" (input)="filter($any($event.target).value)" />
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
              <span arkTreeViewBranchText>
                @if (nodeProvider.nodeState().expanded) {
                  <tree-view-folder-open-icon />
                } @else {
                  <tree-view-folder-icon />
                }
                {{ node.name }}
              </span>
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
            <span arkTreeViewItemText>
              <tree-view-file-icon />
              {{ node.name }}
            </span>
          </div>
        }
      </ng-container>
    </ng-template>
  `,
  styles: [treeViewExampleStyles],
})
export class TreeViewFilteringExample {
  readonly collection = signal(fileTreeCollection)
  readonly childIndexPath = childIndexPath

  filter(value: string): void {
    const needle = value.trim().toLocaleLowerCase()
    this.collection.set(
      needle
        ? fileTreeCollection.filter((node: FileTreeNode) => node.name.toLocaleLowerCase().includes(needle))
        : fileTreeCollection,
    )
  }
}
