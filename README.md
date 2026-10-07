# Dynamic Form & Design System

A lightweight, accessible **Design System** and **Dynamic Form Engine** built with **React 19** and **TypeScript**, rendering a lead capture form entirely from configuration.

---

## 🚀 How to Install and Run

### Prerequisites
- Node.js `v18+` (tested on Node `v24`)
- npm `v9+`

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (http://localhost:5173)
npm run dev

# 3. Run automated unit & integration test suite (Vitest + Testing Library)
npm test

# 4. Run typecheck, linting, and production build
npm run lint
npm run build
```

---

## 📁 Folder Layout

The project enforces strict physical separation between the domain-agnostic **Design System** and the domain-specific **Lead Capture** feature:

```text
src/
├── design-system/                          # Domain-agnostic UI layer (zero lead knowledge)
│   ├── tokens/
│   │   ├── tokens.css                      # CSS custom properties (color, spacing, type, breakpoints, shadows)
│   │   ├── tokens.ts                       # Breakpoint constants and TypeScript types
│   │   └── index.ts
│   ├── atoms/                              # Pure UI controls (receive value, label, events)
│   │   ├── TextInput/                      # Handles type="text" and type="email"
│   │   ├── Select/                         # Accessible dropdown with native semantics
│   │   ├── Checkbox/                       # Custom accessible checkbox with label slot
│   │   ├── Textarea/                       # Multiline text control
│   │   ├── Button/                         # Primary, secondary, and loading button variants
│   │   └── index.ts
│   ├── molecules/                          # Composed control wrappers
│   │   ├── Field/                          # Field molecule: Label, control slot, hint, and error message
│   │   └── index.ts
│   └── form/                               # Form orchestration engine
│       ├── DynamicForm.tsx                 # Maps config array to atoms wrapped in Field molecules
│       ├── DynamicForm.module.css          # Responsive 2-column/1-column CSS grid & mobile sticky submit bar
│       ├── types.ts                        # FieldConfig, FieldType, FormValues, FormErrors contracts
│       └── index.ts
│
├── features/
│   └── lead/                               # Domain feature layer (owns lead rules and page)
│       ├── config/
│       │   └── leadFormConfig.ts           # The 7 lead field configs with validations & conditional rules
│       ├── validation/
│       │   ├── validateLeadForm.ts         # Pure validation function: (config, values) => errors
│       │   └── validateLeadForm.test.ts    # Unit tests for pure validation rules
│       ├── mock/
│       │   └── leadMockData.ts             # Sample presets for instant testing (Individual, Company, Empty)
│       ├── types/
│       │   └── lead.types.ts               # Domain types for lead capture data
│       └── pages/
│           ├── LeadCapturePage.tsx         # Page coordinator: handles blur/submit state, logging, and summary
│           ├── LeadCapturePage.module.css  # Page shell and on-screen submission preview styles
│           └── LeadCapturePage.test.tsx    # Integration tests for form rendering, blur, dynamic reveal, submit
│
├── App.tsx                                 # Application root
├── main.tsx                                # React 19 entry point
└── index.css                               # Global reset & token imports
```

---

## 🧭 Where Key Parts Live

| Component / Layer | Location | Purpose |
|-------------------|----------|---------|
| **Tokens** | [`src/design-system/tokens/tokens.css`](file:///Users/nipun/projects-2026/Vymo/src/design-system/tokens/tokens.css) | Defines design tokens: colors, spacing scale, typography, elevation, and media breakpoints. |
| **Atoms** | [`src/design-system/atoms/`](file:///Users/nipun/projects-2026/Vymo/src/design-system/atoms/) | Pure UI controls (`TextInput`, `Select`, `Checkbox`, `Textarea`, `Button`). They receive values, labels, and events, and contain **no lead logic**. |
| **Field Molecule** | [`src/design-system/molecules/Field/`](file:///Users/nipun/projects-2026/Vymo/src/design-system/molecules/Field/) | Combines `<label>`, the control slot, hint text, and an accessible `<div role="alert">` error message with `aria-describedby` wiring. |
| **Dynamic Form** | [`src/design-system/form/DynamicForm.tsx`](file:///Users/nipun/projects-2026/Vymo/src/design-system/form/DynamicForm.tsx) | Iterates over the config array, filters hidden fields, and maps each entry to its atom. |
| **Form Config** | [`src/features/lead/config/leadFormConfig.ts`](file:///Users/nipun/projects-2026/Vymo/src/features/lead/config/leadFormConfig.ts) | The typed list of 7 fields (Full name, Email, Lead type, Company name, Phone, Notes, Consent) with validation rules and desktop column spans. |
| **Validation Rules** | [`src/features/lead/validation/validateLeadForm.ts`](file:///Users/nipun/projects-2026/Vymo/src/features/lead/validation/validateLeadForm.ts) | Pure function `(config, values) => errors`. Validates only visible fields. |
| **Lead Page** | [`src/features/lead/pages/LeadCapturePage.tsx`](file:///Users/nipun/projects-2026/Vymo/src/features/lead/pages/LeadCapturePage.tsx) | Manages form state, blur/submit triggers, console logging on submit, and displays the on-page submission summary. |

---

## 📐 Layout Ownership (Desktop vs. Mobile)

Layout and responsiveness are owned strictly by CSS Modules using the design tokens:

1. **[`src/design-system/form/DynamicForm.module.css`](file:///Users/nipun/projects-2026/Vymo/src/design-system/form/DynamicForm.module.css)**
   - **Desktop (`> 1024px`)**: Renders a 2-column CSS Grid (`grid-template-columns: repeat(2, 1fr)`). Full Name and Email sit on row 1 (`span 1` each). Notes and Consent span full width (`span 2`). The submit button aligns with the form inside the card footer.
   - **Tablet (`768px - 1024px`)**: Adapts to a single column with comfortable spacing and readable labels.
   - **Mobile (`< 768px`)**: Single column (`grid-template-columns: 1fr`). Inputs are full width (`100%`). The submit action bar becomes **sticky docked at the bottom of the screen** (`position: sticky; bottom: 0`) with background blur and iOS safe-area support (`env(safe-area-inset-bottom)`), ensuring it remains visible and reachable without scrolling.

2. **[`src/design-system/molecules/Field/Field.module.css`](file:///Users/nipun/projects-2026/Vymo/src/design-system/molecules/Field/Field.module.css)**
   - Owns field-level grid column placement (`.span1` vs `.span2`).
   - Ensures error messages wrap cleanly with `word-break: break-word` and `overflow-wrap: break-word` so **errors never cause horizontal overflow**.

3. **[`src/features/lead/pages/LeadCapturePage.module.css`](file:///Users/nipun/projects-2026/Vymo/src/features/lead/pages/LeadCapturePage.module.css)**
   - Owns the outer page shell, centered responsive card max-width (`860px`), reviewer test toolbar, and submission confirmation view.

---

## 🏛️ Architecture & Review Highlights

1. **Adding a Field = Adding a Config Item**:
   - The form renders purely from the `FieldConfig[]` array. Adding a new field simply requires appending an entry to `leadFormConfig.ts` with its `type`, `label`, and `validations`.
2. **Pure Function Validation**:
   - Validation is a pure function: `validateLeadForm(config, values)`. It inspects the config rules and current values without side effects.
3. **Conditional Visibility**:
   - Company name is conditioned on `(values) => values.leadType === 'Company'`. Changing Lead type shows or hides Company name dynamically with no page reload.
   - Company name is **required only when visible**; switching back to Individual immediately skips its validation and removes any stale errors.
4. **Validation Triggers**:
   - **On Blur**: Marks field as touched and renders inline error underneath.
   - **On Submit**: Marks all active fields as touched, blocks submission if invalid, displays every current error, and shifts focus to the first invalid input.
5. **Zero External Form/UI Libraries**:
   - Pure React 19 state and plain CSS Modules. No MUI, Tailwind, React Hook Form, Formik, or Zod.
6. **Submission Output**:
   - Submitting prints the values to `console.log` and renders an on-page formatted table and raw JSON summary.
