import React from 'react';
import { TeamMember } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  const { t } = useLanguage();
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#ffffff] dark:bg-[#0f172a] text-[#131b2e] dark:text-white rounded-2xl shadow-2xl border border-[#026177]/20 dark:border-white/15 overflow-hidden p-6 sm:p-8 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#3f484c] dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#026177] dark:border-[#8ad0ea] shadow-lg">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-geist text-2xl font-bold text-[#004859] dark:text-white">
              {member.name}
            </h3>
            <p className="font-mono-caps text-xs text-[#b52703] dark:text-[#ffb4a3] tracking-widest mt-0.5">
              {member.role.toUpperCase()}
            </p>
          </div>

          <p className="font-inter text-sm text-[#3f484c] dark:text-slate-300 leading-relaxed max-w-md">
            {member.bio}
          </p>

          <div className="w-full pt-2">
            <h4 className="font-geist text-xs font-semibold text-[#004859] dark:text-[#8ad0ea] uppercase tracking-wider mb-2">
              {t.team.skills}
            </h4>
            <div className="flex flex-wrap justify-center gap-1.5">
              {member.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#eaedff] dark:bg-white/10 text-[#004859] dark:text-slate-200 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#026177]/10 dark:border-white/10 w-full flex items-center justify-center gap-2 text-xs font-mono-caps text-[#026177] dark:text-[#8ad0ea]">
            <span className="material-symbols-outlined text-base">mail</span>
            <span>{member.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
