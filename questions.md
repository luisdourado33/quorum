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
