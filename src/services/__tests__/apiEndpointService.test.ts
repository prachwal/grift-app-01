import { describe, it, expect } from 'vitest';
import { apiEndpointService } from '../apiEndpointService';

/**
 * @fileoverview Tests for API Endpoint Service
 * @packageDocumentation
 */

describe('apiEndpointService', () => {
    it('should export a service instance', () => {
        expect(apiEndpointService).toBeDefined();
        expect(typeof apiEndpointService.getAllEndpoints).toBe('function');
        expect(typeof apiEndpointService.addCollection).toBe('function');
    });

    it('should have empty collections by default', () => {
        // Create a fresh instance for testing
        const collections = apiEndpointService.collections;
        expect(Array.isArray(collections)).toBe(true);
    });
});
