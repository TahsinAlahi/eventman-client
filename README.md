# 🎉 [EventMan Client](https://eventman-client.vercel.app/)

EventMan is a modern volunteer event management platform where users can discover, create, and manage social impact events. This is the **frontend** built with **React**, styled with **Tailwind CSS**, and powered by **TanStack Query** for data management.

---

## 🔑 Credentials

- **Email**: `admin@gmail.com`
- **Password**: `Pa$$word`

## 🚀 Features

- 🔒 **Authentication**: Signup/Login with protected routes
- 📅 **Event Management**: Add, update, and view personal events
- 🔍 **Filter & Search**: Find events by keyword or date
- 🎨 **Framer Motion UI**: Smooth animations
- 🌐 **RESTful API** integration with secure Axios instance
- 🧠 **React Query**: Robust server state management

---

## 🛠️ Tech Stack

| Tech            | Description                    |
| --------------- | ------------------------------ |
| React           | Frontend framework (v19)       |
| Vite            | Lightning-fast bundler         |
| Tailwind CSS    | Utility-first styling          |
| TanStack Query  | Data fetching + caching        |
| Axios           | HTTP client                    |
| SweetAlert2     | Stylish alert dialogs          |
| Framer Motion   | Animation library              |
| React Hook Form | Form management and validation |
| React Hot Toast | Toast notifications            |
| React Router v7 | Route management               |
| ESLint          | Linting and code standards     |

---

## 🗺️ Routes Overview

The app uses **lazy-loaded components** with `Suspense` for improved performance. Below are the available routes:

| Path               | Access    | Description                       |
| ------------------ | --------- | --------------------------------- |
| `/`                | Public    | Home Page                         |
| `/signup`          | Public    | User registration                 |
| `/login`           | Public    | User login                        |
| `/events`          | Protected | Browse all events                 |
| `/add-event`       | Protected | Create a new event                |
| `/my-events`       | Protected | View and manage user's own events |
| `/update/:eventId` | Protected | Update a specific event           |
| `*`                | Public    | Error page for unknown routes     |

---

## 🧾 Installation

```bash
# Clone the repo
git clone https://github.com/TahsinAlahi/eventman-client.git
cd eventman-client

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 🖥️ Backend Repo

The backend repository can be found [here](https://github.com/TahsinAlahi/eventman-server).
