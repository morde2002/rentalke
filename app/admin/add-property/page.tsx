"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [mediaStatus, setMediaStatus] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("media/properties");
  const [folderOptions, setFolderOptions] = useState<string[]>(["media/properties"]);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
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
    google_maps_url: "",
    payment_method: "",
    paybill_number: "",
    till_number: "",
    business_name: "",
    water_source: "",
    water_payment: "",
    electricity_type: "",
    electricity_payment: "",
    security_type: "",
    security_details: "",
    additional_info: "",
    phone_verified: false,
    id_verified: false,
    address_verified: false,
    rentalke_visited: false,
  });

  useEffect(() => {
    fetch("/api/admin/verify")
      .then((res) => {
        if (!res.ok) router.push("/admin");
      })
      .catch(() => router.push("/admin"));

    fetch("/api/admin/cloudinary/folders?path=media/properties")
      .then((res) => res.json())
      .then((data) => {
        const folders = data?.folders || [];
        const options = ["media/properties", ...folders.map((folder: string) => `media/properties/${folder}`)];
        setFolderOptions(options);
        if (options.length > 0) {
          setSelectedFolder(options[0]);
        }
      })
      .catch(() => undefined);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const features = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const nearby_places = formData.nearby_places
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    try {
      const res = await fetch("/api/admin/properties/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          city: formData.city,
          neighborhood: formData.neighborhood,
          type: formData.type,
          bedrooms: formData.bedrooms,
          bathroom: formData.bathroom,
          price: parseInt(formData.price, 10),
          deposit: formData.deposit ? parseInt(formData.deposit, 10) : null,
          water_included: formData.water_included,
          electricity_cost: formData.electricity_cost || null,
          landlord_name: formData.landlord_name,
          landlord_phone: formData.landlord_phone,
          whatsapp_number: formData.whatsapp_number || null,
          features,
          nearby_places,
          images: uploadedImages,
          video_url: uploadedVideoUrl || null,
          google_maps_url: formData.google_maps_url || null,
          payment_method: formData.payment_method || null,
          paybill_number: formData.paybill_number || null,
          till_number: formData.till_number || null,
          business_name: formData.business_name || null,
          water_source: formData.water_source || null,
          water_payment: formData.water_payment || null,
          electricity_type: formData.electricity_type || null,
          electricity_payment: formData.electricity_payment || null,
          security_type: formData.security_type || null,
          security_details: formData.security_details || null,
          additional_info: formData.additional_info || null,
          phone_verified: formData.phone_verified,
          id_verified: formData.id_verified,
          address_verified: formData.address_verified,
          rentalke_visited: formData.rentalke_visited,
          available: true,
        }),
      });

      setLoading(false);

      if (!res.ok) {
        const data = await res.json();
        alert("Error adding property: " + (data.error || "Unknown error"));
      } else {
        alert("Property added successfully!");
        router.push("/admin/dashboard");
      }
    } catch {
      setLoading(false);
      alert("Error adding property. Please try again.");
    }
  };

  const updateField = (field: string, value: unknown) => {
    setFormData({ ...formData, [field]: value });
  };

  const createFolder = async () => {
    const folderName = newFolderName.trim().replace(/\s+/g, "-").toLowerCase();
    if (!folderName) {
      setMediaStatus("Enter a folder name first.");
      return;
    }

    const fullPath = `media/properties/${folderName}`;
    setCreatingFolder(true);
    setMediaStatus("Creating folder...");

    try {
      const res = await fetch("/api/admin/cloudinary/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: fullPath }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMediaStatus(data.error || "Unable to create folder.");
      } else {
        setFolderOptions((prev) => (prev.includes(fullPath) ? prev : [...prev, fullPath]));
        setSelectedFolder(fullPath);
        setNewFolderName("");
        setMediaStatus(`Folder ready: ${fullPath}`);
      }
    } catch {
      setMediaStatus("Unable to create folder right now.");
    } finally {
      setCreatingFolder(false);
    }
  };

  const uploadPhotos = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploadingMedia(true);
    setMediaStatus("Uploading photos...");

    try {
      const uploadedUrls = await Promise.all(files.map((file) => uploadToCloudinary(file, selectedFolder)));
      setUploadedImages((prev) => [...prev, ...uploadedUrls]);
      setMediaStatus(`Uploaded ${uploadedUrls.length} photo${uploadedUrls.length > 1 ? "s" : ""}.`);
    } catch (error) {
      setMediaStatus(error instanceof Error ? error.message : "Photo upload failed.");
    } finally {
      setUploadingMedia(false);
      event.target.value = "";
    }
  };

  const uploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    setMediaStatus("Uploading video...");

    try {
      const url = await uploadToCloudinary(file, selectedFolder);
      setUploadedVideoUrl(url);
      setMediaStatus("Video uploaded.");
    } catch (error) {
      setMediaStatus(error instanceof Error ? error.message : "Video upload failed.");
    } finally {
      setUploadingMedia(false);
      event.target.value = "";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
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

        <section className="section-padding">
          <div className="container-custom">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Basic Information</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Title *</label>
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
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="Describe the property..."
                  />
                </div>
              </div>

              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Location</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
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
                    <label className="block text-sm font-medium mb-2">Neighborhood *</label>
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

              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Property Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type *</label>
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
                    <label className="block text-sm font-medium mb-2">Bedrooms *</label>
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
                    <label className="block text-sm font-medium mb-2">Bathroom *</label>
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

              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Pricing</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Rent (Ksh) *</label>
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
                    <label className="block text-sm font-medium mb-2">Deposit (Ksh)</label>
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
                  <label className="block text-sm font-medium mb-2">Electricity Cost</label>
                  <input
                    type="text"
                    value={formData.electricity_cost}
                    onChange={(e) => updateField("electricity_cost", e.target.value)}
                    className="input-field"
                    placeholder="e.g., Around Ksh 500/month"
                  />
                </div>
              </div>

              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Media & Cloudinary Folder</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload folder</label>
                    <select
                      value={selectedFolder}
                      onChange={(e) => setSelectedFolder(e.target.value)}
                      className="input-field"
                    >
                      {folderOptions.map((folder) => (
                        <option key={folder} value={folder}>
                          {folder}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="input-field flex-1"
                      placeholder="new-folder-name"
                    />
                    <button
                      type="button"
                      onClick={createFolder}
                      disabled={creatingFolder}
                      className="btn-secondary whitespace-nowrap"
                    >
                      {creatingFolder ? "Creating..." : "Create folder"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Upload photos</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={uploadPhotos}
                      className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-blue file:text-white hover:file:bg-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Upload video</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={uploadVideo}
                      className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-blue file:text-white hover:file:bg-blue-700"
                    />
                  </div>

                  {mediaStatus ? <p className="text-sm text-text-secondary">{mediaStatus}</p> : null}
                  {uploadedImages.length > 0 ? (
                    <p className="text-sm text-text-secondary">Uploaded photos: {uploadedImages.length}</p>
                  ) : null}
                  {uploadedVideoUrl ? (
                    <p className="text-sm text-text-secondary">Uploaded video: {uploadedVideoUrl}</p>
                  ) : null}
                </div>
              </div>

              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Landlord Contact</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Landlord Name *</label>
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
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
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
                  <label className="block text-sm font-medium mb-2">WhatsApp Number (with country code)</label>
                  <input
                    type="tel"
                    value={formData.whatsapp_number}
                    onChange={(e) => updateField("whatsapp_number", e.target.value)}
                    className="input-field"
                    placeholder="e.g., 254115588218"
                  />
                  <p className="text-sm text-text-secondary mt-1">Include country code (254 for Kenya)</p>
                </div>
              </div>

              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Verification, Utilities & Links</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Google Maps Link</label>
                    <input
                      type="url"
                      value={formData.google_maps_url}
                      onChange={(e) => updateField("google_maps_url", e.target.value)}
                      className="input-field"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <select
                      value={formData.payment_method}
                      onChange={(e) => updateField("payment_method", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      <option value="paybill">Paybill</option>
                      <option value="till_number">Till number</option>
                      <option value="send_money">Send money</option>
                      <option value="pochi">Pochi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Paybill Number</label>
                    <input
                      type="text"
                      value={formData.paybill_number}
                      onChange={(e) => updateField("paybill_number", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Till Number</label>
                    <input
                      type="text"
                      value={formData.till_number}
                      onChange={(e) => updateField("till_number", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <input
                      type="text"
                      value={formData.business_name}
                      onChange={(e) => updateField("business_name", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Water Source</label>
                    <select
                      value={formData.water_source}
                      onChange={(e) => updateField("water_source", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      <option value="piped_to_house">Piped to house</option>
                      <option value="jerricans">Jerricans</option>
                      <option value="borehole">Borehole</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Water Payment</label>
                    <select
                      value={formData.water_payment}
                      onChange={(e) => updateField("water_payment", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      <option value="included">Included</option>
                      <option value="separate_monthly">Separate monthly</option>
                      <option value="per_jerrican">Per jerrican</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Electricity Type</label>
                    <select
                      value={formData.electricity_type}
                      onChange={(e) => updateField("electricity_type", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      <option value="tokens">Tokens</option>
                      <option value="monthly_bill">Monthly bill</option>
                      <option value="included">Included</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Electricity Payment</label>
                    <select
                      value={formData.electricity_payment}
                      onChange={(e) => updateField("electricity_payment", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Security Type</label>
                    <select
                      value={formData.security_type}
                      onChange={(e) => updateField("security_type", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      <option value="gated_compound">Gated compound</option>
                      <option value="open_access">Open access</option>
                      <option value="watchman">Watchman</option>
                      <option value="gate_and_watchman">Gate and watchman</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Security Details</label>
                  <textarea
                    value={formData.security_details}
                    onChange={(e) => updateField("security_details", e.target.value)}
                    className="input-field min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Info</label>
                  <textarea
                    value={formData.additional_info}
                    onChange={(e) => updateField("additional_info", e.target.value)}
                    className="input-field min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.phone_verified}
                      onChange={(e) => updateField("phone_verified", e.target.checked)}
                      className="w-5 h-5 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                    />
                    <span className="text-text-secondary">Phone verified</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.id_verified}
                      onChange={(e) => updateField("id_verified", e.target.checked)}
                      className="w-5 h-5 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                    />
                    <span className="text-text-secondary">ID verified</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.address_verified}
                      onChange={(e) => updateField("address_verified", e.target.checked)}
                      className="w-5 h-5 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                    />
                    <span className="text-text-secondary">Address verified</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rentalke_visited}
                      onChange={(e) => updateField("rentalke_visited", e.target.checked)}
                      className="w-5 h-5 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                    />
                    <span className="text-text-secondary">RentalKE visited</span>
                  </label>
                </div>
              </div>

              <div className="bg-white border border-border-gray rounded-button p-6 space-y-6">
                <h2 className="text-xl font-semibold">Additional Information</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => updateField("features", e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="e.g., Own bathroom, Water included, Spacious room"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nearby Places (comma-separated)</label>
                  <textarea
                    value={formData.nearby_places}
                    onChange={(e) => updateField("nearby_places", e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="e.g., 5 minutes to main road, Shop next door, Safe neighborhood"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={loading || uploadingMedia} className="btn-primary flex-1">
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
