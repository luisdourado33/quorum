# 🏛️ Quorum Technical Assessment – Legislative Data Interface (Next.js)

This project was developed as part of a **technical assessment for Quorum**. It simulates an interface for interacting with **legislative data**, using **mock JSON datasets** that mimic a database. All data interactions are processed server-side using Next.js, providing a responsive and performant user experience.

---

## 📌 Project Summary

- 📂 Uses preexisting **mock legislative data** stored as JSON files.
- 🧩 Implements a **service layer** to simulate database interactions.
- ⚡ Handles all requests via **server-side rendering** (SSR) using `a entry server file for each page from the project`.
- 🎯 Provides a realistic structure for future integration with real APIs or databases.

---

## ⚙️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Mock Database**: CSV converted into JSON files inside the `/db` directory
- **Styling**: Tailwind CSS and Tremor.so UI library.

---

## 🗂️ Directory Overview (src)

```
.
├── db/                    # JSON files with mock legislative data
├── actions/              # Functions simulating database queries
├── app/                 # Next.js pages (SSR enabled)
├── components/            # UI components
├── containers/            # UI containers
├── lib/                   # Utility functions
├── types/                 # Types and Interfaces
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/luisdourado33/quorum.git
cd quorum
```

### 2. Install Dependencies

```bash
# Recommended
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Then go to `http://localhost:3000`.

---

## 🧠 How It Works

1. **Mock Data**: JSON files in `/db` simulate structured legislative data (e.g., bills, lawmakers, votes).
2. **Action Layer**: Functions in `/actions` read and query this data to simulate database-like responses.
3. **Server-Side Rendering**: Pages use `entry server file` to fetch data before rendering, improving performance and realism.
4. **Separation of Concerns**: Data logic and UI are cleanly decoupled, making the app extensible.

---

## 📝 Questions and Answers

### 1. Strategy and Decisions in Implementation

The implementation strategy focused on balancing simplicity and scalability. Key decisions included:

- **Time Complexity**: Prioritized efficient data querying by structuring mock JSON data to allow quick lookups.
- **Effort Cost**: Leveraged Next.js for its built-in SSR capabilities, reducing the need for custom server-side logic.
- **Technologies Used**: Chose Tailwind CSS and Tremor.so for rapid UI development and consistent styling.
- **Development Process**: Adopted a modular approach, separating concerns between data handling (`/actions`) and UI components (`/components`), ensuring maintainability and extensibility.

### 2. Adapting for Future Columns

To accommodate future columns like "Bill Voted On Date" or "Co-Sponsors":

- **Data Structure**: Extend the JSON schema to include these fields.
- **Action Layer**: Update functions in `/actions` to handle new fields dynamically.
- **UI Components**: Modify components to display additional data, ensuring responsiveness and accessibility.

### 3. Generating CSVs Instead of Consuming Them

If tasked with generating CSVs:

- **Data Transformation**: Implement utility functions in `/lib` to convert JSON data into CSV format.
- **Export Feature**: Add an endpoint or button in the UI to allow users to download the generated CSVs.
- **Scalability**: Ensure the solution handles large datasets efficiently by streaming data during CSV generation. For frontend, modular approach helps on building new pages, components and connect to external services.

### 4. Time Spent on the Assignment

The total time spent on the assignment was approximately **[15 hours]**, including planning, implementation, and testing phases.

## 📄 License

This project was created as part of a technical evaluation and is not intended for production use. All data is static and mock-based.
