import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkMenuContent, ArkMenuItem, ArkMenuPositioner, ArkMenuRoot, ArkMenuTrigger } from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'

@Component({
  selector: 'menu-controlled-highlight-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMenuRoot, ArkMenuTrigger, ArkMenuPositioner, ArkMenuContent, ArkMenuItem, ArkPortalComponent],
  template: `
    <div arkMenu #root="arkMenu" [(highlightedValue)]="highlighted">
      <button type="button" arkMenuTrigger>Edit</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuItem value="undo">Undo</div>
            <div arkMenuItem value="redo">Redo</div>
            <div arkMenuItem value="cut">Cut</div>
            <div arkMenuItem value="copy">Copy</div>
            <div arkMenuItem value="paste">Paste</div>
          </div>
        </div>
      </ark-portal>
    </div>
    <p>Highlighted: {{ highlighted() ?? 'none' }}</p>
  `,
  styles: [menuExampleStyles],
})
export class MenuControlledHighlightExample {
  readonly highlighted = signal<string | null | undefined>(undefined)
}
