/**
 * Home Page - Ana Sayfa
 */

"use client";

import { useI18n } from "@/i18n/i18n-context";
import { Vortex } from "@/components/ui/vortex";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CometCard } from "@/components/ui/comet-card";
import { PortfolioNavigation } from "@/components/layout/PortfolioNavigation";
import Link from "next/link";
import {
  IconSchool,
  IconCode,
  IconTrophy,
  IconBriefcase,
  IconUser,
  IconArrowRight,
} from "@tabler/icons-react";

export default function HomePage() {
  const { t } = useI18n();

  const navigationCards = [
    {
      title: t.navigation.personalInfo,
      description: t.home.cards.personalInfo,
      icon: <IconUser className="w-9 h-9" stroke={1.5} />,
      href: "/personal-info",
      gradient: "from-pink-500 via-pink-400 to-rose-500",
      iconColor: "text-pink-400",
      titleColor: "text-pink-300",
      descColor: "text-pink-100/80",
    },
    {
      title: t.navigation.experience,
      description: t.home.cards.experience,
      icon: <IconBriefcase className="w-9 h-9" stroke={1.5} />,
      href: "/experience",
      gradient: "from-purple-500 via-purple-400 to-violet-500",
      iconColor: "text-purple-400",
      titleColor: "text-purple-300",
      descColor: "text-purple-100/80",
    },
    {
      title: t.navigation.projects,
      description: t.home.cards.projects,
      icon: <IconCode className="w-9 h-9" stroke={1.5} />,
      href: "/projects",
      gradient: "from-green-500 via-emerald-400 to-teal-500",
      iconColor: "text-green-400",
      titleColor: "text-green-300",
      descColor: "text-green-100/80",
    },
    {
      title: t.navigation.skills,
      description: t.home.cards.skills,
      icon: <IconTrophy className="w-9 h-9" stroke={1.5} />,
      href: "/skills",
      gradient: "from-yellow-500 via-amber-400 to-orange-500",
      iconColor: "text-yellow-400",
      titleColor: "text-yellow-300",
      descColor: "text-yellow-100/80",
    },
    {
      title: t.navigation.education,
      description: t.home.cards.education,
      icon: <IconSchool className="w-9 h-9" stroke={1.5} />,
      href: "/education",
      gradient: "from-blue-500 via-blue-400 to-cyan-500",
      iconColor: "text-blue-400",
      titleColor: "text-blue-300",
      descColor: "text-blue-100/80",
    },
  ];

  return (
    <>
      <div className="w-full mx-auto min-h-screen overflow-hidden bg-black">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          containerClassName="min-h-screen"
        >
          <div className="flex flex-col items-center justify-start w-full max-w-[1800px] mx-auto pt-16 px-4 md:px-8">
            <div className="text-center space-y-4 mb-10">
              <TextGenerateEffect
                words={t.home.name}
                className="text-4xl md:text-5xl lg:text-6xl"
                duration={0.6}
              />
              <TextGenerateEffect
                words={t.home.subtitle}
                className="text-lg md:text-xl font-light text-gray-400"
                duration={0.4}
              />
              <TextGenerateEffect
                words={t.pageDescription.home}
                className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-normal"
                duration={0.3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full pb-28 px-2">
              {navigationCards.map((card, index) => (
                <Link key={index} href={card.href} className="block w-full group">
                  <CometCard
                    className="w-full h-[20rem]"
                    cometColors={[
                      card.gradient.includes("pink")
                        ? "#f472b6"
                        : card.gradient.includes("purple")
                          ? "#a78bfa"
                          : card.gradient.includes("green")
                            ? "#34d399"
                            : card.gradient.includes("yellow")
                              ? "#facc15"
                              : "#38bdf8",
                    ]}
                  >
                    <div className="flex flex-col p-5 h-[20rem]">
                      <div className={`mb-3 ${card.iconColor}`}>{card.icon}</div>

                      <h3
                        className={`font-bold text-lg mb-2 ${card.titleColor}`}
                      >
                        {card.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed flex-1 ${card.descColor}`}
                      >
                        {card.description}
                      </p>

                      <div
                        className={`mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r ${card.gradient} text-white font-semibold text-sm group-hover:opacity-100 opacity-95 transition-opacity`}
                      >
                        <span>{t.home.explore}</span>
                        <IconArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CometCard>
                </Link>
              ))}
            </div>
          </div>
        </Vortex>
      </div>

      <PortfolioNavigation />
    </>
  );
}
