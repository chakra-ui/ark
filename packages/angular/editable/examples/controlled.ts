import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'editable-controlled-example',
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
    <div arkEditableRoot [(value)]="value" placeholder="Enter text...">
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
export class EditableControlledExample {
  readonly value = signal<string | undefined>('Hello World')
}
