import * as React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function BackgroundImage(props) {
    const { url, className, backgroundSize, backgroundPosition, backgroundRepeat, opacity } = props;
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const check = () => setIsLight(document.documentElement.classList.contains('light-mode'));
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    if (!url) return null;

    // Hide background image in light mode — white bg + pink theme is the aesthetic
    if (isLight) return null;

    return (
        <div
            className={classNames(
                'fixed',
                'inset-0',
                'blur-md',
                'brightness-50',
                mapStyles({
                    backgroundSize: backgroundSize ?? 'cover',
                    backgroundPosition: backgroundPosition ?? 'center',
                    backgroundRepeat: backgroundRepeat ?? 'no-repeat'
                }),
                className
            )}
            style={{
                backgroundImage: `url('${url}')`,
                opacity: (opacity ?? 100) * 0.01
            }}
        />
    );
}
