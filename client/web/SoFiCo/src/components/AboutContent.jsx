import React from "react";

function AboutContent() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Architecture</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SoFiCo is built on a modern, scalable architecture that ensures security, performance, and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Frontend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• React-based responsive web interface</li>
              <li>• Role-based dashboards (User/Agent/Admin)</li>
              <li>• Real-time updates and notifications</li>
              <li>• Secure authentication system</li>
            </ul>
          </div>

          {/* Backend Services */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Backend Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Microservices architecture</li>
              <li>• User & Agent management</li>
              <li>• Wallet & Transaction processing</li>
              <li>• Loan & Scheme management</li>
            </ul>
          </div>

          {/* Security */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Security</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Role-based access control</li>
              <li>• End-to-end encryption</li>
              <li>• Secure payment processing</li>
              <li>• Audit logging system</li>
            </ul>
          </div>

          {/* Features */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Digital wallet management</li>
              <li>• Loan application & tracking</li>
              <li>• Group scheme management</li>
              <li>• Real-time notifications</li>
            </ul>
          </div>

          {/* User Roles */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">User Roles</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• User: Apply loans, join schemes</li>
              <li>• Agent: Manage users, approve loans</li>
              <li>• Admin: System-wide management</li>
              <li>• Custom permissions system</li>
            </ul>
          </div>

          {/* Integration */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Integrations</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Payment gateways</li>
              <li>• SMS/Email services</li>
              <li>• KYC verification</li>
              <li>• Analytics & reporting</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutContent;