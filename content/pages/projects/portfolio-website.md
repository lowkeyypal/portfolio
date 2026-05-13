---
type: ProjectLayout
title: Portfolio Website
colors: colors-a
date: '2025-05-01'
description: >-
  A highly interactive, developer-centric portfolio designed as a retro-futuristic Cyberpunk Operating System. Features a draggable bash terminal, matrix rain, dynamic theming, and GitHub API integration.
featuredImage:
  type: ImageBlock
  url: /images/terminal.png
  altText: Portfolio website screenshot
media:
  type: ImageBlock
  url: /images/portfolio website.png
  altText: Cyberpunk OS Portfolio
---

## Overview

The Cyberpunk OS Portfolio breaks away from traditional web design by immersing visitors in a fully functional, draggable terminal environment. Built for developers and tech enthusiasts, the interface mimics a command-line operating system where users can type commands to navigate pages, fetch GitHub stats, change themes, and interact with the developer's work.

To ensure accessibility, a "Two-Way Mode" architecture guarantees that mobile users receive a sleek, tap-friendly GUI, while desktop users enjoy the full hacking experience.

## Features

- **Interactive OS Terminal** — A fully functional, draggable bash-like terminal that processes user input.
- **Custom Commands** — Run commands like `help`, `whoami`, `neofetch`, `status`, and `resume`.
- **Dynamic Status Checking** — The `status` command fetches live data directly from the GitHub API.
- **Two-Way Mode Architecture** — Desktop users experience the Terminal OS, while mobile users get a responsive navigation UI.
- **Protocol Switching (Theming)** — Toggle between "Cyberpunk Green" (Dark Mode) and "Cyber Crimson" (Light Mode).
- **Cinematic Transitions** — Built with Framer Motion for smooth page loads, terminal booting sequences, and matrix rain.

## OS Commands

| Command    | Action                                                  |
| ---------- | ------------------------------------------------------- |
| `help`     | Lists all available commands                            |
| `whoami`   | Displays developer contact and social links             |
| `status`   | Fetches live project status from GitHub                 |
| `resume`   | Initiates a cinematic download sequence for the resume  |
| `neofetch` | Prints system specifications and current theme protocol |
| `theme`    | Toggles between Dark and Light mode                     |
| `clear`    | Clears the terminal output                              |
| `cd [dir]` | Navigates to `/projects`, `/info`, or `/`               |

## Tech Stack

| Layer             | Tools                           |
| ----------------- | ------------------------------- |
| **Framework**     | Next.js (React)                 |
| **Styling**       | Tailwind CSS, Custom Animations |
| **Interactivity** | Framer Motion                   |
| **Data Fetching** | GitHub REST API                 |

## GitHub

[github.com/lowkeyypal/portfolio](https://github.com/lowkeyypal/portfolio)
