import '../css/main.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import heavy components (avoids SSR issues)
const NavBar = dynamic(() => import('@/components/NavBar'), { ssr: false });
const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });
const MatrixRain = dynamic(() => import('@/components/MatrixRain'), { ssr: false });

export default function MyApp({ Component, pageProps, router }) {
    const [terminalOpen, setTerminalOpen] = useState(false);

    return (
        <>
            {/* Persistent UI — never remounts between page changes */}
            {router.pathname !== '/getrickrolled' && (
                <>
                    <MatrixRain />
                    <NavBar onTerminalToggle={() => setTerminalOpen((prev) => !prev)} terminalOpen={terminalOpen} />
                    <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
                </>
            )}

            {/* Page content — AnimatePresence drives per-page transitions */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.div key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </>
    );
}
