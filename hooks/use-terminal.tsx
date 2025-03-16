"use client"

import { useState, useEffect } from "react"

export function useTerminal() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(0)

// Files/content for the terminal
const files = {
  "about.txt": `
=== About Me ===
I'm Rodrigo Amaro, a developer passionate about Linux and technology in general.
I enjoy working with various programming languages and technologies, with experience in Python, JavaScript, Go, and C#.
I'm particularly interested in cybersecurity and cloud computing, always looking to expand my knowledge and skills.
Currently, I'm studying Computer Science at CETYS Universidad while working as a developer.
I'm bilingual, fluent in both English and Spanish.
  `,
  "experience.txt": `
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
  "projects.txt": `
=== Projects ===
Tijuana Border Crossing Wait Times
- Automated Facebook page that posts current wait times for Tijuana-San Diego border crossings
- Built with Python, hosted on AWS Lambda
- Triggered by EventBridge every 15 minutes
- Has active user base with daily interactions
- View the live page: https://www.facebook.com/profile.php?id=61556651472875

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
  "skills.txt": `
=== Technical Skills ===
Languages:
- Python
- JavaScript
- Go
- C#
- Bash scripting

Databases:
- MySQL
- PostgreSQL
- MariaDB
- MSSQL
- Supabase
- Firebase

Frontend/Backend:
- Blazor (C#)
- Various web frameworks

DevOps/Cloud:
- Docker (Windows and Linux containers)
- CI/CD implementation
- Railway
- Render
- Vercel
- AWS (Lambda, EventBridge)
- Google Cloud Platform (GCP)
- Linux administration
  `,
  "contact.txt": `
=== Contact Information ===
Email: rodriamarog@gmail.com
GitHub: https://github.com/Rodriamarog
LinkedIn: https://www.linkedin.com/in/rodrigo-amaro-547133128/

Feel free to reach out for collaboration opportunities or just to chat about technology!
  `,
};

  // Initialize terminal with welcome message
  useEffect(() => {
    const welcomeMessage = [
      "=== Welcome to my Terminal Portfolio ===",
      "",
      "This interactive terminal allows you to explore my portfolio using Unix-like commands.",
      "Type 'help' to see available commands or check the sidebar for quick reference.",
      "",
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
          if (files[fileName as keyof typeof files]) {
            newOutput.push("", files[fileName as keyof typeof files], "")
          } else {
            newOutput.push(`Error: File '${fileName}' not found. Use 'ls' to see available files.`)
          }
        }
        break

      case "clear":
        setOutput([])
        return

      case "about":
        newOutput.push("", files["about.txt"], "")
        break

      case "projects":
        newOutput.push("", files["projects.txt"], "")
        break

      case "experience":
        newOutput.push("", files["experience.txt"], "")
        break

      case "skills":
        newOutput.push("", files["skills.txt"], "")
        break

      case "contact":
        newOutput.push("", files["contact.txt"], "")
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

