import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'portfolio_theme';

/**
 * Retrieve saved theme preference from localStorage.
 * Defaults to 'system' on first visit or invalid values.
 */
export const getSavedThemePreference = () => {
  if (typeof window === 'undefined') return 'system';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 'system';
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    // Backward compatibility for legacy boolean values
    if (saved === 'true' || saved === '"true"') return 'dark';
    if (saved === 'false' || saved === '"false"') return 'light';
    return 'system';
  } catch {
    return 'system';
  }
};

/**
 * Detect OS/Browser preferred color scheme.
 */
export const getSystemTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
};

/**
 * Resolve effective active theme ('dark' | 'light') based on preference and OS state.
 */
export const resolveEffectiveTheme = (preference, currentSystemTheme) => {
  if (preference === 'system') {
    return currentSystemTheme;
  }
  return preference === 'light' ? 'light' : 'dark';
};

/**
 * Synchronize document root and body classes with the resolved theme.
 */
export const applyThemeToDOM = (effectiveTheme) => {
  if (typeof document === 'undefined') return;
  const isDark = effectiveTheme === 'dark';
  const root = document.documentElement;
  if (isDark) {
    root.classList.remove('light');
    root.classList.add('dark');
    if (document.body) {
      document.body.classList.remove('light-theme');
    }
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    if (document.body) {
      document.body.classList.add('light-theme');
    }
  }
};

/**
 * Custom hook providing robust theme state management with SYSTEM preference support.
 */
export const useTheme = () => {
  const [themePreference, setThemePreferenceState] = useState(getSavedThemePreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // Live listener for OS theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleOSChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleOSChange);
    return () => mediaQuery.removeEventListener('change', handleOSChange);
  }, []);

  const resolvedTheme = resolveEffectiveTheme(themePreference, systemTheme);
  const isDarkMode = resolvedTheme === 'dark';

  // Apply to DOM on theme change
  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme]);

  // Set explicit preference & persist
  const setThemePreference = useCallback((pref) => {
    const validPref = (pref === 'light' || pref === 'dark' || pref === 'system') ? pref : 'system';
    setThemePreferenceState(validPref);
    try {
      localStorage.setItem(STORAGE_KEY, validPref);
    } catch (e) {
      console.warn("Theme storage write error:", e);
    }
  }, []);

  // Predictable 3-way toggle cycle:
  // - When 'system': switch away from current resolved appearance to the opposite
  // - When 'light': switch to 'dark'
  // - When 'dark': switch to 'system'
  const cycleTheme = useCallback(() => {
    setThemePreferenceState((prev) => {
      let next;
      if (prev === 'system') {
        next = resolvedTheme === 'dark' ? 'light' : 'dark';
      } else if (prev === 'light') {
        next = 'dark';
      } else {
        next = 'system';
      }
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        console.warn("Theme storage write error:", e);
      }
      return next;
    });
  }, [resolvedTheme]);

  return {
    themePreference,
    setThemePreference,
    systemTheme,
    resolvedTheme,
    isDarkMode,
    cycleTheme,
  };
};

export default useTheme;
