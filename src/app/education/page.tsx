/**
 * Education Page - Eğitim Bilgileri
 *
 * Akademik geçmiş, sertifikalar ve eğitim timeline'ı.
 * Timeline/Card componentleri ile görselleştirilecek.
 */

"use client";

import { useI18n } from "@/i18n/i18n-context";
import { PortfolioNavigation } from "@/components/layout/PortfolioNavigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function EducationPage() {
  const { t } = useI18n();

  return (
    <>
      <BackgroundBeamsWithCollision colorTheme="blue">
        <div className="min-h-screen flex flex-col">
          <div className="container mx-auto py-12 pb-32 relative z-20 px-4 flex-1">
            {/* Page Header */}
            <header className="mb-12 text-center py-4">
              <TextGenerateEffect
                words={t.pageTitle.education}
                className="text-2xl md:text-3xl lg:text-5xl text-blue-300"
                duration={0.6}
              />
              <TextGenerateEffect
                words={t.pageDescription.education}
                className="text-base text-blue-200/70 max-w-2xl mx-auto font-normal mt-4"
                duration={0.3}
              />
            </header>

            {/* Timeline with Cards */}
            <div className="max-w-6xl mx-auto relative">
              {/* Timeline Line - Desktop only */}
              <div className="hidden md:block absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent"></div>

              {/* Education Cards */}
              <div className="space-y-12">
                {t.education.schools.map((school, index) => (
                  <div key={index} className="relative md:pl-28">
                    {/* Timeline Dot - Desktop only */}
                    <div className="hidden md:block absolute left-6 md:left-10 top-8 w-5 h-5 rounded-full bg-blue-500 border-4 border-black shadow-lg shadow-blue-500/50"></div>

                    <CardContainer
                      className="inter-var w-full"
                      rotationIntensity={200}
                    >
                      <CardBody className="bg-black/80 relative group/card hover:shadow-2xl hover:shadow-blue-500/20 border-blue-500/30 hover:border-blue-400/60 w-full h-auto rounded-xl p-6 border transition-all duration-300">
                        {/* Status Badge */}
                        <CardItem
                          translateZ={10}
                          className="flex items-center justify-between mb-4 w-full"
                        >
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              school.status ===
                              (t.education.current || "Current")
                                ? "bg-green-500/20 text-green-300 border border-green-500/50"
                                : "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                            }`}
                          >
                            {school.status}
                          </span>
                        </CardItem>

                        {/* School Info */}
                        <CardItem translateZ={25} className="w-full">
                          <h3 className="text-2xl font-bold text-blue-300 mb-2">
                            {school.degree}
                          </h3>
                        </CardItem>
                        <CardItem translateZ={20} className="w-full">
                          <p className="text-xl text-blue-200 mb-1">
                            {school.school}
                          </p>
                        </CardItem>
                        <CardItem translateZ={15} className="w-full">
                          <div className="flex items-center gap-4 text-blue-200/70 text-sm mb-4">
                            <span>📅 {school.period}</span>
                            <span>📍 {school.location}</span>
                          </div>
                        </CardItem>

                        {/* Description */}
                        <CardItem translateZ={10} className="w-full">
                          <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
                            {school.description}
                          </p>
                        </CardItem>

                        {/* Achievements */}
                        <CardItem translateZ={20} className="w-full">
                          <div>
                            <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
                              {t.education.achievements}
                            </h4>
                            <ul className="space-y-2">
                              {school.achievements.map((achievement, idx) => (
                                <li
                                  key={idx}
                                  className="flex gap-2 items-start"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4 text-blue-500 mt-1 shrink-0"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path
                                      d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                                      fill="currentColor"
                                      strokeWidth="0"
                                    />
                                  </svg>
                                  <span className="text-blue-100/90 text-sm">
                                    {achievement}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      <PortfolioNavigation />
    </>
  );
}
