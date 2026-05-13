---
type: ProjectLayout
title: Pinch-Tac-Toe
colors: colors-a
date: '2024-06-01'
description: >-
  A real-time Tic-Tac-Toe game controlled entirely through hand gestures via your webcam. Uses MediaPipe for hand tracking and Minimax AI with alpha-beta pruning.
featuredImage:
  type: ImageBlock
  url: /images/pinch-tac-toe.png
  altText: Pinch-Tac-Toe game screenshot
  imagePosition: 'left center'
media:
  type: ImageBlock
  url: /images/pinch-tac-toe.png
  altText: Hand gesture Tic-Tac-Toe
---

## Overview

Hand Gesture Tic-Tac-Toe replaces mouse and keyboard with your hand. Using MediaPipe for real-time hand tracking through your webcam, you move the cursor with your index finger and click by pinching — all against an AI opponent powered by the Minimax algorithm with alpha-beta pruning.

## Features

- **Gesture Control** — Move cursor with your index finger, click by pinching thumb and index finger together
- **AI Opponent** — Three difficulty levels (Easy, Medium, Hard) backed by the Minimax algorithm
- **Symbol Choice** — Pick X or O before each game
- **Score Tracking** — Persistent win, loss, and draw counters across rounds
- **Undo Move** — Take back your last placed move
- **Responsive Design** — Adapts to various screen sizes

## How to Play

| Gesture                    | Action                    |
| -------------------------- | ------------------------- |
| Point index finger         | Move the cursor           |
| Pinch thumb + index finger | Click / place your symbol |

## Tech Stack

| Layer             | Tools                                     |
| ----------------- | ----------------------------------------- |
| **Backend**       | Flask, Flask-SocketIO                     |
| **Frontend**      | HTML5, CSS3, JavaScript                   |
| **Hand Tracking** | MediaPipe Hands                           |
| **AI**            | Minimax algorithm with alpha-beta pruning |

## GitHub

[github.com/lowkeyypal/python-hand-tracking](https://github.com/lowkeyypal/python-hand-tracking)
