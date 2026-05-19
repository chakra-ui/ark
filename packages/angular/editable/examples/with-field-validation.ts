import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkEditableArea,
  ArkEditableInput,
  ArkEditableLabel,
  ArkEditablePreview,
  ArkEditableRoot,
} from '@ark-ui/angular/editable'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import { editableExampleStyles } from '../editable-example-styles'

@Component({
  selector: 'editable-with-field-validation-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
    ArkEditableRoot,
    ArkEditableArea,
    ArkEditableInput,
    ArkEditableLabel,
    ArkEditablePreview,
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <div arkEditableRoot placeholder="Enter your bio">
        <span arkEditableLabel>Bio</span>
        <div arkEditableArea>
          <input arkEditableInput />
          <span arkEditablePreview></span>
        </div>
      </div>
      <span arkFieldHelperText>Click to edit your bio</span>
      <span arkFieldErrorText>Bio is required</span>
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableWithFieldValidationExample {}
