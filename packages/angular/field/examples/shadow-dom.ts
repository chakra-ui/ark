import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core'
import { ArkFieldErrorText, ArkFieldInput, ArkFieldLabel, ArkFieldRoot } from '@ark-ui/angular/field'
import { ARK_ENVIRONMENT_TOKEN, type EnvironmentContext } from '@ark-ui/angular/src/providers/environment'

@Component({
  selector: 'field-shadow-dom-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [ArkFieldRoot, ArkFieldLabel, ArkFieldInput, ArkFieldErrorText],
  providers: [
    {
      provide: ARK_ENVIRONMENT_TOKEN,
      useFactory: (elementRef: ElementRef<HTMLElement>): EnvironmentContext => ({
        getRootNode: () => elementRef.nativeElement.shadowRoot ?? undefined,
      }),
      deps: [ElementRef],
    },
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <label arkFieldLabel>Email</label>
      <input arkFieldInput placeholder="me@example.com" />
      <span arkFieldErrorText>This is an error text</span>
    </div>
  `,
})
export class FieldShadowDomExample {}
