import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  type TagsInputValidateArgs,
} from '@ark-ui/angular/tags-input'
import { tagsInputExampleStyles } from '../tags-input-example-styles'
import { TagsInputXIcon } from './icons'

const TAG_PATTERN = /^[a-zA-Z0-9-]+$/

@Component({
  selector: 'tags-input-validation-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    <div arkTagsInputRoot #root="arkTagsInputRoot" [validate]="validateTag">
      <span arkTagsInputLabel>Frameworks (Min 3 chars, alphanumeric)</span>
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
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputValidationExample {
  readonly validateTag = ({ value, inputValue }: TagsInputValidateArgs) =>
    Boolean(inputValue?.trim()) && !value.includes(inputValue) && inputValue.length >= 3 && TAG_PATTERN.test(inputValue)
}
