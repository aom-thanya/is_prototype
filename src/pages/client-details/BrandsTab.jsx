import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/base/buttons/button';
import { Plus } from '@untitledui/icons';

export default function BrandsTab() {
  const { id } = useParams();
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/clients/${id}/brands`);
        if (!res.ok) throw new Error('Failed to fetch brands');
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, [id]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-surface rounded-xl border border-border p-6 h-[250px] animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
              <div className="space-y-4">
                <div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary text-lg">Brands</h3>
        <Button color="secondary" size="sm" iconLeading={Plus}>
          Add Brand
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brands.length === 0 ? (
          <div className="col-span-full py-12 text-center text-text-secondary bg-surface rounded-xl border border-border">
            No brands added yet.
          </div>
        ) : (
          brands.map((brand) => (
            <div key={brand.id} className="bg-surface rounded-xl border border-border shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-text-primary text-lg">{brand.name}</h4>
                  <p className="text-sm text-text-secondary">{brand.category}</p>
                </div>
                <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                  {brand.status}
                </span>
              </div>
              
              <dl className="grid grid-cols-1 gap-y-3 mt-auto">
                <div>
                  <dt className="text-xs font-medium text-text-secondary uppercase tracking-wider">Product / Service</dt>
                  <dd className="mt-1 text-sm text-text-primary">{brand.product}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-text-secondary uppercase tracking-wider">Target Audience</dt>
                  <dd className="mt-1 text-sm text-text-primary">{brand.targetAudience}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-text-secondary uppercase tracking-wider">Brand Personality</dt>
                  <dd className="mt-1 text-sm text-text-primary">{brand.personality}</dd>
                </div>
              </dl>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
