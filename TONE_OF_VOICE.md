# Tone of Voice Guide

This document defines the writing style and communication patterns for Ark UI documentation, blog posts, and marketing
content.

## Core Principles

### 1. Conversational but Credible

Write like a knowledgeable friend explaining something at a coffee shop, not a textbook or corporate manual. Be warm
without being unprofessional.

**Do:** "Ark UI handles all the accessibility plumbing so you can focus on what matters—building great experiences."

**Don't:** "Ark UI is an enterprise-grade solution that facilitates accessibility compliance through automated ARIA
attribute management."

### 2. Direct and Action-Oriented

Use active voice and direct imperatives. Get to the point. Respect the reader's time.

**Do:** "Install the package and import the component."

**Don't:** "The package should be installed first, after which the component can be imported into your project."

### 3. "You" Over "Users"

Address readers directly. They're people, not abstract entities.

**Do:** "You can customize the animation duration."

**Don't:** "Users are able to configure animation parameters."

### 4. "We" for Team, Not Corporate Shield

Use "we" to create partnership, not distance. It should feel like the team is building alongside the reader.

**Do:** "We designed the API to feel familiar if you've used other component libraries."

**Don't:** "The API has been designed to ensure familiarity with existing paradigms."

## Writing for Documentation

### Start with the Task

Lead with what the reader wants to accomplish, not abstract concepts.

**Do:**

```
## Adding a Dialog

Create a modal dialog with built-in focus management and keyboard navigation.
```

**Don't:**

```
## Dialog Component

The Dialog component implements the WAI-ARIA dialog pattern with comprehensive
focus trap functionality and escape key handling mechanisms.
```

### Show, Then Explain

Code first, explanation second. Developers scan for examples.

**Do:**

```tsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Welcome</Dialog.Title>
      <Dialog.Description>This is a dialog.</Dialog.Description>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

The trigger opens the dialog. The backdrop dims the page. Content renders inside the positioner for proper centering.

**Don't:** Long paragraphs explaining the component architecture before showing any code.

### Be Specific

Concrete numbers and examples beat vague claims.

**Do:** "Renders in under 16ms on mid-range devices."

**Don't:** "Highly performant rendering."

### Acknowledge Different Skill Levels

Write for someone who knows their framework but might be new to this specific tool.

**Do:** "If you haven't set up your project yet, check our [getting started guide](/docs/getting-started)."

**Don't:** Assume everyone knows everything, or assume no one knows anything.

## Writing for Blog Posts

### Lead with Excitement (Authentically)

Celebrate wins without manufactured enthusiasm. If something is genuinely cool, say so.

**Do:** "We've been working on this for months, and we're thrilled to finally share it with you."

**Don't:** "We are pleased to announce the general availability of..."

### Tell the Story

Share the journey—the problems you solved, the decisions you made, the tradeoffs you considered.

**Do:** "We initially tried X, but it didn't handle edge cases well. After exploring several approaches, we landed on Y
because it gives you Z without sacrificing performance."

**Don't:** Just list features without context.

### Be Transparent

Acknowledge limitations, ongoing work, and areas for improvement.

**Do:** "This is our first pass at the API. We'd love your feedback on what feels awkward."

**Don't:** Pretend everything is perfect.

### Use Personality (Sparingly)

A little humor or informal language builds connection. Too much becomes distracting.

**Do:** "Yes, we know—another breaking change. But hear us out."

**Don't:** Forced jokes, excessive exclamation points, or trying too hard to be relatable.

## Voice Characteristics

| Trait          | What It Means                                                             |
| -------------- | ------------------------------------------------------------------------- |
| **Helpful**    | Anticipate questions. Provide context. Link to related resources.         |
| **Honest**     | Acknowledge complexity. Don't oversell. Admit when something is hard.     |
| **Practical**  | Focus on real-world use cases. Skip theoretical deep-dives unless needed. |
| **Empowering** | Give readers confidence. They can do this.                                |
| **Respectful** | Don't condescend. Trust reader intelligence while providing clarity.      |
| **Human**      | Write like a person, not a corporation or a robot.                        |

## Language Patterns

### Headlines

Benefit-driven and specific.

**Do:**

- "Build accessible dialogs without the boilerplate"
- "Style states with data attributes"
- "Control animation timing with CSS variables"

**Don't:**

- "Dialog Component Documentation"
- "Styling Guide"
- "Advanced Configuration Options"

### Transitions

Keep them natural, not formulaic.

**Do:** "Now that your dialog is set up, let's add some polish."

**Don't:** "In the next section, we will discuss styling options."

### Error Prevention

Anticipate common mistakes. Guide readers away from pitfalls.

**Do:** "Make sure `Dialog.Backdrop` is inside `Dialog.Root`—placing it outside won't connect it to the dialog state."

**Don't:** Leave readers to discover issues on their own.

## Words to Use

- "Build" over "implement"
- "Set up" over "configure"
- "Works with" over "integrates with"
- "You" over "the user" or "developers"
- "Simple" when it genuinely is
- "Let's" for guided tutorials

## Words to Avoid

- "Leverage" (just say "use")
- "Utilize" (just say "use")
- "Facilitate" (say what it actually does)
- "Robust" (be specific about what makes it strong)
- "Seamless" (describe the actual experience)
- "Cutting-edge" (show, don't tell)
- "Empower" in marketing speak (actions empower, not adjectives)
- Excessive exclamation points!!!

## Framework-Specific Writing

When documenting for multiple frameworks, maintain consistent voice while respecting idioms.

**React example:**

```tsx
const [open, setOpen] = useState(false)

return <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
```

**Vue example:**

```vue
<script setup>
const open = ref(false)
</script>

<template>
  <Dialog.Root v-model:open="open">
</template>
```

Same friendly explanation, framework-appropriate code.

## Summary

Write like you're helping a smart colleague get started quickly. Be clear, be direct, be human. Skip the jargon.
Celebrate the work. Acknowledge the hard parts. Trust your readers, and they'll trust you.
