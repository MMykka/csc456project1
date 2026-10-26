# CLAUDE.md

University project: CSC456 Project 1 – E-commerce Web API. See [instruction.md](instruction.md) for the full requirements.

## Commands
- `npm install` – install dependencies
- `npm run dev` – run with nodemon (needs MongoDB running on `mongodb://localhost:27017`)
- `npm start` – run with node

## Architecture
Client → server.js → routes/ → controllers/ → models/ → database → `res.json()`
- MongoDB (Mongoose): User, Order, Product, Category (`*.model.js`)
- SQLite (Sequelize): Feedback (`models/feedback.js`, set up in `models/index.js`, file `ecommerce.sqlite`)

## Code style rules (must follow — the student explains every line in an oral exam)
- Keep code simple, short and beginner-friendly. Match the course slides.
- CommonJS only (`require`, `module.exports`, `exports.x = ...`). No ES modules, TypeScript, dotenv, validation libs, auth, Swagger.
- Only dependencies: express, mongoose, sequelize, sqlite3, cors, nodemon (dev).
- Controllers: `exports.fn = async (req, res) => { try { ... } catch (err) { res.status(..).json({ error: err.message }) } }`
- Comments above each function: `// CREATE`, `// READ ALL`, `// READ ONE`, `// UPDATE`, `// DELETE`.
- Mongoose methods allowed: create, find, findById, findOne, findByIdAndUpdate (with `{ new: true, runValidators: true }`), findByIdAndDelete, deleteMany, updateMany, populate, save.
- Sequelize methods allowed: create, findAll, findByPk, update, destroy.
- Status codes: 201 create, 200 read/update, 204 delete, 400 bad input/invalid id, 404 not found, 500 server error.
- No helper abstractions, no classes, no extra middleware layers.
- Never commit or zip `node_modules`.
