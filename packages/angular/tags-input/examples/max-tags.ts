import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkTagsInputControl,
  ArkTagsInputHiddenInput,
  ArkTagsInputInput,
  ArkTagsInputItem,
  ArkTagsInputItemDeleteTrigger,
  ArkTagsInputItemPreview,
  ArkTagsInputItemText,
  ArkTagsInputLabel,
  ArkTagsInputRoot,
} from '@ark-ui/angular/tags-input'
import { tagsInputExampleStyles } from '../tags-input-example-styles'

@Component({
  selector: 'tags-input-max-tags-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTagsInputRoot,
    ArkTagsInputLabel,
    ArkTagsInputControl,
    ArkTagsInputInput,
    ArkTagsInputHiddenInput,
    ArkTagsInputItem,
    ArkTagsInputItemPreview,
    ArkTagsInputItemText,
    ArkTagsInputItemDeleteTrigger,
  ],
  template: `
    <div arkTagsInputRoot #root="arkTagsInputRoot" [defaultValue]="['react']" [max]="3">
      <span arkTagsInputLabel>Up to 3 tags</span>
      <div arkTagsInputControl>
        @for (tag of root.api().value; track tag; let i = $index) {
          <span arkTagsInputItem [index]="i" [value]="tag">
            <div arkTagsInputItemPreview>
              <span arkTagsInputItemText>{{ tag }}</span>
              <button type="button" arkTagsInputItemDeleteTrigger>x</button>
            </div>
          </span>
        }
        <input arkTagsInputInput placeholder="Add tag" />
      </div>
      <input arkTagsInputHiddenInput />
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputMaxTagsExample {}
