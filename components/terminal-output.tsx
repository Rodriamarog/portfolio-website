import React from "react"

interface TerminalOutputProps {
  output: Array<string | { 
    type: 'svg' | 'image', 
    content: string, 
    background?: string, 
    size?: 'medium' | 'large' 
  }>
}

export function TerminalOutput({ output }: TerminalOutputProps) {
  return (
    <div className="text-green-400 font-mono whitespace-pre-wrap">
      {output.map((item, index) => {
        if (typeof item === 'string') {
          // Process URLs in text
          if (item.includes('http')) {
            const parts = item.split(/(https?:\/\/[^\s]+)/g)
            return (
              <div key={index} className="mb-1">
                {parts.map((part, i) => {
                  if (part.match(/^https?:\/\//)) {
                    return (
                      <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {part}
                      </a>
                    )
                  }
                  return <span key={i}>{part}</span>
                })}
              </div>
            )
          }

          // Highlight command prompt
          if (item.startsWith('rodrigo-amaro@portfolio:~$')) {
            const parts = item.split('$')
            return (
              <div key={index} className="mb-1">
                <span className="text-green-400">{parts[0]}$</span>
                <span className="text-yellow-300">{parts[1]}</span>
              </div>
            )
          }

          // Regular text line
          return <div key={index}>{item}</div>
        } else if (item.type === 'svg') {
          return <div key={index} dangerouslySetInnerHTML={{ __html: item.content }} />
        } else if (item.type === 'image') {
          return (
            <div key={index} className="flex justify-center my-4">
              <div className={item.background ? 'bg-white p-4 rounded-lg' : ''}>
                <img 
                  src={item.content} 
                  className={
                    item.size === 'large' ? 'w-[800px] max-w-full h-auto' :
                    item.size === 'medium' ? 'w-[500px] max-w-full h-auto' :
                    'max-w-[300px] h-auto object-contain'
                  }
                  alt=""
                  style={
                    item.size === 'large' ? { minWidth: '600px' } :
                    item.size === 'medium' ? { minWidth: '400px' } :
                    {}
                  }
                />
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

