import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { ArkTooltipContent, ArkTooltipPositioner, ArkTooltipRoot, ArkTooltipTrigger } from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

interface TooltipTool {
  id: string
  label: string
  shortcut: string
  icon: 'bold' | 'italic' | 'underline' | 'strikethrough'
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
            @switch (tool.icon) {
              @case ('bold') {
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
                  <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
                </svg>
              }
              @case ('italic') {
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <line x1="19" x2="10" y1="4" y2="4" />
                  <line x1="14" x2="5" y1="20" y2="20" />
                  <line x1="15" x2="9" y1="4" y2="20" />
                </svg>
              }
              @case ('underline') {
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                  <line x1="4" x2="20" y1="20" y2="20" />
                </svg>
              }
              @case ('strikethrough') {
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M16 4H9a3 3 0 0 0-2.83 4" />
                  <path d="M14 12a3 3 0 0 1 0 6H6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                </svg>
              }
            }
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
    { id: 'bold', label: 'Bold', shortcut: '\u2318+B', icon: 'bold' },
    { id: 'italic', label: 'Italic', shortcut: '\u2318+I', icon: 'italic' },
    { id: 'underline', label: 'Underline', shortcut: '\u2318+U', icon: 'underline' },
    { id: 'strikethrough', label: 'Strikethrough', shortcut: '\u2318+\u21e7+X', icon: 'strikethrough' },
  ]
  readonly activeTool = computed(() => this.tools.find((tool) => tool.id === this.triggerValue()) ?? null)
}
