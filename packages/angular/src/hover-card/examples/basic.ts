import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  selector: 'hover-card-basic-example',
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
    <div arkHoverCard #root="arkHoverCard">
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
  `,
  styles: [hoverCardExampleStyles],
})
export class HoverCardBasicExample {}
