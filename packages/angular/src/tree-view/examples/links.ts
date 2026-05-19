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
  ArkTreeViewLabel,
  ArkTreeViewNodeProvider,
  ArkTreeViewRoot,
  ArkTreeViewTree,
} from '@ark-ui/angular/src/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewChevronRightIcon, TreeViewExternalLinkIcon, TreeViewFileIcon } from './_icons'
import { childIndexPath, docsTreeCollection } from './_tree-data'

@Component({
  selector: 'tree-view-links-example',
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
    TreeViewExternalLinkIcon,
    TreeViewFileIcon,
  ],
  template: `
    <div arkTreeView [collection]="collection" #treeView="arkTreeView">
      <h3 arkTreeViewLabel>Docs</h3>
      <div arkTreeViewTree>
        @for (node of collection.rootNode.children ?? []; track node.id; let index = $index) {
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
      <ng-container arkTreeViewNodeProvider [node]="node" [indexPath]="indexPath">
        @if (node.children?.length) {
          <div arkTreeViewBranch>
            <div arkTreeViewBranchControl>
              <span arkTreeViewBranchIndicator><tree-view-chevron-right-icon /></span>
              <span arkTreeViewBranchText>{{ node.name }}</span>
            </div>
            <div arkTreeViewBranchContent>
              <span arkTreeViewBranchIndentGuide></span>
              @for (child of node.children; track child.id; let childIndex = $index) {
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
          <a arkTreeViewItem [href]="node.href">
            <span arkTreeViewItemText>
              <tree-view-file-icon />
              {{ node.name }}
            </span>
            @if (node.href?.startsWith('http')) {
              <tree-view-external-link-icon />
            }
          </a>
        }
      </ng-container>
    </ng-template>
  `,
  styles: [treeViewExampleStyles],
})
export class TreeViewLinksExample {
  readonly collection = docsTreeCollection
  readonly childIndexPath = childIndexPath
}
