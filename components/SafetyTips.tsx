export default function SafetyTips() {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-[20px] p-6">
      <div className="flex gap-3 mb-4">
        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900">How to Stay Safe</h3>
      </div>

      <div className="space-y-4">
        {/* DO Section */}
        <div>
          <p className="font-semibold text-green-700 mb-2">✅ DO:</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Visit the property in person before making any payments</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Ask to see the landlord's ID and verify ownership documents</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Meet at the actual property location, not random places</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Bring a friend or family member for viewings</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Pay only after viewing and signing a rental agreement</span>
            </li>
          </ul>
        </div>

        {/* DON'T Section */}
        <div>
          <p className="font-semibold text-red-700 mb-2">❌ DON'T:</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Send money before viewing the property</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Pay through M-Pesa to unknown numbers</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Trust listings that seem too good to be true</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Share personal banking details over the phone</span>
            </li>
          </ul>
        </div>

        {/* Report Section */}
        <div className="pt-3 border-t border-yellow-300">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">🚨 See something suspicious?</span>{" "}
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
