"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { getProperties } from "@/lib/properties";
import { supabase } from "@/lib/supabase";
import type { Property } from "@/types/database";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    const isAdmin = localStorage.getItem("rentalke_admin");
    if (isAdmin !== "true") {
      router.push("/admin");
    }
  }, [router]);

  // Load properties
  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    const data = await getProperties();
    setProperties(data);
    setLoading(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("rentalke_admin");
    router.push("/admin");
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("properties")
      .update({ available: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating property:", error);
      alert("Error updating property. Check console for details.");
      setUpdatingId(null);
    } else {
      setUpdatingId(null);
      await loadProperties(); // Reload properties
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setDeletingId(id);
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting property:", error);
        alert("Error deleting property. Check console for details.");
        setDeletingId(null);
      } else {
        setDeletingId(null);
        await loadProperties(); // Reload properties
      }
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Admin Header */}
        <section className="bg-white py-6">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-bg-light rounded-button p-6">
                <p className="text-text-secondary text-sm mb-1">Total Properties</p>
                <p className="text-3xl font-semibold">{properties.length}</p>
              </div>
              <div className="bg-green-50 rounded-button p-6">
                <p className="text-text-secondary text-sm mb-1">Available</p>
                <p className="text-3xl font-semibold text-status-available">
                  {properties.filter((p) => p.available).length}
                </p>
              </div>
              <div className="bg-red-50 rounded-button p-6">
                <p className="text-text-secondary text-sm mb-1">Occupied</p>
                <p className="text-3xl font-semibold text-status-occupied">
                  {properties.filter((p) => !p.available).length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="py-8">
          <div className="container-custom">
            <Link href="/admin/add-property" className="btn-primary">
              + Add New Property
            </Link>
          </div>
        </section>

        {/* Properties List */}
        <section className="py-8">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold mb-6">All Properties</h2>

            {loading ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-text-secondary">Loading properties...</p>
              </div>
            ) : properties.length > 0 ? (
              <div className="space-y-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="border border-border-gray rounded-button p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{property.title}</h3>
                          {property.available ? (
                            <span className="badge-available">Available</span>
                          ) : (
                            <span className="badge-occupied">Occupied</span>
                          )}
                        </div>
                        <p className="text-text-secondary mb-2">
                          {property.neighborhood}, {property.city} • {property.type}
                        </p>
                        <p className="text-lg font-semibold text-primary-blue">
                          Ksh {property.price.toLocaleString()}/month
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleToggleAvailability(property.id, property.available)}
                          disabled={updatingId === property.id}
                          className={`px-4 py-2 rounded-button text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                            property.available
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                        >
                          {updatingId === property.id ? (
                            <>
                              <Spinner size="sm" color="currentColor" />
                              <span>Updating...</span>
                            </>
                          ) : (
                            property.available ? "Mark as Occupied" : "Mark as Available"
                          )}
                        </button>
                        <Link
                          href={`/homes/${property.id}`}
                          className="px-4 py-2 rounded-button text-sm font-medium bg-bg-light hover:bg-border-gray transition-colors text-center"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id, property.title)}
                          disabled={deletingId === property.id}
                          className="px-4 py-2 rounded-button text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {deletingId === property.id ? (
                            <>
                              <Spinner size="sm" color="currentColor" />
                              <span>Deleting...</span>
                            </>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-semibold mb-2">No properties yet</h3>
                <p className="text-text-secondary mb-6">
                  Add your first property to get started
                </p>
                <Link href="/admin/add-property" className="btn-primary">
                  Add Property
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
