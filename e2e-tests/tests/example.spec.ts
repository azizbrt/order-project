import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  await page.waitForLoadState("networkidle"); // ✅ Attendre que tout soit chargé

  // Cliquer sur le bouton de connexion
  await page.getByRole("link", { name: /sign in|connexion/i }).click();
  await expect(page.getByRole("heading", { name: /connexion/i })).toBeVisible();

  // Remplir le formulaire
  await page.locator("[name=email]").fill("user4@gmail.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", { name: /se connecter/i }).click();

  // Vérifier si l'utilisateur est bien authentifié
  await page.waitForTimeout(2000); // ✅ Petite pause pour voir si le problème vient d’un délai

  console.log(await page.textContent("body")); // ✅ Voir tout le texte affiché
  await expect(page.getByText("Connexion réussie !")).toBeVisible({ timeout: 5000 });
});
