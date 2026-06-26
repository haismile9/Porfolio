'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface Repo {
  name: string;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string } | null;
}

interface GitHubData {
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: Week[];
    };
  };
  repositories: {
    totalCount: number;
    nodes: Repo[];
  };
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getLevelColor(count: number): string {
  if (count === 0) return '#161b22';
  if (count <= 2) return '#0e4429';
  if (count <= 5) return '#006d32';
  if (count <= 9) return '#26a641';
  return '#39d353';
}

function getMonthLabels(weeks: Week[]): { label: string; colIndex: number }[] {
  const labels: { label: string; colIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], colIndex: i });
      lastMonth = month;
    }
  });
  return labels;
}

export function GitHubHeatmap() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch('/api/github-activity')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError('Failed to load GitHub data'); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-secondary font-mono text-sm">
        <div className="flex gap-1">
          {[0,1,2,3,4].map(i => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-sm bg-[#0e4429]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
        <span className="text-text-secondary/60">Fetching contribution data from GitHub...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-400 font-mono text-sm">
        {error || 'No data'}
      </div>
    );
  }

  const calendar = data.contributionsCollection.contributionCalendar;
  const weeks = calendar.weeks;
  const totalContributions = calendar.totalContributions;
  const monthLabels = getMonthLabels(weeks);

  // Streak calculation
  const allDays = weeks.flatMap(w => w.contributionDays).sort((a, b) => a.date.localeCompare(b.date));
  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].contributionCount > 0) {
      if (i === allDays.length - 1 || currentStreak > 0) currentStreak++;
      streak++;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      if (currentStreak === 0) break;
      streak = 0;
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm relative">
      {/* Header */}
      <div className="mb-6">
        <div className="text-text-secondary/50 text-xs mb-1">{`// github.com/haismile9`}</div>
        <div className="text-text-secondary text-xs">
          <span className="text-[#58a6ff]">const</span>{' '}
          <span className="text-[#79c0ff]">activity</span>{' '}
          <span className="text-text-secondary">=</span>{' '}
          <span className="text-[#a5d6ff]">await</span>{' '}
          <span className="text-[#d2a8ff]">github</span>
          <span className="text-text-secondary">.</span>
          <span className="text-[#79c0ff]">getContributions</span>
          <span className="text-text-secondary">(</span>
          <span className="text-[#a5d6ff]">&apos;haismile9&apos;</span>
          <span className="text-text-secondary">);</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total Contributions', value: totalContributions.toLocaleString(), color: '#39d353' },
          { label: 'Current Streak', value: `${currentStreak} days`, color: '#58a6ff' },
          { label: 'Longest Streak', value: `${longestStreak} days`, color: '#d2a8ff' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#161b22] border border-[#30363d] rounded px-3 py-2">
            <div className="text-xs text-text-secondary/60 mb-0.5">{stat.label}</div>
            <div className="text-base font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-[10px] text-text-secondary/50 absolute"
                style={{ left: `${m.colIndex * 13 + 32 + 24}px`, position: 'relative', minWidth: 0 }}
              >
                {/* Render month labels relative to position */}
              </div>
            ))}
            <div className="relative flex flex-1">
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className="text-[10px] text-text-secondary/50 absolute whitespace-nowrap"
                  style={{ left: `${m.colIndex * 13}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Grid: day labels + cells */}
          <div className="flex gap-1 mt-3">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-1 shrink-0">
              {DAYS.map((day, i) => (
                <div key={day} className="h-[11px] text-[9px] text-text-secondary/40 leading-none flex items-center">
                  {i % 2 === 1 ? day.slice(0, 3) : ''}
                </div>
              ))}
            </div>

            {/* Weeks columns */}
            <div className="flex gap-[3px] relative">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {/* Pad top if week doesn't start on Sunday */}
                  {wIdx === 0 && week.contributionDays[0] && (
                    Array.from({ length: new Date(week.contributionDays[0].date).getDay() }).map((_, i) => (
                      <div key={`pad-${i}`} className="w-[11px] h-[11px]" />
                    ))
                  )}
                  {week.contributionDays.map((day) => (
                    <motion.div
                      key={day.date}
                      className="w-[11px] h-[11px] rounded-[2px] cursor-pointer"
                      style={{ backgroundColor: getLevelColor(day.contributionCount) }}
                      whileHover={{ scale: 1.6, zIndex: 10 }}
                      onMouseEnter={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        const d = new Date(day.date);
                        setTooltip({
                          text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                          x: rect.left,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[10px] text-text-secondary/50">Less</span>
            {[0, 2, 5, 9, 15].map(n => (
              <div key={n} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: getLevelColor(n) }} />
            ))}
            <span className="text-[10px] text-text-secondary/50">More</span>
          </div>
        </div>
      </div>

      {/* Repos */}
      <div className="mt-6">
        <div className="text-text-secondary/50 text-xs mb-3">{`// recent repositories`}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.repositories.nodes.map(repo => (
            <a
              key={repo.name}
              href={`https://github.com/haismile9/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#161b22] border border-[#30363d] rounded px-3 py-2.5 hover:border-[#58a6ff]/50 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-3.5 h-3.5 text-text-secondary/50 group-hover:text-[#58a6ff] transition-colors" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                </svg>
                <span className="text-[#58a6ff] text-xs group-hover:underline truncate">{repo.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {repo.primaryLanguage && (
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                    <span className="text-[10px] text-text-secondary/60">{repo.primaryLanguage.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-text-secondary/60">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                  </svg>
                  <span className="text-[10px]">{repo.stargazerCount}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 bg-[#1c2128] border border-[#30363d] rounded text-[11px] text-text-primary pointer-events-none whitespace-nowrap shadow-lg"
          style={{ top: tooltip.y - 36, left: tooltip.x - 60 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
