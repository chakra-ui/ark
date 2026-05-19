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
  ArkTagsInputRootProvider,
  useTagsInput,
} from '@ark-ui/angular/tags-input'
import { tagsInputExampleStyles } from '../tags-input-example-styles'

@Component({
  selector: 'tags-input-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTagsInputRootProvider,
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
    <div arkTagsInputRootProvider [value]="tagsInput">
      <span arkTagsInputLabel>Tags</span>
      <div arkTagsInputControl>
        @for (tag of tagsInput.api().value; track tag; let i = $index) {
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
export class TagsInputRootProviderExample {
  readonly tagsInput = useTagsInput({ context: () => ({ defaultValue: ['react'] }) })
}
