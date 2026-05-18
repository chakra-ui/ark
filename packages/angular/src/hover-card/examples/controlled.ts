import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkHoverCardArrow,
  ArkHoverCardArrowTip,
  ArkHoverCardContent,
  ArkHoverCardPositioner,
  ArkHoverCardRoot,
  ArkHoverCardTrigger,
} from '@ark-ui/angular/hover-card'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { hoverCardExampleStyles } from '../hover-card-example-styles'

@Component({
  selector: 'hover-card-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkHoverCardRoot,
    ArkHoverCardTrigger,
    ArkHoverCardPositioner,
    ArkHoverCardContent,
    ArkHoverCardArrow,
    ArkHoverCardArrowTip,
    ArkPortalComponent,
  ],
  template: `
    <div class="stack">
      <button type="button" (click)="toggle()">Toggle</button>
      <div arkHoverCard #root="arkHoverCard" [(open)]="open">
        <a arkHoverCardTrigger href="#profile">&#64;sarah_chen</a>
        <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
          <div arkHoverCardPositioner>
            <div arkHoverCardContent>
              <div arkHoverCardArrow>
                <div arkHoverCardArrowTip></div>
              </div>
              <p>Sarah Chen — Design Engineer at Acme Inc.</p>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [hoverCardExampleStyles],
})
export class HoverCardControlledExample {
  readonly open = signal<boolean | undefined>(false)
  toggle() {
    this.open.set(!this.open())
  }
}
