'use client';

import { useEffect } from 'react';
import { Button } from './button';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export default function CustomAlert({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  autoClose = false,
  autoCloseDelay = 3000,
}: CustomAlertProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#016241',
          borderColor: '#016241',
          textColor: 'white',
          icon: '✓',
        };
      case 'error':
        return {
          backgroundColor: '#dc2626',
          borderColor: '#dc2626',
          textColor: 'white',
          icon: '✕',
        };
      default:
        return {
          backgroundColor: '#016241',
          borderColor: '#016241',
          textColor: 'white',
          icon: 'ℹ',
        };
    }
  };

  const alertStyles = getAlertStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="relative w-full max-w-md mx-4 bg-white shadow-lg"
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '0px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4"
          style={{
            backgroundColor: alertStyles.backgroundColor,
            borderColor: alertStyles.borderColor,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-6 h-6 text-white font-bold text-lg"
              style={{ color: alertStyles.textColor }}
            >
              {alertStyles.icon}
            </div>
            <h3 className="text-lg font-marcellus uppercase" style={{ color: alertStyles.textColor }}>
              {title || (type === 'success' ? 'Berhasil' : type === 'error' ? 'Error' : 'Informasi')}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p className="text-sm text-textPrimary leading-relaxed mb-6">{message}</p>

          {/* Button */}
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              className="px-6 py-2 font-medium text-xs uppercase"
              style={{
                borderRadius: '0px',
                backgroundColor: '#016241',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
