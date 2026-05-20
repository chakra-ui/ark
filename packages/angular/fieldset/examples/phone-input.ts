import { ChangeDetectionStrategy, Component, type ElementRef, viewChild } from '@angular/core'
import { ArkFieldInput, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkFieldsetLegend, ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkSelectContent,
  ArkSelectControl,
  ArkSelectHiddenSelect,
  ArkSelectIndicator,
  ArkSelectItem,
  ArkSelectItemGroup,
  ArkSelectItemText,
  ArkSelectPositioner,
  ArkSelectRoot,
  ArkSelectTrigger,
  ArkSelectValueText,
} from '@ark-ui/angular/select'
import { fieldsetExampleStyles } from '../fieldset-example-styles'

interface Extension {
  label: string
  value: string
}

@Component({
  selector: 'fieldset-phone-input-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldsetRoot,
    ArkFieldsetLegend,
    ArkFieldRoot,
    ArkFieldInput,
    ArkPortalComponent,
    ArkSelectRoot,
    ArkSelectControl,
    ArkSelectTrigger,
    ArkSelectValueText,
    ArkSelectIndicator,
    ArkSelectPositioner,
    ArkSelectContent,
    ArkSelectItemGroup,
    ArkSelectItem,
    ArkSelectItemText,
    ArkSelectHiddenSelect,
  ],
  template: `
    <fieldset arkFieldsetRoot>
      <legend arkFieldsetLegend (click)="focusInput()">Mobile Number</legend>

      <div class="phone-row">
        <div arkFieldRoot class="phone-extension">
          <div
            arkSelectRoot
            #root="arkSelectRoot"
            [collection]="extensions"
            [defaultValue]="defaultExtension"
            (valueChange)="focusInput()"
          >
            <div arkSelectControl>
              <button arkSelectTrigger>
                <span arkSelectValueText placeholder="+1"></span>
                <span arkSelectIndicator>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </span>
              </button>
            </div>
            <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
              <div arkSelectPositioner>
                <div arkSelectContent>
                  <div arkSelectItemGroup>
                    @for (item of extensions.items; track item.value) {
                      <div arkSelectItem [item]="item">
                        <span arkSelectItemText>{{ item.label }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </ark-portal>
            <select arkSelectHiddenSelect></select>
          </div>
        </div>

        <div arkFieldRoot>
          <input #input arkFieldInput />
        </div>
      </div>
    </fieldset>
  `,
  styles: [fieldsetExampleStyles],
})
export class FieldsetPhoneInputExample {
  readonly extensions: ListCollection<Extension> = createListCollection<Extension>({
    items: [
      { label: '+1', value: '+1' },
      { label: '+44', value: '+44' },
      { label: '+49', value: '+49' },
      { label: '+41', value: '+41' },
    ],
  })
  readonly defaultExtension = ['+1']
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input')

  focusInput(): void {
    setTimeout(() => this.input().nativeElement.focus())
  }
}
