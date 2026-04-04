import type { ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: ReactNode;
  renderFallback?: (retry: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true
    };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {}

  public render(): ReactNode {
    if (this.state.hasError) {
      const retry = (): void => this.setState({ hasError: false });
      if (this.props.renderFallback) {
        return this.props.renderFallback(retry);
      }
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}
