// Shop module for browsing, purchasing, and inventory management
import { apiRequest } from "../utils.js";

export async function loadShopCategories() {
  await apiRequest("shop/categories/");
  // ...render categories...
}

export async function loadShopItems(categoryId) {
  await apiRequest(`shop/items/?category=${categoryId}`);
  // ...render items...
}

export async function purchaseItem(itemId) {
  try {
    await apiRequest("shop/purchase/", {
      method: "POST",
      body: JSON.stringify({ item_id: itemId }),
    });
    // ...show purchase confirmation...
  } catch (err) {
    // ...handle error...
  }
}

export async function loadInventory() {
  await apiRequest("shop/inventory/");
  // ...render user inventory...
}

export async function loadPurchaseHistory() {
  await apiRequest("shop/purchases/");
  // ...render purchase history...
}
// ...other shop utilities...
