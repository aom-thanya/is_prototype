import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash01, UploadCloud02, CheckCircle, AlertCircle, Check } from '@untitledui/icons';
import { Button } from '../components/base/buttons/button';
import { Input } from '../components/base/input/input';
import { TextArea } from '../components/base/textarea/textarea';
import { NativeSelect } from '../components/base/select/select-native';
import { Select } from '../components/base/select/select';
import { RadioButton, RadioGroup } from '../components/base/radio-buttons/radio-buttons';
import { Checkbox } from '../components/base/checkbox/checkbox';
import { MOCK_CLIENTS } from '../mockData/clients';
import { CampaignSummaryPanel } from '../components/CampaignSummaryPanel';

const SectionCard = ({ id, title, children, error }) => (
  <div id={id} className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mb-6 scroll-mt-24">
    <div className="px-6 py-4 border-b border-border bg-gray-50 flex justify-between items-center">
      <h3 className="font-semibold text-text-primary">{title}</h3>
      {error && <span className="text-xs text-error font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{error}</span>}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

export default function CreateBrief() {
  const navigate = useNavigate();
  
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState([1]);

  const [formData, setFormData] = useState({
    projectName: '', client: '', brand: '', campaignName: '', product: '', industry: '', objectives: [], description: '', platforms: [],
    startDate: '', endDate: '', proposalDate: '', contentDate: '', publishDate: '',
    budget: '', currency: 'THB', budgetRemark: '',
    gender: '', ageRange: '', region: '', interest: '', incomeLevel: '', audienceDesc: '',
    remark: ''
  });
  
  const [kpis, setKpis] = useState([]);
  const [scopes, setScopes] = useState([{ id: 'init-1', platform: '', type: '', tier: '', qty: '', priceCap: '', remark: '' }]);
  const [references, setReferences] = useState([]);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const steps = [
    { id: 1, name: 'Campaign Setup' },
    { id: 2, name: 'Campaign Requirements' },
    { id: 3, name: 'Review & Submit' }
  ];

  // Handlers
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleObjectiveChange = (obj, isSelected) => {
    setFormData(prev => {
      const newObjectives = isSelected 
        ? [...prev.objectives, obj]
        : prev.objectives.filter(o => o !== obj);
      if (errors.objectives) setErrors(errs => ({ ...errs, objectives: null }));
      return { ...prev, objectives: newObjectives };
    });
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // KPI Handlers
  const addKpi = () => setKpis([...kpis, { id: generateId(), type: '', target: '', remark: '' }]);
  const removeKpi = (id) => setKpis(kpis.filter(k => k.id !== id));
  const updateKpi = (id, field, value) => {
    setKpis(kpis.map(k => k.id === id ? { ...k, [field]: value } : k));
  };

  // Scope Handlers
  const addScope = () => setScopes([...scopes, { id: generateId(), platform: '', type: '', tier: '', qty: '', priceCap: '', remark: '' }]);
  const removeScope = (id) => setScopes(scopes.filter(s => s.id !== id));
  const updateScope = (id, field, value) => {
    setScopes(scopes.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Reference Handlers
  const addReference = () => setReferences([...references, { id: generateId(), name: '', url: '' }]);
  const removeReference = (id) => setReferences(references.filter(r => r.id !== id));
  const updateReference = (id, field, value) => {
    setReferences(references.map(r => r.id === id ? { ...r, [field]: value } : r));
    if (errors[`ref_${id}`]) setErrors(errs => ({ ...errs, [`ref_${id}`]: null }));
  };

  // File Handlers
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map(file => ({
      id: generateId(), name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }));
    setFiles([...files, ...uploadedFiles]);
  };
  const removeFile = (id) => setFiles(files.filter(f => f.id !== id));


  // Actions
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const scrollToError = () => {
    setTimeout(() => {
      const errorElements = document.querySelectorAll('.text-error');
      if (errorElements.length > 0) {
        errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.projectName) newErrors.projectName = 'Project Name is required';
      if (!formData.client) newErrors.client = 'Client is required';
      if (!formData.brand) newErrors.brand = 'Brand is required';
      if (formData.objectives.length === 0) newErrors.objectives = 'At least one Campaign Objective is required';
      
      if (!formData.budget) newErrors.budget = 'Budget is required';
      else if (Number(formData.budget) <= 0) newErrors.budget = 'Budget must be greater than 0';

      if (formData.startDate && formData.endDate) {
        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
          newErrors.endDate = 'End Date must be after Start Date';
        }
      }
    } else if (step === 3) {
      references.forEach(ref => {
        if (ref.url && !/^https?:\/\/.+/.test(ref.url)) {
          newErrors[`ref_${ref.id}`] = 'Invalid URL format (must start with http:// or https://)';
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the validation errors.', 'error');
      scrollToError();
      return false;
    }
    
    setErrors({});
    return true;
  };

  const changeStep = (newStep) => {
    if (newStep === currentStep) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setVisitedSteps(prev => Array.from(new Set([...prev, currentStep + 1])));
      changeStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    changeStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    showToast('Brief saved as draft.');
    setTimeout(() => navigate('/brief'), 1500);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      showToast('Brief submitted successfully!');
      setTimeout(() => navigate('/brief'), 1500);
    }
  };

  const handleEditSection = (sectionId, inputId) => {
    changeStep(1);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => {
        const input = document.getElementById(inputId);
        if (input) {
          input.focus();
        }
      }, 500);
    }, 300);
  };

  const renderSummary = () => (
    <div className="space-y-6 mb-8">
      <h2 className="text-lg font-semibold text-text-primary">Summary</h2>
      
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-text-primary">Campaign Setup</h3>
          <Button color="tertiary" size="sm" onClick={() => changeStep(1)}>Edit</Button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div><span className="text-text-secondary block mb-1">Project Name</span> <span className="font-medium text-text-primary">{formData.projectName || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Client / Brand</span> <span className="font-medium text-text-primary">{formData.client || '-'} / {formData.brand || '-'}</span></div>
          <div className="md:col-span-2"><span className="text-text-secondary block mb-1">Objectives</span> <span className="font-medium text-text-primary">{formData.objectives.join(', ') || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Timeline</span> <span className="font-medium text-text-primary">{formData.startDate || '-'} to {formData.endDate || '-'}</span></div>
          <div><span className="text-text-secondary block mb-1">Budget</span> <span className="font-medium text-text-primary">{formData.budget ? `${Number(formData.budget).toLocaleString()} ${formData.currency}` : '-'}</span></div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-text-primary">Campaign Requirements</h3>
          <Button color="tertiary" size="sm" onClick={() => changeStep(2)}>Edit</Button>
        </div>
        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div><span className="text-text-secondary block mb-1">Target Audience</span> <span className="font-medium text-text-primary">{[formData.gender, formData.ageRange, formData.region].filter(Boolean).join(', ') || 'Any'}</span></div>
            <div><span className="text-text-secondary block mb-1">Income Level</span> <span className="font-medium text-text-primary">{formData.incomeLevel || 'Any'}</span></div>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-text-secondary block mb-2">KPIs ({kpis.length})</span>
            {kpis.length > 0 ? (
              <ul className="list-disc list-inside text-text-primary">
                {kpis.map(kpi => <li key={kpi.id}>{kpi.type} - {kpi.target}</li>)}
              </ul>
            ) : <span className="text-gray-400">No KPIs added</span>}
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-text-secondary block mb-2">Scope of Work ({scopes.length})</span>
            {scopes.length > 0 ? (
              <ul className="list-disc list-inside text-text-primary">
                {scopes.map(s => <li key={s.id}>{s.platform} {s.type} (x{s.qty})</li>)}
              </ul>
            ) : <span className="text-gray-400">No Scope added</span>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative h-full">
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-top-2 text-white ${toast.type === 'success' ? 'bg-success' : 'bg-error'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5"/> : <AlertCircle className="w-5 h-5"/>}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="p-4 md:p-8 max-w-[1400px] mx-auto pb-32">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate('/brief')} />
          <div>
            <h1 className="text-2xl font-semibold text-text-primary font-title">Create Brief</h1>
            <p className="text-sm text-text-secondary mt-1">Fill in the details below to create a new campaign brief.</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-12 mt-8 relative max-w-2xl mx-auto px-4">
          <div className="absolute left-10 right-10 top-4 -translate-y-1/2 h-0.5 bg-gray-200 -z-10 rounded-full"></div>
          <div 
            className="absolute left-10 top-4 -translate-y-1/2 h-0.5 bg-brand -z-10 transition-all duration-300 rounded-full" 
            style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 40px)` }}
          ></div>
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const isCompleted = visitedSteps.includes(step.id) && currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const canClick = visitedSteps.includes(step.id);
              
              let circleClass = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors outline-none ";
              let textClass = "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-colors ";
              
              if (isCurrent) {
                circleClass += "bg-white border-brand text-brand ring-4 ring-brand/10";
                textClass += "text-brand";
              } else if (isCompleted) {
                circleClass += "border-brand bg-brand text-white cursor-pointer hover:bg-brand-600";
                textClass += "text-brand";
              } else {
                circleClass += "bg-white border-gray-300 text-gray-400 cursor-not-allowed";
                textClass += "text-gray-400";
              }

              return (
                <div key={step.id} className="relative flex flex-col items-center">
                  <button 
                    disabled={!canClick}
                    onClick={() => changeStep(step.id)}
                    className={circleClass}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </button>
                  <span className={textClass}>{step.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Summary Panel (Left) */}
          <CampaignSummaryPanel 
            formData={formData} 
            onEditSection={handleEditSection} 
          />

          {/* Form Content (Right) */}
          <div className={`flex-1 w-full min-w-0 transition-all duration-200 ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`} key={currentStep}>
            <div className="space-y-6">
              {/* --- STEP 1: Campaign Setup --- */}
              {currentStep === 1 && (
                <>
                  {/* Section 1: Brief Information */}
                  <SectionCard id="section-brief-info" title="1. Brief Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input label="Brief No. / Work Order No." value="BRF-AUTO-GEN" isDisabled />
                  </div>
                  <div>
                    <Input id="input-project-name" label="Project Name" isRequired value={formData.projectName} onChange={(val) => handleChange('projectName', val)} isInvalid={!!errors.projectName} hint={errors.projectName} placeholder="Enter project name" />
                  </div>
              <div>
                <Select.ComboBox
                  label="Client"
                  isRequired
                  placeholder="Search and select client"
                  items={MOCK_CLIENTS.map(c => ({ id: c.id, name: c.companyNameTh }))}
                  selectedKey={MOCK_CLIENTS.find(c => c.companyNameTh === formData.client)?.id || null}
                  onSelectionChange={(key) => {
                    const client = MOCK_CLIENTS.find(c => c.id === key);
                    handleChange('client', client ? client.companyNameTh : '');
                    handleChange('brand', '');
                  }}
                >
                  {(item) => <Select.Item>{item.name}</Select.Item>}
                </Select.ComboBox>
                {errors.client && <p className="text-error text-xs mt-1">{errors.client}</p>}
              </div>
              <div>
                <Select.ComboBox
                  label="Brand"
                  isRequired
                  placeholder="Search and select brand"
                  items={formData.client === 'บริษัท โคคา-โคลา (ประเทศไทย) จำกัด' ? [{id: '1', name: 'Coke'}, {id: '2', name: 'Minute Maid'}] : (formData.client ? [{id: '99', name: 'Other Brand'}] : [])}
                  selectedKey={formData.brand ? '1' : null} 
                  onSelectionChange={(key) => {
                    const brandName = key === '1' ? 'Coke' : (key === '2' ? 'Minute Maid' : 'Other Brand');
                    handleChange('brand', brandName);
                  }}
                >
                  {(item) => <Select.Item>{item.name}</Select.Item>}
                </Select.ComboBox>
                {errors.brand && <p className="text-error text-xs mt-1">{errors.brand}</p>}
              </div>
              <div>
                <Input label="Campaign Name" value={formData.campaignName} onChange={(val) => handleChange('campaignName', val)} placeholder="Enter campaign name" />
              </div>
              <div>
                <Input label="Product / Service" value={formData.product} onChange={(val) => handleChange('product', val)} placeholder="What product is being promoted?" />
              </div>
              <div>
                <Input label="Industry" value={formData.industry} onChange={(val) => handleChange('industry', val)} placeholder="e.g. Beauty, Tech, FMCG" />
              </div>
              <div className="md:col-span-2">
                <div className="text-sm font-medium text-text-primary mb-2 flex">
                  Campaign Objective <span className="text-error ml-1">*</span>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  {['Awareness (Reach)', 'Interest (Engagement)', 'Trust (Post)'].map(obj => (
                    <Checkbox 
                      key={obj}
                      label={obj}
                      isSelected={formData.objectives.includes(obj)}
                      onChange={(isSelected) => handleObjectiveChange(obj, isSelected)}
                    />
                  ))}
                </div>
                {errors.objectives && <p className="text-error text-xs mt-2">{errors.objectives}</p>}
              </div>
              <div className="md:col-span-2">
                <TextArea label="Campaign Description" value={formData.description} onChange={(val) => handleChange('description', val)} placeholder="Provide more details about the campaign..." rows={4} />
              </div>
            </div>
          </SectionCard>

          {/* Section 2: Timeline */}
          <SectionCard id="section-timeline" title="2. Timeline">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input id="input-start-date" label="Campaign Start Date" type="date" value={formData.startDate} onChange={(val) => handleChange('startDate', val)} />
              </div>
              <div>
                <Input label="Campaign End Date" type="date" value={formData.endDate} onChange={(val) => handleChange('endDate', val)} isInvalid={!!errors.endDate} hint={errors.endDate} />
              </div>
            </div>
          </SectionCard>

          {/* Section 3: Budget */}
          <SectionCard id="section-budget" title="3. Budget">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input id="input-budget" label="Budget" isRequired type="number" value={formData.budget} onChange={(val) => handleChange('budget', val)} isInvalid={!!errors.budget} hint={errors.budget} placeholder="0.00" />
              </div>
              <div>
                <NativeSelect 
                  label="Currency" 
                  value={formData.currency} 
                  onChange={(e) => handleChange('currency', e.target.value)}
                  options={[
                    { label: 'THB', value: 'THB' },
                    { label: 'USD', value: 'USD' }
                  ]}
                />
              </div>
              <div className="md:col-span-2">
                <TextArea label="Budget Remark" value={formData.budgetRemark} onChange={(val) => handleChange('budgetRemark', val)} placeholder="Any notes regarding the budget..." />
              </div>
                </div>
              </SectionCard>
            </>
          )}

          {/* --- STEP 2: Campaign Requirements --- */}
          {currentStep === 2 && (
            <>
              {/* Section 4: KPI */}
              <SectionCard title="4. KPI">
            <div className="space-y-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg bg-gray-50/50">
                  <div className="w-full md:w-1/4">
                    <NativeSelect 
                      label="KPI Type"
                      value={kpi.type} 
                      onChange={e => updateKpi(kpi.id, 'type', e.target.value)}
                      options={[
                        {label: 'Reach', value: 'Reach'},
                        {label: 'Views', value: 'Views'},
                        {label: 'Engagement', value: 'Engagement'},
                        {label: 'Engagement Rate', value: 'Engagement Rate'},
                        {label: 'Click', value: 'Click'},
                        {label: 'Conversion', value: 'Conversion'},
                        {label: 'Sales', value: 'Sales'}
                      ]}
                    />
                  </div>
                  <div className="w-full md:w-1/4">
                    <Input label="Target Value" value={kpi.target} onChange={val => updateKpi(kpi.id, 'target', val)} placeholder="e.g. 100,000" />
                  </div>
                  <div className="w-full md:w-2/4 flex gap-2 items-end">
                    <div className="flex-1">
                      <Input label="Remark" value={kpi.remark} onChange={val => updateKpi(kpi.id, 'remark', val)} placeholder="Optional note" />
                    </div>
                    <Button color="tertiary" onClick={() => removeKpi(kpi.id)} className="text-gray-400 hover:text-error" iconLeading={Trash01} />
                  </div>
                </div>
              ))}
              <Button color="link-color" size="sm" onClick={addKpi} iconLeading={Plus}>
                Add KPI
              </Button>
            </div>
          </SectionCard>

          {/* Section 5: Target Audience */}
          <SectionCard title="5. Target Audience">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input label="Gender" value={formData.gender} onChange={(val) => handleChange('gender', val)} placeholder="e.g. Female, Male, All" />
              </div>
              <div>
                <Input label="Age Range" value={formData.ageRange} onChange={(val) => handleChange('ageRange', val)} placeholder="e.g. 18-24" />
              </div>
              <div>
                <Input label="Region / Province" value={formData.region} onChange={(val) => handleChange('region', val)} placeholder="e.g. Bangkok" />
              </div>
              <div>
                <Input label="Income Level" value={formData.incomeLevel} onChange={(val) => handleChange('incomeLevel', val)} placeholder="e.g. 30k+" />
              </div>
              <div className="md:col-span-2">
                <Input label="Interest" value={formData.interest} onChange={(val) => handleChange('interest', val)} placeholder="e.g. Beauty, Fashion" />
              </div>
              <div className="md:col-span-2">
                <TextArea label="Audience Description" value={formData.audienceDesc} onChange={(val) => handleChange('audienceDesc', val)} placeholder="More details about the target audience..." rows={3} />
              </div>
            </div>
          </SectionCard>

          {/* Section 6: Scope of Work */}
          <SectionCard title="6. Scope of Work">
            <div className="space-y-4">
              {scopes.map((scope) => (
                <div key={scope.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border border-border rounded-lg bg-gray-50/50">
                  <div className="md:col-span-2">
                    <NativeSelect 
                      label="Platform"
                      value={scope.platform} 
                      onChange={e => updateScope(scope.id, 'platform', e.target.value)}
                      options={[
                        {label: 'TikTok', value: 'TikTok'},
                        {label: 'Facebook', value: 'Facebook'},
                        {label: 'Instagram', value: 'Instagram'},
                        {label: 'Lemon8', value: 'Lemon8'},
                        {label: 'YouTube', value: 'YouTube'},
                        {label: 'X', value: 'X'}
                      ]}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <NativeSelect 
                      label="Content Type"
                      value={scope.type} 
                      onChange={e => updateScope(scope.id, 'type', e.target.value)}
                      options={[
                        {label: 'Video', value: 'Video'},
                        {label: 'Photo', value: 'Photo'},
                        {label: 'Live', value: 'Live'},
                        {label: 'Story', value: 'Story'},
                        {label: 'Post', value: 'Post'},
                        {label: 'Reel', value: 'Reel'}
                      ]}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Tier" value={scope.tier} onChange={val => updateScope(scope.id, 'tier', val)} placeholder="e.g. Macro" />
                  </div>
                  <div className="md:col-span-1">
                    <Input label="Qty" type="number" value={scope.qty} onChange={val => updateScope(scope.id, 'qty', val)} />
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Price Cap" type="number" value={scope.priceCap} onChange={val => updateScope(scope.id, 'priceCap', val)} />
                  </div>
                  <div className="md:col-span-3 flex gap-2 items-end">
                    <div className="flex-1">
                      <Input label="Remark" value={scope.remark} onChange={val => updateScope(scope.id, 'remark', val)} />
                    </div>
                    {scopes.length > 1 && (
                      <Button color="tertiary" onClick={() => removeScope(scope.id)} className="text-gray-400 hover:text-error" iconLeading={Trash01} />
                    )}
                  </div>
                </div>
              ))}
              <Button color="link-color" size="sm" onClick={addScope} iconLeading={Plus}>
                Add Scope
              </Button>
            </div>
          </SectionCard>
            </>
          )}

          {/* --- STEP 3: Review & Submit --- */}
          {currentStep === 3 && (
            <>
              
              {renderSummary()}

              {/* Section 7: References */}
              <SectionCard title="7. References">
            <div className="space-y-4">
              {references.map((ref) => (
                <div key={ref.id} className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg bg-gray-50/50">
                  <div className="w-full md:w-1/3">
                    <Input label="Reference Name" value={ref.name} onChange={val => updateReference(ref.id, 'name', val)} placeholder="e.g. Moodboard" />
                  </div>
                  <div className="w-full md:w-2/3 flex gap-2 items-end">
                    <div className="flex-1">
                      <Input label="URL" value={ref.url} onChange={val => updateReference(ref.id, 'url', val)} isInvalid={!!errors[`ref_${ref.id}`]} hint={errors[`ref_${ref.id}`]} placeholder="https://..." />
                    </div>
                    <Button color="tertiary" onClick={() => removeReference(ref.id)} className="text-gray-400 hover:text-error" iconLeading={Trash01} />
                  </div>
                </div>
              ))}
              <Button color="link-color" size="sm" onClick={addReference} iconLeading={Plus}>
                Add Reference
              </Button>
            </div>
          </SectionCard>

          {/* Section 8: Attachments */}
          <SectionCard title="8. Attachments">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                <UploadCloud02 className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-sm text-text-primary font-medium">Click or drag files to upload</p>
                <p className="text-xs text-text-secondary mt-1">PDF, DOCX, PPTX, XLSX, Images (Max 10MB)</p>
                <input type="file" multiple className="hidden" id="file-upload" onChange={handleFileUpload} />
                <label htmlFor="file-upload" className="mt-4 px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-gray-50 cursor-pointer shadow-sm">
                  Select Files
                </label>
              </div>
              {files.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {files.map(file => (
                    <li key={file.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-text-primary">{file.name}</span>
                        <span className="text-xs text-text-secondary">{file.size}</span>
                      </div>
                      <Button color="tertiary" size="sm" onClick={() => removeFile(file.id)} className="text-gray-400 hover:text-error" iconLeading={Trash01} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </SectionCard>

              {/* Section 9: Additional Remark */}
              <SectionCard title="9. Additional Remark">
                <TextArea label="Remark" value={formData.remark} onChange={(val) => handleChange('remark', val)} placeholder="Any final notes or instructions..." />
              </SectionCard>
            </>
          )}
            </div>
          </div>
        </div>
      </div>

    {/* Action Footer */}
    <div className="sticky bottom-0 w-full bg-white border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-40">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          <div>
            {currentStep > 1 ? (
              <Button color="secondary" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <Button color="secondary" onClick={() => navigate('/brief')}>
                Cancel
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button color="secondary" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            {currentStep < 3 ? (
              <Button color="primary" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button color="primary" onClick={handleSubmit}>
                Submit Brief
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
