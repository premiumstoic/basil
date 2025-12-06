import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-paper p-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-red-100 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-red-600 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 font-sans mb-6">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 overflow-auto max-h-40">
                            <code className="text-xs text-red-500 font-mono block">
                                {this.state.error?.message || 'Unknown error'}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 bg-ink text-white rounded-lg hover:bg-gray-800 transition font-sans font-medium"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
