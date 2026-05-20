import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkTagsInputControl,
  ArkTagsInputClearTrigger,
  ArkTagsInputHiddenInput,
  ArkTagsInputInput,
  ArkTagsInputItem,
  ArkTagsInputItemDeleteTrigger,
  ArkTagsInputItemInput,
  ArkTagsInputItemPreview,
  ArkTagsInputItemText,
  ArkTagsInputLabel,
  ArkTagsInputRootProvider,
  useTagsInput,
} from '@ark-ui/angular/tags-input'
import { tagsInputExampleStyles } from '../tags-input-example-styles'
import { TagsInputXIcon } from './icons'

@Component({
  selector: 'tags-input-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTagsInputRootProvider,
    JsonPipe,
    ArkTagsInputLabel,
    ArkTagsInputControl,
    ArkTagsInputClearTrigger,
    ArkTagsInputInput,
    ArkTagsInputHiddenInput,
    ArkTagsInputItem,
    ArkTagsInputItemInput,
    ArkTagsInputItemPreview,
    ArkTagsInputItemText,
    ArkTagsInputItemDeleteTrigger,
    TagsInputXIcon,
  ],
  template: `
    <div class="tags-input-stack">
      <div arkTagsInputRootProvider [value]="tagsInput">
        <span arkTagsInputLabel>Frameworks</span>
        <div arkTagsInputControl>
          @for (tag of tagsInput.api().value; track tag; let i = $index) {
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
      <output class="tags-input-output">values: {{ tagsInput.api().value | json }}</output>
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputRootProviderExample {
  readonly tagsInput = useTagsInput({ context: () => ({}) })
}
