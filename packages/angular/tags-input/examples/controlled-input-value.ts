import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'tags-input-controlled-input-value-example',
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
    <div class="tags-input-stack">
      <div class="tags-input-toolbar">
        <button class="tags-input-button" type="button" (click)="inputValue.set('React')">Set to "React"</button>
        <button class="tags-input-button" type="button" (click)="inputValue.set('')">Clear Input</button>
        <span class="tags-input-output">Current: "{{ inputValue() }}"</span>
      </div>

      <div arkTagsInputRoot #root="arkTagsInputRoot" [(inputValue)]="inputValue">
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
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputControlledInputValueExample {
  readonly inputValue = signal('')
}
