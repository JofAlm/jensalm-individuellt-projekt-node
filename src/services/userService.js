import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userDb } from "../config/db.js"; // userDb för användardata

// Funktion för att registrera en ny användare
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
        // Kontrollera om användarnamnet redan existerar
        const existingUser = await userDb.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists' });
        }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };

    // Försök att lägga till den nya användaren i databasen
    const newUser = await userDb.insert(user);
    // Om det lyckas, returnera den nya användaren
    res.status(201).json(newUser);
  } catch (error) {
    // Om ett fel uppstår, returnera ett felmeddelande
    res.status(400).json({ error: "Failed to register user" });
  }
}

const SECRET_KEY = "your-secret-key"; 
// Hårdkodad admin-användare
const adminUser = {
  id: "admin_id", 
  username: "admin",
  password: "adminpassword", 
  role: "admin",
};

async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Kontrollera om det är admin-användaren som försöker logga in
    if (username === adminUser.username && password === adminUser.password) {
      const token = jwt.sign(
        {
          id: adminUser.id,
          username: adminUser.username,
          role: adminUser.role,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Login successful", token });
    }

    const user = await userDb.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
}

export { registerUser, loginUser };
