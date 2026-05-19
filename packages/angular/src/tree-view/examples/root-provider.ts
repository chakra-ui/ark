import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
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
  ArkTreeViewRootProvider,
  ArkTreeViewTree,
  useTreeView,
} from '@ark-ui/angular/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewChevronRightIcon, TreeViewFileIcon, TreeViewFolderIcon, TreeViewFolderOpenIcon } from './_icons'
import { childIndexPath, fileTreeCollection, type FileTreeNode } from './_tree-data'

@Component({
  selector: 'tree-view-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ArkTreeViewRootProvider,
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
    <output>selected: {{ treeView.api().selectedValue.join(', ') || 'none' }}</output>
    <div arkTreeViewRootProvider [value]="treeView">
      <h3 arkTreeViewLabel>Root Provider Tree</h3>
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
export class TreeViewRootProviderExample {
  private readonly injector = inject(Injector)
  readonly collection = fileTreeCollection
  readonly childIndexPath = childIndexPath
  readonly treeView = runInInjectionContext(this.injector, () =>
    useTreeView<FileTreeNode>({ context: () => ({ collection: this.collection }) }),
  )
}
