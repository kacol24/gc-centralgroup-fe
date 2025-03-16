'use client'

import Image from 'next/image';
import {iconCaretDown, iconCaretDownWhite} from "@/app/lib/utils/svg";
import {startTransition, useState} from "react";
import {usePathname, useRouter} from "@/i18n/navigation";
import {useParams} from "next/navigation";
import {useLocale} from "next-intl";

export default function LocaleSwitcher({isScrolled}) {
    const currentLocale: string = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function changeLocale(locale: string) {
        const nextLocale = locale;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                {pathname, params},
                {locale: nextLocale}
            );
        });
    }

    return (
        <div className="flex items-center gap-1 cursor-pointer relative"
             onClick={() => setIsOpen(!isOpen)}
             onBlur={() => setIsOpen(false)}>
            <span className="select-none">
                {currentLocale.toUpperCase()}
            </span>
            <Image
                src={isScrolled ? iconCaretDown : iconCaretDownWhite}
                alt="Caret Down Icon"
                width={12}
                height={12}
            />
            <div className={`absolute mt-2 left-0 top-full w-20 bg-white z-10 shadow ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 py-2 hover:bg-gray-100 text-black" onClick={() => changeLocale('en')}>
                    EN
                </div>
                <div className="px-2 py-2 hover:bg-gray-100 text-black" onClick={() => changeLocale('id')}>
                    ID
                </div>
            </div>
        </div>
    );
}
