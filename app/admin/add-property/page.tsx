"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "Mombasa",
    neighborhood: "",
    type: "Bedsitter",
    bedrooms: "1 room",
    bathroom: "Private bathroom",
    price: "",
    deposit: "",
    water_included: true,
    electricity_cost: "",
    landlord_name: "",
    landlord_phone: "",
    whatsapp_number: "",
    features: "",
    nearby_places: "",
  });

  // Check authentication
  useEffect(() => {
    const isAdmin = localStorage.getItem("rentalke_admin");
    if (isAdmin !== "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Convert comma-separated strings to arrays
    const features = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const nearby_places = formData.nearby_places
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const { error } = await supabase.from("properties").insert([
      {
        title: formData.title,
        description: formData.description || null,
        city: formData.city,
        neighborhood: formData.neighborhood,
        type: formData.type,
        bedrooms: formData.bedrooms,
        bathroom: formData.bathroom,
        price: parseInt(formData.price),
        deposit: formData.deposit ? parseInt(formData.deposit) : null,
        water_included: formData.water_included,
        electricity_cost: formData.electricity_cost || null,
        landlord_name: formData.landlord_name,
        landlord_phone: formData.landlord_phone,
        whatsapp_number: formData.whatsapp_number || null,
        features,
        nearby_places,
        available: true,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error adding property: " + error.message);
    } else {
      alert("Property added successfully!");
      router.push("/admin/dashboard");
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-white border-b border-border-gray py-6">
          <div className="container-custom">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-semibold">Add New Property</h1>
          </div>
        </section>

        {/* Form */}
        <section className="section-padding">
          <div className="container-custom">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
              {/* Basic Info */}
              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Basic Information</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="input-field"
                    placeholder="e.g., Cozy Bedsitter in Vijiweni"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="Describe the property..."
                  />
                </div>
              </div>

              {/* Location */}
              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Location</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <select
                      required
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="input-field"
                    >
                      <option value="Mombasa">Mombasa</option>
                      <option value="Nairobi">Nairobi</option>
                      <option value="Kisumu">Kisumu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Neighborhood *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.neighborhood}
                      onChange={(e) => updateField("neighborhood", e.target.value)}
                      className="input-field"
                      placeholder="e.g., Vijiweni"
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Property Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Type *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => updateField("type", e.target.value)}
                      className="input-field"
                    >
                      <option value="Bedsitter">Bedsitter</option>
                      <option value="1 Bedroom">1 Bedroom</option>
                      <option value="2 Bedroom">2 Bedroom</option>
                      <option value="3 Bedroom">3 Bedroom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bedrooms *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.bedrooms}
                      onChange={(e) => updateField("bedrooms", e.target.value)}
                      className="input-field"
                      placeholder="e.g., 1 room"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bathroom *
                    </label>
                    <select
                      required
                      value={formData.bathroom}
                      onChange={(e) => updateField("bathroom", e.target.value)}
                      className="input-field"
                    >
                      <option value="Private bathroom">Private bathroom</option>
                      <option value="Shared bathroom">Shared bathroom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Pricing</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Monthly Rent (Ksh) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => updateField("price", e.target.value)}
                      className="input-field"
                      placeholder="e.g., 5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Deposit (Ksh)
                    </label>
                    <input
                      type="number"
                      value={formData.deposit}
                      onChange={(e) => updateField("deposit", e.target.value)}
                      className="input-field"
                      placeholder="e.g., 5000"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.water_included}
                      onChange={(e) => updateField("water_included", e.target.checked)}
                      className="w-5 h-5 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                    />
                    <span className="text-text-secondary">Water included in rent</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Electricity Cost
                  </label>
                  <input
                    type="text"
                    value={formData.electricity_cost}
                    onChange={(e) => updateField("electricity_cost", e.target.value)}
                    className="input-field"
                    placeholder="e.g., Around Ksh 500/month"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Landlord Contact</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Landlord Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.landlord_name}
                    onChange={(e) => updateField("landlord_name", e.target.value)}
                    className="input-field"
                    placeholder="e.g., Mama Jane"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.landlord_phone}
                    onChange={(e) => updateField("landlord_phone", e.target.value)}
                    className="input-field"
                    placeholder="e.g., 0712345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    WhatsApp Number (with country code)
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp_number}
                    onChange={(e) => updateField("whatsapp_number", e.target.value)}
                    className="input-field"
                    placeholder="e.g., 254712345678"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Include country code (254 for Kenya)
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Additional Information</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Features (comma-separated)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => updateField("features", e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="e.g., Own bathroom, Water included, Spacious room"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nearby Places (comma-separated)
                  </label>
                  <textarea
                    value={formData.nearby_places}
                    onChange={(e) => updateField("nearby_places", e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="e.g., 5 minutes to main road, Shop next door, Safe neighborhood"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1"
                >
                  {loading ? "Adding Property..." : "Add Property"}
                </button>
                <Link href="/admin/dashboard" className="btn-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
