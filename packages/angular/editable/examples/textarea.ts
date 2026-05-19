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
  selector: 'editable-textarea-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditableLabel, ArkEditablePreview],
  template: `
    <div
      arkEditableRoot
      placeholder="Enter a description..."
      defaultValue="Ark UI is a headless component library for building reusable, scalable design systems."
      activationMode="dblclick"
    >
      <span arkEditableLabel>Description</span>
      <div arkEditableArea>
        <textarea arkEditableInput class="textarea"></textarea>
        <span arkEditablePreview class="textarea"></span>
      </div>
      <div class="helper-text">Press Cmd + Enter to save</div>
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableTextareaExample {}
