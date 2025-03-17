import React from "react"

interface TerminalOutputProps {
  output: Array<string | { 
    type: 'svg' | 'image' | 'video',
    content: string, 
    background?: string, 
    size?: 'medium' | 'large',
    speed?: number
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
        } else if (item.type === 'video') {
          // Handle YouTube video embedding
          const videoId = item.content;
          const speed = item.speed || 1;
          
          return (
            <div key={index} className="flex justify-center my-6 w-full">
              <div className="w-full max-w-3xl">
                <iframe 
                  width="100%" 
                  height="400"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&playbackRate=${speed}`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                  style={{ 
                    pointerEvents: 'none' // Prevents interaction with the video
                  }}
                  onLoad={(e) => {
                    // Set playback rate after iframe loads
                    const iframe = e.target as HTMLIFrameElement;
                    if (iframe.contentWindow) {
                      setTimeout(() => {
                        iframe.contentWindow?.postMessage(
                          JSON.stringify({
                            event: 'command',
                            func: 'setPlaybackRate',
                            args: [speed]
                          }), 
                          '*'
                        );
                      }, 1000);
                    }
                  }}
                ></iframe>
              </div>
            </div>
          );
        }
      })}
    </div>
  )
}

