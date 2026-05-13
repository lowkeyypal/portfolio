import React, { useEffect, useState } from 'react';

interface ThemeToggleProps {
    onBeforeToggle?: (toLight: boolean) => void;
}

export default function ThemeToggle({ onBeforeToggle }: ThemeToggleProps) {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            setIsLight(true);
            document.documentElement.classList.add('light-mode');
        }
    }, []);

    const toggle = () => {
        const next = !isLight;

        // Fire matrix rain fade-out signal (no-op now, kept for future use)
        onBeforeToggle?.(next);

        // Switch immediately — CSS transitions on body/nav/iframe do the smoothing
        setIsLight(next);
        if (next) {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <button
            onClick={toggle}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle Theme"
            className="flex items-center justify-center p-1.5 rounded-full border-2 border-primary text-primary bg-transparent cursor-pointer transition-all duration-200 hover:bg-primary hover:text-[#0d0208]"
        >
            {isLight ? (
                /* Moon — switch to dark */
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                /* Sun — switch to light */
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
}
