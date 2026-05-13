---
type: PageLayout
title: About
colors: colors-a
backgroundImage:
  type: BackgroundImage
  url: /images/infobg.jpg
  backgroundSize: cover
  backgroundPosition: center
  backgroundRepeat: no-repeat
  opacity: 75
sections:
  - elementId: ''
    colors: colors-f
    backgroundSize: full
    text: >-
      ##Welcome to my portfolio! I'm a web developer from Delhi with a passion for creating innovative digital experiences. When I'm not coding, I'm beatboxing, exploring new places, playing video games, or staying updated with the latest tech advancements.
    media:
      type: ImageBlock
      url: /images/about.jpg
      altText: Hero image
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-16
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center
      title:
        textAlign: left
      subtitle:
        textAlign: left
      text:
        textAlign: left
      actions:
        justifyContent: flex-start
    type: HeroSection
  - type: DividerSection
    styles:
      self:
        width: wide
        padding:
          - pt-8
          - pb-8
          - pl-4
          - pr-4
        justifyContent: center
        borderWidth: 1
        borderStyle: solid
  # - type: MediaGallerySection
  #   colors: colors-f
  #   subtitle: 'I worked with these folks:'
  #   images:
  #     - type: ImageBlock
  #       url: /images/logo1.svg
  #       altText: Logo one
  #       caption: Logo one
  #     - type: ImageBlock
  #       url: /images/logo2.svg
  #       altText: Logo two
  #       caption: Logo two
  #     - type: ImageBlock
  #       url: /images/logo3.svg
  #       altText: Logo three
  #       caption: Logo three
  #     - type: ImageBlock
  #       url: /images/logo4.svg
  #       altText: Logo four
  #       caption: Logo four
  #     - type: ImageBlock
  #       url: /images/logo5.svg
  #       altText: Logo five
  #       caption: Logo five
  #   spacing: 3
  #   columns: 5
  #   aspectRatio: auto
  #   showCaption: false
  #   enableHover: false
  #   styles:
  #     self:
  #       width: wide
  #       height: auto
  #       padding:
  #         - pt-8
  #         - pb-8
  #         - pl-4
  #         - pr-4
  #       justifyContent: center
  #       borderRadius: none
  #       borderWidth: 0
  #       borderStyle: none
  #       borderColor: border-dark
  #     title:
  #       textAlign: left
  #     subtitle:
  #       textAlign: left
  # - type: DividerSection
  #   styles:
  #     self:
  #       width: wide
  #       padding:
  #         - pt-8
  #         - pb-8
  #         - pl-4
  #         - pr-4
  #       justifyContent: center
  #       borderWidth: 1
  #       borderStyle: solid
  - type: FeaturedItemsSection
    colors: colors-f
    items:
      - type: FeaturedItem
        actions:
          - type: Link
            label: GitHub
            url: 'https://github.com/lowkeyypal'
        styles:
          self:
            textAlign: left
      - type: FeaturedItem
        actions:
          - type: Link
            label: LinkedIn
            url: 'https://www.linkedin.com/in/kunal-pal3/'
        styles:
          self:
            textAlign: left
    columns: 2
    spacingX: 120
    spacingY: 0
    styles:
      self:
        height: auto
        width: wide
        padding:
          - pt-8
          - pb-8
          - pl-4
          - pr-4
        justifyContent: center
        borderRadius: none
        borderWidth: 0
        borderStyle: none
        borderColor: border-dark
      title:
        textAlign: left
      subtitle:
        textAlign: left
    subtitle: 'You can find me here:'
  - type: DividerSection
    styles:
      self:
        width: wide
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        justifyContent: center
        borderWidth: 1
        borderStyle: solid
  - type: LabelsSection
    colors: colors-f
    subtitle: 'Skills:'
    items:
      - type: Label
        label: Python
      - type: Label
        label: JavaScript
      - type: Label
        label: Golang
      - type: Label
        label: C++
      - type: Label
        label: Java
      - type: Label
        label: React
      - type: Label
        label: Node.js
      - type: Label
        label: Express
      - type: Label
        label: Django
      - type: Label
        label: Flask
      - type: Label
        label: Pandas
      - type: Label
        label: NumPy
      - type: Label
        label: Matplotlib
      - type: Label
        label: TensorFlow
      - type: Label
        label: PyTorch
      - type: Label
        label: OpenAI Gym
      - type: Label
        label: Docker
      - type: Label
        label: Ollama
      - type: Label
        label: n8n
      - type: Label
        label: Kubernetes
      - type: Label
        label: GoogleAPI
      - type: Label
        label: Git
      - type: Label
        label: GitHub
      - type: Label
        label: GNU/Linux
      - type: Label
        label: Bash
      - type: Label
        label: PowerShell
      - type: Label
        label: Supabase
      - type: Label
        label: PostgreSQL
      - type: Label
        label: MongoDB
      - type: Label
        label: MongoDB Atlas
      - type: Label
        label: HTML/CSS
      - type: Label
        label: Data Structures and Algorithms
      - type: Label
        label: Operating Systems
      - type: Label
        label: Database Management Systems
      - type: Label
        label: Computer Networking
      - type: Label
        label: Machine Learning
      - type: Label
        label: AI
      - type: Label
        label: REST API Development
      - type: Label
        label: Reinforcement Learning
      - type: Label
        label: DALL-E 2
  - type: DividerSection
    styles:
      self:
        width: wide
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        justifyContent: center
        borderWidth: 1
        borderStyle: solid
  - type: TextSection
    variant: variant-a
    subtitle: 'Contact:'
    colors: colors-f
    text: |
      [iamkunal79@gmail.com](mailto:iamkunal79@gmail.com)
  - type: DividerSection
    styles:
      self:
        width: wide
        padding:
          - pt-8
          - pb-8
          - pl-4
          - pr-4
        justifyContent: center
        borderWidth: 1
        borderStyle: solid
  - type: FeaturedItemsSection
    colors: colors-f
    items:
      - type: FeaturedItem
        subtitle: 'Experience:'
        text: |-
          **Aug 2024 ‑ Nov 2024**

          * Rthetapi - Software Developer (Intern)

            Engineered a MERN-based admin panel and signup system for an attendance app, optimizing user management efficiency.

            Integrated API servers for real-time monitoring and data visualization, streamlining operational workflows.

            Validated REST API endpoints using Postman, ensuring robust request handling and reliable data responses.

          **May 2023 - August 2023**

          * Summer Training in MERN Stack

        styles:
          self:
            textAlign: left
            padding:
              - pt-0
              - pl-0
              - pb-0
              - pr-0
      - type: FeaturedItem
        subtitle: 'Education:'
        text: |-
          **June 2021 ‑ June2024**

          *  Bachelor in ComputerApplications (BCA)

             Guru Gobind Singh Indraprastha University
             

          **Apr 2009 ‑ Apr 2021**

          *  Rich Harvest Public School
            
             High School
            
             Commerce with Python Programming
        styles:
          self:
            textAlign: left
            padding:
              - pt-0
              - pl-0
              - pb-0
              - pr-0
    columns: 2
    spacingX: 60
    spacingY: 60
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-8
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center
        borderRadius: none
        borderWidth: 0
        borderStyle: none
        borderColor: border-dark
      title:
        textAlign: left
      subtitle:
        textAlign: left
---
