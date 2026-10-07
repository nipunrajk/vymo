# Dynamic Form & Design System

A lightweight, accessible **Design System** and **Dynamic Form** built with **React 19**, **TypeScript**, and **CSS Modules**.

---

## 1. How to Install and Run

```bash
npm install        # Install dependencies
npm run dev        # Start local dev server (http://localhost:5173)
npm test           # Run automated Vitest suite (16 tests)
npm run lint       # Run oxlint
npm run build      # Typecheck and production build
```

---

## 2. Folder Layout

```text
src/
├── design-system/                  # Domain-agnostic UI library
│   ├── tokens/                     # Design tokens (colors, spacing, type, breakpoints)
│   ├── atoms/                      # TextInput, Select, Checkbox, Textarea, Button
│   ├── molecules/Field/            # Field molecule (label, control, hint, error)
│   └── form/                       # DynamicForm engine & types
├── features/
│   └── lead/                       # Lead feature domain
│       ├── config/                 # leadFormConfig.ts (typed 7-field array)
│       ├── validation/             # validateLeadForm.ts (pure function validator)
│       ├── mock/                   # leadMockData.ts (presets for testing)
│       ├── types/                  # lead.types.ts
│       └── pages/                  # LeadCapturePage.tsx & styles
├── App.tsx
├── main.tsx
└── index.css
```

---

## 3. Where Tokens, Atoms, and the Form Live

- **Tokens**: [`src/design-system/tokens/tokens.css`](src/design-system/tokens/tokens.css) — defines color palette (`#f35f60` primary, slate texts), 4px spacing scale, typography (Plus Jakarta Sans), radii, and breakpoint references.
- **Atoms**: [`src/design-system/atoms/`](src/design-system/atoms/) — pure UI controls (`TextInput`, `Select`, `Checkbox`, `Textarea`, `Button`). They receive value, label, and events; they have **no knowledge of leads**.
- **Field Molecule**: [`src/design-system/molecules/Field/`](src/design-system/molecules/Field/) — composes label, control slot, hint, and error alert (`role="alert"`) with accessible `aria-describedby` wiring.
- **Form Component**: [`src/design-system/form/DynamicForm.tsx`](src/design-system/form/DynamicForm.tsx) — iterates over the config array, filters hidden fields, and maps each entry to its atom wrapped in a Field molecule.

---

## 4. Where the Config and the Validation Rules Live

- **Config**: [`src/features/lead/config/leadFormConfig.ts`](src/features/lead/config/leadFormConfig.ts) — typed array defining the 7 fields (Full name, Email, Lead type, Company name, Phone, Notes, Consent) with validations, desktop column spans, and dynamic visibility (`condition: (values) => values.leadType === 'Company'`).
- **Validation Rules**: [`src/features/lead/validation/validateLeadForm.ts`](src/features/lead/validation/validateLeadForm.ts) — pure function `(config, values) => errors`. Evaluates only active fields; Company name is **required only when visible**. Validates on blur and on submit.

---

## 5. Which Files Own the Desktop and Mobile Layout

- **[`src/design-system/form/DynamicForm.module.css`](src/design-system/form/DynamicForm.module.css)**:
  - **Desktop (`> 1024px`)**: 2-column CSS Grid. Full name & Email share row 1 (`colSpan: 1` each); Notes and Consent span full width (`colSpan: 2`). The submit button aligns with the form inside the card footer.
  - **Mobile (`< 768px`)**: 1-column layout with full-width inputs. The submit button is **sticky-docked at the bottom of the screen** (`position: sticky; bottom: 0`) with backdrop blur and iOS safe-area support, remaining reachable without scrolling.
- **[`src/design-system/molecules/Field/Field.module.css`](src/design-system/molecules/Field/Field.module.css)**:
  - Owns column spans (`.span1` vs `.span2`) and ensures errors wrap cleanly with `overflow-wrap: break-word` so **errors never overflow**.
- **[`src/features/lead/pages/LeadCapturePage.module.css`](src/features/lead/pages/LeadCapturePage.module.css)**:
  - Owns the outer page shell, centered responsive card max-width (`860px`), reviewer test toolbar, and submission confirmation view.
