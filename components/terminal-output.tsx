interface TerminalOutputProps {
  output: string[]
}

export function TerminalOutput({ output }: TerminalOutputProps) {
  return (
    <div className="whitespace-pre-wrap">
      {output.map((line, index) => {
        // Check if the line is a command (starts with visitor@portfolio)
        if (line.startsWith("visitor@portfolio")) {
          return (
            <div key={index} className="text-green-500">
              {line}
            </div>
          )
        }

        // Check if the line is a header (surrounded by === or ---)
        else if (line.startsWith("===") || line.startsWith("---")) {
          return (
            <div key={index} className="text-yellow-400 font-bold">
              {line}
            </div>
          )
        }

        // Check if the line is an error message
        else if (line.includes("not found") || line.includes("error")) {
          return (
            <div key={index} className="text-red-500">
              {line}
            </div>
          )
        }

        // Check if the line contains a link
        else if (line.includes("http://") || line.includes("https://")) {
          const parts = line.split(/(https?:\/\/[^\s]+)/)
          return (
            <div key={index} className="text-green-300">
              {parts.map((part, i) => {
                if (part.startsWith("http")) {
                  return (
                    <a
                      key={i}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      {part}
                    </a>
                  )
                }
                return part
              })}
            </div>
          )
        }

        // Default styling for normal text
        else {
          return (
            <div key={index} className="text-green-300">
              {line}
            </div>
          )
        }
      })}
    </div>
  )
}

