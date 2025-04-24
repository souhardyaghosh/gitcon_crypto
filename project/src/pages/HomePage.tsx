import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Activity, Cpu } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Quantum-Safe Blockchain Security</h1>
          </div>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Next-Generation Blockchain Security
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Protecting your blockchain transactions with advanced quantum-resistant security
            and real-time behavioral analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Lock className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quantum-Safe Security</h3>
            <p className="text-gray-400">
              Protected against both classical and quantum computing threats using
              advanced cryptographic algorithms.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <Activity className="h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-gray-400">
              Continuous analysis of transaction patterns and user behavior to detect
              and prevent suspicious activities.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <Cpu className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
            <p className="text-gray-400">
              Advanced machine learning algorithms to distinguish between human and
              quantum system interactions.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage