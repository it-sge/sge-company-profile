import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { getSiteSettings } from "@/lib/cached-queries";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const navImage = settings["mobile_nav_image"] || undefined;
  
  return (
    <>
      <Navbar navImage={navImage} />
      <div className="flex-grow">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </div>
      <Footer />
    </>
  );
}
