# EduPortal

EduPortal is a web application built with Vue.js 3, designed to provide an educational portal experience. It features modules for student and teacher management, authentication, dashboard, and learning sections.

## Features

- **User Authentication**: Secure login and registration for students and teachers.
- **Dashboard**: Centralized view for quick access to relevant information.
- **Student Management**: Functionality to manage student profiles and data.
- **Teacher Management**: Functionality to manage teacher profiles and data.
- **Learning Module**: Dedicated section for educational content and resources.
- **Routing**: Implemented using Vue Router for seamless navigation.

## Project Structure

```
.browserslistrc
.gitignore
README.md
babel.config.js
jsconfig.json
package-lock.json
package.json
public/
├── favicon.ico
├── index.html
└── mortarboard.ico
src/
├── App.vue
├── assets/
│   ├── default.png
│   └── logo.png
├── components/
│   ├── Navbar.vue
│   ├── Student.vue
│   └── Teacher.vue
├── main.js
├── router/
│   └── index.js
└── views/
    ├── Auth/
    ├── Dashboard/
    ├── HomeView.vue
    ├── Learning/
    └── profile/
vue.config.js
```

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd eduportal
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

## Usage

To run the development server:

```bash
npm run serve
```

This will start the application, usually accessible at `http://localhost:8080/`.

## Technologies Used

-   Vue.js 3
-   Vue Router
-   Axios (for API calls)
-   Node.js & npm

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
