import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { catArt, oppaiArt } from "./assets";
import { motion, AnimatePresence } from "framer-motion";

// ── DVD window-bounce velocity ref ──────────────────────────────────────────
interface DvdVel { vx: number; vy: number; }

interface HistoryLine {
    type: "system" | "input" | "error" | "success";
    content: string | React.ReactNode;
}

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

async function typewriterSequence(
    lines: Array<{ type: HistoryLine["type"]; content: string; delay?: number }>,
    pushLine: (line: HistoryLine) => void,
    charDelay = 38,
    lineDelay = 120,
) {
    for (const { type, content, delay } of lines) {
        if (delay !== undefined) {
            await new Promise(r => setTimeout(r, delay));
        }
        if (type === "input") {
            for (let i = 1; i <= content.length; i++) {
                await new Promise(r => setTimeout(r, charDelay));
                pushLine({ type, content: content.slice(0, i) });
            }
        } else {
            await new Promise(r => setTimeout(r, lineDelay));
            pushLine({ type, content });
        }
    }
}

const BOOT_LINES: HistoryLine[] = [
    { type: "system", content: "              ,---------------------------," },
    { type: "system", content: "              |  /---------------------\\  |" },
    { type: "system", content: "              | |                       | |" },
    { type: "system", content: "              | |    KUNAL_PAL_OS       | |" },
    { type: "system", content: "              | |    v2.0.4 BOOTED      | |" },
    { type: "system", content: '              | |    guest@bash:~$ _    | |' },
    { type: "system", content: "              | |                       | |" },
    { type: "system", content: "              |  \\_____________________/  |" },
    { type: "system", content: "              |___________________________|" },
    { type: "system", content: "            ,---\\_____     []     _______/------," },
    { type: "system", content: "          /         /______________\\           /|" },
    { type: "system", content: "        /___________________________________ /  | ___" },
    { type: "system", content: "        |                                   |   |    )" },
    { type: "system", content: "        |  _ _ _                 [-------]  |   |   (" },
    { type: "system", content: "        |  o o o                 [-------]  |  /    _)_" },
    { type: "system", content: "        |__________________________________ |/     /  /" },
    { type: "system", content: "    /-------------------------------------/|      ( )/" },
    { type: "system", content: "  /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /" },
    { type: "system", content: "/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /" },
    { type: "system", content: "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" },
    { type: "system", content: "" },
    { type: "system", content: 'Type "help" to see available commands.' },
];

const GLITCH_CHARS = "!@#\$%^&*()_+-=[]{}|;:,.<>?/\\~``ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomGlitch(len: number): string {
    let s = "";
    for (let i = 0; i < len; i++) {
        s += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
    return s;
}

function renderContent(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|linkedin\.com\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    
    // First, handle URLs
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (part.match(urlRegex)) {
            let href = part;
            if (part.includes('@') && !part.startsWith('mailto:')) {
                href = `mailto:${part}`;
            } else if (!part.startsWith('http')) {
                href = `https://${part}`;
            }
            return (
                <a 
                    key={i} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline text-primary/80 hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {part}
                </a>
            );
        }
        
        // Then, handle bold within non-URL parts
        const subParts = part.split(boldRegex);
        return subParts.map((sub, j) => {
            if (j % 2 === 1) {
                return <span key={`${i}-${j}`} className="text-primary font-bold">{sub}</span>;
            }
            return sub;
        });
    });
}

// ── Tech icon map ─────────────────────────────────────────────────────────────
const TECH_ICONS: Record<string, string> = {
    "React": "react",
    "TypeScript": "typescript",
    "Vite": "vite",
    "Supabase": "supabase",
    "n8n": "n8n",
    "Ollama": "ollama",
    "Tailwind CSS": "tailwindcss",
    "Python": "python",
    "PyTorch": "pytorch",
    "stable-baselines3": "python",
    "OpenAI Gym": "openai",
    "TensorBoard": "tensorflow",
    "NumPy": "numpy",
    "Flask": "flask",
    "MediaPipe": "google",
    "JavaScript": "javascript",
    "HTML5": "html5",
    "CSS3": "css3",
    "Node.js": "nodedotjs",
    "Express": "express",
    "MongoDB": "mongodb",
    "Axios": "axios",
    "Context API": "react",
    "Next.js": "nextdotjs",
    "Framer Motion": "framer",
    "GitHub API": "github",
    "dotenv": "dotenv",
    "OpenAI DALL-E 2": "openai",
    "PostgreSQL": "postgresql",
    "Pandas": "pandas",
    "Jupyter": "jupyter",
    "HTML": "html5",
    "CSS": "css3",
    "TailwindCSS": "tailwindcss"
};

const HARDCODED_SVGS: Record<string, React.ReactNode> = {
    "openai": (
        <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-white opacity-80" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
        </svg>
    ),
    "css3": (
        <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-white opacity-80" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
        </svg>
    ),
    "html5": (
        <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-white opacity-80" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h9.059l.246-2.614H5.352l.628 7.362h8.058l-.291 3.23-2.738.748-2.784-.748-.198-2.228H5.405l.307 4.542 5.295 1.503 5.312-1.503.626-6.842H8.531z"/>
        </svg>
    ),
    "ollama": (
        <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-white opacity-80" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012z"/>
        </svg>
    ),
    "n8n": (
        <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-white opacity-80" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"/>
        </svg>
    )
};

