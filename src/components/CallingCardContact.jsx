import React, { useState, useCallback } from 'react';
import { personalInfo } from '../data/portfolioData';
import { playP5CallingCard, playP5Click, playP5Hover } from '../utils/soundEffects';
import { CheckCircle2, Mail, MessageSquare, Phone, Send, Sparkles, Star } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import P5AllOutAttackFinish from './P5AllOutAttackFinish';

export default function CallingCardContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllOutAttack, setShowAllOutAttack] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onAnimationComplete = useCallback(() => {
    setIsSubmitting(false);
    setShowAllOutAttack(false);
    setSubmitted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    playP5CallingCard();

    // TODO: Restore Formspree API call after animation testing
    setShowAllOutAttack(true);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 bg-transparent overflow-hidden">

      {/* Persona 5 All-Out Attack Finish Animation Overlay */}
      <P5AllOutAttackFinish
        show={showAllOutAttack}
        onComplete={onAnimationComplete}
        senderName={formData.name}
      />

      {/* Background Halftone & Atmospheric Red Glow matching Home section */}
      <div className="absolute inset-0 p5-halftone opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-[#E60012]/15 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-[#E60012]/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Persona 5 System Menu Style (from Image 2) */}
        <div className="mb-14 text-center max-w-4xl mx-auto flex flex-col items-center">

          {/* Top Placard ala "MeNu: SySTeM / SeLeCt a CoMMaNd" */}
          <div className="inline-flex items-center gap-2.5 mb-4 skew-x-[-8deg] drop-shadow-[4px_4px_0px_#000]">
            <span className="bg-black text-[#FFE600] font-mono text-xs px-2.5 py-1 border-2 border-white font-bold">
              COMMAND 05
            </span>
            <div className="bg-white text-black font-mono text-sm sm:text-base px-3.5 py-1 border-2 border-black tracking-wider flex items-center gap-1.5 font-bold">
              <span className="text-[#E60012]">★</span>
              <span>MeNu: CoNTaCT // TRANSMISSION READY</span>
            </div>
          </div>

          {/* Main Title with Centered Layout */}
          <div className="relative inline-flex flex-col items-center justify-center my-2">

            {/* Line 1: MARI BERKOLABORASI */}
            <h2 className="font-p5-title text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white drop-shadow-[5px_5px_0px_#000] text-center leading-tight">
              MARI BERKOLABORASI
            </h2>

            {/* Line 2: TAKE YOUR HEART with authentic P5 active selection highlight */}
            <div className="relative inline-flex items-center justify-center mt-3 sm:mt-4">

              {/* Cyan & Red highlight wedges */}
              <div
                className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] sm:border-y-[14px] border-y-transparent border-l-[18px] sm:border-l-[24px] border-l-[#00F0FF] filter drop-shadow-[2px_2px_0px_#000] z-20"
              />
              <div
                className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-6 sm:h-8 bg-[#E60012] skew-x-[-15deg] z-10 shadow-[2px_2px_0px_#000]"
              />

              {/* Slanted Ribbon Box for TAKE YOUR HEART! */}
              <div className="bg-[#E60012] text-white font-bebas text-2xl sm:text-4xl lg:text-5xl px-5 sm:px-8 py-1.5 sm:py-2 skew-x-[-8deg] shadow-[6px_6px_0px_#000] border-2 sm:border-4 border-white tracking-widest relative z-10 flex items-center gap-2">
                <span className="skew-x-[8deg] flex items-center gap-2 text-[#FFE600]">
                  ★ <span className="text-white">TAKE YOUR HEART!</span> ★
                </span>
              </div>

            </div>

          </div>

          <div className="h-1.5 w-44 bg-[#E60012] skew-x-[-15deg] my-4 mx-auto shadow-[2px_2px_0px_#000]"></div>

          {/* Persona 5 Themed High-Contrast Subtitle Container */}
          <div className="relative max-w-2xl my-3.5 mx-auto bg-[#0C0C12]/95 backdrop-blur-md border-y border-r border-zinc-800/90 border-l-4 border-l-[#E60012] p-4 skew-x-[-4deg] shadow-[5px_5px_0px_#000]">
            <div className="skew-x-[4deg]">
              <div className="flex items-center justify-center gap-2 mb-1 font-mono text-[11px] text-[#FFE600] font-bold uppercase tracking-wider">
                <span className="text-[#E60012]">★</span>
                <span>TRANSMISSION DIRECTIVE // COLLABORATION</span>
              </div>
              <p className="text-zinc-100 text-sm sm:text-base leading-relaxed text-justify sm:text-center [text-align-last:center] font-sans">
                Terbuka untuk peluang kerja sama riset Artificial Intelligence, rekayasa aplikasi mobile multiplatform skala enterprise, dan pengembangan platform web modern.
              </p>
            </div>
          </div>
        </div>

        {/* Calling Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Calling Card Graphic & Social Badges */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Themed Calling Card Envelope Frame */}
            <div className="bg-[#E60012] p-1.5 sm:p-2 skew-x-0 sm:skew-x-[-4deg] shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000] border-4 border-black">
              <div className="bg-[#111116]/95 p-4 sm:p-6 skew-x-0 sm:skew-x-[4deg] border-2 border-white relative overflow-hidden backdrop-blur-sm">

                {/* Calling Card Seal */}
                <div className="flex items-center justify-between border-b-2 border-[#E60012] pb-3 mb-4">
                  <div className="font-bebas text-xl sm:text-2xl text-white tracking-widest flex items-center gap-2">
                    <span className="text-[#FFE600]">★</span>
                    <span>PHANTOM TRANSMISSION</span>
                  </div>
                  <span className="bg-black text-[#00F0FF] font-mono text-xs px-2 py-0.5 border border-zinc-700 font-bold">
                    PRIORITY: HIGH
                  </span>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5 italic bg-black/40 p-3 border-l-2 border-[#E60012] text-justify [text-align-last:left] font-sans">
                  "Siap menerima misi kolaborasi pengembangan solusi cerdas dan mutakhir. Tinggalkan pesan melalui kartu panggil ini untuk membuka koordinasi langsung."
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-3">

                  {/* Email */}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    onClick={playP5Click}
                    onMouseEnter={playP5Hover}
                    className="flex items-center gap-3 p-3 bg-[#181824] hover:bg-[#E60012] text-zinc-200 hover:text-white transition-colors border border-zinc-700 shadow-[3px_3px_0px_#000] group"
                  >
                    <div className="p-2 bg-black text-[#FFE600] group-hover:text-white flex-shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200 font-bold">
                        EMAIL RESMI
                      </div>
                      <div className="text-xs sm:text-sm font-semibold tracking-wide font-mono break-all sm:break-normal">
                        {personalInfo.email}
                      </div>
                    </div>
                  </a>

                  {/* GitHub Profile */}
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playP5Click}
                    onMouseEnter={playP5Hover}
                    className="flex items-center gap-3 p-3 bg-[#181824] hover:bg-[#E60012] text-zinc-200 hover:text-white transition-colors border border-zinc-700 shadow-[3px_3px_0px_#000] group"
                  >
                    <div className="p-2 bg-black text-[#00F0FF] group-hover:text-white flex-shrink-0">
                      <GithubIcon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200 font-bold">
                        REPOSITORI KODE
                      </div>
                      <div className="text-xs sm:text-sm font-semibold tracking-wide font-mono truncate">
                        github.com/MuhamadHata
                      </div>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playP5Click}
                    onMouseEnter={playP5Hover}
                    className="flex items-center gap-3 p-3 bg-[#181824] hover:bg-[#E60012] text-zinc-200 hover:text-white transition-colors border border-zinc-700 shadow-[3px_3px_0px_#000] group"
                  >
                    <div className="p-2 bg-black text-[#FFE600] group-hover:text-white flex-shrink-0">
                      <LinkedinIcon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200 font-bold">
                        JARINGAN PROFESIONAL
                      </div>
                      <div className="text-xs sm:text-sm font-semibold tracking-wide font-mono truncate">
                        linkedin.com/in/muhamad-hata-b999901a4
                      </div>
                    </div>
                  </a>

                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Calling Card Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#121218]/95 backdrop-blur-md border-4 border-black p-4 sm:p-8 skew-x-0 sm:skew-x-[-4deg] shadow-[6px_6px_0px_#000] sm:shadow-[12px_12px_0px_#000] relative">
              <div className="skew-x-0 sm:skew-x-[4deg]">

                {submitted ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[#E60012] text-white flex items-center justify-center mb-4 rotate-12 shadow-[4px_4px_0px_#000] border-2 border-white">
                      <CheckCircle2 size={32} />
                    </div>

                    <h3 className="text-3xl font-bebas text-white tracking-wide mb-2">
                      CALLING CARD TERKIRIM DENGAN SUKSES!
                    </h3>
                    <p className="text-zinc-300 text-sm max-w-md mx-auto mb-6 font-sans">
                      Terima kasih atas pesan Anda, <span className="text-[#FFE600] font-bold">{formData.name}</span>. Transmisi telah diterima dan saya akan membalas ke <span className="text-white font-mono">{formData.email}</span> secepatnya.
                    </p>

                    <button
                      onClick={() => {
                        playP5Click();
                        setSubmitted(false);
                        setFormData({ name: '', email: '', organization: '', subject: '', message: '' });
                      }}
                      className="p5-btn bg-[#E60012] text-white font-bebas text-lg"
                    >
                      <span>KIRIM PESAN BARU</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="border-b-2 border-zinc-800 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-2xl font-bebas text-white tracking-wide">
                          FORMULIR PESAN
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono">
                          Lengkapi formulir di bawah untuk mengirim pesan langsung ke kotak masuk saya.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-black/80 px-2.5 py-1 border border-zinc-700 text-[10px] font-mono text-[#FFE600] flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping"></span>
                        <span>INBOX: {personalInfo.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1 font-bold">
                          Nama Lengkap <span className="text-[#E60012]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="cth. Dr. Ir. Budi Santoso"
                          className="w-full bg-black/90 text-white px-3.5 py-2.5 border-2 border-zinc-700 focus:border-[#E60012] outline-none text-sm font-sans transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1 font-bold">
                          Alamat Email <span className="text-[#E60012]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="cth. budi@perusahaan.com"
                          className="w-full bg-black/90 text-white px-3.5 py-2.5 border-2 border-zinc-700 focus:border-[#E60012] outline-none text-sm font-sans transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Organization */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1 font-bold">
                          Perusahaan / Lembaga
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="cth. PT Teknologi Indonesia / Riset Lab"
                          className="w-full bg-black/90 text-white px-3.5 py-2.5 border-2 border-zinc-700 focus:border-[#E60012] outline-none text-sm font-sans transition-colors"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1 font-bold">
                          Subjek Diskusi
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="cth. Peluang Fullstack Mobile / AI Project"
                          className="w-full bg-black/90 text-white px-3.5 py-2.5 border-2 border-zinc-700 focus:border-[#E60012] outline-none text-sm font-sans transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1 font-bold">
                        Rincian Pesan & Penawaran <span className="text-[#E60012]">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Deskripsikan kebutuhan proyek, lingkup kolaborasi, atau kriteria posisi yang ditawarkan..."
                        className="w-full bg-black/90 text-white p-3.5 border-2 border-zinc-700 focus:border-[#E60012] outline-none text-sm font-sans transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onMouseEnter={playP5Hover}
                        className="p5-btn w-full bg-[#E60012] text-white hover:bg-white hover:text-[#E60012] text-xl py-3 font-bebas tracking-wider shadow-[4px_4px_0px_#000]"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Send size={18} />
                          <span>{isSubmitting ? 'MENGIRIMKAN TRANSMISI...' : 'KIRIM CALLING CARD KE EMAIL MUHAMAD HATA'}</span>
                        </span>
                      </button>
                      {/* Error Message */}
                      {submitError && (
                        <div className="mt-3 bg-black/90 border-2 border-[#E60012] p-3 flex items-start gap-3">
                          <div className="bg-[#E60012] text-white p-1.5 flex-shrink-0 mt-0.5">
                            <span className="font-bebas text-sm">!!</span>
                          </div>
                          <div>
                            <p className="font-mono text-xs text-[#E60012] font-bold mb-0.5">
                              TRANSMISSION ERROR // GAGAL MENGIRIM
                            </p>
                            <p className="text-[11px] text-zinc-400 font-sans">
                              Koneksi terputus. Silakan coba kirim ulang atau gunakan tautan email di bawah.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Direct Mailto alternative */}
                      <div className="mt-3 text-center">
                        <a
                          href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Kolaborasi / Kontak via Portfolio')}&body=${encodeURIComponent(`Halo Muhamad Hata,\n\nNama: ${formData.name || ''}\nOrganisasi: ${formData.organization || ''}\nEmail: ${formData.email || ''}\n\nPesan:\n${formData.message || ''}`)}`}
                          className="text-[11px] font-mono text-zinc-400 hover:text-[#FFE600] underline transition-colors"
                        >
                          Atau klik di sini untuk membuka aplikasi email (Gmail/Outlook) Anda langsung
                        </a>
                      </div>
                    </div>

                  </form>
                )}

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
