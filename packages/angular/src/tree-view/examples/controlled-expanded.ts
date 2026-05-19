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
  ArkTreeViewRoot,
  ArkTreeViewTree,
} from '@ark-ui/angular/src/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewChevronRightIcon, TreeViewFileIcon, TreeViewFolderIcon, TreeViewFolderOpenIcon } from './_icons'
import { childIndexPath, fileTreeCollection } from './_tree-data'

@Component({
  selector: 'tree-view-controlled-expanded-example',
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
    TreeViewChevronRightIcon,
    TreeViewFileIcon,
    TreeViewFolderIcon,
    TreeViewFolderOpenIcon,
  ],
  template: `
    <div arkTreeView [collection]="collection" [(expandedValue)]="expandedValue">
      <h3 arkTreeViewLabel>Tree</h3>
      <div arkTreeViewTree>
        @for (node of collection.rootNode.children ?? []; track node.id; let index = $index) {
          <ng-container
            [ngTemplateOutlet]="nodeTemplate"
            [ngTemplateOutletContext]="{ $implicit: node, indexPath: [index] }"
          />
        }
      </div>
    </div>
    <output>expanded: {{ expandedValue()?.join(', ') || 'none' }}</output>

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
export class TreeViewControlledExpandedExample {
  readonly collection = fileTreeCollection
  readonly expandedValue = signal<string[] | undefined>(['node_modules'])
  readonly childIndexPath = childIndexPath
}
