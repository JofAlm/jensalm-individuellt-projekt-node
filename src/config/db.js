// Skapar databaser för kundvagn, beställningar, användare, meny och kampanjer
import nedb from "nedb-promises";

const cartDb = new nedb({ filename: "cart.db", autoload: true });
const orderDb = new nedb({ filename: "orders.db", autoload: true });
const userDb = new nedb({ filename: "users.db", autoload: true });
const menuDb = new nedb({ filename: "menu.db", autoload: true });
const campaignDb = new nedb({ filename: 'campaign.db', autoload: true });

export { cartDb, orderDb, userDb, menuDb, campaignDb };
