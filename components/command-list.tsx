import { Terminal } from "lucide-react"

export function CommandList() {
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

  return (
    <div className="h-full">
      <div className="flex items-center mb-4">
        <Terminal className="w-5 h-5 mr-2" />
        <h2 className="text-lg font-semibold">Available Commands</h2>
      </div>

      <div className="space-y-2">
        {commands.map((cmd) => (
          <div key={cmd.name} className="p-2 rounded hover:bg-gray-800 transition-colors">
            <div className="font-bold text-yellow-400">{cmd.name}</div>
            <div className="text-sm text-gray-400">{cmd.description}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Tip: Use Tab for command completion</p>
        <p>Tip: Use ↑/↓ arrows for command history</p>
      </div>
    </div>
  )
}

