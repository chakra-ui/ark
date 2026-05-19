import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'tags-input-controlled-example',
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
    <div arkTagsInputRoot [(value)]="value">
      <span arkTagsInputLabel>Tags</span>
      <div arkTagsInputControl>
        @for (tag of value(); track tag; let i = $index) {
          <span arkTagsInputItem [index]="i" [value]="tag">
            <div arkTagsInputItemPreview>
              <span arkTagsInputItemText>{{ tag }}</span>
              <button type="button" arkTagsInputItemDeleteTrigger>x</button>
            </div>
            <input arkTagsInputItemInput />
          </span>
        }
        <input arkTagsInputInput placeholder="Add Framework" />
      </div>
      <input arkTagsInputHiddenInput />
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputControlledExample {
  readonly value = signal<string[] | undefined>(['React', 'Solid'])
}
