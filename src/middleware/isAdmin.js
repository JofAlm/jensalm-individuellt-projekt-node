// Middleware-funktion som kontrollerar om användaren har administratörsroll
function isAdmin(req, res, next) {
  // Kontrollera om användaren är autentiserad och har rollen "admin"
  if (req.user && req.user.role === "admin") {
    // Gå vidare till nästa middleware eller route-handler
    next();
  } else {
     // Om användaren inte är admin, skicka tillbaka ett felmeddelande
    res.status(403).json({ error: "Access denied. Admins only." });
  }
}

export { isAdmin };
