import React from 'react';
import { User, Calendar } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between ${className}`}>
      {/* Company Name */}
      <div>
        <h2 className="text-lg text-slate-800">Al-Kareem Textile Mills (Pvt) Ltd</h2>
        <p className="text-sm text-slate-500">Faisalabad, Pakistan</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Current Date */}
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{currentDate}</span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-300">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-800">Muhammad Ali Khan</p>
            <p className="text-xs text-slate-500">Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
}
