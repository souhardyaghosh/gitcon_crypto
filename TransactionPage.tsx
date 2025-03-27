import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, AlertTriangle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';

interface SecurityMetrics {
  mouseClicks: number;
  keystrokes: number;
  responseTime: number;
  typingSpeed: number;
  mouseMovements: number;
  inputPatterns: number[];
}

interface TransactionData {
  sender: string;
  receiver: string;
  amount: string;
  timestamp: number;
}

function TransactionPage() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [signature, setSignature] = useState('');
  const [lastKeyTime, setLastKeyTime] = useState(Date.now());
  const [typingTimes, setTypingTimes] = useState<number[]>([]);
  const [verificationStep, setVerificationStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    mouseClicks: 0,
    keystrokes: 0,
    responseTime: 0,
    typingSpeed: 0,
    mouseMovements: 0,
    inputPatterns: [],
  });
  
  const [startTime] = useState(Date.now());
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [securityScore, setSecurityScore] = useState(0);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);

  // Track mouse movements
  useEffect(() => {
    let lastPos = { x: 0, y: 0 };
    let movements = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) { // Threshold to count as movement
        movements++;
        setMetrics(prev => ({
          ...prev,
          mouseMovements: movements
        }));
      }
      
      lastPos = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track mouse clicks
  useEffect(() => {
    const handleClick = () => {
      setMetrics(prev => ({
        ...prev,
        mouseClicks: prev.mouseClicks + 1
      }));
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Track keystrokes and typing patterns
  useEffect(() => {
    const handleKeyPress = () => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastKeyTime;
      
      if (timeDiff < 1000) { // Only count reasonable typing intervals
        setTypingTimes(prev => [...prev, timeDiff]);
      }
      
      setLastKeyTime(currentTime);
      setMetrics(prev => ({
        ...prev,
        keystrokes: prev.keystrokes + 1,
        typingSpeed: calculateTypingSpeed(typingTimes)
      }));
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [lastKeyTime, typingTimes]);

  // Update response time
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        responseTime: (Date.now() - startTime) / 1000
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  const calculateTypingSpeed = (times: number[]) => {
    if (times.length < 2) return 0;
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    return 1000 / avgTime; // Characters per second
  };

  const generateDigitalSignature = (data: TransactionData): string => {
    const message = JSON.stringify(data);
    return SHA256(message).toString();
  };

  const analyzeSecurityMetrics = (): { score: number; risks: string[] } => {
    const risks: string[] = [];
    let score = 100;

    // Check typing speed (if too fast, might be automated)
    if (metrics.typingSpeed > 15) {
      score -= 20;
      risks.push("Unusually fast typing speed detected");
    }

    // Check for natural mouse movements
    if (metrics.mouseMovements < 10) {
      score -= 15;
      risks.push("Limited mouse movement patterns");
    }

    // Check response time (if too quick, might be automated)
    if (metrics.responseTime < 2) {
      score -= 25;
      risks.push("Suspiciously quick form completion");
    }

    // Check for natural typing patterns
    const hasNaturalTyping = typingTimes.some(time => time > 100 && time < 500);
    if (!hasNaturalTyping) {
      score -= 20;
      risks.push("Unnatural typing rhythm detected");
    }

    return { score, risks };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Initial Security Analysis
      const { score, risks } = analyzeSecurityMetrics();
      setSecurityScore(score);
      setRiskFactors(risks);

      if (score < 50) {
        setTransactionStatus('error');
        setVerificationStep(4);
        return;
      }

      // Step 2: Generate Digital Signature
      const transactionData: TransactionData = {
        sender,
        receiver,
        amount,
        timestamp: Date.now(),
      };
      
      const newSignature = generateDigitalSignature(transactionData);
      setSignature(newSignature);
      setVerificationStep(2);

      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerificationStep(3);

      // Final decision
      if (score >= 70) {
        setTransactionStatus('success');
      } else {
        setTransactionStatus('pending');
      }
    } catch (error) {
      setTransactionStatus('error');
      setRiskFactors(prev => [...prev, 'Transaction processing error']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Quantum-Safe Transaction</h1>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Sender Address
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Receiver Address
                </label>
                <input
                  type="text"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount (BTC)
                </label>
                <input
                  type="number"
                  step="0.00000001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Security Score</p>
                  <p className="text-xl font-bold">
                    {securityScore > 0 ? `${securityScore}%` : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Response Time</p>
                  <p className="text-xl font-bold">{metrics.responseTime.toFixed(1)}s</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Typing Speed</p>
                  <p className="text-xl font-bold">
                    {metrics.typingSpeed.toFixed(1)} c/s
                  </p>
                </div>
              </div>

              {/* Verification Steps */}
              <div className="space-y-4">
                <div className={`flex items-center space-x-2 ${
                  verificationStep >= 1 ? 'text-green-500' : 'text-gray-500'
                }`}>
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {verificationStep > 1 ? '✓' : '1'}
                  </div>
                  <span>Behavioral Analysis</span>
                </div>
                
                <div className={`flex items-center space-x-2 ${
                  verificationStep >= 2 ? 'text-green-500' : 'text-gray-500'
                }`}>
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {verificationStep > 2 ? '✓' : '2'}
                  </div>
                  <span>Digital Signature Generation</span>
                </div>
                
                <div className={`flex items-center space-x-2 ${
                  verificationStep >= 3 ? 'text-green-500' : 'text-gray-500'
                }`}>
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {verificationStep > 3 ? '✓' : '3'}
                  </div>
                  <span>Quantum Resistance Verification</span>
                </div>
              </div>

              {/* Risk Factors */}
              {riskFactors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-500 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="font-semibold">Risk Factors Detected</h3>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-red-400">
                    {riskFactors.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Digital Signature Display */}
              {signature && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Digital Signature</span>
                  </div>
                  <p className="text-xs font-mono break-all">{signature}</p>
                </div>
              )}

              {/* Transaction Status */}
              {transactionStatus && (
                <div
                  className={`p-4 rounded-lg ${
                    transactionStatus === 'success'
                      ? 'bg-green-500/20 text-green-500'
                      : transactionStatus === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  {transactionStatus === 'success'
                    ? 'Transaction successful! Bitcoin transferred securely.'
                    : transactionStatus === 'pending'
                    ? 'Transaction pending additional verification. Please wait.'
                    : 'Transaction blocked: High-risk activity detected.'}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Submit Transaction'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TransactionPage;