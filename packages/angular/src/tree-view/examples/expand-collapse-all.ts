import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  type UseTreeViewApi,
} from '@ark-ui/angular/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewChevronRightIcon, TreeViewFileIcon, TreeViewFolderIcon, TreeViewFolderOpenIcon } from './_icons'
import { childIndexPath, fileTreeCollection, type FileTreeNode } from './_tree-data'

@Component({
  selector: 'tree-view-expand-collapse-all-example',
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
    <div arkTreeView [collection]="collection" #treeView="arkTreeView">
      <div class="toolbar">
        <button type="button" (click)="toggleExpanded(treeView.api())">
          {{ isAllExpanded(treeView.api()) ? 'Collapse all' : 'Expand all' }}
        </button>
      </div>

      <div arkTreeViewTree>
        @for (node of collection.rootNode.children ?? []; track node.id; let index = $index) {
          <ng-container
            [ngTemplateOutlet]="nodeTemplate"
            [ngTemplateOutletContext]="{ $implicit: node, indexPath: [index] }"
          />
        }
      </div>
    </div>

    <ng-template #nodeTemplate let-node let-indexPath="indexPath">
      <ng-container
        arkTreeViewNodeProvider
        [node]="node"
        [indexPath]="indexPath"
        #nodeProvider="arkTreeViewNodeProvider"
      >
        @if (node.children?.length) {
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
              @for (child of node.children; track child.id; let childIndex = $index) {
                <ng-container
                  [ngTemplateOutlet]="nodeTemplate"
                  [ngTemplateOutletContext]="{
                    $implicit: child,
                    indexPath: childIndexPath(indexPath, childIndex),
                  }"
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
export class TreeViewExpandCollapseAllExample {
  readonly collection = fileTreeCollection
  readonly childIndexPath = childIndexPath

  isAllExpanded(api: UseTreeViewApi<FileTreeNode>): boolean {
    const branchValues = api.collection.getBranchValues()
    return branchValues.length > 0 && branchValues.every((value) => api.expandedValue.includes(value))
  }

  toggleExpanded(api: UseTreeViewApi<FileTreeNode>): void {
    if (this.isAllExpanded(api)) {
      api.collapse()
    } else {
      api.expand()
    }
  }
}