function formatTechLines(tech: string[]): React.ReactNode[] {
    const PER = 3;
    const lines: React.ReactNode[] = [];
    for (let i = 0; i < tech.length; i += PER) {
        const slice = tech.slice(i, i + PER);
        lines.push(
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 pl-2 my-1" key={i}>
                {slice.map(t => {
                    const slug = TECH_ICONS[t] || "gnubash";
                    return (
                        <div key={t} className="flex items-center gap-2">
                            {HARDCODED_SVGS[slug] ? (
                                HARDCODED_SVGS[slug]
                            ) : (
                                <img 
                                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`} 
                                    className="w-4 h-4 object-contain filter invert opacity-80" 
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                    alt={t} 
                                />
                            )}
                            <span className="text-white opacity-90">{t}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
    return lines;
}

// ── Project data for cat command ─────────────────────────────────────────────
const PROJECT_CAT_DATA: Record<string, {
    title: string; summary: string; tech: string[]; features: string[]; github: string;
}> = {
    "punctual-ai": {
        title: "Punctual.ai",
        summary: "AI-powered HR Attendance System with n8n automation, Ollama LLM & multi-channel notifications.",
        tech: ["React", "TypeScript", "Vite", "Supabase", "n8n", "Ollama", "TailwindCSS"],
        features: [
            "Role-based Admin + Employee dashboards",
            "Automated Excel muster ingestion via n8n",
            "AI attendance analysis with local LLM",
            "Gmail / Slack / Google Calendar notifications",
            "Leave balance tracking & appeal system",
        ],
        github: "https://github.com/lowkeyypal/punctual.ai",
    },
    "ai-platformer-prodigy": {
        title: "AI Platformer Prodigy",
        summary: "Reinforcement learning framework for training AI agents to play Super Mario Bros.",
        tech: ["Python", "PyTorch", "stable-baselines3", "OpenAI Gym", "TensorBoard", "NumPy"],
        features: [
            "PPO & DQN algorithm implementations",
            "gym_super_mario_bros simulation env",
            "Frame stacking & grayscaling preprocessing",
            "Real-time TensorBoard visualization",
            "Scratch & incremental training notebooks",
        ],
        github: "https://github.com/lowkeyypal/ai-platformer-prodigy",
    },
    "pinch-tac-toe": {
        title: "Pinch-Tac-Toe",
        summary: "Real-time Tic-Tac-Toe controlled by hand gestures via webcam and MediaPipe.",
        tech: ["Python", "Flask", "MediaPipe", "JavaScript", "HTML5", "CSS3"],
        features: [
            "Index-finger cursor via webcam",
            "Pinch-to-click gesture for moves",
            "Minimax AI — Easy / Medium / Hard",
            "Persistent score tracking",
            "Undo last move support",
        ],
        github: "https://github.com/lowkeyypal/python-hand-tracking",
    },
    "ai-image-generator": {
        title: "AI Image Generator",
        summary: "Text-to-image app powered by DALL-E 2 with a Node.js/Express REST API backend.",
        tech: ["Node.js", "Express", "OpenAI DALL-E 2", "HTML", "CSS", "JavaScript"],
        features: [
            "Natural language text-to-image generation",
            "REST API wrapping OpenAI endpoint",
            "Vanilla JS frontend, zero dependencies",
            "dotenv for API key management",
        ],
        github: "https://github.com/lowkeyypal/ai-image-generator",
    },
    "expense-tracker": {
        title: "Expense Tracker",
        summary: "Full-stack MERN app for tracking income & expenses with real-time balance updates.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Axios", "Context API"],
        features: [
            "Add transactions with description & amount",
            "Income vs. expense split view",
            "Real-time balance recalculation",
            "Global state via Context API + reducer",
            "Persistent MongoDB storage",
        ],
        github: "https://github.com/lowkeyypal/expense-tracker",
    },
    "portfolio-website": {
        title: "Portfolio Website",
        summary: "Cyberpunk OS portfolio with draggable bash terminal, matrix rain & GitHub API integration.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
        features: [
            "Draggable bash-like terminal",
            "help, whoami, neofetch, status, resume, hack",
            "Live GitHub API status fetching",
            "Cyberpunk Green / Cyber Crimson theming",
            "Matrix rain + cinematic transitions",
        ],
        github: "https://github.com/lowkeyypal/portfolio",
    },
};

export default function Terminal({ isOpen, onClose }: TerminalProps) {
    const [history, setHistory] = useState<HistoryLine[]>(BOOT_LINES);
    const [input, setInput] = useState("");
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [cmdIndex, setCmdIndex] = useState(-1);
    const [isBooting, setIsBooting] = useState(false);
    const [isHaywire, setIsHaywire] = useState(false);

    // ── DVD window-bounce state ───────────────────────────────────────────────
    const [isDvd, setIsDvd] = useState(false);
    const dvdVelRef = useRef<DvdVel>({ vx: 1.6, vy: 1.1 });
    const dvdRafRef = useRef<number | null>(null);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const IDLE_MS = 60_000;

    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setPos(null);
            if (!isBooting) {
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }
    }, [isOpen, isBooting]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    // ── DVD whole-window bounce ───────────────────────────────────────────────
    useEffect(() => {
        if (!isDvd) {
            if (dvdRafRef.current) cancelAnimationFrame(dvdRafRef.current);
            return;
        }
        const TW = 720; const TH = 640;
        const rect = windowRef.current?.getBoundingClientRect();
        let x = rect ? rect.left : window.innerWidth - TW - 24;
        let y = rect ? rect.top  : window.innerHeight - TH - 24;
        const vel = dvdVelRef.current;
        const step = () => {
            x += vel.vx;
            y += vel.vy;
            const maxX = window.innerWidth  - TW;
            const maxY = window.innerHeight - TH;
            if (x <= 0 || x >= maxX) { vel.vx *= -1; x = Math.max(0, Math.min(x, maxX)); }
            if (y <= 0 || y >= maxY) { vel.vy *= -1; y = Math.max(0, Math.min(y, maxY)); }
            setPos({ x, y });
            dvdRafRef.current = requestAnimationFrame(step);
        };
        dvdRafRef.current = requestAnimationFrame(step);
        return () => { if (dvdRafRef.current) cancelAnimationFrame(dvdRafRef.current); };
    }, [isDvd]);

    // ── Idle detection ────────────────────────────────────────────────────────
    const resetIdle = useCallback(() => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        if (isDvd) { setIsDvd(false); setPos(null); }
        if (!isOpen) return;
        idleTimerRef.current = setTimeout(() => setIsDvd(true), IDLE_MS);
    }, [isOpen, isDvd]);

    useEffect(() => {
        if (!isOpen) { setIsDvd(false); if (idleTimerRef.current) clearTimeout(idleTimerRef.current); return; }
        resetIdle();
        return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
    }, [isOpen, resetIdle]);

    useEffect(() => {
        if (!isOpen) return;
        const seen = localStorage.getItem("terminal_seen");
        if (seen) return;
        localStorage.setItem("terminal_seen", "1");
        setIsBooting(true);
        setHistory(BOOT_LINES);
        let alive = true;
        const pushLine = (line: HistoryLine) => {
            if (!alive) return;
            setHistory(prev => {
                if (line.type === "input") {
                    const last = prev[prev.length - 1];
                    if (last?.type === "input") return [...prev.slice(0, -1), line];
                }
                return [...prev, line];
            });
        };
        const run = async () => {
            await new Promise(r => setTimeout(r, 1400));
            if (!alive) return;
            await typewriterSequence(
                [{ type: "input", content: "guest@kunal-pal:~$ help", delay: 0 }],
                pushLine,
                75,
            );
            if (!alive) return;
            await new Promise(r => setTimeout(r, 350));
            const helpLines: Array<{ type: HistoryLine["type"]; content: string }> = [
                { type: "system", content: "" },
                { type: "system", content: "AVAILABLE COMMANDS:" },
                { type: "system", content: "---------------------------------" },
                { type: "system", content: "  help         Show this message" },
                { type: "system", content: "  whoami       About Kunal" },
                { type: "system", content: "  skills       View tech stack" },
                { type: "system", content: "  contact      Get contact info" },
                { type: "system", content: "  resume       Download my resume" },
                { type: "system", content: "  theme        Toggle color theme" },
                { type: "system", content: "  hack         Execute hack" },
                { type: "system", content: "  status       Current project status" },
                { type: "system", content: "  neofetch     System information" },
                { type: "system", content: "  clear        Clear screen" },
                { type: "system", content: "" },
                { type: "system", content: "NAVIGATION:" },
                { type: "system", content: "---------------------------------" },
                { type: "system", content: "  cd projects  Go to projects" },
                { type: "system", content: "  cd info      Go to info page" },
                { type: "system", content: "  cd ..        Go back" },
                { type: "system", content: "  cd /         Return home" },
                { type: "system", content: "" },
                { type: "success", content: "> Now it's your turn. Type a command above" },
                { type: "system", content: "" },
            ];
            for (const l of helpLines) {
                if (!alive) return;
                await new Promise(r => setTimeout(r, 60));
                pushLine(l as HistoryLine);
            }
            if (!alive) return;
            setIsBooting(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        };
        run();
        return () => { alive = false; };
    }, [isOpen]);

    useEffect(() => {
        if (!isHaywire) return;
        let frameCount = 0;
        const totalFrames = 35; // ~3 seconds
        let alive = true;
        const hackPhrases = [
            "INJECTING PAYLOAD.......",
            "BYPASSING FIREWALL......",
            "CRACKING RSA-4096.......",
            "KERNEL PANIC IMMINENT!!",
            "OVERRIDING SUDO........",
            "MEMORY CORRUPTION: 0xFF",
            "ACCESS VIOLATION!!!!!!!",
            "BUFFER OVERFLOW EXPLOIT",
            "SYSTEM COMPROMISED >_<",
            "DECRYPTING VAULT.......",
            "!! CRITICAL FAILURE !!",
            "REROUTING VIA TOR......",
            "TRACEROUTE DETECTED!!!!",
            "CLEARING LOGS..........",
            "UPLOADING EXPLOIT.EXE..",
            "SEGFAULT at 0x00000000.",
            "ROOTKIT INSTALLED......",
            "SUDO STOLEN!!!!!!!!!!!!",
        ];
        const glitchBlock = () => {
            if (!alive || frameCount >= totalFrames) {
                if (alive) {
                    setHistory(prev => [
                        ...prev,
                        { type: "system", content: "----------------------------------------------" },
                        { type: "error", content: "> FATAL ERROR. REDIRECTING TO PAYLOAD SERVER..." },
                        { type: "system", content: "" },
                    ]);
                    setIsHaywire(false);
                    setIsBooting(false);
                    setTimeout(() => {
                        router.push('/getrickrolled');
                    }, 500);
                }
                return;
            }
            const numLines = 3 + Math.floor(Math.random() * 4);
            const newLines: HistoryLine[] = [];
            for (let i = 0; i < numLines; i++) {
                const usePhrase = Math.random() > 0.4;
                const content = usePhrase
                    ? hackPhrases[Math.floor(Math.random() * hackPhrases.length)]
                    : randomGlitch(30 + Math.floor(Math.random() * 40));
                const roll = Math.random();
                const type: HistoryLine["type"] = roll > 0.6 ? "error" : roll > 0.4 ? "success" : "system";
                newLines.push({ type, content });
            }
            setHistory(prev => {
                const trimmed = prev.length > 30 ? prev.slice(prev.length - 20) : prev;
                return [...trimmed, ...newLines];
            });
            frameCount++;
            setTimeout(glitchBlock, 60 + Math.floor(Math.random() * 80));
        };
        glitchBlock();
        return () => { alive = false; };
    }, [isHaywire, router]);
    


    const onDragStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const rect = windowRef.current?.getBoundingClientRect();
        if (!rect) return;
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            origX: pos?.x ?? rect.left,
            origY: pos?.y ?? rect.top,
        };
        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            setPos({
                x: dragRef.current.origX + (ev.clientX - dragRef.current.startX),
                y: dragRef.current.origY + (ev.clientY - dragRef.current.startY),
            });
        };
        const onUp = () => {
            dragRef.current = null;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    }, [pos]);

    const handleCommand = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIdx = Math.min(cmdIndex + 1, cmdHistory.length - 1);
            setCmdIndex(newIdx);
            if (cmdHistory[newIdx] !== undefined) setInput(cmdHistory[newIdx]);
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const newIdx = Math.max(cmdIndex - 1, -1);
            setCmdIndex(newIdx);
            setInput(newIdx === -1 ? "" : (cmdHistory[newIdx] ?? ""));
            return;
        }
        if (e.key === "Tab") {
            e.preventDefault();
            const raw = input.trim();
            if (!raw) return;
            
            const commands = ["help", "whoami", "skills", "contact", "resume", "theme", "status", "neofetch", "clear", "ls", "cat", "cd", "hack"];
            const directories = ["projects", "info", "..", "/"];
            const projects = ["punctual-ai", "ai-platformer-prodigy", "pinch-tac-toe", "ai-image-generator", "expense-tracker", "portfolio-website", "info", "index"];
            
            if (raw.startsWith("cd ")) {
                const term = raw.substring(3);
                const match = directories.find(d => d.startsWith(term));
                if (match) setInput("cd " + match);
            } else if (raw.startsWith("ls ")) {
                const term = raw.substring(3);
                const match = directories.find(d => d.startsWith(term));
                if (match) setInput("ls " + match);
            } else if (raw.startsWith("cat ")) {
                const term = raw.substring(4).replace(".md", "");
                const match = projects.find(p => p.startsWith(term));
                if (match) setInput("cat " + match);
            } else {
                const match = commands.find(c => c.startsWith(raw));
                if (match) setInput(match);
            }
            return;
        }
        // Any key press resets idle DVD timer
        resetIdle();
        if (e.key !== "Enter") return;

        const rawInput = input.trim();
        const cmd = rawInput.toLowerCase();
        let newHistory = [...history];
        newHistory.push({ type: "input", content: "guest@kunal-pal:~$ " + rawInput });

        if (!rawInput) {
            setHistory(newHistory);
            setInput("");
            return;
        }

        if (cmd === "help") {
            newHistory.push({ type: "system", content: "" });
            newHistory.push({ type: "system", content: "AVAILABLE COMMANDS:" });
            newHistory.push({ type: "system", content: "---------------------------------" });
            newHistory.push({ type: "system", content: "  help         Show this message" });
            newHistory.push({ type: "system", content: "  whoami       About Kunal" });
            newHistory.push({ type: "system", content: "  skills       View tech stack" });
            newHistory.push({ type: "system", content: "  contact      Get contact info" });
            newHistory.push({ type: "system", content: "  resume       Download my resume" });
            newHistory.push({ type: "system", content: "  theme        Toggle color theme" });
            newHistory.push({ type: "system", content: "  hack         Execute hack" });
            newHistory.push({ type: "system", content: "  status       Current project status" });
            newHistory.push({ type: "system", content: "  neofetch     System information" });
            newHistory.push({ type: "system", content: "  clear        Clear screen" });
            newHistory.push({ type: "system", content: "  ls           List files" });
            newHistory.push({ type: "system", content: "  cat <file>   Read file content" });
            newHistory.push({ type: "system", content: "" });
            newHistory.push({ type: "system", content: "NAVIGATION:" });
            newHistory.push({ type: "system", content: "---------------------------------" });
            newHistory.push({ type: "system", content: "  cd projects  Go to projects" });
            newHistory.push({ type: "system", content: "  cd info      Go to info page" });
            newHistory.push({ type: "system", content: "  cd ..        Go back" });
            newHistory.push({ type: "system", content: "  cd /         Return home" });
            newHistory.push({ type: "system", content: "" });
        } else if (cmd === "whoami") {
            newHistory.push({ type: "system", content: "" });

            catArt.forEach(line => newHistory.push({ 
                type: "system", 
                content: <div className="text-[11px] leading-[11px] whitespace-pre select-none">{line}</div> 
            }));
            newHistory.push({ type: "system", content: "" });
            newHistory.push({ type: "success", content: "> KUNAL PAL" });
            newHistory.push({ type: "system", content: "  Full-stack builder & AI tinkerer." });
            newHistory.push({ type: "system", content: "  Crafting digital experiences." });
            newHistory.push({ type: "system", content: "  Specializing in Web Dev & AI integration." });
            newHistory.push({ type: "system", content: "" });
        } else if (cmd === "skills") {
            newHistory.push({ type: "system", content: "" });
            newHistory.push({ type: "success", content: "> TECH STACK:" });
            newHistory.push({ type: "system", content: "  Languages  ->  Python, JavaScript, Golang, C++, Java" });
            newHistory.push({ type: "system", content: "  Frontend   ->  React, Next.js, HTML/CSS" });
            newHistory.push({ type: "system", content: "  Backend    ->  Node.js, Express, Django, Flask" });
            newHistory.push({ type: "system", content: "  Data/AI    ->  Pandas, NumPy, TensorFlow, PyTorch" });
            newHistory.push({ type: "system", content: "  AI/ML      ->  ML, Reinforcement Learning, OpenAI" });
            newHistory.push({ type: "system", content: "  DevOps     ->  Docker, Kubernetes, Git, Linux, Bash" });
            newHistory.push({ type: "system", content: "  Databases  ->  PostgreSQL, MongoDB, Supabase" });
            newHistory.push({ type: "system", content: "  CS Core    ->  DSA, OS, DBMS, Networking" });
            newHistory.push({ type: "system", content: "  Other      ->  n8n, Google APIs" });
            newHistory.push({ type: "system", content: "" });
        } else if (cmd === "contact") {
            newHistory.push({ type: "system", content: "" });
            newHistory.push({ type: "success", content: "> CONTACT:" });
            newHistory.push({ type: "system", content: "  Email     ->  iamkunal79@gmail.com" });
            newHistory.push({ type: "system", content: "  GitHub    ->  github.com/lowkeyypal" });
            newHistory.push({ type: "system", content: "  LinkedIn  ->  linkedin.com/in/kunal-pal3" });
            newHistory.push({ type: "system", content: "" });
        } else if (cmd === "theme") {
            const isLight = document.documentElement.classList.contains("light-mode");
            if (isLight) {
                document.documentElement.classList.remove("light-mode");
                newHistory.push({ type: "success", content: "Restoring MATRIX GREEN protocol..." });
            } else {
                document.documentElement.classList.add("light-mode");
                newHistory.push({ type: "success", content: "Switching to CYBER CRIMSON protocol..." });
            }
        } else if (cmd === "hack") {
            newHistory.push({ type: "system", content: "" });
            newHistory.push({ type: "error", content: "!! INITIATING hack !!" });
            newHistory.push({ type: "system", content: "----------------------------------------------" });
            newHistory.push({ type: "system", content: "WARNING: SYSTEM GOING HAYWIRE..." });
            newHistory.push({ type: "system", content: "" });
            setHistory(newHistory);
            setInput("");
            setCmdHistory(prev => rawInput ? [rawInput, ...prev] : prev);
            setCmdIndex(-1);
            setIsBooting(true);
            setIsHaywire(true);
            return;

        } else if (cmd === "status") {
            setCmdHistory(prev => rawInput ? [rawInput, ...prev] : prev);
            setCmdIndex(-1);
            setInput("");
            setIsBooting(true);

            let currentHistory: HistoryLine[] = [
                ...history,
                { type: "input", content: "guest@kunal-pal:~$ " + rawInput },
                { type: "system", content: "" },
                { type: "success", content: "> Pinging GitHub API for latest activity..." }
            ];
            setHistory(currentHistory);

            const fetchStatus = async () => {
                try {
                    const res = await fetch("https://api.github.com/users/lowkeyypal/repos?sort=updated&per_page=1");
                    if (!res.ok) throw new Error("API Error");
                    const data = await res.json();
                    
                    if (data && data.length > 0) {
                        const repo = data[0];
                        let lastCommitMsg = "No recent commits.";
                        try {
                            const commitsRes = await fetch(`https://api.github.com/repos/lowkeyypal/${repo.name}/commits?per_page=1`);
                            if (commitsRes.ok) {
                                const commitsData = await commitsRes.json();
                                if (commitsData && commitsData.length > 0) {
                                    lastCommitMsg = commitsData[0].commit.message.split('\n')[0];
                                }
                            }
                        } catch (e) {}

                        currentHistory = [
                            ...currentHistory,
                            { type: "system", content: (
                                <div className="flex">
                                    <span className="w-[18ch] shrink-0 text-primary opacity-80">  Latest Project:</span>
                                    <span className="flex-1 whitespace-pre-wrap break-words text-primary">{repo.name}</span>
                                </div>
                            ) },
                            { type: "system", content: (
                                <div className="flex">
                                    <span className="w-[18ch] shrink-0 text-primary opacity-80">  Description:</span>
                                    <span className="flex-1 whitespace-pre-wrap break-words text-primary">{repo.description || "No description provided."}</span>
                                </div>
                            ) },
                            { type: "system", content: (
                                <div className="flex">
                                    <span className="w-[18ch] shrink-0 text-primary opacity-80">  Last Update:</span>
                                    <span className="flex-1 whitespace-pre-wrap break-words text-primary">{new Date(repo.updated_at).toLocaleString()}</span>
                                </div>
                            ) },
                            { type: "system", content: (
                                <div className="flex">
                                    <span className="w-[18ch] shrink-0 text-primary opacity-80">  Last Commit:</span>
                                    <span className="flex-1 whitespace-pre-wrap break-words text-primary">{lastCommitMsg}</span>
                                </div>
                            ) },
                            { type: "system", content: (
                                <div className="flex">
                                    <span className="w-[18ch] shrink-0 text-primary opacity-80">  URL:</span>
                                    <span className="flex-1 whitespace-pre-wrap break-words text-primary">
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-white transition-colors">
                                            {repo.html_url}
                                        </a>
                                    </span>
                                </div>
                            ) },
                            { type: "system", content: "" }
                        ];
                    } else {
                        currentHistory = [
                            ...currentHistory,
                            { type: "error", content: "  No public repositories found." },
                            { type: "system", content: "" }
                        ];
                    }
                } catch (e) {
                    currentHistory = [
                        ...currentHistory,
                        { type: "error", content: "  Failed to fetch status from GitHub." },
                        { type: "system", content: "" }
                    ];
                }
                setHistory(currentHistory);
                setIsBooting(false);
                setTimeout(() => inputRef.current?.focus(), 50);
            };
            fetchStatus();
            return;
        } else if (cmd === "neofetch") {
            const isLight = document.documentElement.classList.contains("light-mode");
            const themeName = isLight ? "Cyber Crimson" : "Cyberpunk Green";
            const neofetchArt = [
                "       .-----------------------.",
                "       | /-------------------\\ |",
                "       | |                   | |",
                "       | |   **KUNAL_PAL_OS**    | |",
                "       | |   v2.0.4          | |",
                "       | |                   | |",
                "       | \\___________________/ |",
                "       |_______________________|",
                "     ,---\\_____     []    ____/---.",
                "   /         /____________\\       /|",
                "  /_______________________________/ |",
                "  |                               | |",
                "  |  _ _ _             [-----]    | /",
                "  |_______________________________|/"
            ];
            
            const info = [
                `**guest@kunal-pal-os**`,
                `------------------`,
                `**OS**:     KUNAL_PAL_OS v2.0.4`,
                `**Host**:   Portfolio Terminal`,
                `**Kernel**: Next.js 14.2.3`,
                `**Shell**:  bash (custom)`,
                `**Theme**:  ${themeName}`,
                `**Stack**:  Next.js + TypeScript`,
            ];

            newHistory.push({ type: "system", content: "" });
            const artWidth = 32; // Fixed width for alignment
            for (let i = 0; i < Math.max(neofetchArt.length, info.length); i++) {
                let artLine = neofetchArt[i] || "";
                // Pad artLine to artWidth manually since it contains bold markers
                const visibleArtLength = artLine.replace(/\*\*/g, "").length;
                const padding = " ".repeat(Math.max(0, artWidth - visibleArtLength));
                
                const infoLine = info[i] || "";
                newHistory.push({ type: "system", content: `${artLine}${padding}  ${infoLine}` });
            }
            newHistory.push({ type: "system", content: "" });
        } else if (cmd === "exit") {
            onClose();
        } else if (cmd.startsWith("ls")) {
            const parts = cmd.split(" ");
            const target = parts[1] ? parts[1].replace(/\/$/, "") : "";
            
            if (!target) {
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  projects/   info/" });
                newHistory.push({ type: "system", content: "" });
            } else if (target === "projects") {
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  punctual-ai.md" });
                newHistory.push({ type: "success", content: "  ai-platformer-prodigy.md" });
                newHistory.push({ type: "success", content: "  pinch-tac-toe.md" });
                newHistory.push({ type: "success", content: "  ai-image-generator.md" });
                newHistory.push({ type: "success", content: "  expense-tracker.md" });
                newHistory.push({ type: "success", content: "  portfolio-website.md" });
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "system", content: "  Tip: cat <name> to read a project" });
                newHistory.push({ type: "system", content: "" });
            } else if (target === "info") {
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  info.md" });
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "system", content: "  Tip: cat info to read it" });
                newHistory.push({ type: "system", content: "" });
            } else {
                newHistory.push({ type: "error", content: `ls: cannot access '${target}': No such file or directory` });
            }
        } else if (cmd.startsWith("cat ")) {
            const target = cmd.substring(4).trim().replace(".md", "");
            const project = PROJECT_CAT_DATA[target];
            if (project) {
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: `> ${project.title}` });
                newHistory.push({ type: "system", content: "─".repeat(40) });
                newHistory.push({ type: "system", content: (
                    <div className="whitespace-pre-wrap break-words pl-2 text-primary opacity-90">
                        {project.summary}
                    </div>
                ) });
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  TECH STACK" });
                formatTechLines(project.tech).forEach(l => newHistory.push({ type: "system", content: l }));
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  FEATURES" });
                project.features.forEach(f => newHistory.push({ type: "system", content: (
                    <div className="whitespace-pre-wrap break-words pl-4 text-primary opacity-90">
                        • {f}
                    </div>
                ) }));
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  GITHUB" });
                newHistory.push({ type: "system", content: `  ${project.github}` });
                newHistory.push({ type: "system", content: "" });
            } else if (target === "info") {
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "> info.md" });
                newHistory.push({ type: "system", content: "─".repeat(40) });
                newHistory.push({ type: "success", content: "  ABOUT" });
                newHistory.push({ type: "system", content: (
                    <div className="whitespace-pre-wrap break-words pl-2 text-primary opacity-90">
                        Web developer from Delhi. Full-stack builder & AI tinkerer.
                        Crafting digital experiences with Web Dev & AI integration.
                    </div>
                ) });
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  EDUCATION" });
                newHistory.push({ type: "system", content: "  BCA — Guru Gobind Singh Indraprastha University (2021–2024)" });
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  EXPERIENCE" });
                newHistory.push({ type: "system", content: "  Software Developer (Intern) — Rthetapi (Aug–Nov 2024)" });
                newHistory.push({ type: "system", content: "  Summer Training in MERN Stack (May–Aug 2023)" });
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "  LINKS" });
                newHistory.push({ type: "system", content: "  🐙 github.com/lowkeyypal" });
                newHistory.push({ type: "system", content: "  💼 linkedin.com/in/kunal-pal3" });
                newHistory.push({ type: "system", content: "  ✉️ iamkunal79@gmail.com" });
                newHistory.push({ type: "system", content: "" });
            } else if (target === "index" || target === "index.md") {
                newHistory.push({ type: "system", content: "" });
                newHistory.push({ type: "success", content: "> index.md" });
                newHistory.push({ type: "system", content: "─".repeat(40) });
                newHistory.push({ type: "system", content: "  KUNAL_PAL_OS v2.0.4 — Cyberpunk Portfolio" });
                newHistory.push({ type: "system", content: "  Type 'help' for commands or 'cd projects' to browse." });
                newHistory.push({ type: "system", content: "" });
            } else {
                newHistory.push({ type: "error", content: `cat: ${target}: No such file or directory` });
                newHistory.push({ type: "system", content: "  Available: punctual-ai • ai-platformer-prodigy • pinch-tac-toe" });
                newHistory.push({ type: "system", content: "  Available: ai-image-generator • expense-tracker • portfolio-website • info" });
            }
        } else if (cmd === "resume" || cmd === "open resume.pdf") {
            setCmdHistory(prev => rawInput ? [rawInput, ...prev] : prev);
            setCmdIndex(-1);
            setInput("");
            setIsBooting(true);

            let currentHistory: HistoryLine[] = [
                ...history,
                { type: "input", content: "guest@kunal-pal:~$ " + rawInput },
                { type: "system", content: "" },
                { type: "success", content: "> Fetching Resume_Kunal_Pal.pdf..." },
                { type: "system", content: "  [                    ] 0%" }
            ];
            setHistory(currentHistory);

            const runResume = async () => {
                const barLength = 20;
                for (let i = 1; i <= barLength; i++) {
                    await new Promise(r => setTimeout(r, 60));
                    const filled = "#".repeat(i);
                    const empty = "-".repeat(barLength - i);
                    const percent = Math.floor((i / barLength) * 100);
                    
                    currentHistory = [...currentHistory];
                    currentHistory[currentHistory.length - 1] = { 
                        type: "system", 
                        content: `  [${filled}${empty}] ${percent}%` 
                    };
                    setHistory(currentHistory);
                }
                
                await new Promise(r => setTimeout(r, 200));
                currentHistory = [
                    ...currentHistory,
                    { type: "success", content: "> Download started. Check your downloads folder." },
                    { type: "system", content: "" }
                ];
                setHistory(currentHistory);
                
                const link = document.createElement("a");
                link.href = "/Resume_Kunal_Pal.pdf";
                link.download = "Resume_Kunal_Pal.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                setIsBooting(false);
                setTimeout(() => inputRef.current?.focus(), 50);
            };
            runResume();
            return;
        } else if (cmd === "oppai" || cmd === "oppai.exe") {
            newHistory.push({ type: "system", content: "" });

            oppaiArt.forEach(line => newHistory.push({ 
                type: "success", 
                content: <div className="text-[11px] leading-[11px] whitespace-pre select-none">{line}</div> 
            }));
            newHistory.push({ type: "system", content: "" });
        } else if (cmd === "clear") {
            newHistory = [];
        } else if (cmd.startsWith("cd ")) {
            const dir = cmd.split(" ").slice(1).join(" ").trim();
            if (dir === "projects" || dir === "./projects") {
                newHistory.push({ type: "success", content: "> Navigating to /projects..." });
                setHistory(newHistory); setInput("");
                setTimeout(() => { router.push("/projects"); }, 600);
                setCmdHistory(prev => [rawInput, ...prev]); setCmdIndex(-1);
                return;
            } else if (dir === "info" || dir === "./info") {
                newHistory.push({ type: "success", content: "> Navigating to /info..." });
                setHistory(newHistory); setInput("");
                setTimeout(() => { router.push("/info"); }, 600);
                setCmdHistory(prev => [rawInput, ...prev]); setCmdIndex(-1);
                return;
            } else if (dir === "/" || dir === "~" || dir === "home") {
                newHistory.push({ type: "success", content: "> Navigating to /..." });
                setHistory(newHistory); setInput("");
                setTimeout(() => { router.push("/"); }, 600);
                setCmdHistory(prev => [rawInput, ...prev]); setCmdIndex(-1);
                return;
            } else if (dir === "..") {
                newHistory.push({ type: "success", content: "> Going back..." });
                setHistory(newHistory); setInput("");
                setTimeout(() => { router.back(); }, 600);
                setCmdHistory(prev => [rawInput, ...prev]); setCmdIndex(-1);
                return;
            } else {
                newHistory.push({ type: "error", content: "bash: cd: " + dir + ": No such file or directory" });
            }
        } else {
            newHistory.push({ type: "error", content: "bash: " + cmd + ": command not found. Type 'help' for available commands." });
        }

        setHistory(newHistory);
        setInput("");
        setCmdHistory(prev => rawInput ? [rawInput, ...prev] : prev);
        setCmdIndex(-1);
        resetIdle();
    }, [input, history, cmdHistory, cmdIndex, router, onClose, resetIdle]);

    const getDefaultStyle = (): React.CSSProperties => {
        if (pos) {
            return { position: "fixed", left: pos.x, top: pos.y };
        }
        return { position: "fixed", right: 24, bottom: 24 };
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={windowRef}
                    initial={{ opacity: 0, scale: 0.92, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 32 }}
                    transition={isDvd ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                    className="hidden sm:block"
                    style={{
                        ...getDefaultStyle(),
                        zIndex: 50,
                        width: "650px",
                        maxWidth: "95vw",
                        userSelect: "none",
                    }}
                    onMouseMove={resetIdle}
                >
                    <div
                        className="flex items-center justify-between bg-[#0d0208] border border-primary/40 border-b-0 rounded-t-lg px-4 py-2 cursor-grab active:cursor-grabbing"
                        onMouseDown={onDragStart}
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={onClose} />
                            <span className="w-3 h-3 rounded-full bg-yellow-500" />
                            <span className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-primary opacity-60 font-mono text-xs tracking-widest select-none">
                            {isDvd ? "⏸ afk mode — move mouse to wake" : "guest@kunal-pal:~"}
                        </span>
                        <button onClick={onClose} className="text-primary/40 hover:text-primary transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div
                        className={"bg-[#0a0a0a]/95 border border-primary/40 border-t-0 rounded-b-lg p-4 font-mono text-sm cursor-text flex flex-col" + (isHaywire ? " border-red-500/60" : "") + (isDvd ? " border-primary/80" : "")}
                        style={{ height: "600px", maxHeight: "80vh" }}
                        onClick={() => { resetIdle(); !isBooting && inputRef.current?.focus(); }}
                    >
                        <div className="flex-1 overflow-y-auto overflow-x-auto whitespace-pre space-y-1 mb-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/30">
                            {history.map((line, i) => (
                                <div
                                    key={i}
                                    className={
                                        line.type === "input" ? "text-white" :
                                            line.type === "success" ? "text-primary" :
                                                line.type === "error" ? "text-red-400" :
                                                    "text-primary opacity-90"
                                    }
                                >
                                    {line.type === "input" && typeof line.content === "string" && line.content.includes("guest@kunal-pal:~$") ? (
                                        <>
                                            <span className="text-primary mr-2">guest@kunal-pal:~$</span>
                                            <span className="text-white">{line.content.split("guest@kunal-pal:~$")[1]}</span>
                                        </>
                                    ) : (
                                        typeof line.content === "string" ? (line.content ? renderContent(line.content) : "\u00A0") : line.content
                                    )}
                                </div>
                            ))}
                            <div ref={endRef} />
                        </div>

                        <div className="flex items-center text-primary border-t border-primary/20 pt-3">
                            <span className="mr-2 shrink-0 text-primary font-bold">guest@kunal-pal:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => { setInput(e.target.value); setCmdIndex(-1); }}
                                onKeyDown={handleCommand}
                                disabled={isBooting}
                                className="flex-1 bg-transparent outline-none border-none text-primary focus:ring-0 p-0 m-0 caret-primary disabled:opacity-50"
                                spellCheck="false"
                                autoComplete="off"
                            />
                            {isBooting && (
                                <span className={"inline-block w-2 h-4 ml-0.5 " + (isHaywire ? "bg-red-400 animate-ping" : "bg-primary animate-pulse")} />
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}