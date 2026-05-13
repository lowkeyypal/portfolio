---
type: ProjectLayout
title: AI Platformer Prodigy
colors: colors-a
date: '2024-03-05'
description: >-
  A reinforcement learning framework for training AI agents to play Super Mario Bros using PPO and DQN algorithms with PyTorch and OpenAI Gym.
featuredImage:
  type: ImageBlock
  url: /images/bg2.png
  altText: AI Platformer training screenshot
media:
  type: ImageBlock
  url: /images/bg2.png
  altText: AI Mario agent training
---

## Overview

AI Platformer Prodigy is a sophisticated AI training framework built for Super Mario Bros, leveraging reinforcement learning techniques to create, train, and evaluate intelligent agents within a dynamic game environment. The project uses state-of-the-art algorithms like PPO and DQN, combined with preprocessing pipelines to significantly optimize training efficiency.

## Features

- **Advanced RL Algorithms** — Implements PPO and DQN for optimal agent performance
- **Realistic Simulation** — Full game environment via `gym_super_mario_bros` for comprehensive training
- **Optimized Preprocessing** — Frame stacking and grayscaling to reduce training duration
- **Performance Monitoring** — Integrated TensorBoard logging for real-time training visualization
- **Modular Notebooks** — Separate notebooks for training from scratch and incremental training

## Tech Stack

| Layer | Tools |
|---|---|
| **Simulation Environment** | OpenAI Gym, gym_super_mario_bros, nes_py |
| **Reinforcement Learning** | stable-baselines3 (PPO, DQN) |
| **Deep Learning** | PyTorch, torchvision, torchaudio |
| **Visualization** | Matplotlib, Pygame, TensorBoard |
| **Data Handling** | NumPy, Pandas |

## Screenshots

<img src='/images/mario/sc1.png'>&nbsp;&nbsp;&nbsp;&nbsp;
<img src='/images/mario/sc2.png'>&nbsp;&nbsp;&nbsp;&nbsp;

## Demo

<img src='/images/mario/sc3.gif'>

## GitHub

[github.com/lowkeyypal/ai-platformer-prodigy](https://github.com/lowkeyypal/ai-platformer-prodigy)
