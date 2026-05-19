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
  ArkTreeViewLabel,
  ArkTreeViewNodeProvider,
  ArkTreeViewNodeRenameInput,
  ArkTreeViewRoot,
  ArkTreeViewTree,
  type TreeViewRenameCompleteDetails,
} from '@ark-ui/angular/src/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewChevronRightIcon, TreeViewFileIcon, TreeViewFolderIcon, TreeViewFolderOpenIcon } from './_icons'
import { childIndexPath, fileTreeCollection, replaceNodeName, type FileTreeNode } from './_tree-data'

@Component({
  selector: 'tree-view-rename-node-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ArkTreeViewRoot,
    ArkTreeViewLabel,
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
    ArkTreeViewNodeRenameInput,
    TreeViewChevronRightIcon,
    TreeViewFileIcon,
    TreeViewFolderIcon,
    TreeViewFolderOpenIcon,
  ],
  template: `
    <div
      arkTreeView
      [collection]="collection()"
      [canRename]="canRename"
      (renameComplete)="handleRenameComplete($event)"
    >
      <h3 arkTreeViewLabel>Tree (press F2 to rename)</h3>
      <div arkTreeViewTree>
        @for (node of collection().rootNode.children ?? []; track node.id; let index = $index) {
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
              @if (nodeProvider.nodeState().renaming) {
                <input arkTreeViewNodeRenameInput />
              } @else {
                <span arkTreeViewBranchText>
                  @if (nodeProvider.nodeState().expanded) {
                    <tree-view-folder-open-icon />
                  } @else {
                    <tree-view-folder-icon />
                  }
                  {{ node.name }}
                </span>
              }
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
            <tree-view-file-icon />
            @if (nodeProvider.nodeState().renaming) {
              <input arkTreeViewNodeRenameInput />
            } @else {
              <span arkTreeViewItemText>{{ node.name }}</span>
            }
          </div>
        }
      </ng-container>
    </ng-template>
  `,
  styles: [treeViewExampleStyles],
})
export class TreeViewRenameNodeExample {
  readonly collection = signal(fileTreeCollection)
  readonly childIndexPath = childIndexPath
  readonly canRename = () => true

  handleRenameComplete(details: TreeViewRenameCompleteDetails): void {
    this.collection.update((collection) => replaceNodeName(collection, details.indexPath, details.label))
  }
}
