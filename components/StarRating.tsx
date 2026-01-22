interface StarRatingProps {
  rating: number; // Average rating (e.g., 4.35)
  totalRatings?: number; // Total number of ratings
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean; // Whether to show "(24 ratings)"
}

export default function StarRating({
  rating,
  totalRatings = 0,
  size = 'md',
  showCount = true
}: StarRatingProps) {
  // Size configurations
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const starSize = sizeClasses[size];
  const textSize = textSizeClasses[size];

  // Generate 5 stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fillPercentage = Math.max(0, Math.min(100, (rating - (i - 1)) * 100));

    stars.push(
      <div key={i} className="relative inline-block">
        {/* Empty star (gray background) */}
        <svg
          className={`${starSize} text-gray-300`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>

        {/* Filled star (yellow, clipped by percentage) */}
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <svg
            className={`${starSize} text-yellow-400`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {stars}
      </div>

      {showCount && totalRatings > 0 && (
        <span className={`${textSize} text-text-secondary`}>
          {rating.toFixed(1)} ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
        </span>
      )}

      {showCount && totalRatings === 0 && (
        <span className={`${textSize} text-text-secondary`}>
          No ratings yet
        </span>
      )}
    </div>
  );
}
