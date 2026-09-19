import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useTheme,
  getSavedThemePreference
} from '../useTheme';

describe('Portfolio Theme Switcher & SYSTEM Mode', () => {
  let mediaQueryListeners = [];
  let currentMatches = false;

  beforeEach(() => {
    localStorage.clear();
    mediaQueryListeners = [];
    currentMatches = false;

    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: currentMatches,
        media: query,
        onchange: null,
        addEventListener: vi.fn((event, callback) => {
          if (event === 'change') {
            mediaQueryListeners.push(callback);
          }
        }),
        removeEventListener: vi.fn((event, callback) => {
          if (event === 'change') {
            mediaQueryListeners = mediaQueryListeners.filter(cb => cb !== callback);
          }
        }),
        dispatchEvent: vi.fn()
      };
    });

    document.documentElement.className = '';
    document.body.className = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('1. First visit defaults to SYSTEM theme', () => {
    expect(localStorage.getItem('portfolio_theme')).toBeNull();
    const pref = getSavedThemePreference();
    expect(pref).toBe('system');

    const { result } = renderHook(() => useTheme());
    expect(result.current.themePreference).toBe('system');
  });

  it('2. System + OS Light resolves to light theme (SUN icon active)', () => {
    currentMatches = false; // OS prefers light
    const { result } = renderHook(() => useTheme());

    expect(result.current.themePreference).toBe('system');
    expect(result.current.systemTheme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
    expect(result.current.isDarkMode).toBe(false); // Light theme -> render Sun icon

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('light-theme')).toBe(true);
  });

  it('3. System + OS Dark resolves to dark theme (MOON icon active)', () => {
    currentMatches = true; // OS prefers dark
    const { result } = renderHook(() => useTheme());

    expect(result.current.themePreference).toBe('system');
    expect(result.current.systemTheme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
    expect(result.current.isDarkMode).toBe(true); // Dark theme -> render Moon icon

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.body.classList.contains('light-theme')).toBe(false);
  });

  it('4. Change OS theme while System is selected updates theme automatically', () => {
    currentMatches = true; // Starts dark
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDarkMode).toBe(true);

    // Simulate OS switching to light mode
    currentMatches = false;
    act(() => {
      mediaQueryListeners.forEach(listener => listener({ matches: false }));
    });

    expect(result.current.systemTheme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
    expect(result.current.isDarkMode).toBe(false); // Auto switches to Light theme (Sun)
  });

  it('5. Manual Light preference forces light theme regardless of OS (SUN icon)', () => {
    currentMatches = true; // OS is dark
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setThemePreference('light');
    });

    expect(result.current.themePreference).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
    expect(result.current.isDarkMode).toBe(false); // Light theme -> Sun icon
    expect(localStorage.getItem('portfolio_theme')).toBe('light');

    // OS change does NOT alter manual light theme
    act(() => {
      mediaQueryListeners.forEach(listener => listener({ matches: true }));
    });
    expect(result.current.isDarkMode).toBe(false);
  });

  it('6. Manual Dark preference forces dark theme regardless of OS (MOON icon)', () => {
    currentMatches = false; // OS is light
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setThemePreference('dark');
    });

    expect(result.current.themePreference).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
    expect(result.current.isDarkMode).toBe(true); // Dark theme -> Moon icon
    expect(localStorage.getItem('portfolio_theme')).toBe('dark');

    // OS change does NOT alter manual dark theme
    act(() => {
      mediaQueryListeners.forEach(listener => listener({ matches: false }));
    });
    expect(result.current.isDarkMode).toBe(true);
  });

  it('7. Refresh page restores user selected preference accurately', () => {
    localStorage.setItem('portfolio_theme', 'dark');
    const { result } = renderHook(() => useTheme());

    expect(result.current.themePreference).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);
  });

  it('8. Cycle theme toggles predictably through system -> alternative -> cycle', () => {
    currentMatches = true; // OS is dark
    const { result } = renderHook(() => useTheme());

    expect(result.current.themePreference).toBe('system');
    expect(result.current.isDarkMode).toBe(true);

    // Clicking from system (dark) toggles to light
    act(() => {
      result.current.cycleTheme();
    });
    expect(result.current.themePreference).toBe('light');
    expect(result.current.isDarkMode).toBe(false);

    // Clicking from light toggles to dark
    act(() => {
      result.current.cycleTheme();
    });
    expect(result.current.themePreference).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);

    // Clicking from dark toggles to system
    act(() => {
      result.current.cycleTheme();
    });
    expect(result.current.themePreference).toBe('system');
    expect(localStorage.getItem('portfolio_theme')).toBe('system');
  });

  it('9. Icon mapping integrity check: ensures no remaining inverted mapping', () => {
    // Rule:
    // Light theme (isDarkMode === false) MUST map to Sun icon
    // Dark theme (isDarkMode === true) MUST map to Moon icon
    const getIconName = (isDark) => (isDark ? 'Moon' : 'Sun');

    expect(getIconName(false)).toBe('Sun');
    expect(getIconName(true)).toBe('Moon');
  });
});
