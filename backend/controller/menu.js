import { promises as fs } from 'fs';
const dataFilePath = "../frontend/src/dishes.json";

// Read data from file
const readDataFromFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist yet, return a default structure
    if (error.code === "ENOENT") {
      return { dishes: [] };
    }
    throw error;
  }
};

// Write data to the file
const writeDataToFile = async (data) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// Get all dishes
export const get_dishes = async (req, res, next) => {
  try {
    const data = await readDataFromFile();
    res.json(data.dishes);
  } catch (error) {
    console.error("Error reading data:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Add a new dish
export const add_dish = async (req, res, next) => {
  try {
    const newDish = req.body;
    const data = await readDataFromFile();

    // Assign a unique ID to the new dish
    newDish.id = data.dishes.length > 0 ? data.dishes[data.dishes.length - 1].id + 1 : 1;

    // Add the new dish to the existing array
    data.dishes.push(newDish);

    // Write the updated data back to the file
    await writeDataToFile(data);

    res.json(newDish);
  } catch (error) {
    console.error("Error creating data:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Update an existing dish by ID
export const update_dish = async (req, res, next) => {
  try {
    const updatedDish = req.body;
    const data = await readDataFromFile();

    // Find the index of the dish with the specified ID
    const dishIndex = data.dishes.findIndex((dish) => dish.id === parseInt(req.params.id, 10));

    // If the ID is not found, return a 404 error
    if (dishIndex === -1) {
      res.status(404).send("Dish not found");
      return;
    }

    // Update the dish at the specified index
    data.dishes[dishIndex] = { ...data.dishes[dishIndex], ...updatedDish };

    // Write the updated data back to the file
    await writeDataToFile(data);

    res.json(data.dishes[dishIndex]);
  } catch (error) {
    console.error("Error updating data:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a dish by ID
export const delete_dish = async (req, res, next) => {
  try {
    const data = await readDataFromFile();

    // Find the index of the dish with the specified ID
    const dishIndex = data.dishes.findIndex((dish) => dish.id === parseInt(req.params.id, 10));
    

    // If the ID is not found, return a 404 error
    if (dishIndex === -1) {
      res.status(404).send("Dish not found");
      return;
    }

    // Remove the dish at the specified index
    const deletedDish = data.dishes.splice(dishIndex, 1)[0];

    // Write the updated data back to the file
    await writeDataToFile(data);

    res.json(deletedDish);
  } catch (error) {
    console.error("Error deleting data:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
