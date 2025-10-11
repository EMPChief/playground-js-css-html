import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open add task modal when button clicked', async ({ page }) => {
    await page.locator('#add-task-btn').click();

    // Modal should be visible
    await expect(page.locator('.modal-overlay')).toBeVisible();
    await expect(page.locator('.modal-content')).toContainText('Add New Task');
  });

  test('should open add task modal with keyboard shortcut', async ({ page }) => {
    await page.keyboard.press('n');

    // Modal should be visible
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });

  test('should add a new task', async ({ page }) => {
    // Open modal
    await page.locator('#add-task-btn').click();

    // Fill form
    await page.locator('#modal-task-input').fill('Test Task');
    await page.locator('#modal-pomodoro-count').fill('2.5');
    await page.locator('#modal-task-category').selectOption('WORK');
    await page.locator('#modal-task-notes').fill('Test notes');

    // Submit
    await page.locator('.modal-content button[type="submit"]').click();

    // Task should appear in list
    await expect(page.locator('.task-list li')).toHaveCount(1);
    await expect(page.locator('.task-text')).toContainText('Test Task');
  });

  test('should validate task form', async ({ page }) => {
    await page.locator('#add-task-btn').click();

    // Try to submit empty form
    await page.locator('.modal-content button[type="submit"]').click();

    // Should show validation error (form won't submit due to required)
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });

  test('should delete a task with undo option', async ({ page }) => {
    // Add a task first
    await page.locator('#add-task-btn').click();
    await page.locator('#modal-task-input').fill('Task to delete');
    await page.locator('#modal-pomodoro-count').fill('1');
    await page.locator('.modal-content button[type="submit"]').click();

    // Delete the task
    await page.locator('.delete-btn').click();

    // Undo notification should appear
    await expect(page.locator('.undo-notification')).toBeVisible();

    // Task should be gone
    await expect(page.locator('.task-list li')).toHaveCount(0);
  });

  test('should edit a task', async ({ page }) => {
    // Add a task
    await page.locator('#add-task-btn').click();
    await page.locator('#modal-task-input').fill('Original Task');
    await page.locator('#modal-pomodoro-count').fill('1');
    await page.locator('.modal-content button[type="submit"]').click();

    // Edit the task
    await page.locator('.edit-btn').click();

    // Modal should open with pre-filled data
    await expect(page.locator('#modal-task-input')).toHaveValue('Original Task');
  });
});
