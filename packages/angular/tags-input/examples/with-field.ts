import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import {
  ArkTagsInputClearTrigger,
  ArkTagsInputControl,
  ArkTagsInputHiddenInput,
  ArkTagsInputInput,
  ArkTagsInputItem,
  ArkTagsInputItemDeleteTrigger,
  ArkTagsInputItemInput,
  ArkTagsInputItemPreview,
  ArkTagsInputItemText,
  ArkTagsInputLabel,
  ArkTagsInputRoot,
} from '@ark-ui/angular/tags-input'
import { tagsInputExampleStyles } from '../tags-input-example-styles'
import { TagsInputXIcon } from './icons'

@Component({
  selector: 'tags-input-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
    ArkTagsInputRoot,
    ArkTagsInputLabel,
    ArkTagsInputControl,
    ArkTagsInputInput,
    ArkTagsInputHiddenInput,
    ArkTagsInputItem,
    ArkTagsInputItemInput,
    ArkTagsInputItemPreview,
    ArkTagsInputItemText,
    ArkTagsInputItemDeleteTrigger,
    ArkTagsInputClearTrigger,
    TagsInputXIcon,
  ],
  template: `
    <div arkFieldRoot>
      <div arkTagsInputRoot #root="arkTagsInputRoot">
        <span arkTagsInputLabel>Frameworks</span>
        <div arkTagsInputControl>
          @for (tag of root.api().value; track tag; let i = $index) {
            <span arkTagsInputItem [index]="i" [value]="tag">
              <div arkTagsInputItemPreview>
                <span arkTagsInputItemText>{{ tag }}</span>
                <button type="button" arkTagsInputItemDeleteTrigger>
                  <tags-input-x-icon />
                </button>
              </div>
              <input arkTagsInputItemInput />
            </span>
          }
          <input arkTagsInputInput placeholder="Add Framework" />
          <button type="button" arkTagsInputClearTrigger>
            <tags-input-x-icon />
          </button>
        </div>
        <input arkTagsInputHiddenInput />
      </div>
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputWithFieldExample {}
