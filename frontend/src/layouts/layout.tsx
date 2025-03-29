import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

interface LayoutProps {
    children: React.ReactNode; // This is the "inside part" of the layout
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top part of the page (Header & Hero) */}
            <Header />
            <Hero />

            {/* The middle part of the page (Main content) */}
            <main className="container mx-auto py-10 flex-1">
                {children} {/* This is where different page content will go */}
            </main>

            {/* Bottom part of the page (Footer) */}
            <Footer />
        </div>
    );
};

export default Layout;
