---
description: Sync changelog updates from chakra-ui/zag repo to all Ark UI framework changelogs
---

## Steps

1. Fetch the latest CHANGELOG.md from the chakra-ui/zag repository
   - Use `gh api repos/chakra-ui/zag/contents/CHANGELOG.md -H "Accept: application/vnd.github.raw+json"` to get the
     changelog content

2. Determine which Zag versions are new
   - Check the current `@zag-js/*` version in `packages/react/package.json`
   - Compare the latest Ark UI release changelog (`packages/react/CHANGELOG.md`) against the Zag changelog
   - Identify Zag versions whose changes are NOT yet reflected in the Ark UI changelogs

3. Parse the new changes from Zag.js changelog
   - Extract all entries from the new Zag versions
   - Identify component-specific changes and general improvements
   - Filter out Zag.js internal changes that don't affect Ark UI (build system, core state machine internals, docs-only,
     framework-specific fixes for frameworks Ark doesn't use like Preact/Vanilla)

4. Review the changes with me before applying
   - Show me the extracted changes
   - Confirm which changes should be synced to Ark UI
   - Ask if any changes need framework-specific notes

5. Create a changeset file in `.changeset/`
   - Use the format from existing changesets (YAML frontmatter with package names and bump type)
   - Include all four frameworks: `@ark-ui/react`, `@ark-ui/solid`, `@ark-ui/svelte`, `@ark-ui/vue`
   - Use `patch` for bug fixes, `minor` for new features
   - Do NOT modify the `CHANGELOG.md` files directly

6. Show me a summary of all changes made
   - List which components were updated
   - Highlight any differences between frameworks (if applicable)

## Important Notes

- Only sync changes that are relevant to Ark UI components
- Skip Zag.js internal changes (build system, documentation-only, core machine internals, etc.)
- Create changesets (`.changeset/*.md`) instead of editing CHANGELOG.md files directly

## Writing Style

Follow the tone guide in `TONE_OF_VOICE.md`. Changelogs are user-facing — write them like you're telling a developer
what's new, not filing a spec.

### Structure

- Each entry is a bullet starting with **Bold Component Name** or **Bold Feature Name**
- Keep the first sentence short — lead with the benefit or what changed, not implementation details
- If a sentence runs long, break it up. Two short sentences beat one dense one.
- Separate entries with blank lines for readability

### When a feature spans multiple components

Don't list all components in the bold prefix. Name the feature instead and use a blockquote for affected components:

```md
- **Multiple Trigger Support**: No more duplicating a Dialog for every button in a list — render one instance and share
  it across as many triggers as you need.

  > Supported in Dialog, Drawer, Hover Card, Menu, Popover, and Tooltip.
```

### Code snippets

Add a short code snippet for significant new features (new components, new APIs, new props). Keep them minimal — show
the anatomy or key prop, not a full working example.

```md
- **Tags Input**: Add `sanitizeValue` prop to clean up tag values before they're added — trim whitespace, lowercase,
  strip special characters, whatever you need. Defaults to `(v) => v.trim()`.

  \```jsx
  <TagsInput.Root sanitizeValue={(v) => v.trim().toLowerCase()} />
  \```
```

Don't add snippets for bug fixes or minor tweaks.

### Bug fixes

Keep fixes direct. State what was broken, then what's fixed. No need to over-explain the internal cause unless it helps
the reader understand a behavior change.

```md
- **Combobox**: Fix VoiceOver not announcing options when navigating with arrow keys on Safari.
```

### Words to use

- "Fix" not "Resolve" or "Address"
- "Add" not "Implement" or "Introduce"
- "you" not "users" or "developers"
- Keep it conversational — "whatever you need", "no more duplicating", "you can now"

### Words to avoid

- "Leverage", "utilize", "facilitate", "robust", "seamless"
- Passive voice ("has been added" → "add")
- Jargon without context ("state machine internals" means nothing to most readers)
