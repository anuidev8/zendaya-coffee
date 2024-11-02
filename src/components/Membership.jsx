import React, { useState } from 'react';
import { Crown, Star, Gift, CreditCard, Calendar, Users, Coffee, Book } from 'lucide-react';
import { Alert, AlertDescription } from './alert';
import { Card, CardHeader, CardContent } from './card';

// Membership configuration
const MEMBERSHIP_TIERS = {
  none: 'NO_MEMBERSHIP',
  explorer: 'ZEN_EXPLORER',
  enthusiast: 'ZEN_ENTHUSIAST',
  master: 'ZEN_MASTER'
};

const MEMBERSHIP_DETAILS = {
  [MEMBERSHIP_TIERS.explorer]: {
    name: 'Zen Explorer',
    price: 9.99,
    yearlyPrice: 99,
    theme: 'bg-amber-50',
    icon: Coffee,
    digitalBenefits: [
      'Basic access to Coffee Education module',
      'Access to main WhatsApp community group',
      'Instagram close friends content',
      'Progress tracking on platform',
      'Basic achievements'
    ],
    physicalBenefits: [
      'Member card with QR code',
      'Birthday reward (free specialty drink)',
      'Access to monthly community meetups',
      '5% discount on in-store purchases'
    ]
  },
  [MEMBERSHIP_TIERS.enthusiast]: {
    name: 'Zen Enthusiast',
    price: 24.99,
    yearlyPrice: 249,
    theme: 'bg-amber-100',
    icon: Book,
    digitalBenefits: [
      'Full access to Coffee Education module',
      'Complete Coffee Origins course',
      'Access to exclusive coffee education WhatsApp group',
      'Enhanced progress tracking',
      'Course completion certificates',
      'Priority support on platform'
    ],
    physicalBenefits: [
      'Premium member card with photo',
      'Monthly coffee tasting sessions',
      '10% discount on in-store purchases',
      'Priority event registration',
      'Monthly coffee workshop',
      'Bring-a-friend passes (2 per year)'
    ]
  },
  [MEMBERSHIP_TIERS.master]: {
    name: 'Zen Master',
    price: 44.99,
    yearlyPrice: 449,
    theme: 'bg-amber-200',
    icon: Crown,
    digitalBenefits: [
      'Premium access to all educational content',
      'VIP WhatsApp group with direct instructor access',
      'Custom learning paths',
      'Mentor access on platform',
      'Early access to new courses',
      'Exclusive digital content'
    ],
    physicalBenefits: [
      'VIP member card with photo',
      'Quarterly private coffee masterclass',
      'Reserved seating during peak hours',
      '15% discount on in-store purchases',
      'Free monthly bag of specialty coffee',
      'Bring-a-friend passes (4 per year)',
      'First access to seasonal menu items',
      'Exclusive seasonal events'
    ]
  }
};

const MembershipCard = ({ tier, onSelect, isSelected }) => {
  const details = MEMBERSHIP_DETAILS[tier];
  const IconComponent = details.icon;

  return (
    <Card className={`${details.theme} transition-all transform ${isSelected ? 'scale-105 shadow-lg' : 'hover:scale-102'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-brown-800">{details.name}</h3>
          <IconComponent className="w-6 h-6 text-brown-600" />
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-brown-800">
            ${details.price}<span className="text-sm">/month</span>
          </p>
          <p className="text-sm text-brown-600">
            or ${details.yearlyPrice}/year (save 17%)
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-brown-700">Digital Benefits</h4>
          <ul className="space-y-2">
            {details.digitalBenefits.map((benefit, index) => (
              <li key={`digital-${index}`} className="flex items-start">
                <Star className="w-4 h-4 text-brown-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm text-brown-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-brown-700">Physical Benefits</h4>
          <ul className="space-y-2">
            {details.physicalBenefits.map((benefit, index) => (
              <li key={`physical-${index}`} className="flex items-start">
                <Gift className="w-4 h-4 text-brown-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm text-brown-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={() => onSelect(tier)}
          className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center
            ${isSelected 
              ? 'bg-brown-700 text-white' 
              : 'bg-brown-600 text-white hover:bg-brown-700'}`}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          {isSelected ? 'Selected' : `Choose ${details.name}`}
        </button>
      </CardContent>
    </Card>
  );
};

const MembershipStatus = ({ currentTier }) => {
  if (currentTier === MEMBERSHIP_TIERS.none) return null;
  
  const details = MEMBERSHIP_DETAILS[currentTier];
  return (
    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow">
      <details.icon className="w-5 h-5 text-brown-600" />
      <span className="font-medium text-brown-800">{details.name}</span>
    </div>
  );
};

const MembershipSelector = ({ currentTier, onTierSelect, isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState(currentTier);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-brown-800">Choose Your Membership</h2>
            <p className="text-brown-600">Select the tier that best fits your coffee journey</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(MEMBERSHIP_TIERS).slice(1).map((tier) => (
            <MembershipCard 
              key={tier} 
              tier={tier} 
              onSelect={(tier) => {
                setSelectedTier(tier);
                onTierSelect(tier);
              }} 
              isSelected={tier === selectedTier}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-brown-600 hover:text-brown-800"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onTierSelect(selectedTier);
              onClose();
            }}
            className="px-4 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

// Access control helper
const checkAccess = (userTier, requiredTier) => {
  const tiers = Object.values(MEMBERSHIP_TIERS);
  return tiers.indexOf(userTier) >= tiers.indexOf(requiredTier);
};

// Export the components and utilities
export {
  MEMBERSHIP_TIERS,
  MEMBERSHIP_DETAILS,
  MembershipCard,
  MembershipStatus,
  MembershipSelector,
  checkAccess
};

// Example usage component
export const MembershipExample = () => {
  const [currentTier, setCurrentTier] = useState(MEMBERSHIP_TIERS.none);
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-6 items-center">
    
        <div className="flex items-center space-x-4 justify-center w-full">
          <MembershipStatus currentTier={currentTier} />
          <button 
            onClick={() => setShowSelector(true)}
            className="px-4 py-2 bg-[#eab676] text-black rounded-lg hover:bg-brown-700"
          >
            {currentTier === MEMBERSHIP_TIERS.none ? 'Join Now' : 'Change Plan'}
          </button>
        </div>
      </div>

      <MembershipSelector
        currentTier={currentTier}
        onTierSelect={setCurrentTier}
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
      />

      {/* Example of access control */}
      {!checkAccess(currentTier, MEMBERSHIP_TIERS.enthusiast) && (
        <Alert>
          <AlertDescription>
            This content requires a Zen Enthusiast membership or higher.
            <button 
              className="ml-4 text-brown-600 hover:text-brown-800 underline"
              onClick={() => setShowSelector(true)}
            >
              Upgrade Now
            </button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

