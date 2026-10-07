# Dynamic Form & Design System

A domain-agnostic design system and dynamic form renderer built with React 19, TypeScript, and CSS Modules.

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
├── design-system/                  # Reusable UI library (zero domain logic)
│   ├── tokens/                     # CSS tokens (colors, spacing, type, breakpoints)
│   ├── atoms/                      # TextInput, Select, Checkbox, Textarea, Button
│   ├── molecules/Field/            # Composed Field (label, control, hint, error)
│   └── form/                       # DynamicForm engine & types
├── features/
│   └── lead/                       # Lead capture feature domain
│       ├── config/                 # leadFormConfig.ts (typed 7-field array)
│       ├── validation/             # validateLeadForm.ts (pure function validator)
│       ├── mock/                   # leadMockData.ts (sample datasets)
│       ├── types/                  # lead.types.ts
│       └── pages/                  # LeadCapturePage.tsx & styles
├── App.tsx
├── main.tsx
└── index.css
```

---

## 3. Where Tokens, Atoms, and the Form Live

- **Tokens**: [`src/design-system/tokens/tokens.css`](src/design-system/tokens/tokens.css) — color variables (brand coral `#f35f60`, slate texts), 4px grid spacing, Plus Jakarta Sans typography, radii, and breakpoint references.
- **Atoms**: [`src/design-system/atoms/`](src/design-system/atoms/) — controlled inputs (`TextInput`, `Select`, `Checkbox`, `Textarea`, `Button`). Atoms handle value changes and blur events without knowing what a lead is.
- **Field Molecule**: [`src/design-system/molecules/Field/`](src/design-system/molecules/Field/) — pairs a label, custom control, hint text, and an accessible error alert (`role="alert"` with `aria-describedby`).
- **Form Component**: [`src/design-system/form/DynamicForm.tsx`](src/design-system/form/DynamicForm.tsx) — loops through the configuration array, evaluates visibility conditions, and renders controls wrapped in Field molecules.

---

## 4. Where the Config and the Validation Rules Live

- **Config**: [`src/features/lead/config/leadFormConfig.ts`](src/features/lead/config/leadFormConfig.ts) — typed array containing field definitions (Full name, Email, Lead type, Company name, Phone, Notes, Consent), validation parameters, column spans, and conditional rules (`condition: (values) => values.leadType === 'Company'`).
- **Validation Rules**: [`src/features/lead/validation/validateLeadForm.ts`](src/features/lead/validation/validateLeadForm.ts) — pure validator `(config, values) => errors`. It only validates visible fields (Company name is required only when Lead type is Company) and executes on blur and submit.

---

## 5. Which Files Own the Desktop and Mobile Layout

- **[`src/design-system/form/DynamicForm.module.css`](src/design-system/form/DynamicForm.module.css)**:
  - **Desktop (`> 1024px`)**: 2-column grid. Full name & Email share row 1 (`colSpan: 1`); Notes and Consent span full width (`colSpan: 2`). Submit button aligns to the card footer.
  - **Mobile (`< 768px`)**: 1-column layout. Submit action docks to the bottom viewport (`position: sticky; bottom: 0`) with backdrop blur and safe area insets.
- **[`src/design-system/molecules/Field/Field.module.css`](src/design-system/molecules/Field/Field.module.css)**:
  - Manages column spans (`.span1`, `.span2`) and prevents layout shifts by breaking long error strings with `overflow-wrap: break-word`.
- **[`src/features/lead/pages/LeadCapturePage.module.css`](src/features/lead/pages/LeadCapturePage.module.css)**:
  - Manages page shell, max container width (`860px`), test presets toolbar, and post-submission results view.

