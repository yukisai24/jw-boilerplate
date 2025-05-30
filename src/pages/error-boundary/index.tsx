import React, { Component, ReactNode } from 'react';

import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-screen flex flex-col items-center justify-center bg-red-50 text-red-800"
        >
          <h1 className="text-4xl font-bold mb-4">⚠️ 에러가 발생했습니다</h1>
          <p className="text-lg text-center max-w-md mb-6">
            죄송합니다. 예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해
            주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            새로고침
          </button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}
