import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ErrorState } from '../ErrorState';

describe('ErrorState', () => {
  it('renders message and Retry button', () => {
    render(
      <ErrorState message="Custom error" onRetry={() => {}} />
    );
    expect(screen.getByText('Custom error')).toBeTruthy();
    expect(screen.getByText('Retry')).toBeTruthy();
  });

  it('uses default message when message prop is omitted', () => {
    render(<ErrorState onRetry={() => {}} />);
    expect(screen.getByText('Something went wrong.')).toBeTruthy();
  });

  it('calls onRetry when Retry button is pressed', () => {
    const onRetry = jest.fn();
    render(<ErrorState message="Failed" onRetry={onRetry} />);

    const retryButton = screen.getByText('Retry');
    fireEvent.press(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
