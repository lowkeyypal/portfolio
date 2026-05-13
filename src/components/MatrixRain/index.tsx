'use client';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export interface MatrixRainHandle {
    triggerTransition: (toLight: boolean) => void;
}

const DARK_SRC =
    'https://rezmason.github.io/matrix/?version=classic' +
    '&numColumns=50' +
    '&animationSpeed=0.4' +
    '&fallSpeed=0.55' +
    '&bloomStrength=0.55' +
    '&bloomSize=0.35' +
    '&skipIntro=true' +
    '&suppressWarnings=true';

const MatrixRain = forwardRef<MatrixRainHandle>(function MatrixRain(_, ref) {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const check = () => setIsLight(document.documentElement.classList.contains('light-mode'));
        check();
        const obs = new MutationObserver(check);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => obs.disconnect();
    }, []);

    // No-op — transition is handled purely by CSS opacity
    useImperativeHandle(ref, () => ({
        triggerTransition(_toLight: boolean) {},
    }));

    return (
        <iframe
            src={DARK_SRC}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 0,
                border: 'none',
                // Fade in on dark, fade out cleanly on light — CSS does all the work
                opacity: isLight ? 0 : 0.42,
                transition: 'opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            aria-hidden="true"
            title="Matrix rain"
        />
    );
});

export default MatrixRain;
