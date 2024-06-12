// Importera databasinstanser för menyn och kampanjer
import { menuDb, campaignDb } from '../config/db.js';

// Funktion för att lägga till en kampanj
async function addCampaign(req, res) {
  const { products, campaignPrice } = req.body;
  // Kontrollera att kampanjdata är giltig
  if (!products || !Array.isArray(products) || products.length === 0 || !campaignPrice) {
    return res.status(400).json({ error: 'Invalid campaign data' });
  }

  // Validera att alla produkter i kampanjen finns i menyn
  const validProducts = await menuDb.find({ id: { $in: products } });
  if (validProducts.length !== products.length) {
    return res.status(400).json({ error: 'One or more products do not exist' });
  }
  // Skapa en ny kampanj med aktuella datum och tid
  const newCampaign = {
    products,
    campaignPrice,
    createdAt: new Date()
  };

  try {
    // Lägg till den nya kampanjen i kampanjdatabasen
    await campaignDb.insert(newCampaign);
    res.status(201).json({ message: 'Campaign added successfully', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add campaign', details: error.message });
  }
}

export { addCampaign };
