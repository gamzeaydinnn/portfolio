/**
 * Personal Info Page - Kişisel Bilgiler
 *
 * Hakkımda, sosyal medya linkleri, iletişim formu ve profil resmi.
 *
 * Tasarım Özellikleri:
 * - Pink tema - Home page'deki personal info card'ından alındı
 * - BackgroundBeamsWithCollision arka plan efekti (pink tema)
 * - 3D Card component'leri ile modern görünüm
 * - 2 sütunlu layout: Sol (Hakkımda + CV + İletişim + Sosyal Medya), Sağ (Profil Resmi)
 * - PixelatedCanvas ile interaktif profil görseli
 * - Responsive tasarım (mobil uyumlu)
 *
 * @author Gamze Aydın
 */

"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/i18n-context";
import { PortfolioNavigation } from "@/components/layout/PortfolioNavigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundLines } from "@/components/ui/background-lines";
import { AnimatedSocialCard } from "@/components/ui/animated-social-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/**
 * Sosyal medya hesap bilgileri
 */
const GITHUB_URL = "https://github.com/gamzeaydinnn";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/gamze-ayd%C4%B1n-2706a9307/";

export default function PersonalInfoPage() {
  const { t } = useI18n();

  /**
   * Form state yönetimi
   * Tüm form alanları için tek state objesi
   */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  /**
   * Form gönderim durumu
   * loading: Gönderim devam ediyor
   * success: Başarılı gönderim
   * error: Hata durumu
   */
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  /**
   * Form input değişikliklerini yakalar
   * Tek handler ile tüm inputları yönetir (DRY prensibi)
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Form gönderimi
   * Gmail compose sayfasını önceden doldurulmuş olarak açar
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setSubmitStatus("loading");

    try {
      // Kısa bir gecikme ekle (loading animasyonu için)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Email body oluştur
      const emailBody = `Gönderen: ${formData.name}\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`;

      // Gmail compose URL'si oluştur
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(emailBody);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=gamzeaydin945@gmail.com&su=${subject}&body=${body}`;

      // Gmail'i yeni sekmede aç
      window.open(gmailUrl, "_blank");

      // Başarı durumuna geç
      setTimeout(() => {
        setSubmitStatus("success");
        // Formu temizle
        setFormData({ name: "", email: "", subject: "", message: "" });
        // 3 saniye sonra durumu sıfırla
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }, 100);
    } catch (error) {
      console.error("Form gönderimi hatası:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  /**
   * Email butonu için özel handler
   * Gmail compose sayfasını önceden doldurulmuş olarak açar
   */
  const handleEmailClick = () => {
    const subject = encodeURIComponent(t.personalInfo.emailSubject);
    const body = encodeURIComponent(t.personalInfo.emailBody);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=gamzeaydin945@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <>
      <BackgroundBeamsWithCollision colorTheme="pink">
        <div className="min-h-screen flex flex-col">
          <div className="container mx-auto py-12 pb-32 relative z-20 px-4 flex-1">
            {/* Sayfa Başlığı - Text Generate Effect animasyonu */}
            <header className="mb-12 text-center py-4">
              <TextGenerateEffect
                words={t.pageTitle.personalInfo}
                className="text-2xl md:text-3xl lg:text-5xl text-purple-300"
                duration={0.6}
              />
              <TextGenerateEffect
                words={t.pageDescription.personalInfo}
                className="text-base text-purple-200/70 max-w-2xl mx-auto font-normal mt-4"
                duration={0.3}
              />
            </header>

            {/* Ana İçerik - 2 Sütunlu Grid */}
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Card 1: Hakkımda + Profil Resmi (Birleştirilmiş) */}
              <BackgroundLines
                className="bg-black/80 hover:shadow-2xl hover:shadow-purple-500/20 border border-purple-500/30 hover:border-purple-400/60 w-full h-auto rounded-xl p-6 md:p-8 transition-all duration-300"
                color={[168, 139, 250]}
                lineCount={25}
              >
                {/* 2 Sütunlu Layout: Sol - Bilgiler, Sağ - Resim */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Sol Kısım - Hakkımda Bilgileri (3/5) */}
                  <div className="lg:col-span-3 flex flex-col">
                    {/* Hakkımda Başlığı */}
                    <div className="w-full mb-6 relative z-10">
                      <h2 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
                        {t.personalInfo.aboutMe}
                      </h2>
                    </div>

                    {/* İsim ve Ünvan */}
                    <div className="w-full mb-2 relative z-10">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {t.personalInfo.name}
                      </h3>
                    </div>

                    <div className="w-full mb-6 relative z-10">
                      <p className="text-purple-300/90 text-sm md:text-base font-medium">
                        {t.personalInfo.title}
                      </p>
                    </div>

                    {/* Bio - Hakkımda Yazısı */}
                    <div className="w-full relative z-10">
                      <p className="text-purple-100/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {t.personalInfo.bio}
                      </p>
                    </div>

                    {/* Profil Resmi — mobilde CV bölümünün üstünde */}
                    <div className="w-full mt-8 relative z-10 lg:hidden">
                      <div className="relative group w-full mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />

                        <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/40 shadow-xl shadow-purple-500/20">
                          <img
                            src="/images/gamze-profile.png"
                            alt="Gamze Aydın"
                            className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CV İndir */}
                    <div className="w-full mt-8 relative z-10">
                      <HoverBorderGradient
                        as="a"
                        href="/GamzeCV.pdf"
                        download="Gamze_Aydin_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        containerClassName="rounded-full w-fit"
                        className="bg-purple-950/80 text-purple-100 font-semibold px-6 py-2.5 flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-4 h-4"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {t.personalInfo.downloadCV}
                      </HoverBorderGradient>
                    </div>

                    {/* İletişim Bilgileri */}
                    <div className="w-full mt-6 relative z-10">
                      <div className="space-y-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="flex flex-col gap-3 text-sm">
                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-5 h-5 text-purple-400 flex-shrink-0"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22 6 12 13 2 6" />
                            </svg>
                            <a
                              href="mailto:gamzeaydin945@gmail.com"
                              className="text-purple-200/80 hover:text-purple-300 transition-colors duration-200 truncate"
                            >
                              gamzeaydin945@gmail.com
                            </a>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-5 h-5 text-purple-400 flex-shrink-0"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <a
                              href="tel:+905452759425"
                              className="text-purple-200/80 hover:text-purple-300 transition-colors duration-200"
                            >
                              +90 545 275 9425
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sosyal Medya */}
                    <div className="w-full mt-6 flex flex-col gap-4 relative z-10">
                      <h4 className="text-purple-300 font-semibold flex items-center gap-2">
                        <span className="text-lg">🔗</span>
                        {t.personalInfo.socialLinks}
                      </h4>

                      <div className="relative z-50 w-full lg:w-fit">
                        <AnimatedSocialCard
                          githubUrl={GITHUB_URL}
                          linkedinUrl={LINKEDIN_URL}
                          onEmailClick={handleEmailClick}
                          labels={{
                            github: "GitHub",
                            linkedin: "LinkedIn",
                            email: t.personalInfo.form.email,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sağ Kısım - Profil Resmi (masaüstü) */}
                  <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-start">
                    <div className="relative group w-[280px] mx-auto pt-2">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />

                      <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/40 shadow-xl shadow-purple-500/20">
                        <img
                          src="/images/gamze-profile.png"
                          alt="Gamze Aydın"
                          className="w-[280px] h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </BackgroundLines>

              {/* Card 2: İletişim Formu */}
              <BackgroundLines
                className="bg-black/80 hover:shadow-2xl hover:shadow-purple-500/20 border border-purple-500/30 hover:border-purple-400/60 w-full h-auto rounded-xl p-6 md:p-8 transition-all duration-300"
                color={[168, 139, 250]}
                lineCount={25}
              >
                {/* İletişim Başlığı */}
                <div className="w-full mb-2 relative z-10">
                  <h2 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
                    <span className="text-2xl">✉️</span>
                    {t.personalInfo.contactMe}
                  </h2>
                </div>

                <div className="w-full mb-6 relative z-10">
                  <p className="text-purple-200/60 text-sm">
                    {t.personalInfo.contactDescription}
                  </p>
                </div>

                {/* İletişim Formu */}
                <div className="w-full relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* İsim ve Email - Yan Yana */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-purple-300 mb-2"
                        >
                          {t.personalInfo.form.name}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all duration-200"
                          placeholder={t.personalInfo.form.namePlaceholder}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-purple-300 mb-2"
                        >
                          {t.personalInfo.form.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all duration-200"
                          placeholder={t.personalInfo.form.emailPlaceholder}
                        />
                      </div>
                    </div>

                    {/* Konu */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-purple-300 mb-2"
                      >
                        {t.personalInfo.form.subject}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all duration-200"
                        placeholder={t.personalInfo.form.subjectPlaceholder}
                      />
                    </div>

                    {/* Mesaj */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-purple-300 mb-2"
                      >
                        {t.personalInfo.form.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all duration-200 resize-none"
                        placeholder={t.personalInfo.form.messagePlaceholder}
                      />
                    </div>

                    {/* Gönder Butonu */}
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className={`
                              w-full px-6 py-3 rounded-lg font-semibold text-white
                              transition-all duration-300 flex items-center justify-center gap-2
                              ${
                                submitStatus === "loading"
                                  ? "bg-purple-500/50 cursor-not-allowed"
                                  : submitStatus === "success"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : submitStatus === "error"
                                      ? "bg-red-500 hover:bg-red-600"
                                      : "bg-purple-500 hover:bg-pink-600 hover:shadow-lg hover:shadow-purple-500/30"
                              }
                            `}
                    >
                      {submitStatus === "loading" && (
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}
                      {submitStatus === "success" && "✓ Gönderildi!"}
                      {submitStatus === "error" && "✕ Hata Oluştu"}
                      {submitStatus === "idle" && t.personalInfo.sendMessage}
                      {submitStatus === "loading" && "Gönderiliyor..."}
                    </button>
                  </form>
                </div>
              </BackgroundLines>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Navigasyon Çubuğu - Sayfa altında sabit */}
      <PortfolioNavigation />
    </>
  );
}
