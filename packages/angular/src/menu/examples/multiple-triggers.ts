import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuSeparator,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuEllipsisVerticalIcon } from './icons'

interface Message {
  id: string
  sender: string
  preview: string
}

@Component({
  selector: 'menu-multiple-triggers-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkMenuSeparator,
    ArkPortalComponent,
    MenuEllipsisVerticalIcon,
  ],
  template: `
    <div arkMenu [positioning]="{ placement: 'right-start' }" #root="arkMenu">
      <div class="message-list">
        @for (message of messages; track message.id) {
          <div class="message-item">
            <div class="message-content">
              <div class="message-sender">{{ message.sender }}</div>
              <div class="message-preview">{{ message.preview }}</div>
            </div>
            <button type="button" arkMenuTrigger class="message-action" [value]="message.id">
              <menu-ellipsis-vertical-icon />
            </button>
          </div>
        }
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuItem value="reply">Reply</div>
            <div arkMenuItem value="forward">Forward</div>
            <div arkMenuItem value="archive">Archive</div>
            <div arkMenuSeparator></div>
            <div arkMenuItem value="delete">Delete</div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuMultipleTriggersExample {
  readonly messages: Message[] = [
    { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
    { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
    { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
  ]
}
