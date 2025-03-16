"use client"

import { useState, useEffect } from "react"

// Define types for different file contents
type SVGContent = {
  text: string
  svg: string
}

type ImageContent = {
  text: string
  image: {
    type: 'image'
    content: string
  }
}

type ProjectContent = {
  text: string
  image: {
    type: 'image'
    content: string
  }
  text2: string
  image2: {
    type: 'image'
    content: string
    background: string
  }
}

type SkillsContent = {
  text: string
  svg: string
  text2: string
  svg2: string
  text3: string
  svg4: string
  text4: string
  svg5: string
}

type FileContent = SVGContent | ImageContent | ProjectContent | SkillsContent

// For testing, use absolute URLs
const imageBaseUrl = '/portfolio-website/images/';

const files: Record<string, string | FileContent> = {
  "about.txt": {
    text: `
=== About Me ===
I'm Rodrigo Amaro, a developer passionate about Linux and technology in general.
I enjoy working with various programming languages and technologies, with experience in Python, JavaScript, Go, and C#.
I'm particularly interested in cybersecurity and cloud computing, always looking to expand my knowledge and skills.
Currently, I'm studying Computer Science at CETYS Universidad while working as a developer.
I'm bilingual, fluent in both English and Spanish.
`,
    svg: `<div style="display: flex; gap: 15px; margin: 10px 0;">
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg" />
    </div>`
  },
  "experience.txt": {
    text: `
=== Work Experience ===
Full Stack Developer | Vanguardia Tecnologias | 2024 - Present
- Led the development of enterprise-level Blazor WebAssembly applications, reducing client response times by 35%
- Designed and optimized complex database schemas across multiple platforms (MSSQL, PostgreSQL, MySQL)
- Implemented secure authentication systems and role-based access control for sensitive client applications
- Developed RESTful APIs that handle over 10,000 daily requests with 99.9% uptime
- Created and maintained comprehensive CI/CD pipelines using GitHub Actions, improving deployment efficiency by 40%
- Collaborated with UX/UI designers to implement responsive, accessible interfaces that increased user engagement by 28%
- Performed code reviews and mentored junior developers, resulting in 20% fewer bugs in production
- Integrated third-party services and APIs to extend application functionality while maintaining security best practices
`,
    image: {
      type: 'image',
      content: `${imageBaseUrl}vantec.png`
    }
  },
  "projects.txt": {
    text: `
=== Projects ===
Tijuana Border Crossing Wait Times
- Automated Facebook page that posts current wait times for Tijuana-San Diego border crossings
- Built with Python, hosted on AWS Lambda
- Triggered by EventBridge every 15 minutes
- Has active user base with daily interactions
- View the live page: https://www.facebook.com/profile.php?id=61556651472875
`,
    image: { 
      type: 'image',
      content: `${imageBaseUrl}como-esta-la-linea.png`,
      size: 'large'
    },
    text2: `
AI Book Generation App
- End-to-end solution for book creation from title input
- Generates chapter titles, content, metadata, and cover images using AI
- Formats and outputs books in EPUB and PDF
- Written in Python
- Generates revenue through published books

Neurocrow
- Chatbot application that integrates with business Facebook and Instagram pages
- Answers customer questions using Large Language Models
- Features middleware written in Go hosted on Render
- Implements routing to direct different pages to appropriate chatbots
- Utilizes CI/CD pipelines for both middleware and website
- Visit the website: https://neurocrow.com/
`,
    image2: {
      type: 'image',
      content: `${imageBaseUrl}neurocrow.png`,
      background: 'white'
    }
  },
  "skills.txt": {
    text: `
=== Technical Skills ===

Languages:
- Python
- JavaScript
- Go
- C#
`,
    svg: `<div style="display: flex; gap: 15px; margin: 10px 0;">
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" />
    </div>`,
    text2: `
Databases:
- MySQL
- PostgreSQL
- MariaDB
- MSSQL
- Supabase
- Firebase
`,
    svg2: `<div style="display: flex; gap: 15px; margin: 10px 0;">
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" />
    </div>`,
    text3: `
Frontend/Backend:
- Blazor
- React
- Tailwind CSS
- HTML
`,
    svg4: `<div style="display: flex; gap: 15px; margin: 10px 0;">
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blazor/blazor-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
    </div>`,
    text4: `
DevOps/Cloud:
- Docker (Windows and Linux containers)
- CI/CD implementation
- Railway
- Render
- Vercel
- AWS (Lambda, EventBridge)
- Google Cloud Platform (GCP)
- Linux administration
- Terraform
`,
    svg5: `<div style="display: flex; gap: 15px; margin: 10px 0;">
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" />
    </div>`
  },
  "contact.txt": {
    text: `
=== Contact Information ===
Email: rodrigo.amaro.dev@gmail.com
GitHub: https://github.com/rodrigo-amaro
LinkedIn: https://linkedin.com/in/rodrigo-amaro
`,
    svg: `<div style="display: flex; gap: 15px; margin: 10px 0;">
      <!-- Gmail -->
      <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#D14836"/>
      </svg>
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
      <img width="50" height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" />
    </div>`
  },
};

