import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowUpRight, X, Menu } from 'lucide-react'
import '@fontsource-variable/manrope'
import '@fontsource-variable/cormorant-garamond'
import './style.css'
import './motion.css'

const services = [
  ['Prevenção', 'Acompanhar de perto é a melhor forma de cuidar. Consultas e orientações para fazer da saúde bucal parte da sua rotina.'],
  ['Odontologia estética', 'Um olhar cuidadoso para a harmonia do sorriso, respeitando o que faz você ser você.'],
  ['Cuidados para crianças', 'Um primeiro contato leve e acolhedor, para construir uma relação tranquila com o cuidado.'],
  ['Reabilitação', 'Planejamento individual para devolver conforto e funcionalidade ao seu sorriso.'],
]

function App() {
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 80)
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false) }
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('keydown', key)
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible') }), { threshold: .13 })
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <header className="header">
      <a className={`brand${scrolled ? ' brand-compact' : ''}`} href="#inicio" aria-label="Lúmina Odontologia, início"><span className="brand-mark">L<span>·</span></span><span className="brand-name">LÚMINA<small>ODONTOLOGIA</small></span></a>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={21}/> : <Menu size={21}/>}<span>{menu ? 'FECHAR' : 'MENU'}</span></button>
      <a className="header-link" href="#contato">Vamos conversar <ArrowUpRight size={16}/></a>
      <nav id="navigation" className={menu ? 'navigation open' : 'navigation'} aria-label="Navegação principal" hidden={!menu}>
        {[["Início", "#inicio"], ["A Lúmina", "#sobre"], ["Cuidados", "#cuidados"], ["Nosso espaço", "#espaco"], ["Contato", "#contato"]].map(([label, href]) => <a href={href} onClick={() => setMenu(false)} key={href}>{label}<ArrowUpRight/></a>)}
        <p>Um projeto fictício de portfólio.</p>
      </nav>
    </header>
    <main id="conteudo">
      <section className="hero" id="inicio" aria-label="Lúmina Odontologia">
        <div className="hero-text"><p>Um cuidado que começa<br/>com você.</p><h1>Seu sorriso,<br/><em>à sua maneira.</em></h1><a className="line-link" href="#sobre"><span>Conheça a Lúmina</span></a></div>
        <div className="hero-collage"><figure className="portrait portrait-one"><img src="/images/mulher.webp" alt="Mulher sorrindo suavemente"/></figure><figure className="portrait portrait-two"><img src="/images/homem.webp" alt="Homem sorrindo"/></figure><figure className="portrait portrait-three"><img src="/images/crianca.webp" alt="Criança sorrindo"/></figure><span className="hero-outline" aria-hidden="true">L</span></div>
        <a className="scroll-note" href="#sobre"><span></span>ROLE PARA DESCOBRIR</a>
        <span className="hero-index">ODONTOLOGIA COM TEMPO E ATENÇÃO</span>
      </section>
      <section id="sobre" className="intro section-pad"><div className="intro-copy reveal"><h2>Por trás de cada sorriso,<br/><em>uma história.</em></h2><p>Na Lúmina, acreditamos que cuidar vai além de um procedimento. Começa com uma conversa, com escuta e com a tranquilidade de saber que cada detalhe importa.</p><a href="#cuidados" className="line-link"><span>Descubra nossos cuidados</span><ArrowUpRight size={17}/></a></div><div className="intro-image reveal"><img src="/images/atendimento.webp" alt="Dentista acolhe paciente em consultório" loading="lazy"/><span>Um encontro de confiança.</span></div></section>
      <section id="cuidados" className="services section-pad"><div className="services-heading reveal"><div><h2>Cuidado em<br/><em>cada detalhe.</em></h2></div><p>Para cada fase, uma forma de cuidar. Conheça as áreas que fazem parte do universo Lúmina.</p></div><div className="services-layout reveal"><div className="services-list" role="group" aria-label="Áreas de cuidado">{services.map(([name],i)=><button key={name} aria-pressed={active===i} aria-controls="service-detail" onClick={()=>setActive(i)} onMouseEnter={()=>setActive(i)}>{name}<ArrowUpRight size={19}/></button>)}</div><div id="service-detail" className="service-detail" aria-live="polite" aria-atomic="true"><span className="detail-symbol">L<span>·</span></span><h3>{services[active][0]}</h3><p>{services[active][1]}</p><a href="#contato" className="line-link"><span>Converse com a gente</span><ArrowRight size={16}/></a></div></div></section>
      <section id="espaco" className="space"><div className="space-image reveal"><img src="/images/espaco.webp" alt="Recepção clara e acolhedora da clínica fictícia" loading="lazy"/></div><div className="space-copy reveal"><h2>Um espaço para<br/><em>se sentir bem.</em></h2><p>Da chegada ao cuidado, pensamos em uma experiência mais tranquila. Um ambiente que convida você a respirar e estar presente.</p><a className="line-link" href="#contato"><span>Vamos conversar</span><ArrowUpRight size={17}/></a></div></section>
      <section id="contato" className="contact section-pad"><div className="contact-title reveal"><h2>Vamos cuidar<br/><em>do seu sorriso?</em></h2><p>O primeiro passo é uma conversa. Estamos aqui para ouvir você.</p></div><div className="contact-card reveal"><span className="contact-mark">L<span>·</span></span><h3>Que bom ter<br/>você por aqui.</h3><p>Este é um projeto fictício criado para portfólio. Não há atendimento ou agendamento disponível.</p><a href="#inicio" className="contact-back">Voltar ao início <ArrowUpRight size={20}/></a></div></section>
    </main><footer><a className="footer-brand" href="#inicio">Lúmina<span> Odontologia</span></a><p>Um projeto fictício de portfólio · Imagens ilustrativas</p><a href="#inicio">Voltar ao topo ↑</a></footer>
  </>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)



