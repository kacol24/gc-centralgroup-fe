import AOS from "@/components/aos";

export default function Layout({ children }) {
    return (
        <>
            <AOS duration={800}/>
            {children}
        </>
    );
}
