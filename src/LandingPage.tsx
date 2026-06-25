import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import imgThayComunidade from '../assets/thay_comunidade.jpg'
import imgBg2 from '../assets/bg2.jpg'

// Webhook endpoint
const N8N_WEBHOOK_URL = 'https://airolabs-n8n-webhook.xqkuji.easypanel.host/webhook/leads_tbt'

const PLANS = [
  {
    title: '2x por semana',
    frequency: '2x semana',
    priceOriginal: 'R$ 640,00',
    pricePromo: 'R$ 497,00',
    features: [
      'Turmas reduzidas (máximo 10 alunas)',
      'Acompanhamento de 2 professoras em sala',
      'Treino biomecânico exclusivo para mulheres',
      'Acesso à estrutura e vestiários premium',
    ],
    highlight: false,
    value: '2x por semana',
  },
  {
    title: '3x por semana',
    frequency: '3x semana',
    priceOriginal: 'R$ 960,00',
    pricePromo: 'R$ 697,00',
    features: [
      'Turmas reduzidas (máximo 10 alunas)',
      'Acompanhamento de 2 professoras em sala',
      'Treino biomecânico exclusivo para mulheres',
      'Acesso à estrutura e vestiários premium',
      'Prioridade na grade de agendamento de horários',
    ],
    highlight: true,
    value: '3x por semana',
  },
  {
    title: '5x por semana',
    frequency: '5x semana',
    priceOriginal: 'R$ 1.600,00',
    pricePromo: 'R$ 997,00',
    features: [
      'Treine de segunda a sexta no estúdio',
      'Turmas reduzidas (máximo 10 alunas)',
      'Acompanhamento de 2 professoras em sala',
      'Treino biomecânico exclusivo para mulheres',
      'Flexibilidade total de horários e agendamento VIP',
    ],
    highlight: false,
    value: '5x por semana',
  },
]

