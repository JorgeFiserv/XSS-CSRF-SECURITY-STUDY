# 👥 User Management System

A modern CRUD application built with **AngularJS 1.8**, featuring a clean and responsive interface for managing users with complete Create, Read, Update, and Delete operations.

<div align="center">

![AngularJS](https://img.shields.io/badge/AngularJS-1.8.3-E23237?style=for-the-badge&logo=angularjs&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-1.96.0-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON_Server-1.0.0-000000?style=for-the-badge&logo=json&logoColor=white)

</div>

---

## ✨ Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete users
- 🎨 **Modern UI/UX** - Clean and responsive design with Material Symbols icons
- 🔍 **Real-time Search** - Filter users by name or email
- 📋 **User Details Modal** - View, edit, or create users in a modal interface
- ⚠️ **Confirmation Dialogs** - Confirm before deleting users or logging out
- 🎯 **Toast Notifications** - Success and error feedback messages
- 🎭 **Role Management** - Support for Administrator, Manager, and User roles
- 🔄 **Status Control** - Active/Inactive user status management
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crud-angularjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the JSON Server (API)**

   Open a new terminal window and run:

   ```bash
   npx json-server --watch db.json --port 3000
   ```

   The API will be available at `http://localhost:3000`

4. **Start the Development Server**

   Open another terminal window and run:

   ```bash
   npx live-server --port=8080 --entry-file=index.html
   ```

   The application will open automatically at `http://localhost:8080`

5. **Compile Sass (Optional - for style changes)**

   If you want to modify styles, run in another terminal:

   ```bash
   npx sass app/styles/main.scss app/styles/main.css --watch --no-source-map
   ```

---

## 📁 Project Structure

```
crud-angularjs/
│
├── app/
│   ├── components/                    # Reusable components
│   │   ├── confirm-modal/
│   │   │   ├── confirm-modal.component.html
│   │   │   ├── confirm-modal.component.js
│   │   │   ├── confirm.modal.component.js
│   │   │   └── _confirm-modal.component.scss
│   │   │
│   │   ├── logout/
│   │   │   ├── logout-component.html
│   │   │   ├── logout.component.js
│   │   │   └── _logout.component.scss
│   │   │
│   │   ├── toast/
│   │   │   ├── toast-component.html
│   │   │   ├── toast.component.js
│   │   │   └── _toast.scss
│   │   │
│   │   ├── user-filter/
│   │   │   ├── user-filter.component.html
│   │   │   ├── user-filter.component.js
│   │   │   └── _user-filter.component.scss
│   │   │
│   │   ├── user-modal/
│   │   │   ├── user-modal.component.html
│   │   │   ├── user-modal.component.js
│   │   │   ├── _user-modal.component.scss
│   │   │   └── _user.modal.scss
│   │   │
│   │   └── user-table/
│   │       ├── user-table.component.html
│   │       ├── user-table.component.js
│   │       └── _user-table.component.scss
│   │
│   ├── controllers/                   # Page controllers
│   │   ├── home.controller.js
│   │   ├── login.controller.js
│   │   ├── register.controller.js
│   │   └── toast.controller.js
│   │
│   ├── services/                      # Business logic services
│   │   ├── auth.service.js            # Authentication service
│   │   ├── crypto.service.js          # Encryption service
│   │   ├── modal.service.js           # Modal management
│   │   ├── toast.service.js           # Toast notifications
│   │   └── user.service.js            # User CRUD operations
│   │
│   ├── styles/                        # Sass stylesheets
│   │   └── main.scss                  # Main stylesheet (imports all partials)
│   │
│   ├── views/                         # Page templates
│   │   ├── home/
│   │   │   ├── home.html
│   │   │   └── _home.scss
│   │   │
│   │   ├── login/
│   │   │   ├── login.html
│   │   │   └── _login.scss
│   │   │
│   │   └── register/
│   │       ├── register.html
│   │       └── _register.scss
│   │
│   ├── app.module.js                  # App module definition
│   ├── app.route.js                   # Routing configuration
│   └── app.run.js                     # App initialization
│
├── .gitignore                         # Git ignore rules
├── db.json                            # JSON Server database
├── index.html                         # Main HTML entry point
├── package.json                       # Project dependencies
└── README.md                          # Project documentation
```

---

## 🛠️ Available Scripts

| Command                                                             | Description                           |
| ------------------------------------------------------------------- | ------------------------------------- |
| `npx json-server --watch db.json --port 3000`                       | Start the mock API server             |
| `npx live-server --port=8080 --entry-file=index.html`               | Start the development server          |
| `npx sass app/styles/main.scss app/styles/main.css --watch`         | Watch and compile Sass files          |
| `npx sass app/styles/main.scss app/styles/main.css --no-source-map` | Compile Sass once without source maps |

---

## 📚 Tech Stack

### Frontend

- **AngularJS 1.8.3** - JavaScript framework
- **Angular Route** - Client-side routing
- **Angular Sanitize** - HTML sanitization
- **Angular UI Bootstrap** - Bootstrap components for AngularJS
- **Material Symbols Outlined** - Google's icon library

### Backend

- **JSON Server 1.0.0** - Full fake REST API

### Styling

- **Sass 1.96.0** - CSS preprocessor
- **Custom SCSS** - Component-based styling architecture

### Development Tools

- **Live Server** - Development server with live reload
- **Prettier 3.7.4** - Code formatter

---

## 🎯 API Endpoints

The JSON Server provides the following REST API endpoints:

| Method   | Endpoint             | Description         |
| -------- | -------------------- | ------------------- |
| `GET`    | `/company-users`     | Get all users       |
| `GET`    | `/company-users/:id` | Get user by ID      |
| `POST`   | `/company-users`     | Create new user     |
| `PUT`    | `/company-users/:id` | Update user         |
| `PATCH`  | `/company-users/:id` | Partial update user |
| `DELETE` | `/company-users/:id` | Delete user         |

---

## 💾 Database Structure

The `db.json` file contains the user data structure:

```json
{
  "company-users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### User Fields

- **id** - Unique identifier (auto-generated)
- **name** - User's full name
- **email** - User's email address
- **role** - User role: `admin`, `manager`, or `user`
- **status** - Account status: `active` or `inactive`
- **createdAt** - Timestamp of user creation

---

## 🎨 Component Architecture

### User Modal Component

- Modes: `create`, `edit`, `view`
- Form validation for name and email
- Role and status selection
- Responsive design with close/save actions

### User Table Component

- Display users in a clean table format
- Action buttons: View, Edit, Delete
- Loading state and empty state handling
- Date formatting and user initials

### Confirm Modal Component

- Reusable confirmation dialog
- Used for delete and logout confirmations
- Customizable title, message, and button text

### Toast Component

- Success, error, warning, and info notifications
- Auto-hide after 8 seconds
- Smooth animations
- Pure JavaScript implementation for reliability

---

## 🔧 Configuration

### Port Configuration

If you need to change the default ports:

**API Port (default: 3000)**

```bash
npx json-server --watch db.json --port YOUR_PORT
```

Then update the API URL in `app/services/user.service.js`:

```javascript
var baseUrl = "http://localhost:YOUR_PORT/company-users";
```

**Dev Server Port (default: 8080)**

```bash
npx live-server --port=YOUR_PORT --entry-file=index.html
```

---

## 🐛 Troubleshooting

### Port Already in Use

If you get an error that the port is already in use:

```bash
# Find process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Find process using port 8080 (macOS/Linux)
lsof -ti:8080 | xargs kill -9
```

### JSON Server Not Found

Make sure you've installed dependencies:

```bash
npm install
```

### Styles Not Updating

Compile Sass manually:

```bash
npx sass app/styles/main.scss app/styles/main.css --no-source-map
```

---

## 📝 Development Tips

1. **Keep JSON Server Running** - The application requires the API to be running
2. **Use Browser DevTools** - Monitor network requests and console for debugging
3. **Sass Watch Mode** - Use `--watch` flag when actively developing styles
4. **Live Reload** - Live Server automatically reloads on file changes

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ using AngularJS

**[⬆ Back to Top](#-user-management-system)**

</div>
