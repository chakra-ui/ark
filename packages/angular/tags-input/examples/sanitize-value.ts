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
} from '@ark-ui/angular/tags-input'
import { tagsInputExampleStyles } from '../tags-input-example-styles'

@Component({
  selector: 'tags-input-sanitize-value-example',
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
  ],
  template: `
    <div arkTagsInputRoot #root="arkTagsInputRoot" [sanitizeValue]="sanitizeValue">
      <span arkTagsInputLabel>Email Addresses</span>
      <div arkTagsInputControl>
        @for (tag of root.api().value; track tag; let i = $index) {
          <span arkTagsInputItem [index]="i" [value]="tag">
            <div arkTagsInputItemPreview>
              <span arkTagsInputItemText>{{ tag }}</span>
              <button type="button" arkTagsInputItemDeleteTrigger>x</button>
            </div>
            <input arkTagsInputItemInput />
          </span>
        }
        <input arkTagsInputInput placeholder="Add email" />
        <button type="button" arkTagsInputClearTrigger>x</button>
      </div>
      <input arkTagsInputHiddenInput />
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputSanitizeValueExample {
  readonly sanitizeValue = (value: string) => value.trim().toLowerCase()
}