export default function LandingPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    objetivo: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Format phone number to (XX) XXXXX-XXXX as they type
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '') // remove non-digits
    if (value.length > 11) value = value.slice(0, 11) // limit to 11 digits
    
    // Apply Brazilian phone mask
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`
    } else if (value.length > 0) {
      value = `(${value}`
    }
    
    setFormData(prev => ({ ...prev, whatsapp: value }))
  }

  // Scroll to form and auto-select the chosen plan
  const handleSelectPlan = (planValue: string) => {
    setFormData(prev => ({ ...prev, objetivo: planValue }))
    const inputElement = document.getElementById('nome')
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      inputElement.focus()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.nome.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setStatus('error')
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Phone validation (Brazilian format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX)
    const rawPhone = formData.whatsapp.replace(/\D/g, '')
    if (rawPhone.length < 10) {
      setStatus('error')
      setErrorMessage('Por favor, insira um número de WhatsApp válido.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          origem: 'landing_page_leads',
          data_envio: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        throw new Error('Falha no envio dos dados ao servidor.')
      }
    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setErrorMessage(
        'Infelizmente, ocorreu um erro temporário. Por favor, tente novamente ou clique no link abaixo para nos contatar direto via WhatsApp.'
      )
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const } },
  }

  return (
    <div style={{ background: '#1a0d17', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Hero + Form Area */}
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px var(--space-margin-mobile) 40px',
          overflow: 'hidden',
          background: `radial-gradient(circle at center, rgba(55, 25, 49, 0.85) 0%, rgba(26, 13, 23, 0.98) 100%), url(${imgBg2}) no-repeat center center / cover`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '50vw',
            height: '50vw',
            background: 'radial-gradient(circle, rgba(240, 244, 105, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '50vw',
            height: '50vw',
            background: 'radial-gradient(circle, rgba(77, 43, 69, 0.4) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left Side: Brand Copy & Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <a href="/" style={{ display: 'inline-block' }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjSI7xs2kDbUvUWQGD_sD_JMi0vUBigGkJDPwWx6i3RK77SQWiTmNMo5uNixONTu6ZyESCFpavrFyTlJN1zcGTXhkdKQQEEDDRmn4wvBdXwoUX-ACYR0w0nwmumN8sFUr2fLygXO1lUAfUKiGL1VhGOESuexJ3k2Oh_xd8QlBC0RicupNgAyb1bOIfkGhtXRaNm6yyy7FF2-RHpWVRAe4m2Ts5igOoXH2TjSwSEzV48lA88V6D73fKtRVYzvoRlM1a_b0H63dlYiEb"
                  alt="TBT Logo"
                  style={{ height: 38, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
              </a>
            </motion.div>

            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span
                className="font-label-caps"
                style={{ color: 'var(--color-brand-lime)', letterSpacing: '0.25em', fontSize: 11 }}
              >
                Lista VIP Exclusiva
              </span>
              <h1
                className="font-headline-md"
                style={{
                  color: 'var(--color-primary)',
                  fontSize: 'clamp(32px, 3.5vw, 48px)',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                }}
              >
                O único estúdio <br />
                do estado feito <br />
                <span style={{ color: 'var(--color-brand-lime)' }}>para só para mulheres.</span>
              </h1>
              <p className="font-body-lg" style={{ color: 'var(--color-on-surface-variant)', fontSize: 17, lineHeight: 1.65, marginTop: 8 }}>
                No Thay Banhos Training, criamos um ambiente seguro, acolhedor e com acompanhamento premium. Entre na lista VIP para garantir sua vaga, escolher o plano ideal e treinar com total conforto.
              </p>
            </motion.div>

            {/* Thay Comunidade Image Display */}
            <motion.div
              variants={itemVariants}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                height: 300,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26, 13, 23, 0.85) 0%, rgba(26, 13, 23, 0.1) 60%, transparent 100%)',
                  zIndex: 1,
                }}
              />
              <img
                src={imgThayComunidade}
                alt="Mulheres treinando no estúdio TBT"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  right: 24,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--color-brand-lime)', fontSize: 24 }}>
                  groups
                </span>
                <span className="font-body-md" style={{ fontWeight: 600, color: '#fff', fontSize: 15 }}>
                  Junte-se à nossa comunidade exclusiva de alunas
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Glassmorphic Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            style={{
              background: 'rgba(55, 25, 49, 0.45)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-xl)',
              padding: '48px 36px',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-headline-sm" style={{ color: '#fff', marginBottom: 8, fontSize: 22 }}>
                    Inscreva-se na Lista VIP
                  </h2>
                  <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: 28, fontSize: 14, lineHeight: 1.5 }}>
                    Preencha os campos abaixo. Nossa equipe entrará em contato via WhatsApp com prioridade.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Name Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="nome"
                        className="font-label-caps"
                        style={{ color: 'var(--color-on-surface-variant)', fontSize: 10, letterSpacing: '0.12em' }}
                      >
                        Nome Completo *
                      </label>
                      <input
                        id="nome"
                        type="text"
                        required
                        placeholder="Ex: Amanda Santos"
                        value={formData.nome}
                        onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                        style={{
                          padding: '14px 18px',
                          background: 'rgba(26, 13, 23, 0.55)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 'var(--radius-md)',
                          color: '#fff',
                          fontSize: 16,
                          outline: 'none',
                          transition: 'all 0.25s var(--ease-out)',
                        }}
                        className="form-input"
                      />
                    </div>

                    {/* Email Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="email"
                        className="font-label-caps"
                        style={{ color: 'var(--color-on-surface-variant)', fontSize: 10, letterSpacing: '0.12em' }}
                      >
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        style={{
                          padding: '14px 18px',
                          background: 'rgba(26, 13, 23, 0.55)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 'var(--radius-md)',
                          color: '#fff',
                          fontSize: 16,
                          outline: 'none',
                          transition: 'all 0.25s var(--ease-out)',
                        }}
                        className="form-input"
                      />
                    </div>

                    {/* WhatsApp Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="whatsapp"
                        className="font-label-caps"
                        style={{ color: 'var(--color-on-surface-variant)', fontSize: 10, letterSpacing: '0.12em' }}
                      >
                        WhatsApp *
                      </label>
                      <input
                        id="whatsapp"
                        type="tel"
                        required
                        placeholder="(27) 99999-9999"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        style={{
                          padding: '14px 18px',
                          background: 'rgba(26, 13, 23, 0.55)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 'var(--radius-md)',
                          color: '#fff',
                          fontSize: 16,
                          outline: 'none',
                          transition: 'all 0.25s var(--ease-out)',
                        }}
                        className="form-input"
                      />
                    </div>

                    {/* Objective / Plan Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="objetivo"
                        className="font-label-caps"
                        style={{ color: 'var(--color-on-surface-variant)', fontSize: 10, letterSpacing: '0.12em' }}
                      >
                        Selecione seu objetivo ou plano
                      </label>
                      <select
                        id="objetivo"
                        value={formData.objetivo}
                        onChange={e => setFormData(prev => ({ ...prev, objetivo: e.target.value }))}
                        style={{
                          padding: '14px 18px',
                          background: 'rgba(26, 13, 23, 0.85)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 'var(--radius-md)',
                          color: formData.objetivo ? '#fff' : 'rgba(255,255,255,0.4)',
                          fontSize: 16,
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.25s var(--ease-out)',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                        className="form-select"
                      >
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="2x por semana">Plano 2x por semana (R$ 497,00/mês)</option>
                        <option value="3x por semana">Plano 3x por semana (R$ 697,00/mês)</option>
                        <option value="5x por semana">Plano 5x por semana (R$ 997,00/mês)</option>
                        <option value="Emagrecimento">Emagrecimento Saudável</option>
                        <option value="Definicao">Definição e Tonificação</option>
                        <option value="Saude">Ganho de Força e Saúde</option>
                      </select>
                    </div>

                    {errorMessage && (
                      <div
                        style={{
                          color: '#ff6b6b',
                          fontSize: 14,
                          padding: '12px 16px',
                          background: 'rgba(255, 107, 107, 0.08)',
                          borderRadius: 'var(--radius-md)',
                          borderLeft: '4px solid #ff6b6b',
                          marginTop: 4,
                        }}
                      >
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{
                        marginTop: 12,
                        width: '100%',
                        padding: '16px 24px',
                        background: 'var(--color-brand-lime)',
                        color: 'var(--color-background)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-label)',
                        fontSize: 12,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 20px rgba(240, 244, 105, 0.3)',
                        transition: 'all 0.25s var(--ease-out)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                      className="submit-btn"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="spinner" /> Enviando...
                        </>
                      ) : (
                        <>
                          Garantir Minha Vaga
                          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                        </>
                      )}
                    </button>
                  </form>

                  <style>{`
                    .form-input:focus, .form-select:focus {
                      border-color: var(--color-brand-lime) !important;
                      box-shadow: 0 0 15px rgba(240, 244, 105, 0.2);
                    }
                    .submit-btn:hover:not(:disabled) {
                      background: #ffffff !important;
                      box-shadow: 0 8px 30px rgba(240, 244, 105, 0.5) !important;
                      transform: translateY(-2px);
                    }
                    .submit-btn:active:not(:disabled) {
                      transform: translateY(0);
                    }
                    .spinner {
                      width: 18px;
                      height: 18px;
                      border: 2px solid rgba(55, 25, 49, 0.2);
                      border-top: 2px solid rgba(55, 25, 49, 1);
                      border-radius: 50%;
                      animation: spin 0.8s linear infinite;
                    }
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '20px 0',
                  }}
                >
                  {/* Glowing Success Badge */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'rgba(240, 244, 105, 0.1)',
                      border: '2px solid var(--color-brand-lime)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-brand-lime)',
                      marginBottom: 24,
                      boxShadow: '0 0 30px rgba(240, 244, 105, 0.35)',
                      animation: 'pulse-glow 2s infinite',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 40 }}>check_circle</span>
                  </div>

                  <h2 className="font-headline-sm" style={{ color: '#fff', marginBottom: 12, fontSize: 24 }}>
                    Inscrição Confirmada!
                  </h2>
                  <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: 16, marginBottom: 36, maxWidth: 360, lineHeight: 1.6 }}>
                    Olá, <strong style={{ color: '#fff' }}>{formData.nome.split(' ')[0]}</strong>! Seus dados foram salvos com sucesso e nossa equipe entrará em contato para agendar sua aula cortesia.
                  </p>

                  {/* WhatsApp Call to Action */}
                  <a
                    href={`https://wa.me/5527997782016?text=Ol%C3%A1%2C%20me%20cadastrei%20na%20lista%20VIP%20da%20landing%20page%20como%20${encodeURIComponent(formData.nome)}%20e%20gostaria%20de%20agendar%20minha%20aula.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      background: 'var(--color-brand-lime)',
                      color: 'var(--color-background)',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-label)',
                      fontSize: 12,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(240, 244, 105, 0.3)',
                      transition: 'all 0.25s var(--ease-out)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                    className="whatsapp-btn"
                  >
                    Falar no WhatsApp
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chat</span>
                  </a>

                  {/* Back to main website link */}
                  <a
                    href="/"
                    style={{
                      marginTop: 24,
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-label)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      transition: 'color 0.2s',
                    }}
                    className="back-btn"
                  >
                    Voltar para o site principal
                  </a>

                  <style>{`
                    .whatsapp-btn:hover {
                      background: #ffffff !important;
                      box-shadow: 0 8px 30px rgba(240, 244, 105, 0.5) !important;
                      transform: translateY(-2px);
                    }
                    .back-btn:hover {
                      color: var(--color-brand-lime) !important;
                    }
                  `}</style>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Plans Section */}
      <div
        style={{
          position: 'relative',
          background: 'rgba(26, 13, 23, 0.96)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '80px var(--space-margin-mobile) 100px',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span
            className="font-label-caps"
            style={{ color: 'var(--color-brand-lime)', letterSpacing: '0.25em', fontSize: 11 }}
          >
            Investimento & Frequência
          </span>
          <h2
            className="font-headline-md"
            style={{
              color: '#fff',
              fontSize: 'clamp(28px, 3vw, 36px)',
              marginTop: 12,
              textTransform: 'uppercase',
            }}
          >
            Nossos Planos
          </h2>
          <p
            className="font-body-md"
            style={{
              color: 'var(--color-on-surface-variant)',
              maxWidth: 580,
              margin: '16px auto 0',
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            Escolha a frequência ideal para a sua rotina. Planos sem taxas surpresas, com acompanhamento próximo de verdade.
          </p>
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.title}
              style={{
                background: plan.highlight ? 'rgba(240, 244, 105, 0.03)' : 'rgba(55, 25, 49, 0.25)',
                border: plan.highlight ? '2px solid var(--color-brand-lime)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-xl)',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: plan.highlight ? '0 15px 35px rgba(240, 244, 105, 0.08)' : 'none',
                position: 'relative',
                transition: 'all 0.3s var(--ease-out)',
              }}
              className="plan-card"
            >
              {plan.highlight && (
                <span
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-brand-lime)',
                    color: 'var(--color-background)',
                    padding: '4px 16px',
                    borderRadius: '100px',
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: 'var(--font-label)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Mais Recomendado
                </span>
              )}

              <div style={{ marginBottom: 24 }}>
                <span
                  className="font-label-caps"
                  style={{ color: 'var(--color-brand-lime)', fontSize: 10, display: 'block', marginBottom: 8 }}
                >
                  {plan.frequency}
                </span>
                <h3 className="font-headline-sm" style={{ color: '#fff', fontSize: 20 }}>
                  {plan.title}
                </h3>
              </div>

              {/* Pricing details */}
              <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 14,
                    textDecoration: 'line-through',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  De {plan.priceOriginal}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span
                    className="font-headline-md"
                    style={{ color: 'var(--color-brand-lime)', fontSize: 32, fontWeight: 700 }}
                  >
                    {plan.pricePromo}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
                    /mês
                  </span>
                </div>
              </div>

              {/* Features list */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40, flexGrow: 1 }}>
                {plan.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ color: 'var(--color-brand-lime)', fontSize: 18, marginTop: 2 }}
                    >
                      check
                    </span>
                    <span className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: 14 }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action button */}
              <button
                onClick={() => handleSelectPlan(plan.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-label)',
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s var(--ease-out)',
                  ...(plan.highlight
                    ? {
                        background: 'var(--color-brand-lime)',
                        color: 'var(--color-background)',
                        boxShadow: '0 4px 15px rgba(240, 244, 105, 0.25)',
                      }
                    : {
                        background: 'transparent',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }),
                }}
                className={plan.highlight ? 'plan-btn-primary' : 'plan-btn-secondary'}
              >
                Garantir Vaga VIP
              </button>
            </div>
          ))}
        </div>

        <style>{`
          .plan-card:hover {
            transform: translateY(-6px);
            border-color: var(--color-brand-lime) !important;
            box-shadow: 0 20px 40px rgba(240, 244, 105, 0.08) !important;
          }
          .plan-btn-primary:hover {
            background: #ffffff !important;
            box-shadow: 0 6px 20px rgba(240, 244, 105, 0.4) !important;
          }
          .plan-btn-secondary:hover {
            border-color: var(--color-brand-lime) !important;
            color: var(--color-brand-lime) !important;
            background: rgba(240, 244, 105, 0.02) !important;
          }
        `}</style>
      </div>

      {/* Simple Footer */}
      <footer
        style={{
          background: 'rgba(26, 13, 23, 0.98)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '40px 24px',
          textAlign: 'center',
          marginTop: 'auto',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjSI7xs2kDbUvUWQGD_sD_JMi0vUBigGkJDPwWx6i3RK77SQWiTmNMo5uNixONTu6ZyESCFpavrFyTlJN1zcGTXhkdKQQEEDDRmn4wvBdXwoUX-ACYR0w0nwmumN8sFUr2fLygXO1lUAfUKiGL1VhGOESuexJ3k2Oh_xd8QlBC0RicupNgAyb1bOIfkGhtXRaNm6yyy7FF2-RHpWVRAe4m2Ts5igOoXH2TjSwSEzV48lA88V6D73fKtRVYzvoRlM1a_b0H63dlYiEb"
            alt="TBT Logo"
            style={{ height: 22, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.35 }}
          />
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            © 2026 THAY BANHOS TRAINING. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </footer>
    </div>
  )
}
