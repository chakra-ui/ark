import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { ArkTooltipContent, ArkTooltipPositioner, ArkTooltipRoot, ArkTooltipTrigger } from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

interface TooltipTool {
  id: string
  label: string
  shortcut: string
  icon: string
}

@Component({
  selector: 'tooltip-multiple-triggers-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
  template: `
    <div arkTooltip [(triggerValue)]="triggerValue" #root="arkTooltip">
      <div class="Toolbar">
        @for (tool of tools; track tool.id) {
          <button type="button" arkTooltipTrigger [value]="tool.id" class="ToolbarButton">
            <span aria-hidden="true">{{ tool.icon }}</span>
          </button>
        }
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkTooltipPositioner>
          <div arkTooltipContent>
            @if (activeTool(); as tool) {
              {{ tool.label }}
              <span class="Shortcut">{{ tool.shortcut }}</span>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tooltipExampleStyles],
})
export class TooltipMultipleTriggersExample {
  readonly triggerValue = signal<string | null | undefined>(null)
  readonly tools: TooltipTool[] = [
    { id: 'bold', label: 'Bold', shortcut: 'Cmd+B', icon: 'B' },
    { id: 'italic', label: 'Italic', shortcut: 'Cmd+I', icon: 'I' },
    { id: 'underline', label: 'Underline', shortcut: 'Cmd+U', icon: 'U' },
    { id: 'strikethrough', label: 'Strikethrough', shortcut: 'Cmd+Shift+X', icon: 'S' },
  ]
  readonly activeTool = computed(() => this.tools.find((tool) => tool.id === this.triggerValue()) ?? null)
}
