'use client';

import React, { useState } from 'react';
import { ChevronRight, Plus, Upload, Check, Search, Filter, Edit2, X } from 'lucide-react';

// Color System
const colors = {
  warmSand: '#EFE7DF',
  mutedStone: '#D8CEC4',
  charcoalInk: '#2B2623',
  deepTerracotta: '#9A4F34',
  antiquCopper: '#A66A4A'
};

// Reusable Components
const PrimaryButton = ({ children, onClick, fullWidth = true }) => (
  <button
    onClick={onClick}
    className={`bg-[${colors.deepTerracotta}] text-white font-medium py-4 px-6 tracking-wide transition-opacity hover:opacity-90 ${fullWidth ? 'w-full' : ''}`}
    style={{ 
      backgroundColor: colors.deepTerracotta,
      fontFamily: "'Inter', sans-serif",
      letterSpacing: '0.5px'
    }}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full border-2 py-4 px-6 font-medium tracking-wide transition-colors hover:bg-opacity-5"
    style={{ 
      borderColor: colors.deepTerracotta,
      color: colors.deepTerracotta,
      fontFamily: "'Inter', sans-serif",
      letterSpacing: '0.5px'
    }}
  >
    {children}
  </button>
);

const Card = ({ children, onClick, className = '' }) => (
  <div
    onClick={onClick}
    className={`bg-white p-6 mb-4 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={{ 
      backgroundColor: 'white',
      border: `1px solid ${colors.mutedStone}`
    }}
  >
    {children}
  </div>
);

const InputField = ({ label, placeholder, value, onChange, type = 'text' }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium mb-2" style={{ color: colors.charcoalInk }}>
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-4 border text-base"
      style={{ 
        borderColor: colors.mutedStone,
        color: colors.charcoalInk,
        backgroundColor: 'white'
      }}
    />
  </div>
);

const Badge = ({ children, variant = 'primary', onClick }) => (
  <span
    onClick={onClick}
    className={`inline-block px-3 py-1 text-xs font-medium tracking-wide mr-2 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
    style={{
      backgroundColor: variant === 'primary' ? colors.deepTerracotta : colors.antiquCopper,
      color: 'white',
      letterSpacing: '0.5px'
    }}
  >
    {children}
  </span>
);

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center mb-8">
    {[...Array(totalSteps)].map((_, i) => (
      <React.Fragment key={i}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-medium"
          style={{
            backgroundColor: i < currentStep ? colors.deepTerracotta : colors.mutedStone,
            color: i < currentStep ? 'white' : colors.charcoalInk
          }}
        >
          {i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div
            className="w-12 h-0.5 mx-2"
            style={{ backgroundColor: i < currentStep - 1 ? colors.deepTerracotta : colors.mutedStone }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

const TabBar = ({ activeTab, onTabChange }) => {
  const tabs = ['Home', 'Providers', 'Cases', 'Profile'];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex" style={{ borderColor: colors.mutedStone }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab.toLowerCase())}
          className="flex-1 py-4 text-sm font-medium"
          style={{
            color: activeTab === tab.toLowerCase() ? colors.deepTerracotta : colors.charcoalInk,
            backgroundColor: 'white'
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ backgroundColor: colors.warmSand }}>
        <div className="sticky top-0 bg-white p-4 border-b flex justify-end" style={{ borderColor: colors.mutedStone }}>
          <button onClick={onClose}>
            <X size={24} color={colors.charcoalInk} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function PawblemMedicApp() {
  const [screen, setScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dog');
  const [petSize, setPetSize] = useState('medium');
  const [contactInfo, setContactInfo] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [certificationModal, setCertificationModal] = useState(null);

  // Certification Info Modal
  const CertificationModal = () => {
    const certifications = {
      'post-op': {
        title: 'Post-Op Certified',
        content: (
          <>
            <p className="text-base mb-4" style={{ color: colors.charcoalInk }}>
              This provider has completed Pawblem's internal post-operative execution training.
            </p>
            <p className="text-sm font-medium mb-3" style={{ color: colors.deepTerracotta }}>
              Certification includes:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Post-surgical care routines</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Medication administration support (non-diagnostic)</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Wound and recovery checklist execution</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Activity restriction management</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Escalation protocol training</li>
            </ul>
            <p className="text-sm italic" style={{ color: colors.antiquCopper }}>
              Post-Op Certified providers execute veterinary instructions. They do not diagnose, prescribe, or modify treatment plans.
            </p>
          </>
        )
      },
      'audit': {
        title: 'Audit-Enabled',
        content: (
          <>
            <p className="text-base mb-4" style={{ color: colors.charcoalInk }}>
              This provider operates under Pawblem's structured verification framework.
            </p>
            <p className="text-sm font-medium mb-3" style={{ color: colors.deepTerracotta }}>
              What this means:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Visit arrival and departure are time-verified</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Key tasks are documented</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Condition updates are recorded</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Escalation events are logged</li>
              <li className="text-base" style={{ color: colors.charcoalInk }}>• Documentation can be reviewed in case of dispute</li>
            </ul>
            <p className="text-sm italic" style={{ color: colors.antiquCopper }}>
              Audit-Enabled does not mean continuous live surveillance. It ensures verifiable execution under defined protocols.
            </p>
          </>
        )
      },
     'er': {
  title: 'ER Certified',
  content: (
    <>
      <p className="text-sm mb-1" style={{ color: colors.antiquCopper }}>
        (Emergency Response Certified)
      </p>

      <p className="text-base mb-4" style={{ color: colors.charcoalInk }}>
        This provider has completed verified emergency response training for high-risk post-operative scenarios.
      </p>

      <p className="text-sm font-medium mb-3" style={{ color: colors.deepTerracotta }}>
        Includes:
      </p>
      <ul className="space-y-2 mb-6">
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Pet CPR</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• First Aid &amp; Stabilization</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Wound bandaging</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Choking response</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Seizure response protocol</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Safe emergency transport handling</li>
      </ul>

      <p className="text-sm font-medium mb-3" style={{ color: colors.deepTerracotta }}>
        Recognized Training Sources:
      </p>
      <ul className="space-y-2 mb-6">
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Red Cross Pet CPR &amp; First Aid</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• PetTech Certification</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Fear Free Handling Training</li>
        <li className="text-base" style={{ color: colors.charcoalInk }}>• Behavioral Safety Training</li>
      </ul>

      <p className="text-sm italic" style={{ color: colors.antiquCopper }}>
        ER Certified providers are trained to stabilize and escalate. They do not diagnose or replace veterinary medical care.
      </p>
    </>
  )
}
    };

    if (!certificationModal) return null;

    const cert = certifications[certificationModal];

    return (
      <Modal isOpen={!!certificationModal} onClose={() => setCertificationModal(null)}>
        <h2 className="text-3xl font-bold mb-6" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
          {cert.title}
        </h2>
        {cert.content}
        <div className="mt-6">
          <PrimaryButton onClick={() => setCertificationModal(null)}>
            Close
          </PrimaryButton>
        </div>
      </Modal>
    );
  };

  // Provider Detail Modal
  const ProviderDetailModal = () => (
    <Modal isOpen={showProviderModal} onClose={() => setShowProviderModal(false)}>
      <h2 className="text-3xl font-bold mb-4" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
        Sarah Mitchell, RVT
      </h2>
      
      <div className="mb-6">
        <Badge onClick={() => { setShowProviderModal(false); setCertificationModal('post-op'); }}>
          Post-Op Certified
        </Badge>
        <Badge variant="secondary" onClick={() => { setShowProviderModal(false); setCertificationModal('audit'); }}>
          Audit-Enabled
        </Badge>
        <Badge variant="secondary" onClick={() => { setShowProviderModal(false); setCertificationModal('er'); }}>
          ER Certified
        </Badge>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium mb-2" style={{ color: colors.antiquCopper }}>Experience</p>
        <p className="text-base mb-3" style={{ color: colors.charcoalInk }}>
          8 years veterinary nursing
        </p>
        <p className="text-base mb-3" style={{ color: colors.charcoalInk }}>
          Specialized in orthopedic recovery
        </p>
        <p className="text-base" style={{ color: colors.charcoalInk }}>
          120+ successful post-op cases
        </p>
      </div>

      <div className="mb-8">
        <p className="text-sm font-medium mb-2" style={{ color: colors.antiquCopper }}>Availability</p>
        <p className="text-base" style={{ color: colors.charcoalInk }}>
          Morning & Afternoon slots this week
        </p>
      </div>

      <PrimaryButton onClick={() => { setSelectedProvider('Sarah Mitchell, RVT'); setShowProviderModal(false); setScreen('case-confirmation'); }}>
        Select Provider
      </PrimaryButton>
    </Modal>
  );

  // Splash Screen
  if (screen === 'splash') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ backgroundColor: colors.warmSand }}>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-tight" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
            PAWBLEM MEDIC
          </h1>
          <p className="text-lg tracking-wide" style={{ color: colors.antiquCopper, fontFamily: "'Inter', sans-serif" }}>
            Premium post-op care execution.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <PrimaryButton onClick={() => setScreen('phone')}>Continue</PrimaryButton>
        </div>
      </div>
    );
  }

  // Phone Registration
  if (screen === 'phone') {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-16">
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Sign Up
          </h2>
          <p className="text-base mb-12" style={{ color: colors.antiquCopper }}>
            Enter your phone number to continue
          </p>
          <InputField
            label="Phone Number"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
          />
          <PrimaryButton onClick={() => setScreen('verification')}>Send Code</PrimaryButton>
        </div>
      </div>
    );
  }

  // Verification
  if (screen === 'verification') {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-16">
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Verification
          </h2>
          <p className="text-base mb-12" style={{ color: colors.antiquCopper }}>
            Enter the 6-digit code sent to {phone}
          </p>
          <InputField
            label="Verification Code"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
          />
          <PrimaryButton onClick={() => setScreen('optional-info')}>Verify</PrimaryButton>
          <button className="w-full mt-4 text-sm" style={{ color: colors.deepTerracotta }}>
            Resend Code
          </button>
        </div>
      </div>
    );
  }

  // Optional Info
  if (screen === 'optional-info') {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-16">
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Complete Profile
          </h2>
          <p className="text-base mb-12" style={{ color: colors.antiquCopper }}>
            Optional information
          </p>
          <InputField
            label="Full Name"
            placeholder="Your name"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
          <InputField
            label="Email"
            placeholder="your@email.com"
            type="email"
          />
          <PrimaryButton onClick={() => setScreen('create-pet')}>Continue to App</PrimaryButton>
        </div>
      </div>
    );
  }

  // Create Pet Profile
  if (screen === 'create-pet') {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-16">
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Create Pet Profile
          </h2>
          <p className="text-base mb-12" style={{ color: colors.antiquCopper }}>
            Required information
          </p>
          
          <InputField
            label="Pet Name"
            placeholder="Enter pet's name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3" style={{ color: colors.charcoalInk }}>Pet Type</label>
            <div className="flex gap-3">
              {['Dog', 'Cat'].map(type => (
                <button
                  key={type}
                  onClick={() => setPetType(type.toLowerCase())}
                  className="flex-1 py-3 font-medium border-2 transition-colors"
                  style={{
                    borderColor: petType === type.toLowerCase() ? colors.deepTerracotta : colors.mutedStone,
                    backgroundColor: petType === type.toLowerCase() ? colors.deepTerracotta : 'white',
                    color: petType === type.toLowerCase() ? 'white' : colors.charcoalInk
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3" style={{ color: colors.charcoalInk }}>Pet Size</label>
            <div className="flex gap-3">
              {['Small', 'Medium', 'Large'].map(size => (
                <button
                  key={size}
                  onClick={() => setPetSize(size.toLowerCase())}
                  className="flex-1 py-3 font-medium border-2 transition-colors"
                  style={{
                    borderColor: petSize === size.toLowerCase() ? colors.deepTerracotta : colors.mutedStone,
                    backgroundColor: petSize === size.toLowerCase() ? colors.deepTerracotta : 'white',
                    color: petSize === size.toLowerCase() ? 'white' : colors.charcoalInk
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <PrimaryButton onClick={() => { setScreen('main'); setActiveTab('home'); }}>
            Save & Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  // New Case Flow - Step 1: Upload
  if (screen === 'new-case-1') {
    return (
      <div className="min-h-screen p-8 pb-24" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-8">
          <StepIndicator currentStep={1} totalSteps={3} />
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Upload Vet Instructions
          </h2>
          <p className="text-base mb-8" style={{ color: colors.antiquCopper }}>
            Recommended for best care
          </p>

          <Card className="border-dashed border-2 text-center py-12 cursor-pointer" onClick={() => setUploadedFile(true)}>
            {uploadedFile ? (
              <div>
                <Check size={48} color={colors.deepTerracotta} className="mx-auto mb-3" />
                <p className="font-medium" style={{ color: colors.deepTerracotta }}>Uploaded ✓</p>
              </div>
            ) : (
              <div>
                <Upload size={48} color={colors.antiquCopper} className="mx-auto mb-3" />
                <p className="font-medium mb-2" style={{ color: colors.charcoalInk }}>Upload Photo or Document</p>
                <p className="text-sm" style={{ color: colors.antiquCopper }}>Tap to select file</p>
              </div>
            )}
          </Card>

          <div className="mt-8">
            <PrimaryButton onClick={() => { setCurrentStep(2); setScreen('new-case-2'); }}>
              Continue
            </PrimaryButton>
            <button
              className="w-full mt-4 text-sm"
              style={{ color: colors.antiquCopper }}
              onClick={() => { setCurrentStep(2); setScreen('new-case-2'); }}
            >
              Skip (Not Recommended)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // New Case Flow - Step 2: Describe Needs
  if (screen === 'new-case-2') {
    return (
      <div className="min-h-screen p-8 pb-24" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-8">
          <StepIndicator currentStep={2} totalSteps={3} />
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Describe Your Needs
          </h2>
          <p className="text-base mb-8" style={{ color: colors.antiquCopper }}>
            What does your pet require?
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.charcoalInk }}>
              Care Requirements
            </label>
            <textarea
              placeholder="Medication schedule, wound care, activity restriction..."
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-4 border text-base"
              style={{ 
                borderColor: colors.mutedStone,
                color: colors.charcoalInk,
                backgroundColor: 'white'
              }}
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3" style={{ color: colors.charcoalInk }}>
              Preferred Time (Optional)
            </label>
            <div className="flex gap-3">
              {['Morning', 'Afternoon', 'Evening'].map(time => (
                <button
                  key={time}
                  className="flex-1 py-3 text-sm font-medium border"
                  style={{
                    borderColor: colors.mutedStone,
                    backgroundColor: 'white',
                    color: colors.charcoalInk
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <PrimaryButton onClick={() => { setCurrentStep(3); setScreen('new-case-3'); }}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  // New Case Flow - Step 3: Review Summary
  if (screen === 'new-case-3') {
    return (
      <div className="min-h-screen p-8 pb-24" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-8">
          <StepIndicator currentStep={3} totalSteps={3} />
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Review Summary
          </h2>
          <p className="text-base mb-8" style={{ color: colors.antiquCopper }}>
            Confirm your case details
          </p>

          <Card>
            <div className="mb-4">
              <p className="text-sm font-medium mb-1" style={{ color: colors.antiquCopper }}>Pet</p>
              <p className="text-lg font-medium" style={{ color: colors.charcoalInk }}>{petName || 'Max'}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-1" style={{ color: colors.antiquCopper }}>Vet Instructions</p>
              <p className="text-base" style={{ color: colors.charcoalInk }}>
                {uploadedFile ? 'Document uploaded ✓' : 'No file uploaded'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: colors.antiquCopper }}>Description</p>
              <p className="text-base" style={{ color: colors.charcoalInk }}>
                {caseDescription || 'No description provided'}
              </p>
            </div>
          </Card>

          <div className="mt-8">
            <PrimaryButton onClick={() => { setScreen('providers'); setActiveTab('providers'); }}>
              Find Providers
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  // Case Confirmation Screen
  if (screen === 'case-confirmation') {
    return (
      <div className="min-h-screen p-8 pb-24" style={{ backgroundColor: colors.warmSand }}>
        <div className="max-w-md mx-auto pt-8">
          <h2 className="text-4xl font-bold mb-3" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Confirm Case
          </h2>
          <p className="text-base mb-8" style={{ color: colors.antiquCopper }}>
            Review and confirm your selection
          </p>

          <Card>
            <div className="mb-4">
              <p className="text-sm font-medium mb-1" style={{ color: colors.antiquCopper }}>Pet</p>
              <p className="text-lg font-medium" style={{ color: colors.charcoalInk }}>{petName || 'Max'}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-1" style={{ color: colors.antiquCopper }}>Provider</p>
              <p className="text-lg font-medium" style={{ color: colors.charcoalInk }}>{selectedProvider}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-1" style={{ color: colors.antiquCopper }}>Description</p>
              <p className="text-base" style={{ color: colors.charcoalInk }}>
                {caseDescription || 'Post-operative care'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: colors.antiquCopper }}>Status</p>
              <Badge>Draft</Badge>
            </div>
          </Card>

          <div className="mt-8">
            <PrimaryButton onClick={() => { setScreen('main'); setActiveTab('cases'); }}>
              Confirm
            </PrimaryButton>
            <button
              className="w-full mt-4 text-sm font-medium"
              style={{ color: colors.deepTerracotta }}
              onClick={() => { setScreen('providers'); setActiveTab('providers'); }}
            >
              Change Provider
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main App Screens
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: colors.warmSand }}>
      <CertificationModal />
      <ProviderDetailModal />
      
      {/* HOME */}
      {activeTab === 'home' && (
        <div className="p-6 pt-12">
          <div className="mb-8">
            <p className="text-sm mb-2" style={{ color: colors.antiquCopper }}>Current Pet</p>
            <div className="flex items-center justify-between p-4 bg-white border" style={{ borderColor: colors.mutedStone }}>
              <div>
                <p className="text-xl font-bold" style={{ color: colors.charcoalInk }}>{petName || 'Max'}</p>
                <p className="text-sm" style={{ color: colors.antiquCopper }}>
                  {petType.charAt(0).toUpperCase() + petType.slice(1)} · {petSize.charAt(0).toUpperCase() + petSize.slice(1)}
                </p>
              </div>
              <ChevronRight size={20} color={colors.charcoalInk} />
            </div>
          </div>

          <Card onClick={() => setScreen('new-case-1')} className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                  Start New Case
                </h3>
                <p className="text-sm" style={{ color: colors.antiquCopper }}>
                  Post-operative care request
                </p>
              </div>
              <Plus size={24} color={colors.deepTerracotta} />
            </div>
          </Card>

          <Card onClick={() => setActiveTab('providers')}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                  Browse Providers
                </h3>
                <p className="text-sm" style={{ color: colors.antiquCopper }}>
                  Certified care specialists
                </p>
              </div>
              <ChevronRight size={24} color={colors.charcoalInk} />
            </div>
          </Card>

          <Card onClick={() => setScreen('new-case-1')}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                  Upload Vet Instructions
                </h3>
                <p className="text-sm" style={{ color: colors.antiquCopper }}>
                  Add medical documentation
                </p>
              </div>
              <Upload size={24} color={colors.charcoalInk} />
            </div>
          </Card>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
              Recent Cases
            </h3>
            <p className="text-sm" style={{ color: colors.antiquCopper }}>No recent cases</p>
          </div>
        </div>
      )}

      {/* PROVIDERS */}
      {activeTab === 'providers' && (
        <div className="p-6 pt-12">
          <h2 className="text-4xl font-bold mb-8" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Providers
          </h2>

          <div className="mb-6 flex gap-3">
            <div className="flex-1 relative">
              <Search size={20} color={colors.antiquCopper} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search providers"
                className="w-full pl-12 pr-4 py-3 border"
                style={{ borderColor: colors.mutedStone, backgroundColor: 'white' }}
              />
            </div>
            <button className="px-4 py-3 border" style={{ borderColor: colors.mutedStone, backgroundColor: 'white' }}>
              <Filter size={20} color={colors.charcoalInk} />
            </button>
          </div>

          {[
            { name: 'Sarah Mitchell, RVT', bio: '8 years veterinary nursing, orthopedic recovery specialist' },
            { name: 'Dr. James Chen', bio: '12 years post-op care, specialized in surgical recovery' },
            { name: 'Maria Rodriguez, CVT', bio: '10 years experience, medication management expert' }
          ].map((provider, idx) => (
            <Card key={idx}>
              <div onClick={() => setShowProviderModal(true)} className="cursor-pointer">
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                  {provider.name}
                </h3>
              </div>
              <div className="mb-3">
                <Badge onClick={(e) => { e.stopPropagation(); setCertificationModal('post-op'); }}>
                  Post-Op Certified
                </Badge>
                <Badge variant="secondary" onClick={(e) => { e.stopPropagation(); setCertificationModal('audit'); }}>
                  Audit-Enabled
                </Badge>
                <Badge variant="secondary" onClick={(e) => { e.stopPropagation(); setCertificationModal('er'); }}>
                 ER Certified
                </Badge>
              </div>
              <p className="text-sm mb-4" style={{ color: colors.charcoalInk }}>{provider.bio}</p>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowProviderModal(true)}>
                <span className="text-sm font-medium" style={{ color: colors.deepTerracotta }}>View Profile</span>
                <ChevronRight size={18} color={colors.deepTerracotta} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CASES */}
      {activeTab === 'cases' && (
        <div className="p-6 pt-12">
          <h2 className="text-4xl font-bold mb-8" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Cases
          </h2>

          {selectedProvider ? (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                  Active Case
                </h3>
                <Edit2 size={18} color={colors.deepTerracotta} />
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium" style={{ color: colors.antiquCopper }}>Pet</p>
                <p className="text-base" style={{ color: colors.charcoalInk }}>{petName || 'Max'}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium" style={{ color: colors.antiquCopper }}>Provider</p>
                <p className="text-base" style={{ color: colors.charcoalInk }}>{selectedProvider}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium" style={{ color: colors.antiquCopper }}>Vet Instructions</p>
                <p className="text-base" style={{ color: colors.charcoalInk }}>
                  {uploadedFile ? 'Document uploaded' : 'No file'}
                </p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium" style={{ color: colors.antiquCopper }}>Description</p>
                <p className="text-base" style={{ color: colors.charcoalInk }}>
                  {caseDescription || 'Post-operative care'}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: colors.antiquCopper }}>Status</p>
                <Badge>Active</Badge>
              </div>
            </Card>
          ) : (
            <p className="text-sm" style={{ color: colors.antiquCopper }}>No active cases</p>
          )}
        </div>
      )}

      {/* PROFILE */}
      {activeTab === 'profile' && (
        <div className="p-6 pt-12">
          <h2 className="text-4xl font-bold mb-8" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
            Profile
          </h2>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                  Personal Information
                </h3>
                <p className="text-sm" style={{ color: colors.antiquCopper }}>{phone}</p>
              </div>
              <Edit2 size={18} color={colors.deepTerracotta} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                Pets
              </h3>
              <Plus size={20} color={colors.deepTerracotta} />
            </div>
            <div className="border-t pt-4" style={{ borderColor: colors.mutedStone }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium" style={{ color: colors.charcoalInk }}>{petName || 'Max'}</p>
                  <p className="text-sm" style={{ color: colors.antiquCopper }}>
                    {petType.charAt(0).toUpperCase() + petType.slice(1)} · {petSize.charAt(0).toUpperCase() + petSize.slice(1)}
                  </p>
                </div>
                <Edit2 size={18} color={colors.deepTerracotta} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold" style={{ color: colors.charcoalInk, fontFamily: "'Inter', sans-serif" }}>
                Settings
              </h3>
              <ChevronRight size={20} color={colors.charcoalInk} />
            </div>
          </Card>
        </div>
      )}

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
