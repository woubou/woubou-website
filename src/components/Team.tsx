import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/initialData';
import { TeamMember } from '../types';
import { TeamMemberModal } from './TeamMemberModal';
import { useLanguage } from '../context/LanguageContext';

export const Team: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="font-mono-caps text-xs font-semibold text-[#b52703] dark:text-[#ffb4a3] tracking-widest uppercase">
          {t.team.badge}
        </span>
        <h2 className="font-geist text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004859] dark:text-white">
          {t.team.title}
        </h2>
        <p className="font-inter text-base sm:text-lg text-[#3f484c] dark:text-slate-300">
          {t.team.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="group relative bg-[#ffffff] dark:bg-slate-900 rounded-2xl p-6 border border-[#026177]/15 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              {/* Avatar Frame */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#eaedff] dark:border-slate-800 group-hover:border-[#026177] dark:group-hover:border-[#8ad0ea] transition-all shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Name & Role */}
              <h3 className="font-geist text-xl font-bold text-[#131b2e] dark:text-white group-hover:text-[#004859] dark:group-hover:text-[#8ad0ea] transition-colors">
                {member.name}
              </h3>
              <p className="font-mono-caps text-xs text-[#3f484c] dark:text-slate-400 mt-1 mb-4">
                {member.role}
              </p>

              {/* Brief Bio */}
              <p className="font-inter text-xs text-[#3f484c] dark:text-slate-300 line-clamp-2 leading-relaxed">
                {member.bio}
              </p>
            </div>

            <span className="mt-4 inline-flex items-center gap-1 font-mono-caps text-[10px] text-[#026177] dark:text-[#8ad0ea] group-hover:underline">
              {t.team.viewProfile} &rarr;
            </span>
          </div>
        ))}
      </div>

      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
};
