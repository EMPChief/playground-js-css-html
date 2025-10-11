import { test, expect } from '@playwright/test';

test.describe('UI Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show toolbar buttons', async ({ page }) => {
    const toolbar = page.locator('.pomodoro-toolbar');

    await expect(toolbar).toBeVisible();
    await expect(page.locator('#stats-btn')).toBeVisible();
    await expect(page.locator('#settings-btn')).toBeVisible();
    await expect(page.locator('#sounds-btn')).toBeVisible();
    await expect(page.locator('#shortcuts-btn')).toBeVisible();
  });

  test('should open statistics dashboard', async ({ page }) => {
    await page.locator('#stats-btn').click();

    await expect(page.locator('.modal-content')).toContainText('Statistics');
    await expect(page.locator('.stats-grid')).toBeVisible();
  });

  test('should open settings panel', async ({ page }) => {
    await page.locator('#settings-btn').click();

    await expect(page.locator('.modal-content')).toContainText('Settings');
    await expect(page.locator('#work-duration')).toBeVisible();
  });

  test('should open sound preview', async ({ page }) => {
    await page.locator('#sounds-btn').click();

    await expect(page.locator('.modal-content')).toContainText('Alarm Sounds');
    await expect(page.locator('.preview-sound-btn').first()).toBeVisible();
  });

  test('should show keyboard shortcuts', async ({ page }) => {
    // Test both methods
    await page.locator('#shortcuts-btn').click();
    await expect(page.locator('.shortcuts-table')).toBeVisible();

    // Close modal
    await page.locator('.modal-close').click();

    // Test keyboard shortcut
    await page.keyboard.press('?');
    await expect(page.locator('.shortcuts-table')).toBeVisible();
  });

  test('should display circular progress', async ({ page }) => {
    const progressCircle = page.locator('#progress-circle-fill');
    await expect(progressCircle).toBeVisible();

    // Get initial stroke-dashoffset
    const initialOffset = await progressCircle.getAttribute('style');

    // Start timer
    await page.locator('#start-button').click();
    await page.waitForTimeout(2000);

    // Progress should have changed
    const newOffset = await progressCircle.getAttribute('style');
    expect(newOffset).not.toBe(initialOffset);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.locator('.pomodoro-container')).toBeVisible();
    await expect(page.locator('.task-container')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    await expect(page.locator('.pomodoro-container')).toBeVisible();
    await expect(page.locator('.task-container')).toBeVisible();
  });
});
