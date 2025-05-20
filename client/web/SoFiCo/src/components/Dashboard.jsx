// Dashboard.jsx
import { FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl text-blue-700">eazy bank</div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 bg-blue-100 rounded-lg m-2 font-semibold">Dashboard</li>
            <li className="p-4 hover:bg-blue-50 rounded-lg m-2">Transaction</li>
            <li className="p-4 hover:bg-blue-50 rounded-lg m-2">Payment</li>
            <li className="p-4 hover:bg-blue-50 rounded-lg m-2">Card</li>
            <li className="p-4 hover:bg-blue-50 rounded-lg m-2">Insights</li>
            <li className="p-4 hover:bg-blue-50 rounded-lg m-2">Settings</li>
          </ul>
        </nav>
        <div className="p-4 text-gray-400">Logout</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        {/* Top Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Balance", value: "$3,596" },
            { label: "Income", value: "$421" },
            { label: "Expenses", value: "$164" },
            { label: "Savings", value: "$257" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Finances Chart Placeholder */}
        <section className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold mb-2">Finances</div>
          {/* Replace with Chart.js or similar */}
          <div className="h-40 bg-gradient-to-r from-blue-100 to-blue-200 rounded"></div>
        </section>

        {/* Bottom Grid: Transaction History & Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transaction History */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold mb-4">Transaction History</div>
            <ul>
              {[
                { name: "Aaron Evans", type: "Food", date: "March 29, 2022", amount: "$45" },
                { name: "Clement Stewart", type: "Shopping", date: "March 28, 2022", amount: "-$241" },
                { name: "Jessica Johanie", type: "Clothes", date: "March 28, 2022", amount: "$100" },
              ].map((tx) => (
                <li key={tx.name} className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <FaUserCircle className="text-gray-400 text-2xl" />
                    <div>
                      <div className="font-medium">{tx.name}</div>
                      <div className="text-xs text-gray-400">{tx.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{tx.amount}</div>
                    <div className="text-xs text-gray-400">{tx.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Transaction & Goals */}
          <div className="space-y-6">
            {/* Quick Transaction */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold mb-4">Quick Transaction</div>
              <div className="flex space-x-4 mb-4">
                {["Michael", "Badjan", "Ahmed", "Calvin"].map((name) => (
                  <button key={name} className="bg-blue-100 rounded-full p-2">
                    <FaUserCircle className="text-blue-500 text-xl" />
                  </button>
                ))}
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">Send</button>
            </div>
            {/* My Goals */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold mb-4">My Goals</div>
              <div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span>New Mac</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-blue-100 rounded">
                    <div className="h-2 bg-blue-500 rounded w-4/5"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>New Mission 14"</span>
                    <span>40%</span>
                  </div>
                  <div className="h-2 bg-blue-100 rounded">
                    <div className="h-2 bg-blue-500 rounded w-2/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
