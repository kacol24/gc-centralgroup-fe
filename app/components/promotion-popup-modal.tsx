'use client'

import {useEffect, useState} from "react";
import Modal from "@/components/ui/modal";
import Image from 'next/image';
import BannersQuery from "@/graphql/BannersQuery.graphql";
import {useQuery} from "@urql/next";
import {useLocale} from "next-intl";

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

export default function PromotionPopupModal() {
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
            const now = new Date().getTime().toString();
            setCookie(PROMOTION_MODAL_KEY, now, 1); // Expires in 1 day
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const locale = useLocale();
    
    const [{data: bannerResponse}] = useQuery({
        query: BannersQuery,
        variables: {
            lang: locale,
            type: 'popup_banner',
            limit: 1,
        }
    });

    const banner = bannerResponse.banners;

    if (! banner.length) {
        return;
    }

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <a href={banner[0].url} target="_blank">
                <Image src={banner[0].mobile} alt={banner[0].cta} style={{objectFit: 'cover'}}
                       width={1600}
                       height={900}
                       className="w-full block md:hidden"/>
                <Image src={banner[0].desktop} alt={banner[0].cta} style={{objectFit: 'cover'}}
                       width={900}
                       height={1600}
                       className="w-full hidden md:block"/>
            </a>
        </Modal>
    );
}
