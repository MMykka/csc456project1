# E-commerce Web API – CSC456 Project 1

A backend Web API built with **Node.js + Express**.
- **MongoDB + Mongoose** stores Users, Orders, Products and Categories.
- **SQLite + Sequelize** stores Feedback (one standalone table).

## How to install and run
1. Install Node.js and MongoDB.
2. Start MongoDB (it must run on `mongodb://localhost:27017`).
3. In the project folder:
   ```
   npm install
   npm run dev
   ```
   (`npm start` runs it without nodemon.)
4. The API runs on `http://localhost:3000`. The SQLite file `ecommerce.sqlite` is created automatically.
5. Import `Ecommerce_API.postman_collection.json` into Postman and run the folders in order.

## Folder structure
```
server.js                  app setup, middleware, routes, DB connections
routes/                    URL -> controller function
controllers/               the logic of each endpoint
models/
  user.model.js            Mongoose User
  order.model.js           Mongoose Order (many-to-one with User)
  product.model.js         Mongoose Product (many-to-many with Category)
  category.model.js        Mongoose Category
  feedback.js              Sequelize Feedback model
  index.js                 Sequelize connection to SQLite
Ecommerce_API.postman_collection.json
```
Request flow: **Client → server.js → Router → Controller → Model → Database → `res.json()`**

## Relationships
- **Many-to-one:** many Orders → one User. Each order stores the user's `_id` in `user`.
- **Many-to-many:** Products ↔ Categories. A product stores an array of category ids and a category stores an array of product ids. Linking pushes the id into both arrays; unlinking pulls it from both.

## Endpoints
| Method | Route | Description |
|---|---|---|
| POST / GET | `/api/users` | create / list users |
| GET / PUT / DELETE | `/api/users/:id` | read / update / delete a user (delete also removes their orders) |
| GET | `/api/users/:id/orders` | all orders of one user |
| POST / GET | `/api/orders` | create (user must exist) / list orders (user and products populated) |
| GET / PUT / DELETE | `/api/orders/:id` | read (populated) / update / delete an order |
| POST / GET | `/api/products` | create / list products (categories populated) |
| GET / PUT / DELETE | `/api/products/:id` | read (populated) / update / delete a product (delete pulls it from categories) |
| POST / GET | `/api/categories` | create / list categories |
| GET / PUT / DELETE | `/api/categories/:id` | read (products populated) / update / delete a category (delete pulls it from products) |
| POST | `/api/products/:productId/categories/:categoryId` | link a product and a category |
| DELETE | `/api/products/:productId/categories/:categoryId` | unlink a product and a category |
| POST / GET | `/api/feedback` | create / list feedback (SQLite) |
| GET / PUT / DELETE | `/api/feedback/:id` | read / update / delete feedback |

Status codes: `201` created, `200` OK, `204` deleted, `400` bad input or invalid id, `404` not found, `500` server error.

## NoSQL vs SQL
| | SQL (SQLite + Sequelize) | NoSQL (MongoDB + Mongoose) |
|---|---|---|
| Schema flexibility | Fixed schema: tables and columns are defined first | Flexible documents: fields can change, arrays are allowed |
| Querying | SQL queries, joins between tables | Methods like `find`, `findById`; `populate` to fill in referenced documents |
| Relationships | Strong relationships with foreign keys and joins | Handled at app level with refs (`ObjectId`) and `populate` |
| Use cases | Structured, stable data (logs, reports, banking) | Data that changes often (products, catalogs, user profiles) |

**Why Feedback is in SQLite:** Feedback is simple, structured data with always the same columns (name, message, rating) and no relation to other entities, so a fixed SQL table fits it well. SQLite is just a file, so it needs no server.

**Why the rest is in MongoDB:** users, orders, products and categories are related to each other and can change shape (e.g. a product can have many categories stored as an array), so flexible documents with refs and `populate` fit them well.
