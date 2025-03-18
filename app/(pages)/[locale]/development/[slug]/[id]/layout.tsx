import AOS from '@/components/aos';

export default function DevelopmentDetailLayout({children}) {
    return (
        <>
            <AOS/>
            {children}
        </>
    );
}
