import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkEditableArea,
  ArkEditableControl,
  ArkEditableEditTrigger,
  ArkEditableInput,
  ArkEditableLabel,
  ArkEditablePreview,
  ArkEditableRootProvider,
  useEditable,
} from '@ark-ui/angular/editable'
import { editableExampleStyles } from '../editable-example-styles'
import { EditablePencilIcon } from './icons'

@Component({
  selector: 'editable-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkEditableRootProvider,
    ArkEditableArea,
    ArkEditableControl,
    ArkEditableEditTrigger,
    ArkEditableInput,
    ArkEditableLabel,
    ArkEditablePreview,
    EditablePencilIcon,
  ],
  template: `
    <div arkEditableRootProvider [value]="editable">
      <span arkEditableLabel>Label</span>
      <div arkEditableArea>
        <input arkEditableInput />
        <span arkEditablePreview></span>
      </div>
      <div arkEditableControl>
        <button arkEditableEditTrigger aria-label="Edit">
          <editable-pencil-icon />
        </button>
      </div>
    </div>
  `,
  styles: [editableExampleStyles],
})
export class EditableRootProviderExample {
  readonly editable = useEditable({ context: () => ({ defaultValue: 'Hello World' }) })
}
