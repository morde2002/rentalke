export default function DemoBanner() {
  return (
    <div className="bg-primary-blue text-white py-3 px-4">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 text-center">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm md:text-base">
            <span className="font-semibold">Demo Phase:</span> These are sample listings. We're actively partnering with landlords in Mombasa.
            <a href="https://wa.me/254115588218?text=Hi, I want to list my property on RentalKE" target="_blank" rel="noopener noreferrer" className="underline ml-1 font-medium hover:text-gray-200">
              List your property now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
