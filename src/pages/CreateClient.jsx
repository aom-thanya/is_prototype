import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Input } from '../components/base/input/input';

export default function CreateClient() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    clientId: '',
    companyNameTh: '',
    addressTh: ''
  });
  
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    if (!formData.companyNameTh || !formData.addressTh) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    showToast('Client created successfully!');
    setTimeout(() => navigate('/client'), 1000);
  };

  return (
    <div className="relative pb-24 min-h-full flex flex-col">
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-top-2 text-white ${toast.type === 'success' ? 'bg-success' : 'bg-error'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5"/> : <AlertCircle className="w-5 h-5"/>}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="p-8 max-w-[800px] mx-auto space-y-6 flex-1 w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate('/client')} />
          <div>
            <h1 className="text-2xl font-semibold text-text-primary font-title">Create Client</h1>
            <p className="text-sm text-text-secondary mt-1">Register a new client in the system.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-border bg-gray-50">
            <h3 className="font-semibold text-text-primary">Client Information</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Input 
                label="Client ID" 
                value={formData.clientId} 
                onChange={val => setFormData({...formData, clientId: val})}
                placeholder="Leave blank to auto-generate or type custom ID"
              />
              
              <Input 
                label="Company Name (TH)" 
                value={formData.companyNameTh} 
                onChange={val => setFormData({...formData, companyNameTh: val})}
                placeholder="e.g. บริษัท ตัวอย่าง จำกัด"
                required
              />
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">Address (TH) <span className="text-error">*</span></label>
                <textarea 
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none bg-surface text-text-primary"
                  rows={4}
                  value={formData.addressTh}
                  onChange={e => setFormData({...formData, addressTh: e.target.value})}
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="sticky bottom-0 w-full bg-white border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-40 mt-auto">
        <div className="max-w-[800px] mx-auto flex items-center justify-between gap-4">
          <Button color="secondary" onClick={() => navigate('/client')}>
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button color="primary" onClick={handleSave}>
              Save Client
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
