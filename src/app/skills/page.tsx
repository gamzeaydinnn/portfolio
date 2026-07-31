/**
 * Skills Page - Yetenekler
 *
 * Projelerde kullanılan teknolojilerin sade bir listesi.
 */

"use client";

import React, { useMemo } from "react";
import { useI18n } from "@/i18n/i18n-context";
import { SkillCategory } from "@/types/i18n.types";
import { PortfolioNavigation } from "@/components/layout/PortfolioNavigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  return (
    <div className="rounded-xl border border-yellow-500/25 bg-black/75 p-5 transition-colors hover:border-yellow-400/45">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" aria-hidden="true">
          {category.icon}
        </span>
        <h3 className="text-lg font-semibold text-yellow-300">
          {category.name}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1.5 rounded-full text-sm text-yellow-100/90 bg-yellow-500/10 border border-yellow-500/20"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const { t } = useI18n();

  const categories = useMemo(() => t.skills?.categories || [], [t.skills]);

  return (
    <>
      <BackgroundBeamsWithCollision colorTheme="yellow">
        <div className="min-h-screen flex flex-col">
          <div className="container mx-auto py-12 pb-32 relative z-20 px-4 flex-1">
            <header className="mb-12 text-center py-4">
              <TextGenerateEffect
                words={t.pageTitle.skills}
                className="text-2xl md:text-3xl lg:text-5xl text-yellow-300"
                duration={0.6}
              />
              <TextGenerateEffect
                words={t.pageDescription.skills}
                className="text-base text-yellow-200/70 max-w-xl mx-auto font-normal mt-4"
                duration={0.3}
              />
            </header>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              {categories.map((category) => (
                <SkillCategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      <PortfolioNavigation />
    </>
  );
}
