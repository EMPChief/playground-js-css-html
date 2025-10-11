/**
 * Browser and in-app notification system
 * Handles permission requests and notification display
 */

import { NOTIFICATION_CONFIG } from './config.js';
import { showBrowserNotification, requestNotificationPermission } from './utils.js';

let notificationsEnabled = NOTIFICATION_CONFIG.ENABLED;
let hasPermission = false;

/**
 * Initializes notification system and requests permission if needed
 * @returns {Promise<boolean>} - Whether notifications are available
 */
export async function initNotifications() {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      hasPermission = true;
      return true;
    } else if (Notification.permission === 'default') {
      hasPermission = await requestNotificationPermission();
      return hasPermission;
    }
  }
  return false;
}

/**
 * Enables notifications
 */
export function enableNotifications() {
  notificationsEnabled = true;
}

/**
 * Disables notifications
 */
export function disableNotifications() {
  notificationsEnabled = false;
}

/**
 * Toggles notification state
 * @returns {boolean} - New notification state
 */
export function toggleNotifications() {
  notificationsEnabled = !notificationsEnabled;
  return notificationsEnabled;
}

/**
 * Checks if notifications are enabled
 * @returns {boolean} - Notification state
 */
export function areNotificationsEnabled() {
  return notificationsEnabled && hasPermission;
}

/**
 * Sends notification when work session completes
 */
export function notifyWorkComplete() {
  if (!areNotificationsEnabled()) return;

  showBrowserNotification(
    NOTIFICATION_CONFIG.WORK_COMPLETE_TITLE,
    NOTIFICATION_CONFIG.WORK_COMPLETE_BODY,
    NOTIFICATION_CONFIG.ICON
  );
}

/**
 * Sends notification when break completes
 */
export function notifyBreakComplete() {
  if (!areNotificationsEnabled()) return;

  showBrowserNotification(
    NOTIFICATION_CONFIG.BREAK_COMPLETE_TITLE,
    NOTIFICATION_CONFIG.BREAK_COMPLETE_BODY,
    NOTIFICATION_CONFIG.ICON
  );
}

/**
 * Sends custom notification
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 */
export function notifyCustom(title, body) {
  if (!areNotificationsEnabled()) return;

  showBrowserNotification(title, body, NOTIFICATION_CONFIG.ICON);
}
