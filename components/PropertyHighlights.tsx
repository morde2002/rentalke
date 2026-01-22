interface PropertyHighlightsProps {
  paymentMethod?: string | null;
  paybillNumber?: string | null;
  tillNumber?: string | null;
  businessName?: string | null;
  waterSource?: string | null;
  waterPayment?: string | null;
  electricityType?: string | null;
  electricityPayment?: string | null;
  securityType?: string | null;
  securityDetails?: string | null;
}

export default function PropertyHighlights({
  paymentMethod,
  paybillNumber,
  tillNumber,
  businessName,
  waterSource,
  waterPayment,
  electricityType,
  electricityPayment,
  securityType,
  securityDetails,
}: PropertyHighlightsProps) {
  const getPaymentDisplay = () => {
    if (!paymentMethod) return null;

    const isSafe = paymentMethod === 'paybill' || paymentMethod === 'till_number';
    const bgColor = isSafe ? 'bg-green-50' : 'bg-yellow-50';
    const borderColor = isSafe ? 'border-green-200' : 'border-yellow-200';
    const textColor = isSafe ? 'text-green-700' : 'text-yellow-700';
    const icon = isSafe ? '✅' : '⚠️';

    let paymentText = '';
    if (paymentMethod === 'paybill' && paybillNumber) {
      paymentText = `Paybill: ${paybillNumber}`;
    } else if (paymentMethod === 'till_number' && tillNumber) {
      paymentText = `Till Number: ${tillNumber}`;
    } else if (paymentMethod === 'send_money') {
      paymentText = 'Send Money (Verify first!)';
    } else if (paymentMethod === 'pochi') {
      paymentText = 'Pochi la Biashara (Verify first!)';
    }

    return (
      <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">{icon}</span>
          <div className="flex-1">
            <p className={`font-semibold ${textColor} mb-1`}>Payment Method</p>
            <p className="text-sm text-gray-700">{paymentText}</p>
            {businessName && (
              <p className="text-sm text-gray-600 mt-1">Business: <span className="font-medium">{businessName}</span></p>
            )}
            {isSafe && (
              <p className="text-xs text-green-600 mt-2">✓ Verified business payment (safer)</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getWaterDisplay = () => {
    if (!waterSource) return null;

    const isPiped = waterSource === 'piped_to_house';
    const icon = isPiped ? '💧' : '🪣';
    const waterText = waterSource === 'piped_to_house'
      ? 'Piped water in house'
      : waterSource === 'jerricans'
      ? 'Water collected with jerricans'
      : 'Borehole water';

    let paymentText = '';
    if (waterPayment === 'included') {
      paymentText = 'Water included in rent';
    } else if (waterPayment === 'separate_monthly') {
      paymentText = 'Paid separately monthly';
    } else if (waterPayment === 'per_jerrican') {
      paymentText = 'Paid per jerrican';
    }

    return (
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-blue-700 mb-1">Water</p>
          <p className="text-sm text-gray-700">{waterText}</p>
          {paymentText && <p className="text-sm text-gray-600 mt-1">{paymentText}</p>}
        </div>
      </div>
    );
  };

  const getElectricityDisplay = () => {
    if (!electricityType) return null;

    const icon = '⚡';
    const typeText = electricityType === 'tokens'
      ? 'Pre-paid tokens (you buy as needed)'
      : electricityType === 'monthly_bill'
      ? 'Monthly bill'
      : 'Electricity included in rent';

    const paymentText = electricityPayment === 'landlord'
      ? '✓ Landlord pays (included in rent)'
      : electricityPayment === 'tenant'
      ? 'You pay for your own usage'
      : '';

    return (
      <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-yellow-700 mb-1">Electricity</p>
          <p className="text-sm text-gray-700">{typeText}</p>
          {paymentText && <p className="text-sm text-gray-600 mt-1">{paymentText}</p>}
        </div>
      </div>
    );
  };

  const getSecurityDisplay = () => {
    if (!securityType) return null;

    const isSecure = securityType === 'gated_compound' || securityType === 'gate_and_watchman';
    const icon = isSecure ? '🔒' : '🏘️';

    const securityText = securityType === 'gated_compound'
      ? 'Gated compound'
      : securityType === 'gate_and_watchman'
      ? 'Gated with watchman'
      : securityType === 'watchman'
      ? 'Watchman on duty'
      : 'Open access';

    return (
      <div className={`flex items-start gap-3 p-4 ${isSecure ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'} border rounded-lg`}>
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className={`font-semibold ${isSecure ? 'text-purple-700' : 'text-gray-700'} mb-1`}>Security</p>
          <p className="text-sm text-gray-700">{securityText}</p>
          {securityDetails && <p className="text-sm text-gray-600 mt-1">{securityDetails}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Important Details</h3>
      {getPaymentDisplay()}
      {getWaterDisplay()}
      {getElectricityDisplay()}
      {getSecurityDisplay()}
    </div>
  );
}
