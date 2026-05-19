export const accordionExampleStyles = `
  :host {
    display: block;
    max-width: 420px;
    color: #111827;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .stack {
    display: grid;
    gap: 12px;
  }

  [arkAccordion] {
    display: grid;
    gap: 8px;
  }

  [arkAccordion][data-orientation='horizontal'] {
    grid-auto-flow: column;
    align-items: start;
  }

  [arkAccordionItem] {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #ffffff;
    overflow: hidden;
  }

  [arkAccordionItem][data-disabled] {
    opacity: 0.5;
  }

  [arkAccordionItemTrigger] {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: 0;
    background: #ffffff;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    padding: 12px 14px;
    text-align: left;
  }

  [arkAccordionItemTrigger]:disabled {
    cursor: not-allowed;
  }

  [arkAccordionItemTrigger]:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: -2px;
  }

  [arkAccordionItemIndicator] {
    font-size: 16px;
    line-height: 1;
  }

  [arkAccordionItemIndicator][data-state='open'] {
    transform: rotate(45deg);
  }

  [arkAccordionItemContent] {
    border-top: 1px solid #e5e7eb;
    color: #4b5563;
    padding: 12px 14px;
  }

  output {
    color: #4b5563;
    font-size: 14px;
  }
`
