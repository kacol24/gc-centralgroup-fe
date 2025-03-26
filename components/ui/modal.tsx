import {ReactNode, useEffect} from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({isOpen, onClose, children}: ModalProps) {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className="relative w-full max-w-7xl bg-white rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}
