'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo,
    })

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo)
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} reset={this.reset} />
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-floralWhite flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-graphite mb-2">
            Something went wrong
          </h1>
          <p className="text-graphite/70 mb-6">
            We apologize for the inconvenience. An unexpected error occurred while loading this page.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
            <pre className="text-sm text-red-700 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-accentYellow text-graphite px-6 py-3 rounded-lg font-medium hover:bg-accentYellow/90 transition-colors duration-200"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-graphite/10 text-graphite px-6 py-3 rounded-lg font-medium hover:bg-graphite/20 transition-colors duration-200"
          >
            Go to Homepage
          </button>
        </div>

        <p className="text-sm text-graphite/50 mt-6">
          If this problem persists, please contact us at{' '}
          <a 
            href="mailto:momentcapturers04@gmail.com" 
            className="text-accentYellow hover:underline"
          >
            momentcapturers04@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default ErrorBoundary