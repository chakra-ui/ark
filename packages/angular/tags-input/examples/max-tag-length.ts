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
  selector: 'tags-input-max-tag-length-example',
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
    <div arkTagsInputRoot #root="arkTagsInputRoot" [maxLength]="10">
      <span arkTagsInputLabel>Frameworks (Max 10 characters)</span>
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
        <input arkTagsInputInput placeholder="Add Framework" />
        <button type="button" arkTagsInputClearTrigger>x</button>
      </div>
      <input arkTagsInputHiddenInput />
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputMaxTagLengthExample {}
