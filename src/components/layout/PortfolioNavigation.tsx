/**
 * Portfolio Navigation - Floating Dock
 * 
 * Tüm portfolio sayfalarına erişim için floating navigation.
 * MacOS dock benzeri animasyonlu UI.
 */

'use client';

import React from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconHome,
  IconSchool,
  IconBriefcase,
  IconCode,
  IconTrophy,
  IconUser,
} from '@tabler/icons-react';
import { useI18n } from '@/i18n/i18n-context';

export function PortfolioNavigation() {
  const { t } = useI18n();

  // Portfolio sayfaları için linkler
  const links = [
    {
      title: t.navigation.home,
      icon: (
        <IconHome className="h-full w-full text-white" />
      ),
      href: '/',
    },
    {
      title: t.navigation.personalInfo,
      icon: (
        <IconUser className="h-full w-full text-pink-400" />
      ),
      href: '/personal-info',
    },
    {
      title: t.navigation.experience,
      icon: (
        <IconBriefcase className="h-full w-full text-purple-400" />
      ),
      href: '/experience',
    },
    {
      title: t.navigation.projects,
      icon: (
        <IconCode className="h-full w-full text-green-400" />
      ),
      href: '/projects',
    },
    {
      title: t.navigation.skills,
      icon: (
        <IconTrophy className="h-full w-full text-yellow-400" />
      ),
      href: '/skills',
    },
    {
      title: t.navigation.education,
      icon: (
        <IconSchool className="h-full w-full text-blue-400" />
      ),
      href: '/education',
    },
  ];

  return (
    <>
      {/* Desktop - Alt ortada */}
      <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={links} />
      </div>
      {/* Mobile - Sol altta, ekranı optimum kullanır, sağdan 12px boşluk bırakır */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <FloatingDock items={links} />
      </div>
    </>
  );
}
