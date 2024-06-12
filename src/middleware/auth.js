// Middleware-funktion som autentiserar användaren genom att kontrollera om det finns en aktuell inloggad användare
// Om ingen användare är inloggad, skickar den ett felmeddelande

const authenticate = (req, res, next) => {
  if (global.currentUser) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "You have to be logged in to view your order history",
      status: 401,
    });
  }
};

export default authenticate;
