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
import { HoverCardChevronDownIcon, HoverCardChevronUpIcon } from './icons'

@Component({
  selector: 'hover-card-context-example',
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
    HoverCardChevronDownIcon,
    HoverCardChevronUpIcon,
  ],
  template: `
    <div arkHoverCard #root="arkHoverCard">
      <p>
        Liked by
        <a arkHoverCardTrigger href="#profile">
          &#64;sarah_chen
          @if (root.api().open) {
            <hover-card-chevron-up-icon />
          } @else {
            <hover-card-chevron-down-icon />
          }
        </a>
        and 3 others
      </p>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkHoverCardPositioner>
          <div arkHoverCardContent>
            <div arkHoverCardArrow>
              <div arkHoverCardArrowTip></div>
            </div>
            <div class="Body">
              <img class="Avatar" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
              <div>
                <p class="Name">Sarah Chen</p>
                <p class="Username">&#64;sarah_chen</p>
              </div>
              <p class="Bio">Design Engineer at Acme Inc.</p>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [hoverCardExampleStyles],
})
export class HoverCardContextExample {}
