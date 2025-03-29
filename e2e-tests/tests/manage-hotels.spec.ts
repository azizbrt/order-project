import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.waitForLoadState("networkidle"); // Wait until everything is loaded

  // Click on the "Sign In" link (it matches "sign in" or "connexion")
  await page.getByRole("link", { name: /sign in|connexion/i }).click();
  
  // Check that the Sign In page is visible
  await expect(page.getByRole("heading", { name: /connexion/i })).toBeVisible();

  // Fill in the login form with email and password
  await page.locator("[name=email]").fill("user4@gmail.com");
  await page.locator("[name=password]").fill("password123");
  
  // Click the "Login" button
  await page.getByRole("button", { name: /se connecter/i }).click();

  // Check that the login was successful by verifying the confirmation message
  await expect(page.getByText("Connexion réussie !")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  // Navigate to the add-hotel page
  await page.goto(`${UI_URL}add-hotel`);
  await page.waitForLoadState("networkidle");

  // Fill out the hotel form:
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page.locator('[name="description"]').fill("Test Description");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  // Select additional options:
  await page.getByText("Budget").click(); // Select hotel type "Budget"
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  // Fill in guest counts:
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  // Upload images (ensure these files exist in the correct folder):
  await page.setInputFiles('[name="imagesUrls"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
    path.join(__dirname, "files", "3.jpg"),
  ]);

  // Click the Save button (button labeled "Enregistrer" or "Save")
  await page.getByRole("button", { name: /enregistrer|save/i }).click();

  // Verify that the success message is visible
  await expect(page.getByText("Hôtel ajouté avec succès ��")).toBeVisible({ timeout: 12000 });
});
