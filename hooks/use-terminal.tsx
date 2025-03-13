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
I'm a passionate developer who loves Linux and terminal-based applications.
My journey in software development started with a fascination for how computers work at a fundamental level.
I enjoy building efficient, elegant solutions to complex problems and continuously learning new technologies.

When I'm not coding, you can find me contributing to open-source projects, experimenting with Linux distributions,
or customizing my development environment to perfection.
    `,
    "experience.txt": `
=== Work Experience ===

Senior Software Developer | TechCorp Inc. | 2021 - Present
- Led development of cloud-native applications using modern JavaScript frameworks
- Implemented CI/CD pipelines that reduced deployment time by 40%
- Mentored junior developers and conducted code reviews

Software Developer | Innovate Solutions | 2018 - 2021
- Developed and maintained RESTful APIs for client applications
- Optimized database queries resulting in 30% performance improvement
- Collaborated with cross-functional teams to deliver features on schedule
    `,
    "projects.txt": `
=== Projects ===

Terminal Portfolio Website
- Interactive command-line interface portfolio
- Built with Next.js and Tailwind CSS
- Features custom terminal emulation

Linux System Monitor
- Real-time system resource monitoring tool
- Written in Rust for maximum performance
- Open source: https://github.com/username/system-monitor

Markdown Note Taking App
- Minimalist note-taking application with Markdown support
- Electron-based for cross-platform compatibility
- Features cloud sync and version history
    `,
    "skills.txt": `
=== Technical Skills ===

Languages:
- JavaScript/TypeScript
- Python
- Rust
- Bash scripting

Frontend:
- React/Next.js
- Tailwind CSS
- HTML/CSS

Backend:
- Node.js
- Express
- PostgreSQL
- Docker

DevOps:
- Linux administration
- CI/CD (GitHub Actions, Jenkins)
- AWS/Cloud infrastructure
    `,
    "contact.txt": `
=== Contact Information ===

Email: developer@example.com
GitHub: https://github.com/username
LinkedIn: https://linkedin.com/in/username
Twitter: @devusername

Feel free to reach out for collaboration opportunities or just to chat about technology!
    `,
  }

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
    const newOutput = [...output, `visitor@portfolio:~$ ${cmd}`]

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

