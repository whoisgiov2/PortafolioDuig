import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function ContactoSeguro() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const titleRef   = useRef(null);
  const terminalRef = useRef(null);
  const termContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [transmissionComplete, setTransmissionComplete] = useState(false);
  const [sessionId] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Mouse-tracking spotlight on terminal frame */
  const onTerminalMouseMove = useCallback((e) => {
    const el = termContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const onTerminalMouseLeave = useCallback(() => {
    const el = termContainerRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }, []);

  useGSAP(() => {
    const split = SplitText.create(titleRef.current, { type: 'words, chars' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
      },
    });

    tl.from(headerRef.current, {
      autoAlpha: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.out',
    })
    .from(split.chars, {
      autoAlpha: 0,
      y: 50,
      rotationX: -90,
      transformOrigin: 'center bottom',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.02,
    }, '-=0.4')
    .from(terminalRef.current, {
      autoAlpha: 0,
      y: 45,
      duration: 1,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set([headerRef.current, terminalRef.current], { clearProps: 'willChange' });
      },
    }, '-=0.5');
  }, { scope: sectionRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado (Contacto Seguro):', formData);

    setIsProcessing(true);
    setConsoleLogs([]);
    setTransmissionComplete(false);

    const txHash = `CGRM-TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const sequence = [
      { delay: 100,  text: `$ ./send_payload.sh --target=CGRM_VAULT` },
      { delay: 500,  text: `> [0.001s] Initiating TLS 1.3 handshake with host node...` },
      { delay: 1000, text: `> [0.042s] Encrypting payload buffer (AES-256-GCM)...` },
      { delay: 1600, text: `> [0.118s] Establishing encrypted zero-trust tunnel...` },
      { delay: 2300, text: `> [0.245s] Transmission verified. Data block written.` },
      { delay: 3000, text: `> [0.312s] Confirmation Hash: ${txHash}` },
      { delay: 3700, text: `> [0.420s] Payload delivered successfully.` },
    ];

    sequence.forEach(({ delay, text }) => {
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, text]);
      }, delay);
    });

    setTimeout(() => {
      setTransmissionComplete(true);
    }, 4200);
  };

  const handleReset = () => {
    setIsProcessing(false);
    setConsoleLogs([]);
    setTransmissionComplete(false);
    setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' });
  };

  const promptCls = "font-mono text-xs text-neutral-400 font-semibold tracking-wide flex items-center gap-2 mb-1.5";
  const fieldContainerCls = "flex items-center gap-2 bg-black/80 border border-white/10 rounded-xl px-4 py-3 focus-within:border-white/40 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300";
  const inputStyleCls = "w-full bg-transparent border-none outline-none text-white text-xs font-mono placeholder-neutral-700 ring-0 focus:ring-0";

  return (
    <div ref={sectionRef} className="max-w-2xl mx-auto w-full">

      {/* Section Header */}
      <div ref={headerRef} data-speed="1.1" className="mb-10 will-change-transform">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-400 border border-white/15 rounded-full px-4 py-1.5 bg-white/[0.03]">
          05&nbsp;/&nbsp;CONTACTO SEGURO CLI
        </span>
        <h2 ref={titleRef} className="mt-6 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          Hablemos<br />
          <span className="text-neutral-500">Directamente</span>
        </h2>
        <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-sm">
          Terminal interactiva de comunicación segura. Inyecta tu mensaje directamente en la bóveda cibernética.
        </p>
      </div>

      {/* Terminal Window Container */}
      <div ref={terminalRef} className="will-change-transform">
        <div
          ref={termContainerRef}
          onMouseMove={onTerminalMouseMove}
          onMouseLeave={onTerminalMouseLeave}
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] transition-all duration-300 font-mono"
          style={{ '--mx': '50%', '--my': '50%' }}
        >
          {/* Subtle Silver Radial Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
            style={{ background: 'radial-gradient(circle 280px at var(--mx) var(--my), rgba(255,255,255,0.06), transparent 70%)' }}
          />

          {/* OS Window Header Bar */}
          <div className="relative z-10 bg-neutral-900/90 border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
            {/* Control dots */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-500 inline-block" />
            </div>

            {/* Window title */}
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-neutral-300 font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>secure_channel.exe</span>
            </div>

            {/* Encrypt protocol tag */}
            <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase hidden sm:inline">
              TLS_1.3 // AES-256
            </span>
          </div>

          {/* Terminal Body */}
          <div className="relative z-10 p-6 sm:p-8">

            {!isProcessing ? (
              /* Interactive CLI Input Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Intro prompt hint */}
                <div className="text-[10px] text-neutral-500 tracking-wider mb-4 pb-2 border-b border-white/5 flex items-center justify-between">
                  <span>CGRM SECURITY SHELL v2.5.0</span>
                  <span>[ INPUT PROTOCOL ACTIVE ]</span>
                </div>

                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="nombre" className={promptCls}>
                      <span className="text-neutral-500">guest@vault:~/name$</span>
                    </label>
                    <div className={fieldContainerCls}>
                      <span className="text-neutral-500 text-xs shrink-0 select-none">{'>'}</span>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        required
                        className={inputStyleCls}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="correo" className={promptCls}>
                      <span className="text-neutral-500">guest@vault:~/email$</span>
                    </label>
                    <div className={fieldContainerCls}>
                      <span className="text-neutral-500 text-xs shrink-0 select-none">{'>'}</span>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        className={inputStyleCls}
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="asunto" className={promptCls}>
                    <span className="text-neutral-500">guest@vault:~/subject$</span>
                  </label>
                  <div className={fieldContainerCls}>
                    <span className="text-neutral-500 text-xs shrink-0 select-none">{'>'}</span>
                    <input
                      type="text"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder="Motivo de tu consulta o colaboración"
                      required
                      className={inputStyleCls}
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="mensaje" className={promptCls}>
                    <span className="text-neutral-500">guest@vault:~/message$</span>
                  </label>
                  <div className="flex items-start gap-2 bg-black/80 border border-white/10 rounded-xl px-4 py-3 focus-within:border-white/40 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <span className="text-neutral-500 text-xs shrink-0 pt-0.5 select-none">{'>'}</span>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows="4"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe la carga útil de tu mensaje aquí..."
                      required
                      className={`${inputStyleCls} resize-none`}
                    />
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                    STATUS: READY_FOR_DISPATCH
                  </span>

                  <button
                    type="submit"
                    aria-label="Ejecutar script de envío send_payload.sh"
                    className="group/btn relative font-mono text-[10px] tracking-[0.25em] uppercase px-6 py-3.5 rounded-xl border border-white/20 bg-white/[0.04] text-white overflow-hidden transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 ease-out group-hover/btn:translate-y-0" />
                    <span className="relative z-10 font-semibold group-hover/btn:text-black transition-colors duration-300 flex items-center justify-center gap-2">
                      <span>[ Execute ./send_payload.sh ]</span>
                      <span aria-hidden="true">↵</span>
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              /* Simulated CLI Processing & Transmission Console */
              <div className="space-y-3 font-mono py-2">
                <div className="text-[10px] text-neutral-500 tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
                  <span>DISPATCH LOG // SESSION ID #{sessionId}</span>
                  <span>{transmissionComplete ? '[ COMPLETED ]' : '[ TRANSMITTING... ]'}</span>
                </div>

                {/* Console Log Output Lines */}
                <div className="space-y-2 text-xs min-h-[220px]">
                  {consoleLogs.map((log, index) => (
                    <div key={index} className="flex items-center gap-2 animate-fadeIn">
                      <span className="text-neutral-300 font-mono">{log}</span>
                    </div>
                  ))}
                  {!transmissionComplete && (
                    <div className="flex items-center gap-2 text-neutral-500 animate-pulse">
                      <span>{'>'} Processing pipeline...</span>
                      <span className="inline-block w-2 h-4 bg-white animate-ping" />
                    </div>
                  )}
                </div>

                {/* Post-transmission Reset Button */}
                {transmissionComplete && (
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between animate-fadeIn">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white font-semibold">
                      ✓ TRANSMISIÓN RECIBIDA CON ÉXITO
                    </span>

                    <button
                      type="button"
                      onClick={handleReset}
                      aria-label="Abrir nueva sesión de consola"
                      className="font-mono text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                      [ Open New Shell Session ]
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

