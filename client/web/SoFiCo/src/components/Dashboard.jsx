import React, { useState } from "react";

const tabs = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Loan", icon: "💰" },
  { label: "Schemes", icon: "📊" },
  { label: "Profile", icon: "👤" },
];

export default function FintechDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Dummy Data (same as before)
  const userName = "Riya Sharma";
  const totalBalance = 325000;
  const income = 120000;
  const expense = 75000;
  const recentActivities = [
    { title: "Loan Disbursed", amount: "+₹45,000", from: "Sofico Pvt. Ltd.", date: "21 May 2025" },
    { title: "Salary Credited", amount: "+₹90,000", from: "ZenoTech Solutions", date: "20 May 2025" },
    { title: "Utility Payment", amount: "-₹2,300", from: "Mahanagar Gas", date: "19 May 2025" },
  ];
  const loanDetails = {
    amount: 45000,
    date: "21 May 2025",
    nextPayment: 5000,
    dueDate: "21 Jun 2025",
  };
  const businessLoan = { amount: 25000, date: "10 May 2025" };
  const schemes = [
    { name: "Dream Home", members: 5, status: "ACTIVE", targetAmount: 500000, currentAmount: 250000, duration: 12 },
    { name: "Vacation Fund", members: 3, status: "ACTIVE", targetAmount: 100000, currentAmount: 40000, duration: 6 },
  ];
  const profile = {
    name: "Riya Sharma",
    email: "riya.sharma@email.com",
    phone: "+91 98765 43210",
    address: "22, Green Park, Mumbai, 400001",
    documents: [
      { name: "Aadhar Card", actions: ["View", "Download"] },
      { name: "Bank Statement", actions: ["View", "Download"] },
      { name: "PAN Card", actions: ["View", "Download"] },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e2d3c] to-[#116466] flex text-white">
      {/* Sidebar */}
      <aside className="w-20 md:w-60 bg-[#0e2d3c] flex flex-col py-8 px-2 md:px-6 shadow-lg">
        <div className="mb-10 flex items-center justify-center md:justify-start">
          <span className="text-2xl md:text-3xl font-bold tracking-wide">SoFiCo</span>
        </div>
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition font-medium
                ${activeTab === tab.label ? "bg-[#116466] text-yellow-300" : "hover:bg-[#144f5f] text-white"}`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-auto">
        {activeTab === "Dashboard" && (
          <section>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Welcome Back, {userName}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#144f5f] rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
                <p className="text-2xl font-bold">₹{totalBalance.toLocaleString()}</p>
              </div>
              <div className="bg-[#116466] rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Income</h2>
                <p className="text-2xl font-bold text-green-400">+₹{income.toLocaleString()}</p>
              </div>
              <div className="bg-[#0e2d3c] rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Expense</h2>
                <p className="text-2xl font-bold text-red-400">-₹{expense.toLocaleString()}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map(({ title, amount, from, date }, idx) => (
                <div key={idx} className="bg-[#0e2d3c] rounded-md p-4 flex justify-between items-center shadow-md">
                  <div>
                    <p className="font-semibold">{title} <span className="text-green-400">{amount}</span></p>
                    <p className="text-sm text-gray-300">{`from ${from}`}</p>
                  </div>
                  <p className="text-sm text-gray-400">{date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Loan" && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Loan Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="font-semibold">Amount</p>
                <p>₹{loanDetails.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Date</p>
                <p>{loanDetails.date}</p>
              </div>
              <div>
                <p className="font-semibold">Next Payment</p>
                <p>₹{loanDetails.nextPayment.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Due Date</p>
                <p>{loanDetails.dueDate}</p>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <button className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 font-semibold">
                View Details
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 font-semibold">
                Make Payments
              </button>
            </div>
            <div className="bg-[#0e2d3c] rounded-md p-4">
              <h3 className="font-semibold mb-2">Business Loan</h3>
              <p>Amount: ₹{businessLoan.amount.toLocaleString()}</p>
              <p>Date: {businessLoan.date}</p>
            </div>
          </section>
        )}

        {activeTab === "Schemes" && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Schemes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemes.map(({ name, members, status, targetAmount, currentAmount, duration }, idx) => (
                <div key={idx} className="bg-[#116466] rounded-lg p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <span className="text-sm bg-green-600 px-2 py-1 rounded">{status}</span>
                  </div>
                  <p className="mb-1">Members: {members}</p>
                  <div className="mb-3">
                    <p className="font-semibold">Progress</p>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-green-400 h-4 rounded-full"
                        style={{ width: `${(currentAmount / targetAmount) * 100}%` }}
                        aria-label={`Progress: ${(currentAmount / targetAmount) * 100}%`}
                      />
                    </div>
                    <p className="text-sm mt-1">
                      ₹{currentAmount.toLocaleString()} / ₹{targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <p>Duration: {duration} Month{duration > 1 ? "s" : ""}</p>
                  <div className="mt-4 flex gap-4">
                    <button className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 font-semibold">
                      View Details
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 font-semibold">
                      Contribute
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Profile" && (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Profile</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-3xl font-bold uppercase">
                {profile.name.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-semibold">{profile.name}</p>
                <p className="text-gray-300">{profile.email}</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Documents</h3>
              <ul className="space-y-3">
                {profile.documents.map(({ name, actions }, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-[#116466] rounded-md p-3">
                    <span>{name}</span>
                    <div className="space-x-3">
                      {actions.map((action) => (
                        <button key={action} className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm">
                          {action}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 rounded px-6 py-2 font-semibold">
                Edit Profile
              </button>
              <button className="bg-red-600 hover:bg-red-700 rounded px-6 py-2 font-semibold">
                Logout
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
