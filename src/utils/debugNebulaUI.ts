/**
 * @fileoverview Debug tool to check preact-nebula-ui import status
 * @packageDocumentation
 */

import { logError, logInfo } from '../utils/logger';

export function debugNebulaUI() {
    logInfo('=== DEBUGGING PREACT-NEBULA-UI ===');

    try {
        logInfo('Attempting to import preact-nebula-ui...');
        // Skip actual import due to hooks context issues
        logInfo('Skipping preact-nebula-ui import due to known hooks context incompatibility');

        logError('preact-nebula-ui has hooks context issues - using fallback components');
        return null;
    } catch (error) {
        logError('Failed to import preact-nebula-ui', error);
        return null;
    }
}

// Run debug on import
export const nebulaUIDebugResult = debugNebulaUI();
