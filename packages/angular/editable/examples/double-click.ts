import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkEditableArea,
  ArkEditableInput,
  ArkEditableLabel,
  ArkEditablePreview,
  ArkEditableRoot,
} from '@ark-ui/angular/editable'
import { editableExampleStyles } from '../editable-example-styles'

@Component({
  selector: 'editable-double-click-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditableLabel, ArkEditablePreview],
  template: `
    <div arkEditableRoot defaultValue="Double-click to edit" activationMode="dblclick">
      <span arkEditableLabel>Label</span>
      <div arkEditableArea>
        <input arkEditableInput />
        <span arkEditablePreview></span>
      </div>
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableDoubleClickExample {}
