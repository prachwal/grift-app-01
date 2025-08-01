import { describe, it, expect, beforeEach } from 'vitest';
import { useUser, userSignal } from '../useUser';
import { renderHook, act } from '@testing-library/preact';

describe('useUser', () => {
    beforeEach(() => {
        // Reset user state before each test
        userSignal.value = null;
    });

    it('should initialize with null user', () => {
        const { result } = renderHook(() => useUser());

        expect(result.current.user.value).toBeNull();
    });

    it('should login user', () => {
        const { result } = renderHook(() => useUser());

        act(() => {
            result.current.login('John Doe');
        });

        expect(result.current.user.value).toEqual({ name: 'John Doe' });
    });

    it('should logout user', () => {
        const { result } = renderHook(() => useUser());

        // First login
        act(() => {
            result.current.login('John Doe');
        });

        expect(result.current.user.value).toEqual({ name: 'John Doe' });

        // Then logout
        act(() => {
            result.current.logout();
        });

        expect(result.current.user.value).toBeNull();
    });

    it('should create account', () => {
        const { result } = renderHook(() => useUser());

        act(() => {
            result.current.createAccount('Jane Smith');
        });

        expect(result.current.user.value).toEqual({ name: 'Jane Smith' });
    });

    it('should maintain state across multiple hook instances', () => {
        const { result: result1 } = renderHook(() => useUser());
        const { result: result2 } = renderHook(() => useUser());

        act(() => {
            result1.current.login('Shared User');
        });

        // Both instances should see the same user
        expect(result1.current.user.value).toEqual({ name: 'Shared User' });
        expect(result2.current.user.value).toEqual({ name: 'Shared User' });
    });
});
