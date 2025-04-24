import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, LogOut, Activity, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

function DashboardPage() {
  const { logout } = useAuth();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mockTransactions = [
    {
      id: 1,
      date: '2024-03-15',
      amount: '0.5 BTC',
      type: 'Send',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2024-03-14',
      amount: '1.2 BTC',
      type: 'Receive',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2024-03-13',
      amount: '0.3 BTC',
      type: 'Send',
      status: 'Pending',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Time */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-6 w-6 text-blue-400" />
              <span className="text-gray-400">Real-time</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Current Time</h3>
            <p className="text-2xl font-bold">
              {format(currentTime, 'HH:mm:ss')}
            </p>
            <p className="text-gray-400">
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>

          {/* System Status */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <span className="text-gray-400">Status</span>
            </div>
            <h3 className="text-lg font-medium mb-2">System Status</h3>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 bg-green-500 rounded-full"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <Link
              to="/transaction"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg block text-center transition-colors"
            >
              New Transaction
            </Link>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-gray-700">
                    <td className="py-4">{tx.date}</td>
                    <td className="py-4">{tx.type}</td>
                    <td className="py-4">{tx.amount}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          tx.status === 'Completed'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage