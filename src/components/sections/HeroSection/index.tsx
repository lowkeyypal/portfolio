import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';
import { DynamicComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import Section from '../Section';
import { Action } from '../../atoms';
import { AnnotatedField } from '@/components/Annotated';
import { Button, HeroSection, Link } from '@/types';

export default function Component(props: HeroSection) {
    const { type, elementId, colors, backgroundSize, title, subtitle, text, media, actions = [], styles = {} } = props;
    const sectionFlexDirection = styles.self?.flexDirection ?? 'row';
    const sectionAlignItems = styles.self?.alignItems ?? 'center';
    return (
        <Section type={type} elementId={elementId} colors={colors} backgroundSize={backgroundSize} styles={styles.self}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, staggerChildren: 0.2 }}
                className={classNames('flex w-full', mapFlexDirectionStyles(sectionFlexDirection), mapStyles({ alignItems: sectionAlignItems }))}
            >
                <motion.div
                    className="flex-1 w-full max-w-4xl"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    <HeroBody {...props} />
                    <HeroActions actions={actions} styles={styles.actions} hasTopMargin={!!(title || subtitle || text)} />
                </motion.div>
                {media && (
                    <motion.div
                        className="flex-1 w-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <HeroMedia media={media} />
                    </motion.div>
                )}
            </motion.div>
        </Section>
    );
}

function HeroMedia({ media }) {
    return <DynamicComponent {...media} />;
}

/*
 This is the only component in this codebase which has a few Stackbit annotations for specific primitive
 field. These are added by the <AnnotatedField> helper.
 The motivation for these annotations: allowing the content editor to edit styles at the field level.
 */
function HeroBody(props: HeroSection) {
    const { title, subtitle, text, styles = {} } = props;
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };
    return (
        <>
            {title && (
                <motion.div variants={itemVariants}>
                    <AnnotatedField path=".title">
                        <h1 className={classNames(
                            'glitch-text font-mono font-bold leading-tight tracking-tight',
                            'text-3xl sm:text-5xl md:text-6xl lg:text-7xl',
                            styles.title ? mapStyles(styles.title) : null
                        )}>
                            {title}
                        </h1>
                    </AnnotatedField>
                </motion.div>
            )}
            {subtitle && (
                <motion.div variants={itemVariants} className="mt-6">
                    <AnnotatedField path=".subtitle">
                        <p className={classNames(
                            'font-mono text-base sm:text-lg md:text-xl text-primary/80 border-l-2 border-primary/50 pl-4 leading-relaxed max-w-2xl',
                            styles.subtitle ? mapStyles(styles.subtitle) : null
                        )}>
                            {subtitle}
                        </p>
                    </AnnotatedField>
                </motion.div>
            )}

            {text && (
                <motion.div variants={itemVariants}>
                    <AnnotatedField path=".text">
                        <Markdown
                            options={{ forceBlock: true, forceWrapper: true }}
                            className={classNames('sb-markdown', 'text-lg sm:text-xl md:text-2xl lg:text-3xl lg:leading-relaxed xl:leading-loose', styles.text ? mapStyles(styles.text) : null, {
                                'mt-6': title || subtitle
                            })}
                        >
                            {text}
                        </Markdown>
                    </AnnotatedField>
                </motion.div>
            )}
        </>
    );
}

function HeroActions(props: { actions: (Button | Link)[]; styles: any; hasTopMargin: boolean }) {
    const { actions = [], styles = {}, hasTopMargin } = props;
    if (actions.length === 0) {
        return null;
    }
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className={classNames('overflow-x-hidden', {
                'mt-8': hasTopMargin
            })}
        >
            <div className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', mapStyles(styles))}>
                {actions.map((action, index) => (
                    <Action key={index} {...action} className="my-2 mx-2 lg:whitespace-nowrap transition-transform duration-300 hover:scale-105" />
                ))}
            </div>
        </motion.div>
    );
}

function mapFlexDirectionStyles(flexDirection?: 'row' | 'row-reverse' | 'col' | 'col-reverse') {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row'];
        case 'row-reverse':
            return ['flex-col-reverse', 'lg:flex-row-reverse'];
        case 'col':
            return ['flex-col'];
        case 'col-reverse':
            return ['flex-col-reverse'];
        default:
            return null;
    }
}
