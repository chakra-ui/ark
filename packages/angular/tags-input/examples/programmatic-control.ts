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
  ArkTagsInputRootProvider,
  useTagsInput,
} from '@ark-ui/angular/tags-input'
import { tagsInputExampleStyles } from '../tags-input-example-styles'
import { TagsInputXIcon } from './icons'

@Component({
  selector: 'tags-input-programmatic-control-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTagsInputRootProvider,
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
        <button class="tags-input-button" type="button" (click)="tagsInput.api().addValue('React')">Add React</button>
        <button class="tags-input-button" type="button" (click)="tagsInput.api().addValue('Solid')">Add Solid</button>
        <button class="tags-input-button" type="button" (click)="tagsInput.api().setValue(['Vue', 'Svelte'])">
          Set to Vue & Svelte
        </button>
        <button class="tags-input-button" type="button" (click)="tagsInput.api().clearValue()">Clear All</button>
      </div>

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
    </div>
  `,
  styles: [tagsInputExampleStyles],
})
export class TagsInputProgrammaticControlExample {
  readonly tagsInput = useTagsInput({ context: () => ({}) })
}
