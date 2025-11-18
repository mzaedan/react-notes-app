import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import { useLanguage } from '../context/LanguageContext';

// Test component that uses the language context
function TestComponent() {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <div>
      <span data-testid="language-display">{language}</span>
      <button data-testid="toggle-button" onClick={toggleLanguage}>
        Toggle Language
      </button>
    </div>
  );
}

// Test component wrapped with provider
function WrappedTestComponent() {
  return (
    <LanguageProvider>
      <TestComponent />
    </LanguageProvider>
  );
}

describe('Language Switching Feature', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should default to English language', () => {
    render(<WrappedTestComponent />);
    
    expect(screen.getByTestId('language-display')).toHaveTextContent('en');
  });

  test('should toggle language from English to Indonesian', () => {
    render(<WrappedTestComponent />);
    
    // Initially should be English
    expect(screen.getByTestId('language-display')).toHaveTextContent('en');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Should now be Indonesian
    expect(screen.getByTestId('language-display')).toHaveTextContent('id');
  });

  test('should toggle language from Indonesian to English', () => {
    // Set initial language to Indonesian
    localStorage.setItem('language', 'id');
    
    render(<WrappedTestComponent />);
    
    // Initially should be Indonesian
    expect(screen.getByTestId('language-display')).toHaveTextContent('id');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Should now be English
    expect(screen.getByTestId('language-display')).toHaveTextContent('en');
  });

  test('should persist language selection in localStorage', () => {
    render(<WrappedTestComponent />);
    
    // Initially should be English
    expect(screen.getByTestId('language-display')).toHaveTextContent('en');
    expect(localStorage.getItem('language')).toBe('en');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Should now be Indonesian and saved in localStorage
    expect(screen.getByTestId('language-display')).toHaveTextContent('id');
    expect(localStorage.getItem('language')).toBe('id');
  });
});