# Frontend Components Library

A small reusable **React + TypeScript** component library built with **Storybook** and **Tailwind CSS**.  
This project contains two example components: **InputField** and **DataTable**.

---

## 📌 Features
- ⚡ Built with **React + TypeScript**
- 🎨 Styled with **Tailwind CSS**
- 🧩 Documented with **Storybook**
- ✅ Includes **unit tests** (Vitest + React Testing Library)
- 📱 Fully responsive
- ♿ Basic accessibility support (ARIA labels, keyboard navigation)

---

## 📂 Folder Structure
frontend-components/
├── .storybook/ # Storybook configuration
├── src/
│ ├── components/ # Reusable components
│ │ ├── InputField.tsx
│ │ ├── DataTable.tsx
│ │ └── ...
│ ├── stories/ # Storybook stories
│ ├── tests/ # Component tests
│ └── App.tsx # Demo usage
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md


---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/PRANIT-13/frontend-components.git
cd frontend-components
npm install  // install dependencies
npm run dev  //Run locally
npm run storybook  // Run storybook
npm test  // Run test


Components
🔹 InputField

A customizable text input component with support for:

Labels and placeholders

Error messages & helper text

Variants: outlined, filled, ghost

Sizes: sm, md, lg

Disabled & loading states

🔹 DataTable

A responsive table with features like:

Column sorting

Row selection with checkboxes

Loading skeletons

Empty state handling

npm run build-storybook // build story book for deployment






👨‍💻 Author

Pranit Rajendra Laware
📍 Pune, Maharashtra
