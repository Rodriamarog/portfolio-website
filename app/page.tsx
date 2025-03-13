"use client"

import { useEffect, useRef } from "react"
import { Terminal } from "@/components/terminal"
import { CommandList } from "@/components/command-list"
import { useTerminal } from "@/hooks/use-terminal"

export default function Home() {
  const { input, setInput, history, output, handleCommand, commandHistory, historyIndex } = useTerminal()

  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-black text-green-500 font-mono">
      <div className="w-full md:w-3/4 p-4">
        <div className="flex flex-col h-full">
          <div className="bg-gray-900 rounded-t-lg p-2 flex items-center">
            <div className="mx-auto text-sm text-gray-400">portfolio.sh</div>
            <div className="flex space-x-2 ml-auto">
              <div className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-700">
                <span className="text-xs">_</span>
              </div>
              <div className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-700">
                <span className="text-xs">□</span>
              </div>
              <div className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-700">
                <span className="text-xs">×</span>
              </div>
            </div>
          </div>

          <div ref={terminalRef} className="flex-1 bg-gray-950 p-4 overflow-auto rounded-b-lg">
            <Terminal
              output={output}
              input={input}
              setInput={setInput}
              handleCommand={handleCommand}
              commandHistory={commandHistory}
              historyIndex={historyIndex}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 p-4 bg-gray-900">
        <CommandList />
      </div>
    </main>
  )
}

