import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

interface NavBarProps {
    onTerminalToggle: () => void;
    terminalOpen: boolean;
    onThemeTransition?: (toLight: boolean) => void;
}

export default function NavBar({ onTerminalToggle, terminalOpen, onThemeTransition }: NavBarProps) {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [isLight, setIsLight] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



    useEffect(() => {
        const checkTheme = () => setIsLight(document.documentElement.classList.contains('light-mode'));
        checkTheme();

        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);

        // Watch for class changes on <html> (theme toggle)
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3 transition-all duration-300 backdrop-blur-md ${
                (scrolled || mobileMenuOpen)
                    ? isLight
                        ? 'bg-white/95 border-b border-[#FF003C]/20 shadow-[0_0_20px_rgba(255,0,60,0.08)]'
                        : 'bg-[#0d0208]/90 border-b border-primary/20 shadow-[0_0_20px_rgba(0,255,65,0.1)]'
                    : 'bg-transparent border-b border-transparent shadow-none'
            }`}
        >
            {/* Name / Logo */}
            <Link href="/" className="group flex items-center gap-2 no-underline">
                <span className="text-primary font-mono font-bold text-base sm:text-lg tracking-[0.2em] uppercase group-hover:text-shadow-neon transition-all duration-300">
                    KUNAL PAL
                </span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            </Link>

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* GitHub */}
                <a
                    href="https://github.com/lowkeyypal"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-primary hover:text-white transition-colors duration-200 p-1.5 rounded hover:bg-primary/10"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/kunal-pal3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-primary hover:text-white transition-colors duration-200 p-1.5 rounded hover:bg-primary/10"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>

                {/* Terminal toggle */}
                <button
                    onClick={onTerminalToggle}
                    aria-label="Toggle Terminal"
                    title={terminalOpen ? 'Close Terminal' : 'Open Terminal [>_]'}
                    className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded border font-mono text-xs tracking-wider transition-all duration-200 ${
                        terminalOpen
                            ? 'border-primary bg-primary text-dark'
                            : 'border-primary/50 text-primary hover:border-primary hover:bg-primary/10'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="hidden sm:inline">{terminalOpen ? 'CLOSE' : '>_'}</span>
                </button>

                {/* Theme toggle */}
                <ThemeToggle onBeforeToggle={onThemeTransition} />

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setMobileMenuOpen(!mobileMenuOpen); }}
                    className="sm:hidden p-1.5 text-primary hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`absolute top-full left-0 right-0 backdrop-blur-md border-b overflow-hidden sm:hidden shadow-lg ${
                            isLight ? 'bg-white/95 border-[#FF003C]/20' : 'bg-[#0d0208]/95 border-primary/20'
                        }`}
                    >
                        <div className="flex flex-col p-4 space-y-4 font-mono">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`transition-colors tracking-widest uppercase cursor-pointer no-underline ${isLight ? 'text-[#FF003C] hover:text-[#FF003C]/70' : 'text-primary hover:text-white'}`}>
                                Home
                            </Link>
                            <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className={`transition-colors tracking-widest uppercase cursor-pointer no-underline ${isLight ? 'text-[#FF003C] hover:text-[#FF003C]/70' : 'text-primary hover:text-white'}`}>
                                Projects
                            </Link>
                            <Link href="/info" onClick={() => setMobileMenuOpen(false)} className={`transition-colors tracking-widest uppercase cursor-pointer no-underline ${isLight ? 'text-[#FF003C] hover:text-[#FF003C]/70' : 'text-primary hover:text-white'}`}>
                                Info
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
