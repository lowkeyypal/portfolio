---
type: ProjectLayout
title: Punctual.ai
colors: colors-a
date: '2025-04-01'
description: >-
  An AI-powered Attendance & HR Management System with automated n8n workflows, Ollama LLM analysis, and multi-channel notifications via Gmail, Slack & Google Calendar.
featuredImage:
  type: ImageBlock
  url: /images/punctual-ai.png
  altText: Punctual.ai dashboard
  imagePosition: 'left center'
media:
  type: ImageBlock
  url: /images/punctual-ai.png
  altText: Punctual.ai HR dashboard
---

## Overview

Punctual.ai is a comprehensive HR attendance automation system that streamlines the entire lifecycle of employee tracking. By leveraging **n8n** workflows to ingest monthly Excel muster reports, the system automatically parses punch-in/punch-out times, classifies daily status codes (Present, Absent, Off, Late Coming), and upserts structured records into a **Supabase PostgreSQL** database.

## Features

### 🖥️ Role-Based Dashboards (React & TypeScript)
- **Admin Dashboard** — Real-time attendance monitoring and comprehensive workforce analytics.
- **Leave Management** — Advanced leave balance tracking powered by Recharts visualizations.
- **Interactive Appeals** — Direct approval or rejection of employee excuse appeals.
- **Employee Portal** — Personal attendance calendar with deterministic status badges.
- **Rich Data Visualizations** — Dynamic bar charts, Donut Quota Rings, and KPI Burn-Down Bars.

### ⚙️ Intelligent Automation (n8n & AI)
- **Automated Ingestion** — Intelligent parsing of Excel muster reports into structured records.
- **AI-Driven Analysis** — Integrated Ollama (local LLM) to analyze employee behavior and identify attendance patterns.
- **Multi-Channel Notifications** — Gmail API, Slack API, and Google Calendar API integration.
- **Workflow Audit Trail** — Timestamped logging system after every significant automation node.
- **Excuse Overrides** — Webhook-based system for manual HR overrides and automated appeal processing.

## Tech Stack

| Layer            | Tools                                      |
| ---------------- | ------------------------------------------ |
| **Frontend**     | React 18, TypeScript, Vite, Tailwind CSS   |
| **Backend/DB**   | Supabase (PostgreSQL), Audit Logging       |
| **Automation**   | n8n Workflows                              |
| **AI Engine**    | Ollama (Llama 3.2:3b)                      |
| **Integrations** | Gmail, Google Calendar, Slack API          |

## GitHub

[github.com/lowkeyypal/punctual.ai](https://github.com/lowkeyypal/punctual.ai)
