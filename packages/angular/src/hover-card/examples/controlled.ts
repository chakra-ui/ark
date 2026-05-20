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
      <button type="button" class="button" (click)="toggle()">Toggle</button>
      <div arkHoverCard #root="arkHoverCard" [(open)]="open">
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
