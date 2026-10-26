# Project Instructions – CSC456 Project 1 (E-commerce Web API)

## Goal (from the project PDF)
Build a backend **Web API** with **Node.js + Express** that supports **CRUD** for multiple entities.
- **MongoDB + Mongoose** for most entities (at least 3), with:
  - at least one **many-to-one** relationship
  - at least one **many-to-many** relationship
- **SQLite + Sequelize** for one **standalone** table.
- Test every route with **Postman** and export the collection as JSON.
- Compare **NoSQL vs SQL** (schema flexibility, querying, use cases).
- Submit the project folder **without `node_modules`**.
- Graded by an **oral interview**: I must explain every line.

## Domain: E-commerce

### MongoDB entities
| Entity | Fields |
|---|---|
| User | name (required, trim), email (required, unique), age (Number) |
| Order | user (ref User, required), products ([ref Product]), totalPrice (min 0), status (default 'pending') |
| Product | name (required, trim), price (required, min 0), stock (min 0, default 0), categories ([ref Category]) |
| Category | name (required, unique, trim), products ([ref Product]) |

### Relationships
- **Many-to-one:** many Orders → one User (Order stores `user` id).
- **Many-to-many:** Products ↔ Categories (both store arrays of ids; link/unlink updates both sides).

### SQLite entity
- Feedback: id (auto increment PK), name (required), message (required), rating (1–5), timestamps.

## Tech (only these)
express, mongoose, sequelize, sqlite3, cors, nodemon (dev). CommonJS only.

## Endpoints
Full CRUD on `/api/users`, `/api/orders`, `/api/products`, `/api/categories`, `/api/feedback`, plus:
- `GET /api/users/:id/orders`
- `POST /api/products/:productId/categories/:categoryId` (link)
- `DELETE /api/products/:productId/categories/:categoryId` (unlink)
- Orders and products are returned populated; one category is returned with its products populated.

## Rules
- Create order → user must exist (404 otherwise).
- Delete user → delete their orders.
- Delete product → `$pull` its id from all categories.
- Delete category → `$pull` its id from all products.
- Status codes: 201 create, 200 read/update, 204 delete, 400 bad input/invalid id, 404 not found, 500 server error.

## Deliverables checklist
- [ ] Source code (server.js, routes/, controllers/, models/)
- [ ] package.json with `start` and `dev` scripts
- [ ] README.md (install, run, structure, endpoints, NoSQL vs SQL)
- [ ] Ecommerce_API.postman_collection.json (v2.1)
- [ ] No node_modules in the zip
