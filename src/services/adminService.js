import { menuDb } from '../config/db.js'; // menuDb för menydata

// Funktion för att lägga till en ny produkt i menyn
async function addProduct(req, res) {
  const { id, title, desc, price } = req.body;

  if (!id || !title || !desc || !price) {
    return res.status(400).json({ error: 'All product properties (id, title, desc, price) are required' });
  }

  const newProduct = {
    id,
    title,
    desc,
    price,
    createdAt: new Date()
  };

  try {
    await menuDb.insert(newProduct);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product', details: error.message });
  }
}

// Funktion för att modifiera en produkt i menyn
async function updateProduct(req, res) {
  const { id, title, desc, price } = req.body;

  if (!id || !title || !desc || !price) {
    return res.status(400).json({ error: 'All product properties (id, title, desc, price) are required' });
  }

  try {
    const updatedProduct = {
      title,
      desc,
      price,
      modifiedAt: new Date()
    };

    const result = await menuDb.update({ id: id }, { $set: updatedProduct }, { returnUpdatedDocs: true });

    if (result.numAffected === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: result.updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
}

// Funktion för att ta bort en produkt i menyn
async function deleteProduct(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    const numRemoved = await menuDb.remove({ id: parseInt(id) }, {});
    if (numRemoved === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product', details: error.message });
  }
}

// Funktion för att hämta alla produkter i menyn
async function getAllProducts(req, res) {
  try {
    const products = await menuDb.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
  }
}

export { addProduct, updateProduct, deleteProduct, getAllProducts };
