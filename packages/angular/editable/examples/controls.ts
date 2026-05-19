import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkEditableArea,
  ArkEditableCancelTrigger,
  ArkEditableControl,
  ArkEditableEditTrigger,
  ArkEditableInput,
  ArkEditableLabel,
  ArkEditablePreview,
  ArkEditableRoot,
  ArkEditableSubmitTrigger,
} from '@ark-ui/angular/editable'
import { editableExampleStyles } from '../editable-example-styles'

@Component({
  selector: 'editable-controls-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkEditableRoot,
    ArkEditableArea,
    ArkEditableCancelTrigger,
    ArkEditableControl,
    ArkEditableEditTrigger,
    ArkEditableInput,
    ArkEditableLabel,
    ArkEditablePreview,
    ArkEditableSubmitTrigger,
  ],
  template: `
    <div arkEditableRoot #editable="arkEditableRoot" defaultValue="Click edit to start">
      <span arkEditableLabel>Label</span>
      <div arkEditableArea>
        <input arkEditableInput />
        <span arkEditablePreview></span>
      </div>
      <div arkEditableControl>
        @if (editable.api().editing) {
          <button arkEditableSubmitTrigger>Save</button>
          <button arkEditableCancelTrigger>Cancel</button>
        } @else {
          <button arkEditableEditTrigger>Edit</button>
        }
      </div>
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableControlsExample {}
