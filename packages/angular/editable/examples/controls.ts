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
import { EditableCheckIcon, EditablePencilIcon, EditableXIcon } from './icons'

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
    EditableCheckIcon,
    EditablePencilIcon,
    EditableXIcon,
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
          <button arkEditableSubmitTrigger aria-label="Save">
            <editable-check-icon />
          </button>
          <button arkEditableCancelTrigger aria-label="Cancel">
            <editable-x-icon />
          </button>
        } @else {
          <button arkEditableEditTrigger aria-label="Edit">
            <editable-pencil-icon />
          </button>
        }
      </div>
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableControlsExample {}
