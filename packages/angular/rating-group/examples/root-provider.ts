import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkRatingGroupContext,
  ArkRatingGroupControl,
  ArkRatingGroupHiddenInput,
  ArkRatingGroupItem,
  ArkRatingGroupItemContext,
  ArkRatingGroupLabel,
  ArkRatingGroupRootProvider,
  useRatingGroup,
} from '../public-api'
import { ratingGroupExampleStyles } from '../rating-group-example-styles'
import { RatingGroupStarIcon } from './icons'

@Component({
  selector: 'rating-group-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkRatingGroupRootProvider,
    ArkRatingGroupLabel,
    ArkRatingGroupControl,
    ArkRatingGroupContext,
    ArkRatingGroupItem,
    ArkRatingGroupItemContext,
    ArkRatingGroupHiddenInput,
    RatingGroupStarIcon,
  ],
  template: `
    <div class="stack">
      <output>value: {{ ratingGroup.api().value }}</output>
      <div arkRatingGroupRootProvider [value]="ratingGroup">
        <label arkRatingGroupLabel>Label</label>
        <div arkRatingGroupControl>
          <ng-template arkRatingGroupContext let-api>
            @for (item of api().items; track item) {
              <span arkRatingGroupItem [index]="item">
                <ng-template arkRatingGroupItemContext let-state>
                  <span class="rating-group-item-indicator" [attr.data-highlighted]="state().highlighted ? '' : null">
                    <rating-group-star-icon [background]="true" />
                    <rating-group-star-icon [foreground]="true" [filled]="true" />
                  </span>
                </ng-template>
              </span>
            }
          </ng-template>
          <input arkRatingGroupHiddenInput />
        </div>
      </div>
    </div>
  `,
  styles: [ratingGroupExampleStyles],
})
export class RatingGroupRootProviderExample {
  readonly ratingGroup = useRatingGroup({
    context: () => ({ count: 5, defaultValue: 3 }),
  })
}
