import type { ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: ReactNode;
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
      return this.props.fallback;
    }

    return this.props.children;
  }
}
