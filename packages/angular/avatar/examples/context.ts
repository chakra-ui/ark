import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkAvatarFallback, ArkAvatarImage, ArkAvatarRoot } from '@ark-ui/angular/avatar'
import { avatarExampleStyles } from '../avatar-example-styles'

@Component({
  selector: 'avatar-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAvatarRoot, ArkAvatarImage, ArkAvatarFallback],
  template: `
    <div arkAvatar #avatar="arkAvatar">
      <span arkAvatarFallback>{{ avatar.api().loaded ? 'PA' : 'Loading' }}</span>
      <img arkAvatarImage src="https://i.pravatar.cc/300?u=a" alt="avatar" />
    </div>
  `,
  styles: [avatarExampleStyles],
})
export class ContextExample {}
