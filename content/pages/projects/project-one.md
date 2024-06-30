---
type: ProjectLayout
title: AI Image Generator
colors: colors-a
date: '2023-01-01'
description: >-
  Built a web application that creates images from scratch based on user‑provided text. It uses DALL·E 2 to create realistic images.
featuredImage:
  type: ImageBlock
  url: /images/bg3.jpg
  altText: Project thumbnail image
media:
  type: ImageBlock
  url: /images/bg3.jpg
  altText: Project image
---

## Features

- It uses DALL·E 2 to create realistic images and art from a description in natural language.
- Used NodeJS to create a REST API endpoint for fetching the generated image and displaying it on frontend.

## Screenshots

<img src='/images/aiimage/sc1.png'>&nbsp;&nbsp;&nbsp;&nbsp;
<img src='/images/aiimage/sc2.png'>&nbsp;&nbsp;&nbsp;&nbsp;
<img src='/images/aiimage/sc3.png'>

## Tech Used

- OpenAI API
- NodeJS
- Express
- HTML
- CSS
- JS

## Setup

**NOTE:** Use terminal on Windows for this setup.

1. Install Express, OpenAI API and Dotenv

```bash
npm i express openai dotenv
```

2. Create .env file

```
PORT=5000
OPENAI_API_KEY='YOUR_API_KEY'
```

3. Start server

```bash
npm run dev
```

4.  Visit localhost:5000 on your browser
