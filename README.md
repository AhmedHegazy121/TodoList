# 📋 [Todo List Project](https://6a10c0c9cbfde1caced837f0--todo-list2233.netlify.app/)
A professional, high-performance Todo application built with React and styled beautifully using Material UI (MUI v5). This project showcases clean software architecture by separating layout concerns, custom hooks, global context, and pure state reducers. It is fully optimized for Right-to-Left (RTL) Arabic typography.

⚡ **[اضغط هنا لمعاينة المشروع مباشرة على Netlify / Live Demo](https://6a10c0c9cbfde1caced837f0--todo-list2233.netlify.app/)**

---

## ✨ Features

* **Complete CRUD Engine**: Seamlessly add, view, update, and delete tasks.
* **Global Architecture**: Powered by React Context and `useReducer` to prevent deep property prop-drilling.
* **Visual Transitions**: Custom interactive button fill effects and card layout shifts engineered directly in raw CSS.
* **Arabic Optimization**: Fully tailored with custom `Alexandria` typography and native RTL responsive alignments.
* **Global Notifications**: Dynamic custom SnackBar alert messaging powered by an isolated toast communication context loop.

---
<!-- معرض صور المشروع - قائمة منسدلة تفاعلية -->
<div align="center" style="margin: 25px 0; max-width: 800px; margin-left: auto; margin-right: auto;">

  <!-- Image 1 (Open by default) -->
  <details open style="margin-bottom: 15px; background: rgba(0, 105, 92, 0.05); padding: 12px; border-radius: 12px; border: 1px solid rgba(0, 105, 92, 0.15); text-align: left; direction: ltr;">
    <summary style="font-weight: bold; font-size: 16px; color: #00695c; cursor: pointer; user-select: none;">📸 Main Dashboard View (Click to Collapse)</summary>
    <div align="center">
      <img src="Images/todoList.png" alt="Main Dashboard Interface" style="max-width: 100%; height: auto; border-radius: 16px; box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3); margin-top: 15px; border: 1px solid rgba(255, 255, 255, 0.1);" />
    </div>
  </details>

  <!-- Image 2 -->
  <details style="margin-bottom: 15px; background: rgba(0, 105, 92, 0.05); padding: 12px; border-radius: 12px; border: 1px solid rgba(0, 105, 92, 0.15); text-align: left; direction: ltr;">
    <summary style="font-weight: bold; font-size: 16px; color: #00695c; cursor: pointer; user-select: none;">📸 Edite View (Click to Open)</summary>
    <div align="center">
      <img src="Images/todoList2.pngg" alt="Arabic Localized Interface" style="max-width: 100%; height: auto; border-radius: 16px; box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3); margin-top: 15px; border: 1px solid rgba(255, 255, 255, 0.1);" />
    </div>
  </details>

  <!-- Image 3 -->
  <details style="margin-bottom: 15px; background: rgba(0, 105, 92, 0.05); padding: 12px; border-radius: 12px; border: 1px solid rgba(0, 105, 92, 0.15); text-align: left; direction: ltr;">
    <summary style="font-weight: bold; font-size: 16px; color: #00695c; cursor: pointer; user-select: none;">📸 Delete View (Click to Open)</summary>
    <div align="center">
      <img src="Images/todoList.png" alt="Mobile Responsive Layout Interface" style="max-width: 100%; height: auto; border-radius: 16px; box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3); margin-top: 15px; border: 1px solid rgba(255, 255, 255, 0.1);" />
    </div>
  </details>

</div>


## 🏗️ Project Architecture & Folder Tree

The directory layout cleanly decouples individual interface cards, theme layers, and state machines:

```text
src/
├── Componts/               # Presentation Views & Modals
│   ├── TodoList.jsx        # Main Control Card container panel
│   ├── Todo.jsx            # Individual task checklist rows
│   └── MySnackBar.jsx      # Portal notification alert banner
├── context/                # Multi-level data share providers
│   ├── TodosContext.jsx    # Core task list memory pipeline
│   └── ToastContext.jsx    # Toast visibility system management
├── Reduecers/              # Clean array processing switch configurations
│   └── todoReducer.js      # Pure modifier engine functions
├── App.js                  # Master router, portal wrap & theme setup
├── App.css                 # Advanced animations, font face maps & utilities
└── index.js                # Core package initialization mount root
```

---

## 🛠️ Tech Stack & Key Libraries

* **Core UI Engine**: React.js
* **Design & Styling**: Material UI (MUI v5)
* **Unique ID Generator**: UUID
* **State Engines**: React Context API & `useReducer`

---



This application relies on a single source of truth for color styling inside `App.js`. You can swap themes universally by adjusting the `palette` hex strings within the centralized custom theme engine builder:

* **Primary Main Theme**: Deep Emerald Teal (`#00695c`)
* **Dark Contrast Accent**: Midnight Forest Green (`#004d40`)
* **Responsive Background**: Soft Off-White Matte (`#fdfdfd`)

---

## 📄 License

This project is open-source and available under the **MIT License**. Feel free to use, modify, and build upon it!
