export default function SafetyTips() {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-[20px] p-6">
      <div className="flex gap-3 mb-4">
        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900">Smart Renting Guide</h3>
      </div>

      <div className="space-y-4">
        {/* BEFORE VIEWING */}
        <div>
          <p className="font-semibold text-blue-700 mb-2">📞 BEFORE VIEWING:</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Ask for the rent price, deposit amount, and when they're available</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Confirm water access (piped to house or collected with jerricans?)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Ask about electricity (tokens you buy yourself or monthly bill?)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Check if water is included in rent or paid separately</span>
            </li>
          </ul>
        </div>

        {/* DURING VIEWING */}
        <div>
          <p className="font-semibold text-green-700 mb-2">✅ DURING THE TOUR:</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Check security - is it gated or open for bypassers?</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Confirm piped water in the house (not jerricans)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Test electricity - ask to see the meter/token system</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Bring a friend or family member with you</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Meet the caretaker or landlord at the actual property</span>
            </li>
          </ul>
        </div>

        {/* PAYMENT VERIFICATION */}
        <div>
          <p className="font-semibold text-purple-700 mb-2">💰 VERIFY PAYMENT METHOD:</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span><strong>SAFE:</strong> Paybill or Till Number (verified businesses)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>Send Ksh 1 first to verify who you're paying</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>Check the M-Pesa confirmation shows the correct landlord name</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">⚠️</span>
              <span><strong>SUSPICIOUS:</strong> Send Money or Pochi la Biashara (personal accounts)</span>
            </li>
          </ul>
        </div>

        {/* DON'T */}
        <div>
          <p className="font-semibold text-red-700 mb-2">❌ NEVER:</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Send deposit before viewing the house</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Pay to personal M-Pesa numbers without verification</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Trust prices that seem unrealistic for the area (e.g., Ksh 2000 in Nyali)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Give money to "agents" you meet away from the property</span>
            </li>
          </ul>
        </div>

        {/* Report Section */}
        <div className="pt-3 border-t border-yellow-300">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">🚨 Suspicious listing or scam attempt?</span>{" "}
            <a
              href="https://wa.me/254115588218?text=I want to report a suspicious listing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:underline font-medium"
            >
              Report it immediately
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
