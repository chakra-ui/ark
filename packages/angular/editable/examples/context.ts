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
  selector: 'editable-context-example',
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
    <div arkEditableRoot #editable="arkEditableRoot" placeholder="Enter text..." defaultValue="Hello World">
      <span arkEditableLabel>Label</span>
      <div arkEditableArea>
        <input arkEditableInput />
        <span arkEditablePreview></span>
      </div>
      @if (editable.api().editing) {
        <span class="helper-text">Enter to save, Esc to cancel</span>
      } @else {
        <div arkEditableControl>
          <button arkEditableEditTrigger>Edit</button>
        </div>
      }
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableContextExample {}
