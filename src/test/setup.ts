import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/preact';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Add custom matchers
declare global {
    namespace Vi {
        interface JestAssertion<T = any> extends jest.Matchers<void, T> { }
    }
}
