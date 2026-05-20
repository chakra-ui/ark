import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import {
  ArkRatingGroupContext,
  ArkRatingGroupControl,
  ArkRatingGroupHiddenInput,
  ArkRatingGroupItem,
  ArkRatingGroupItemContext,
  ArkRatingGroupLabel,
  ArkRatingGroupRoot,
} from '../public-api'
import { ratingGroupExampleStyles } from '../rating-group-example-styles'
import { RatingGroupStarIcon } from './icons'

@Component({
  selector: 'rating-group-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldHelperText,
    ArkFieldErrorText,
    ArkRatingGroupRoot,
    ArkRatingGroupLabel,
    ArkRatingGroupControl,
    ArkRatingGroupContext,
    ArkRatingGroupItem,
    ArkRatingGroupItemContext,
    ArkRatingGroupHiddenInput,
    RatingGroupStarIcon,
  ],
  template: `
    <div arkFieldRoot>
      <div arkRatingGroup [count]="5" [defaultValue]="3">
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
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [ratingGroupExampleStyles],
})
export class RatingGroupWithFieldExample {}
