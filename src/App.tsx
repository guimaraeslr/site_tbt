import { useEffect, useState, useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import SmoothScroll from 'smooth-scroll'

// Local Assets Imports
import heroVideo from '../assets/hero_video.mp4'
import imgBuildingFacade from '../assets/Building_facade_with_signage_202606120902_2.jpeg'
import imgStoreFacade from '../assets/Gym_and_clothing_store_facade_202606120902_3.jpeg'
import imgGymEquipment from '../assets/Gym_interior_with_equipment_202606120902_2.jpeg'
import imgGymMain from '../assets/Gym_interior_with_equipment_202606120902_5.jpeg'
import imgLockers from '../assets/Gym_interior_with_lockers_202606120902_3.jpeg'
import imgLounge from '../assets/Modern_lounge_with_sofa_202606120902_2.jpeg'
import imgKidsArea from '../assets/Gym_with_kids_area_202606120902_2.jpeg'
import imgKidsRoom from '../assets/Kids_room_with_TV_202606120902_3.jpeg'
import imgThayComunidade from '../assets/thay_comunidade.jpg'
import imgBgMetodo from '../assets/bg2.jpg'

/* ===============================
   Image URLs & Assets Mapping
   =============================== */
const IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjSI7xs2kDbUvUWQGD_sD_JMi0vUBigGkJDPwWx6i3RK77SQWiTmNMo5uNixONTu6ZyESCFpavrFyTlJN1zcGTXhkdKQQEEDDRmn4wvBdXwoUX-ACYR0w0nwmumN8sFUr2fLygXO1lUAfUKiGL1VhGOESuexJ3k2Oh_xd8QlBC0RicupNgAyb1bOIfkGhtXRaNm6yyy7FF2-RHpWVRAe4m2Ts5igOoXH2TjSwSEzV48lA88V6D73fKtRVYzvoRlM1a_b0H63dlYiEb',
  hero: imgGymMain, // Fallback image for video background
  community: imgThayComunidade,
  studio: imgLockers,
  method: imgBgMetodo,
}

/* ===============================
   Reusable Animation Variants
   =============================== */
