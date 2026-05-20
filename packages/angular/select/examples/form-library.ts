import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkSelectClearTrigger,
  ArkSelectContent,
  ArkSelectControl,
  ArkSelectHiddenSelect,
  ArkSelectIndicator,
  ArkSelectItem,
  ArkSelectItemGroup,
  ArkSelectItemGroupLabel,
  ArkSelectItemIndicator,
  ArkSelectItemText,
  ArkSelectLabel,
  ArkSelectPositioner,
  ArkSelectRoot,
  ArkSelectTrigger,
  ArkSelectValueText,
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

@Component({
  selector: 'select-form-library-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    ArkSelectRoot,
    ArkSelectLabel,
    ArkSelectControl,
    ArkSelectTrigger,
    ArkSelectValueText,
    ArkSelectClearTrigger,
    ArkSelectIndicator,
    ArkSelectPositioner,
    ArkSelectContent,
    ArkSelectItemGroup,
    ArkSelectItemGroupLabel,
    ArkSelectItem,
    ArkSelectItemText,
    ArkSelectItemIndicator,
    ArkSelectHiddenSelect,
  ],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div arkSelectRoot [collection]="collection" [formControl]="control" name="framework">
        <span arkSelectLabel>Framework</span>
        <select arkSelectHiddenSelect></select>
        <div arkSelectControl>
          <button arkSelectTrigger>
            <span arkSelectValueText>Select a Framework</span>
          </button>
          <div class="select-indicators">
            <button arkSelectClearTrigger>×</button>
            <span arkSelectIndicator>▾</span>
          </div>
        </div>
        <div arkSelectPositioner>
          <div arkSelectContent>
            <div arkSelectItemGroup>
              <span arkSelectItemGroupLabel>Frameworks</span>
              @for (item of collection.items; track item) {
                <div arkSelectItem [item]="item">
                  <span arkSelectItemText>{{ item }}</span>
                  <span arkSelectItemIndicator>✓</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <button class="select-button" style="margin-top: 1rem" type="submit">Submit</button>
    </form>
  `,
  styles: [selectExampleStyles],
})
export class SelectFormLibraryExample {
  readonly control = new FormControl<string[] | null>(['React'])
  readonly collection: ListCollection<string> = createListCollection<string>({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })

  onSubmit(): void {
    window.alert(JSON.stringify({ framework: this.control.value?.[0] ?? '' }))
  }
}
