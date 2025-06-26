// Shop module for browsing, purchasing, and inventory management
import { apiRequest } from "../Config/auth-sdk.js";

export async function loadShopCategories() {
  const data = await apiRequest("shop/categories/");
  // ...render categories...
}

export async function loadShopItems(categoryId) {
  const data = await apiRequest(`shop/items/?category=${categoryId}`);
  // ...render items...
}

export async function purchaseItem(itemId) {
  try {
    const data = await apiRequest("shop/purchase/", {
      method: "POST",
      body: JSON.stringify({ item_id: itemId }),
    });
    // ...show purchase confirmation...
  } catch (err) {
    // ...handle error...
  }
}

export async function loadInventory() {
  const data = await apiRequest("shop/inventory/");
  // ...render user inventory...
}

export async function loadPurchaseHistory() {
  const data = await apiRequest("shop/purchases/");
  // ...render purchase history...
}
// ...other shop utilities...