const fadeInUp = {
  hidden: { opacity: 0, transform: 'translateY(60px)' },
  visible: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

const fadeInLeft = {
  hidden: { opacity: 0, transform: 'translateX(-60px)' },
  visible: { opacity: 1, transform: 'translateX(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

const fadeInRight = {
  hidden: { opacity: 0, transform: 'translateX(60px)' },
  visible: { opacity: 1, transform: 'translateX(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const scaleIn = {
  hidden: { opacity: 0, transform: 'scale(0.95)' },
  visible: { opacity: 1, transform: 'scale(1)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

/* ===============================
   Section Wrapper with InView
   =============================== */
function AnimatedSection({
  children,
  className = '',
  id,
  style,
}: {
  children: ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', scrollSnapAlign: 'start', ...style }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  )
}

/* ===============================
   NavBar
   =============================== */
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'PROGRAMAS', href: '#programas' },
    { label: 'COMUNIDADE', href: '#comunidade' },
    { label: 'ESPAÇO', href: '#espaco' },
    { label: 'MÉTODO', href: '#metodo' },
    { label: 'CONTATO', href: '#contato' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        background: scrolled ? 'rgba(55, 25, 49, 0.96)' : 'rgba(55, 25, 49, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'background 0.4s, border-bottom 0.4s',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        padding: '0 var(--space-margin-mobile)',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={IMAGES.logo}
            alt="TBT Logo"
            style={{ height: 36, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-desktop">
          {links.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              className="font-label-caps"
              style={{ color: 'rgba(224, 224, 224, 0.8)', fontSize: 12 }}
              whileHover={{ color: '#f0f469', y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contato"
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: 11 }}
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 0.95 }}
          >
            AGENDAR AGORA
          </motion.a>
        </nav>

        {/* Mobile burger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{ color: '#fff', padding: 8 }}
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(26, 13, 23, 0.98)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
            className="nav-mobile-menu"
          >
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px var(--space-margin-mobile)', gap: 20 }}>
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-label-caps"
                  style={{ color: 'rgba(224, 224, 224, 0.8)', fontSize: 14 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                className="btn-primary"
                style={{ textAlign: 'center', marginTop: 8 }}
                onClick={() => setMobileOpen(false)}
              >
                AGENDAR AGORA
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style>{`
        .nav-desktop { display: none !important; }
        .nav-mobile-btn { display: block !important; }
        .nav-mobile-menu { display: block; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </motion.header>
  )
}

/* ===============================
   Hero Section
   =============================== */
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const badges = [
    { icon: 'check_circle', text: 'TURMAS REDUZIDAS' },
    { icon: 'check_circle', text: 'MÉTODO PRÓPRIO' },
    { icon: 'check_circle', text: 'ESTRUTURA COMPLETA' },
  ]

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px var(--space-margin-mobile) 0',
        overflow: 'hidden',
        background: 'var(--color-background)',
      }}
    >
      {/* Parallax Background */}
      <motion.div style={{ position: 'absolute', inset: 0, y: bgY }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--color-background) 30%, rgba(55, 25, 49, 0.5) 75%, transparent 100%)',
          zIndex: 1,
        }} />
        <video
          src={heroVideo}
          poster={IMAGES.hero}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1200, margin: '0 auto', opacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)', maxWidth: 640 }}
        >
          <motion.h1
            variants={fadeInUp}
            className="font-display-lg-mobile"
            style={{ color: 'var(--color-primary)' }}
          >
            O estúdio para mulheres que querem treinar com{' '}
            <span style={{ color: 'var(--color-brand-lime)' }}>conforto, liberdade e resultado.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-body-lg"
            style={{ color: 'var(--color-on-surface-variant)', maxWidth: 520, lineHeight: 1.7 }}
          >
            Um espaço exclusivo para mulheres, com turmas reduzidas, acompanhamento próximo e uma
            metodologia que combina musculação com carga e treinos dinâmicos para você evoluir de
            forma real e constante.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-lg)', marginTop: 8 }}
          >
            <motion.a
              href="https://wa.me/5527997782016"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={{ scale: 0.97 }}
              whileTap={{ scale: 0.95 }}
            >
              AGENDAR AULA
            </motion.a>
            <motion.a
              href="#espaco"
              className="btn-secondary"
              whileHover={{ scale: 0.97, borderColor: '#f0f469', color: '#f0f469' }}
            >
              CONHECER O ESPAÇO
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 32px', marginTop: 16 }}
          >
            {badges.map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--color-brand-lime)', fontSize: 18 }}>
                  {badge.icon}
                </span>
                <span className="font-label-caps" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative gradient bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to top, var(--color-background), transparent)',
        zIndex: 3,
      }} />
    </section>
  )
}

/* ===============================
   Programas Section
   =============================== */
