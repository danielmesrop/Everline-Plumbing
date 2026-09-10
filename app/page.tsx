import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function Home() {
  const googleReviews = await getGoogleReviews();

  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Testimonials googleReviews={googleReviews} />
      <Contact />
      <Footer />
    </main>
  );
}
