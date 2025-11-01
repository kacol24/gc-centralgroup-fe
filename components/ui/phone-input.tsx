'use client';

import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from '@/lib/utils';

interface PhoneInputComponentProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

export default function PhoneInputComponent({
  value,
  onChange,
  placeholder = '87654321',
  disabled = false,
  required = false,
  id,
  className,
}: PhoneInputComponentProps) {
  return (
    <div className="phone-input-wrapper">
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="ID"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        id={id}
        className={cn('phone-input-custom', className)}
      />

      <style jsx global>{`
        /* Wrapper dengan border seperti input lain */
        .phone-input-wrapper {
          border: 1px solid #e1e1e1;
          border-radius: 0px;
          background-color: white;
          height: 48px;
          transition:
            border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }

        .phone-input-wrapper:focus-within {
          border-color: #9ca3af;
          box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.2);
        }

        /* Reset PhoneInput default styles */
        .phone-input-custom {
          border: none !important;
          height: 100% !important;
          display: flex !important;
        }

        /* Country selector padding */
        .phone-input-custom .PhoneInputCountry {
          padding: 0 12px !important;
          border-right: 1px solid #e1e1e1 !important;
          display: flex !important;
          align-items: center !important;
        }

        /* Country select */
        .phone-input-custom .PhoneInputCountrySelect {
          border: none !important;
          background: none !important;
          cursor: pointer !important;
        }

        /* Input field */
        .phone-input-custom .PhoneInputInput {
          border: none !important;
          background: none !important;
          padding: 0px 8px !important;
          font-size: 12px !important;
          color: #374151 !important;
          outline: none !important;
          flex: 1 !important;
        }

        /* Flag size */
        .phone-input-custom .PhoneInputCountryIcon {
          width: 16px !important;
          height: 12px !important;
        }

        /* Arrow size */
        .phone-input-custom .PhoneInputCountrySelectArrow {
          width: 6px !important;
          height: 4px !important;
          margin-left: 4px !important;
        }
      `}</style>
    </div>
  );
}
