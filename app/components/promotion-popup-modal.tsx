'use client'

import {useEffect, useState} from "react";
import Modal from "@/components/ui/modal";
import Image from 'next/image';

interface Banner {
    cta: string
    desktop: string
    id: number
    mobile: string
    title: string
    url: string
}

const PROMOTION_MODAL_KEY = 'modalLastClosed';

const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export default function PromotionPopupModal ({ banner }: { banner: Banner}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const lastClosed = getCookie(PROMOTION_MODAL_KEY);
        if (lastClosed) {
            const now = new Date().getTime();
            const oneDay = 24 * 60 * 60 * 1000;
            if (now - parseInt(lastClosed) < oneDay) {
                return;
            }
        }

        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        const now = new Date().getTime().toString();
        setCookie(PROMOTION_MODAL_KEY, now, 1); // Expires in 1 day
    };

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <a href={banner.url} target="_blank">
                <Image src={banner.desktop} alt={banner.cta} width={0} height={0}/>
            </a>
        </Modal>
    );
}
