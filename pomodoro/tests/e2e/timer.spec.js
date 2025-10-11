import { test, expect } from '@playwright/test';

test.describe('Pomodoro Timer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the timer with initial state', async ({ page }) => {
    // Check timer is visible
    await expect(page.locator('#timer')).toBeVisible();
    await expect(page.locator('#timer')).toHaveText('25:00');

    // Check phase indicator
    await expect(page.locator('#phase-indicator')).toHaveText('Working');

    // Check buttons are present
    await expect(page.locator('#start-button')).toBeVisible();
    await expect(page.locator('#reset-button')).toBeVisible();
    await expect(page.locator('#sound-toggle')).toBeVisible();
    await expect(page.locator('#auto-start-toggle')).toBeVisible();
  });

  test('should start and pause the timer', async ({ page }) => {
    const startButton = page.locator('#start-button');

    // Start timer
    await startButton.click();
    await expect(startButton).toContainText('Pause');

    // Wait a bit and check time changed
    await page.waitForTimeout(2000);
    const timerText = await page.locator('#timer').textContent();
    expect(timerText).not.toBe('25:00');

    // Pause timer
    await startButton.click();
    await expect(startButton).toContainText('Start');
  });

  test('should reset the timer', async ({ page }) => {
    // Start and wait
    await page.locator('#start-button').click();
    await page.waitForTimeout(2000);

    // Reset
    await page.locator('#reset-button').click();

    // Should be back to 25:00
    await expect(page.locator('#timer')).toHaveText('25:00');
    await expect(page.locator('#start-button')).toContainText('Start');
  });

  test('should toggle auto-start mode', async ({ page }) => {
    const autoButton = page.locator('#auto-start-toggle');

    await expect(autoButton).toContainText('Auto');

    await autoButton.click();
    await expect(autoButton).toContainText('Manual');

    await autoButton.click();
    await expect(autoButton).toContainText('Auto');
  });
});
