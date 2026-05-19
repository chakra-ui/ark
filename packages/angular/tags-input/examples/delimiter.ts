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

const DELIMITER_PATTERN = /[,;\s]/

@Component({
  selector: 'tags-input-delimiter-example',
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
    <div arkTagsInputRoot #root="arkTagsInputRoot" [delimiter]="delimiter">
      <span arkTagsInputLabel>Frameworks (add with comma, semicolon, or space)</span>
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
        <input arkTagsInputInput placeholder="Add tag" />
        <button type="button" arkTagsInputClearTrigger>x</button>
      </div>
      <input arkTagsInputHiddenInput />
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputDelimiterExample {
  readonly delimiter = DELIMITER_PATTERN
}
