import * as React from 'react';

import BaseLayout from '../BaseLayout';
import { DynamicComponent } from '../../components-registry';
import { motion } from 'framer-motion';
import { PageLayout, PageComponentProps } from '@/types';

type ComponentProps = PageComponentProps & PageLayout;

const Component: React.FC<ComponentProps> = (props) => {
    const { global, ...page } = props;
    const { title, sections = [] } = page;

    return (
        <BaseLayout {...props}>
            <motion.main 
                id="main" 
                className="sb-layout sb-page-layout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                {title && <h1 className="sr-only">{title}</h1>}
                {sections.length > 0 && (
                    <div>
                        {sections.map((section, index) => {
                            return <DynamicComponent key={index} {...section} />;
                        })}
                    </div>
                )}
            </motion.main>
        </BaseLayout>
    );
};
export default Component;
