import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Marquee from '@/components/Marquee/Marquee';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Journey from '@/components/Journey/Journey';
import Space from '@/components/Space/Space';
import Faq from '@/components/Faq/Faq';
import CtaFinal from '@/components/CtaFinal/CtaFinal';
import Footer from '@/components/Footer/Footer';
import MotionProvider from '@/components/motion/MotionProvider';

export default function App() {
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Journey />
        <Space />
        <Marquee reverse tone="teal" />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <MotionProvider />
    </>
  );
}
