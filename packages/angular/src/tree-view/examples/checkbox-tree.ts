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
  ArkTreeViewNodeCheckbox,
  ArkTreeViewNodeCheckboxIndicator,
  ArkTreeViewNodeProvider,
  ArkTreeViewRoot,
  ArkTreeViewTree,
} from '@ark-ui/angular/tree-view'
import { treeViewExampleStyles } from '../tree-view-example-styles'
import { TreeViewCheckIcon, TreeViewChevronRightIcon, TreeViewMinusIcon } from './_icons'
import { childIndexPath, fileTreeCollection } from './_tree-data'

@Component({
  selector: 'tree-view-checkbox-tree-example',
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
    ArkTreeViewNodeCheckbox,
    ArkTreeViewNodeCheckboxIndicator,
    TreeViewChevronRightIcon,
    TreeViewCheckIcon,
    TreeViewMinusIcon,
  ],
  template: `
    <div arkTreeView [collection]="collection" [defaultCheckedValue]="[]">
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

    <ng-template #checkboxTemplate>
      <span arkTreeViewNodeCheckbox>
        <span arkTreeViewNodeCheckboxIndicator state="checked"><tree-view-check-icon /></span>
        <span arkTreeViewNodeCheckboxIndicator state="indeterminate"><tree-view-minus-icon /></span>
      </span>
    </ng-template>

    <ng-template #nodeTemplate let-node let-indexPath="indexPath">
      <ng-container arkTreeViewNodeProvider [node]="node" [indexPath]="indexPath">
        @if (node.children?.length) {
          <div arkTreeViewBranch>
            <div arkTreeViewBranchControl>
              <span arkTreeViewBranchIndicator><tree-view-chevron-right-icon /></span>
              <ng-container [ngTemplateOutlet]="checkboxTemplate" />
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
                  }"
                />
              }
            </div>
          </div>
        } @else {
          <div arkTreeViewItem>
            <ng-container [ngTemplateOutlet]="checkboxTemplate" />
            <span arkTreeViewItemText>{{ node.name }}</span>
          </div>
        }
      </ng-container>
    </ng-template>
  `,
  styles: [treeViewExampleStyles],
})
export class TreeViewCheckboxTreeExample {
  readonly collection = fileTreeCollection
  readonly childIndexPath = childIndexPath
}
