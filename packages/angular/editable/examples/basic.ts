import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkEditableArea,
  ArkEditableControl,
  ArkEditableEditTrigger,
  ArkEditableInput,
  ArkEditableLabel,
  ArkEditablePreview,
  ArkEditableRoot,
} from '@ark-ui/angular/editable'
import { editableExampleStyles } from '../editable-example-styles'

@Component({
  selector: 'editable-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkEditableRoot,
    ArkEditableArea,
    ArkEditableControl,
    ArkEditableEditTrigger,
    ArkEditableInput,
    ArkEditableLabel,
    ArkEditablePreview,
  ],
  template: `
    <div arkEditableRoot placeholder="Enter text..." defaultValue="Hello World">
      <span arkEditableLabel>Label</span>
      <div arkEditableArea>
        <input arkEditableInput />
        <span arkEditablePreview></span>
      </div>
      <div arkEditableControl>
        <button arkEditableEditTrigger>Edit</button>
      </div>
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableBasicExample {}