export function useTerminal() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<Array<string | { type: 'svg' | 'image', content: string, background?: string }>>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Initialize terminal with welcome message
  useEffect(() => {
    const welcomeMessage = [
      "=== Welcome to my Terminal Portfolio ===",
      "",
      "This interactive terminal allows you to explore my portfolio using Unix-like commands.",
      "Type 'help' to see available commands or check the sidebar for quick reference.",
      "",
      { 
        type: 'image', 
        content: '/favicon.ico' // Test with favicon which should definitely exist
      }
    ]
    setOutput(welcomeMessage)
  }, [])

  const handleCommand = (cmd: string) => {
    // Add command to history
    if (cmd.trim() !== "") {
      setCommandHistory((prev) => [...prev, cmd])
      setHistoryIndex(0)
    }

    // Add command to output
    const newOutput = [...output, `rodrigo-amaro@portfolio:~$ ${cmd}`]

    // Process command
    const command = cmd.trim().toLowerCase()
    const args = command.split(" ")
    const primaryCmd = args[0]

    switch (primaryCmd) {
      case "help":
        newOutput.push(
          "",
          "=== Available Commands ===",
          "help        - Show this help message",
          "ls          - List all available files",
          "cat [file]  - Display the contents of a file",
          "clear       - Clear the terminal",
          "about       - Display information about me",
          "projects    - Show my projects",
          "experience  - Show my work experience",
          "skills      - List my technical skills",
          "contact     - Display my contact information",
          "",
        )
        break

      case "ls":
        newOutput.push("", "about.txt", "experience.txt", "projects.txt", "skills.txt", "contact.txt", "")
        break

      case "cat":
        if (args.length < 2) {
          newOutput.push("Error: Please specify a file to read")
        } else {
          const fileName = args[1]
          const fileContent = files[fileName]
          
          if (fileContent) {
            newOutput.push("")
            
            if (typeof fileContent === 'string') {
              newOutput.push(fileContent)
            } else {
              if ('text' in fileContent) newOutput.push(fileContent.text)
              if ('svg' in fileContent) newOutput.push({ type: 'svg', content: fileContent.svg })
              if ('image' in fileContent) newOutput.push({ type: 'image', content: fileContent.image.content })
              if ('text2' in fileContent) newOutput.push(fileContent.text2)
              if ('image2' in fileContent) newOutput.push({ type: 'image', content: fileContent.image2.content, background: fileContent.image2.background })
            }
            
            newOutput.push("")
          } else {
            newOutput.push(`Error: File '${fileName}' not found. Use 'ls' to see available files.`)
          }
        }
        break

      case "clear":
        setOutput([])
        return

      case "about":
        newOutput.push("")
        if (typeof files["about.txt"] === 'object') {
          const aboutFile = files["about.txt"] as any
          newOutput.push(aboutFile.text)
          newOutput.push({ type: 'svg', content: aboutFile.svg })
        }
        newOutput.push("")
        break

      case "projects":
        newOutput.push("")
        if (typeof files["projects.txt"] === 'object') {
          const projectsFile = files["projects.txt"] as ProjectContent
          newOutput.push(projectsFile.text)
          newOutput.push({ 
            type: 'image', 
            content: projectsFile.image.content 
          })
          newOutput.push(projectsFile.text2)
          newOutput.push({ 
            type: 'image', 
            content: projectsFile.image2.content, 
            background: projectsFile.image2.background 
          })
        }
        newOutput.push("")
        break

      case "experience":
        newOutput.push("")
        if (typeof files["experience.txt"] === 'object') {
          const expFile = files["experience.txt"] as ImageContent
          newOutput.push(expFile.text)
          newOutput.push({ 
            type: 'image', 
            content: expFile.image.content 
          })
        }
        newOutput.push("")
        break

      case "skills":
        newOutput.push("")
        if (typeof files["skills.txt"] === 'object') {
          const skillsFile = files["skills.txt"] as any
          newOutput.push(skillsFile.text)
          newOutput.push({ type: 'svg', content: skillsFile.svg })
          newOutput.push(skillsFile.text2)
          newOutput.push({ type: 'svg', content: skillsFile.svg2 })
          newOutput.push(skillsFile.text3)
          newOutput.push({ type: 'svg', content: skillsFile.svg4 })
          newOutput.push(skillsFile.text4)
          newOutput.push({ type: 'svg', content: skillsFile.svg5 })
        }
        newOutput.push("")
        break

      case "contact":
        newOutput.push("")
        if (typeof files["contact.txt"] === 'object') {
          const contactFile = files["contact.txt"] as any
          newOutput.push(contactFile.text)
          newOutput.push({ type: 'svg', content: contactFile.svg })
        }
        newOutput.push("")
        break

      case "":
        // Just add a new line for empty command
        break

      default:
        newOutput.push(`Command not found: ${primaryCmd}. Type 'help' to see available commands.`)
    }

    setOutput(newOutput)
  }

  return {
    input,
    setInput,
    output,
    handleCommand,
    commandHistory,
    historyIndex,
  }
}

