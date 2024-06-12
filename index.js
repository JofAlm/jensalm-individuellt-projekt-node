import express from "express";
import menuRouter from "./src/routes/menu.js";
import aboutRouter from "./src/routes/companyInfo.js";
import orderRouter from "./src/routes/order.js";
import userRouter from "./src/routes/users.js";
import cartRouter from "./src/routes/cart.js";
import adminRouter from "./src/routes/admin.js";
import { menuDb } from './src/config/db.js';
import { menu } from './src/config/data.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use("/menu", menuRouter);
app.use("/about", aboutRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);

// Funktion för att initialisera data
async function initializeData() {
  const existingProducts = await menuDb.find({});
  if (existingProducts.length === 0) {
    // Om databasen är tom, fyll den med förifyllda produkter
    await menuDb.insert(menu);
    console.log('Initialized menu with default products');
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  initializeData(); // Anropa initialiseringen här
});
