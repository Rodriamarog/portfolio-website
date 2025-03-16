import { Terminal, File } from "lucide-react"
import { useState } from "react"

interface CommandListProps {
  handleCommand: (command: string) => void
}

export function CommandList({ handleCommand }: CommandListProps) {
  const [showFiles, setShowFiles] = useState(false)
  
  const commands = [
    { name: "help", description: "Show available commands" },
    { name: "ls", description: "List all files" },
    { name: "cat [filename]", description: "Display file contents" },
    { name: "clear", description: "Clear the terminal" },
    { name: "about", description: "About me" },
    { name: "projects", description: "View my projects" },
    { name: "experience", description: "My work experience" },
    { name: "skills", description: "My technical skills" },
    { name: "contact", description: "Contact information" },
  ]

  const files = [
    "about.txt",
    "experience.txt",
    "projects.txt",
    "skills.txt",
    "contact.txt"
  ]

  const handleClick = (cmd: string) => {
    // Special handling for cat command
    if (cmd === "cat") {
      setShowFiles(true)
      return
    }
    
    // For other commands, execute directly
    handleCommand(cmd)
    setShowFiles(false)
  }

  const handleFileClick = (file: string) => {
    handleCommand(`cat ${file}`)
    setShowFiles(false)
  }

  return (
    <div className="h-full">
      <div className="flex items-center mb-4">
        <Terminal className="w-5 h-5 mr-2" />
        <h2 className="text-lg font-semibold">Available Commands</h2>
      </div>

      {!showFiles ? (
        <div className="space-y-2">
          {commands.map((cmd) => (
            <div 
              key={cmd.name} 
              className="p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => handleClick(cmd.name.split(" ")[0])}
            >
              <div className="font-bold text-yellow-400">{cmd.name}</div>
              <div className="text-sm text-gray-400">{cmd.description}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="p-2 mb-2">
            <div className="font-bold text-blue-400">Select a file to view:</div>
            <button 
              className="text-sm text-gray-400 mt-2 underline"
              onClick={() => setShowFiles(false)}
            >
              Back to commands
            </button>
          </div>
          
          {files.map((file) => (
            <div 
              key={file} 
              className="p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer flex items-center"
              onClick={() => handleFileClick(file)}
            >
              <File className="w-4 h-4 mr-2 text-green-400" />
              <div className="font-mono text-green-300">{file}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>Tip: Use Tab for command completion</p>
        <p>Tip: Use ↑/↓ arrows for command history</p>
        <p className="mt-2">Tip: Click any command to execute it</p>
      </div>
    </div>
  )
}

