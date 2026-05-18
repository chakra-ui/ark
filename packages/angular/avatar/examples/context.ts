import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkAvatarFallback, ArkAvatarImage, ArkAvatarRoot } from '@ark-ui/angular/avatar'

@Component({
  selector: 'avatar-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAvatarRoot, ArkAvatarImage, ArkAvatarFallback],
  template: `
    <div arkAvatar #avatar="arkAvatar">
      <span arkAvatarFallback>PA</span>
      <img arkAvatarImage src="https://i.pravatar.cc/300?u=a" alt="avatar" />
      <p>Loaded: {{ avatar.api().loaded }}</p>
    </div>
  `,
})
export class ContextExample {}
