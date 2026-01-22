interface VerificationBadgesProps {
  phoneVerified?: boolean;
  idVerified?: boolean;
  addressVerified?: boolean;
  rentalkeVisited?: boolean;
  size?: "sm" | "md";
}

export default function VerificationBadges({
  phoneVerified,
  idVerified,
  addressVerified,
  rentalkeVisited,
  size = "md",
}: VerificationBadgesProps) {
  const badges = [];

  if (phoneVerified) {
    badges.push({
      icon: (
        <svg className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
        </svg>
      ),
      label: "Phone Verified",
    });
  }

  if (idVerified) {
    badges.push({
      icon: (
        <svg className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      ),
      label: "ID Verified",
    });
  }

  if (addressVerified) {
    badges.push({
      icon: (
        <svg className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
      ),
      label: "Address Verified",
    });
  }

  if (rentalkeVisited) {
    badges.push({
      icon: (
        <svg className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      ),
      label: "RentalKE Visited",
    });
  }

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-1 ${
            size === "sm" ? "text-xs" : "text-xs"
          }`}
          title={badge.label}
        >
          {badge.icon}
          <span className="font-medium">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
