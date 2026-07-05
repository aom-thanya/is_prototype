import React from 'react';
import { Button } from '../../components/base/buttons/button';
import { Plus } from '@untitledui/icons';

export default function BrandsTab({ brands }) {
  if (!brands) return null;

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
