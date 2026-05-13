import * as React from 'react';
import classNames from 'classnames';

import { Link } from '../../atoms';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import Section from '../Section';
import { Annotated } from '@/components/Annotated';
import { motion } from 'framer-motion';

export default function LabelsSection(props) {
    const { type, elementId, colors, title, subtitle, items = [], styles = {} } = props;
    return (
        <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
            {title && <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)}>{title}</h2>}
            {subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-6': title
                    })}
                >
                    {subtitle}
                </p>
            )}
            {items.length > 0 && (
                <div
                    className={classNames('flex', 'flex-wrap', {
                        'mt-12 lg:mt-16': title || subtitle
                    })}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <LabelItem {...item} />
                        </motion.div>
                    ))}
                </div>
            )}
        </Section>
    );
}

function LabelItem(props) {
    const { label, url } = props;
    if (!label) {
        return null;
    }
    return (
        <Annotated content={props}>
            {url ? (
                <Link href={url} className="cyber-panel px-6 py-3 rounded-full text-sm font-medium tracking-wider mr-4 mb-4 hover:-translate-y-1 transition-transform hover:border-primary inline-block">
                    <span>{label}</span>
                </Link>
            ) : (
                <div className="cyber-panel px-6 py-3 rounded-full text-sm font-medium tracking-wider mr-4 mb-4 hover:-translate-y-1 transition-transform hover:border-primary cursor-default inline-block">
                    <span>{label}</span>
                </div>
            )}
        </Annotated>
    );
}
