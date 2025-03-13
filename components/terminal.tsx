"use client"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { TerminalOutput } from "@/components/terminal-output"

interface TerminalProps {
  output: string[]
  input: string
  setInput: (input: string) => void
  handleCommand: (command: string) => void
  commandHistory: string[]
  historyIndex: number
}

export function Terminal({ output, input, setInput, handleCommand, commandHistory, historyIndex }: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Focus input when clicking anywhere in the terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  // Handle keyboard events for command history
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length) {
        setInput(commandHistory[commandHistory.length - 1 - historyIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        setInput(commandHistory[commandHistory.length - historyIndex])
      } else {
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Simple tab completion for common commands
      const commands = ["help", "ls", "cat", "clear", "about", "contact", "projects", "experience"]
      const matchingCommand = commands.find((cmd) => cmd.startsWith(input))
      if (matchingCommand) {
        setInput(matchingCommand)
      }
    }
  }

  return (
    <div className="h-full">
      <TerminalOutput output={output} />

      <div className="flex items-center mt-2">
        <span className="text-green-500 mr-2">visitor@portfolio:~$</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none text-green-300 caret-transparent"
            autoFocus
          />
          <div 
            className="absolute top-0 left-0 flex"
            style={{ transform: `translateX(${input.length * 0.6}em)` }}
          >
            <span className={`w-2 h-5 bg-green-500 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

