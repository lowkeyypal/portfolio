import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function GetRickrolled() {
    const [loadingStage, setLoadingStage] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [exitInput, setExitInput] = useState('');
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Better 10-second timing implementation
    useEffect(() => {
        // Force pure Dark Mode for the hack sequence to prevent global CSS bleed
        document.documentElement.classList.remove('light-mode');

        let startTime = Date.now();
        const duration = 10000; // 10 seconds

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            setLoadingStage(progress);

            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => setIsVideoPlaying(true), 500);
            }
        };
        requestAnimationFrame(updateProgress);
    }, []);

    // Lock interactions
    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();
        document.addEventListener('contextmenu', preventDefault);
        
        return () => {
            document.removeEventListener('contextmenu', preventDefault);
        };
    }, []);

    // Focus input when video ends
    useEffect(() => {
        if (videoEnded) {
            inputRef.current?.focus();
        }
    }, [videoEnded]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (exitInput.trim().toLowerCase() === 'exit') {
                router.push('/');
            } else {
                setExitInput(''); // clear if wrong
            }
        }
    };

    const renderProgressBar = () => {
        const bars = 40;
        const filled = Math.floor((loadingStage / 100) * bars);
        const empty = bars - filled;
        return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`;
    };

    return (
        <div className="min-h-screen bg-black text-[#00ff41] font-mono flex flex-col items-center justify-center overflow-hidden relative cursor-none select-none">
            <Head>
                <title>GET RICK ROLLED</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            {!isVideoPlaying && (
                <div className="flex flex-col items-start max-w-3xl w-full p-8 space-y-6 mt-32">
                    <div className="text-2xl md:text-3xl font-bold animate-pulse !bg-transparent tracking-widest opacity-90">
                        LOADING...
                    </div>

                    <div className="text-xl md:text-2xl font-bold tracking-widest whitespace-pre w-full">
                        {renderProgressBar()} {Math.floor(loadingStage)}%
                    </div>
                </div>
            )}

            {isVideoPlaying && (
                <video 
                    src="/video/rickroll.mp4" 
                    autoPlay 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoEnded ? 'opacity-30' : 'opacity-100'}`}
                    onEnded={() => setVideoEnded(true)}
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                />
            )}

            {videoEnded && (
                <div className="fixed bottom-4 right-4 z-50 w-[95%] max-w-xl bg-[#0d0208] border border-[#00ff41] p-5 shadow-[0_0_20px_rgba(0,255,65,0.2)] rounded font-mono text-[#00ff41] flex flex-col">
                    <div className="mb-4 text-sm opacity-90 leading-relaxed">
                        &gt; Execution completed.<br/>
                        &gt; Connection terminated.
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="mr-2">guest@kunal-pal-os:~$</span>
                        <input 
                            ref={inputRef}
                            type="text"
                            value={exitInput}
                            onChange={e => setExitInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="bg-transparent border-none outline-none flex-1 text-[#00ff41] caret-[#00ff41]"
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
