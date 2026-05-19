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
      <p>
        Liked by
        <a arkHoverCardTrigger href="#profile">&#64;sarah_chen</a>
        and 3 others
      </p>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkHoverCardPositioner>
          <div arkHoverCardContent>
            <div arkHoverCardArrow>
              <div arkHoverCardArrowTip></div>
            </div>
            <div class="Body">
              <div class="Header">
                <img class="Avatar" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
                <button type="button" class="FollowButton">Follow</button>
              </div>
              <div>
                <p class="Name">Sarah Chen</p>
                <p class="Username">&#64;sarah_chen</p>
              </div>
              <p class="Bio">Design Engineer at Acme Inc. Building beautiful interfaces and design systems.</p>
              <div class="Stats">
                <div class="Stat">
                  <span class="StatValue">2,456</span>
                  <span class="StatLabel">Following</span>
                </div>
                <div class="Stat">
                  <span class="StatValue">14.5K</span>
                  <span class="StatLabel">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [hoverCardExampleStyles],
})
export class HoverCardBasicExample {}