function ProgramasSection() {
  const cards = [
    {
      icon: 'fitness_center',
      title: 'Treino presencial no estúdio',
      desc: 'Criado para mulheres que querem treinar com mais segurança, liberdade e acompanhamento de verdade. Combina força, condicionamento e evolução progressiva.',
      highlight: false,
    },
    {
      icon: 'groups',
      title: 'Turmas reduzidas',
      desc: 'Aulas em turmas de até 10 alunas, permitindo mais atenção durante o treino, melhor acompanhamento da execução e uma experiência organizada.',
      highlight: false,
    },
    {
      icon: 'person_search',
      title: 'Para quem é',
      desc: 'Para mulheres que querem emagrecer, definir, ganhar força ou simplesmente voltar a treinar em um ambiente confortável, longe de espaços lotados.',
      highlight: true,
    },
  ]

  return (
    <AnimatedSection
      id="programas"
      className="section-padding"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="container">
        <motion.div
          variants={fadeInLeft}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
            borderLeft: '2px solid var(--color-brand-lime)',
            paddingLeft: 24,
            marginBottom: 48,
          }}
        >
          <h2 className="font-headline-md" style={{ color: 'var(--color-primary)' }}>
            Programas pensados para a <span style={{ color: 'var(--color-brand-lime)' }}>mulher real</span>
          </h2>
          <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: 640 }}>
            No Thay Banhos Training, você encontra uma proposta de treino que respeita seu momento,
            seu objetivo e sua rotina. Aqui, o foco não é encaixar todas as mulheres no mesmo formato,
            mas oferecer uma experiência mais inteligente.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-gutter)',
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                padding: 32,
                borderRadius: 'var(--radius-xl)',
                background: card.highlight ? 'var(--color-brand-lime)' : 'var(--color-surface-container)',
                border: card.highlight ? 'none' : '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'default',
                transition: 'box-shadow 0.5s',
              }}
              onHoverStart={() => {}}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  color: card.highlight ? 'var(--color-background)' : 'var(--color-brand-lime)',
                  fontSize: 36,
                  marginBottom: 24,
                }}
              >
                {card.icon}
              </span>
              <h3
                className="font-headline-sm"
                style={{
                  color: card.highlight ? 'var(--color-background)' : 'var(--color-primary)',
                  marginBottom: 16,
                }}
              >
                {card.title}
              </h3>
              <p
                className="font-body-md"
                style={{
                  color: card.highlight ? 'var(--color-background)' : 'var(--color-on-surface-variant)',
                  flex: 1,
                }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ===============================
   Comunidade Section
   =============================== */
function ComunidadeSection() {
  const items = [
    'Treine com liberdade.',
    'Evolua no seu ritmo.',
    'Faça parte de um espaço onde você se sente à vontade para continuar.',
  ]

  return (
    <AnimatedSection
      id="comunidade"
      className="section-padding"
      style={{ background: 'var(--color-surface-container-low)' }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 64 }}>
        {/* Text */}
        <motion.div variants={fadeInLeft} style={{ flex: '1 1 400px', minWidth: 300 }}>
          <h2 className="font-headline-md" style={{ color: 'var(--color-primary)', marginBottom: 24 }}>
            Uma comunidade de mulheres que{' '}
            <span style={{ color: 'var(--color-brand-lime)' }}>treinam com liberdade</span>
          </h2>
          <p className="font-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: 32, lineHeight: 1.7 }}>
            Mais do que um estúdio, o TBT é um espaço de pertencimento. Criado para quem quer treinar
            sem se sentir observada, julgada ou deslocada. Aqui, cada conquista é construída com
            acolhimento, incentivo e respeito ao processo individual.
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {items.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--color-brand-lime)', marginTop: 2 }}>
                  check
                </span>
                <span className="font-body-md" style={{ color: 'var(--color-primary)' }}>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fadeInRight}
          style={{
            flex: '1 1 400px',
            position: 'relative',
            height: 500,
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            minWidth: 300,
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(240, 244, 105, 0.08)',
              zIndex: 1,
            }}
            whileHover={{ background: 'transparent' }}
            transition={{ duration: 0.5 }}
          />
          <img
            src={IMAGES.community}
            alt="Comunidade TBT"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

/* ===============================
   Espaço Section
   =============================== */
function EspacoSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const galleryItems = [
    { img: imgBuildingFacade, title: 'Fachada Principal', desc: 'Identidade visual moderna e exclusiva em Jardim da Penha, Vitória.' },
    { img: imgStoreFacade, title: 'Recepção e Store', desc: 'Ambiente acolhedor desde a sua chegada e nossa linha exclusiva de vestuário.' },
    { img: imgGymMain, title: 'Salão de Treinos', desc: 'Espaço amplo, climatizado e planejado para treinos dinâmicos e funcionais.' },
    { img: imgGymEquipment, title: 'Área de Musculação', desc: 'Equipamentos modernos ajustados para a biomecânica e conforto da mulher.' },
    { img: imgLockers, title: 'Vestiários e Armários', desc: 'Privacidade e conforto premium para você se preparar antes ou depois do treino.' },
    { img: imgLounge, title: 'Lounge de Convivência', desc: 'Um espaço confortável para relaxar, conversar e tomar um café com as amigas.' },
    { img: imgKidsArea, title: 'Espaço Kids Integrado', desc: 'Brinquedoteca integrada para que você treine sabendo que seus filhos estão bem.' },
    { img: imgKidsRoom, title: 'Sala Kids Dedicada', desc: 'Área de recreação segura e divertida equipada com TV para entreter os pequenos.' },
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  return (
    <AnimatedSection id="espaco" className="section-padding" style={{ background: 'var(--color-background)', justifyContent: 'center' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        
        {/* Header */}
        <motion.div variants={fadeInUp} style={{ textAlign: 'center' }}>
          <h2 className="font-headline-md" style={{ color: 'var(--color-primary)', marginBottom: 16 }}>
            Um espaço completo,{' '}
            <span style={{ color: 'var(--color-brand-lime)' }}>confortável e feito para mulheres.</span>
          </h2>
          <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: 720, margin: '0 auto' }}>
            Unimos acolhimento, estrutura e eficiência. Aqui você encontra máquinas de musculação,
            pesos livres e equipamentos de cardio para um treino estratégico e dinâmico.
          </p>
        </motion.div>

        {/* Dynamic Gallery */}
        <motion.div variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
          {/* Main Display Area */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            backgroundColor: '#121212',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }} className="gallery-main-container">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, transform: 'translateX(20px)' }}
                animate={{ opacity: 1, transform: 'translateX(0px)' }}
                exit={{ opacity: 0, transform: 'translateX(-20px)' }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <img
                  src={galleryItems[activeIndex].img}
                  alt={galleryItems[activeIndex].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </AnimatePresence>

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(26, 13, 23, 0.9) 0%, rgba(26, 13, 23, 0.3) 50%, transparent 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            <button
              onClick={prevSlide}
              style={{
                position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
                backgroundColor: 'rgba(55, 25, 49, 0.6)', border: '1px solid rgba(255, 25, 255, 0.1)',
                width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', transition: 'all 0.3s',
              }}
              className="gallery-nav-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>chevron_left</span>
            </button>

            <button
              onClick={nextSlide}
              style={{
                position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
                backgroundColor: 'rgba(55, 25, 49, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)',
                width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', transition: 'all 0.3s',
              }}
              className="gallery-nav-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>chevron_right</span>
            </button>

            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px var(--space-gutter)', zIndex: 2,
              display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none',
            }}>
              <span className="font-label-caps" style={{ color: 'var(--color-brand-lime)', fontSize: 11, letterSpacing: '0.2em' }}>
                Conheça Nosso Estúdio
              </span>
              <h3 className="font-headline-sm" style={{ color: '#fff', fontSize: 28 }}>
                {galleryItems[activeIndex].title}
              </h3>
              <p className="font-body-md" style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 640 }}>
                {galleryItems[activeIndex].desc}
              </p>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div style={{
            display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'thin',
          }} className="gallery-thumbs-row">
            {galleryItems.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    flex: '0 0 120px', height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative',
                    border: isActive ? '2px solid var(--color-brand-lime)' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive ? '0 0 15px rgba(240, 244, 105, 0.4)' : 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', padding: 0,
                  }}
                >
                  <img
                    src={item.img}
                    alt={`Miniatura ${item.title}`}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                      opacity: isActive ? 1 : 0.5, transition: 'all 0.3s',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: isActive ? 'transparent' : 'rgba(55, 25, 49, 0.2)', transition: 'all 0.3s' }} />
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Equipments (Modern Pills) */}
        <motion.div variants={fadeInUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64 }}>
          <div>
            <h4 className="font-label-caps" style={{ color: 'var(--color-brand-lime)', marginBottom: 24, letterSpacing: '0.15em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}>
              Musculação e Força
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[
                'Smith com agachamento livre',
                'Leg press / Mesa flexora',
                'Extensora e flexora conjugada',
                'Adutora e abdutora conjugada',
                'Máquina de remada com puxada',
                'Pesos livres de 1 kg a 35 kg',
              ].map(item => (
                <div key={item} style={{
                  padding: '12px 20px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--color-on-surface)',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span style={{ color: 'var(--color-brand-lime)', fontSize: 18 }}>✦</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-label-caps" style={{ color: 'var(--color-brand-lime)', marginBottom: 24, letterSpacing: '0.15em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}>
              Cardio, Funcional e Acessórios
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {['2 bikes ergométricas', 'Corda naval', 'TRX', 'Colchonetes e Steps'].map(item => (
                <div key={item} style={{
                  padding: '12px 20px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--color-on-surface)',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span style={{ color: 'var(--color-brand-lime)', fontSize: 18 }}>✦</span> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Styles for Navigation Buttons */}
      <style>{`
        .gallery-nav-btn:hover {
          background-color: var(--color-brand-lime) !important;
          color: var(--color-background) !important;
          box-shadow: 0 0 20px rgba(240, 244, 105, 0.5);
          transform: translateY(-50%) scale(1.05) !important;
        }
        @media (max-width: 768px) {
          .gallery-main-container {
            height: 350px !important;
          }
          .gallery-nav-btn {
            width: 36px !important;
            height: 36px !important;
          }
          .gallery-nav-btn span {
            font-size: 18px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  )
}

/* ===============================
   Método Section
   =============================== */
function MetodoSection() {
  const pillars = [
    { label: 'PILAR 01', text: 'Treinos com propósito, não aleatórios.' },
    { label: 'PILAR 02', text: 'Alternância de estímulos entre força e dinamismo.' },
    { label: 'PILAR 03', text: 'Atenção à execução e correções constantes.' },
    { label: 'PILAR 04', text: 'Respeito ao corpo e ao ritmo de cada aluna.' },
  ]

  return (
    <AnimatedSection
      id="metodo"
      className="section-padding"
      style={{ 
        background: `url(${IMAGES.method}) no-repeat center center / cover`,
        overflow: 'hidden' 
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Content */}
        <motion.div variants={staggerContainer} style={{ flex: '1 1 100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <motion.div variants={fadeInLeft}>
            <h2 className="font-headline-md" style={{ color: 'var(--color-primary)', marginBottom: 24 }}>
              O Método <span style={{ color: 'var(--color-brand-lime)' }}>Thay Banhos</span>
            </h2>
            <p className="font-body-lg" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.7 }}>
              Aqui, treino não é punição, improviso nem repetição sem sentido. O método combina
              estratégia, técnica, progressão e sensibilidade para entender que cada mulher vive um
              contexto diferente.
            </p>
          </motion.div>

          {/* Pillars Grid */}
          <motion.div variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {pillars.map((p) => (
              <motion.div
                key={p.label}
                variants={fadeInUp}
                whileHover={{
                  y: -4,
                  borderColor: 'var(--color-brand-lime)',
                  transition: { duration: 0.3 },
                }}
                style={{
                  padding: 20,
                  background: 'rgba(55,25,49,0.2)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span
                  className="font-label-caps"
                  style={{ color: 'var(--color-brand-lime)', fontSize: 11, display: 'block', marginBottom: 8 }}
                >
                  {p.label}
                </span>
                <p className="font-body-md" style={{ color: 'var(--color-primary)', fontSize: 14 }}>{p.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            style={{
              background: 'rgba(55,25,49,0.4)',
              padding: 24,
              borderLeft: '4px solid var(--color-brand-lime)',
            }}
          >
            <h4 className="font-headline-sm" style={{ fontSize: 18, color: 'var(--color-primary)', marginBottom: 12 }}>
              Acompanhamento de Elite
            </h4>
            <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
              Duas professoras em sala e turmas reduzidas garantem que cada aluna receba orientação
              próxima, ajustes técnicos e direcionamento real.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

/* ===============================
   Contato Section
   =============================== */
function ContatoSection() {
  const actions = [
    { label: 'Agendar aula experimental', icon: 'arrow_forward', href: 'https://wa.me/5527997782016', variant: 'primary' as const },
    { label: 'Falar no WhatsApp', icon: 'chat', href: 'https://wa.me/5527997782016', variant: 'secondary' as const },
  ]

  return (
    <AnimatedSection
      id="contato"
      className="section-padding"
      style={{ background: 'var(--color-background)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Giant TBT watermark */}
      <div style={{
        position: 'absolute',
        right: -80,
        top: -80,
        opacity: 0.03,
        pointerEvents: 'none',
        userSelect: 'none',
        fontFamily: 'var(--font-headline)',
        fontSize: '30vw',
        fontWeight: 700,
        color: 'var(--color-brand-lime)',
        lineHeight: 1,
      }}>
        TBT
      </div>

      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left Info */}
        <motion.div variants={fadeInLeft}>
          <h2 className="font-headline-md" style={{ color: 'var(--color-primary)', marginBottom: 24 }}>
            Seu próximo passo <span style={{ color: 'var(--color-brand-lime)' }}>começa aqui</span>
          </h2>
          <p className="font-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: 48 }}>
            Agende sua aula e venha conhecer de perto um estúdio onde você pode treinar com
            liberdade, acolhimento e direção.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-brand-lime)', marginTop: 2 }}>
                location_on
              </span>
              <div>
                <h4 className="font-label-caps" style={{ color: '#fff', marginBottom: 4, letterSpacing: '0.15em' }}>
                  Endereço
                </h4>
                <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Av. Fernando Ferrari, 510, Loja 1 e 2, Jardim da Penha, Vitória, Brazil 29060220
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-brand-lime)', marginTop: 2 }}>
                info
              </span>
              <div>
                <h4 className="font-label-caps" style={{ color: '#fff', marginBottom: 4, letterSpacing: '0.15em' }}>
                  Informações
                </h4>
                <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Atendimento para mulheres • Vagas limitadas por horário.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right CTAs */}
        <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
          {actions.map((action) => (
            <motion.a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInRight}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 32px',
                fontFamily: 'var(--font-label)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.3s',
                ...(action.variant === 'primary'
                  ? {
                      background: 'var(--color-brand-lime)',
                      color: 'var(--color-background)',
                      boxShadow: '0 0 20px rgba(240,244,105,0.4)',
                    }
                  : action.variant === 'secondary'
                  ? {
                      background: 'transparent',
                      color: 'var(--color-brand-lime)',
                      border: '1px solid var(--color-brand-lime)',
                    }
                  : {
                      background: 'transparent',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }),
              }}
            >
              {action.label}
              <span className="material-symbols-outlined">{action.icon}</span>
            </motion.a>
          ))}

          <motion.div 
            variants={fadeInUp} 
            style={{ 
              width: '100%', 
              height: 250, 
              marginTop: 16, 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden', 
              border: '1px solid rgba(255,255,255,0.05)' 
            }}
          >
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Av.%20Fernando%20Ferrari,%20510,%20Loja%201%20e%202,%20Jardim%20da%20Penha,%20Vit%C3%B3ria,%20Brazil%2029060220&t=&z=16&ie=UTF8&iwloc=&output=embed"
            />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

/* ===============================
   Footer
   =============================== */
function Footer() {
  return (
    <footer style={{
      background: 'var(--color-background)',
      width: '100%',
      padding: '48px var(--space-margin-mobile)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
        gap: 'var(--space-gutter)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <img
            src={IMAGES.logo}
            alt="TBT Logo"
            style={{ height: 24, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.4 }}
          />
          <p
            className="font-body-md"
            style={{
              color: 'rgba(224,224,224,0.4)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginTop: 4,
            }}
          >
            © 2026 THAY BANHOS TRAINING. O ÚNICO LUGAR DO ESPÍRITO SANTO PENSADO PARA MULHERES.
          </p>
        </div>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px' }}>
          {['programas', 'comunidade', 'espaco', 'metodo'].map(section => (
            <motion.a
              key={section}
              href={`#${section}`}
              className="font-label-caps"
              style={{ fontSize: 11, color: 'rgba(224,224,224,0.5)' }}
              whileHover={{ color: '#f0f469' }}
            >
              {section.toUpperCase()}
            </motion.a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

/* ===============================
   App — Main Component
   =============================== */
export default function App() {
  useEffect(() => {
    new SmoothScroll('a[href*="#"]', {
      speed: 800,
      speedAsDuration: true,
      offset: 80,
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <main style={{ flexGrow: 1 }}>
        <HeroSection />
        <ProgramasSection />
        <ComunidadeSection />
        <EspacoSection />
        <MetodoSection />
        <ContatoSection />
      </main>
      <Footer />
    </div>
  )
}
