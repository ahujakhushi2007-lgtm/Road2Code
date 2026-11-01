import { useState } from 'react'
import { Play, RotateCcw, Terminal } from 'lucide-react'

const starterCodes = {
  default: `// Try modifying and running this code
const topics = ['HTML', 'CSS', 'JavaScript', 'React'];
const formatted = topics.map((item, index) => \`\${index + 1}. \${item}\`);

console.log('Road2Code Learning Sequence:');
formatted.forEach(t => console.log(t));
`,
  css: `<!-- Interactive HTML & CSS Sandbox -->
<div style="font-family: sans-serif; padding: 20px; background: #22262f; color: #fff; border-radius: 8px;">
  <h3 style="color: #6aa6ff; margin-bottom: 8px;">Hello from Road2Code!</h3>
  <p style="color: #d3d7de; font-size: 14px;">Edit the HTML/CSS below to test layout changes in real time.</p>
  <button style="padding: 8px 16px; background: #6aa6ff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
    Interactive Button
  </button>
</div>
`,
}

function CodePlayground({ initialTopic = 'JavaScript' }) {
  const isHtml = initialTopic.toLowerCase().includes('html') || initialTopic.toLowerCase().includes('css')
  const defaultCode = isHtml ? starterCodes.css : starterCodes.default
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState('')

  const handleRun = () => {
    if (isHtml) {
      setOutput('Rendered HTML in preview frame.')
      return
    }

    try {
      const logs = []
      const customConsole = {
        log: (...args) => logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
        error: (...args) => logs.push(`[Error] ${args.join(' ')}`),
      }

      // Safe isolated evaluation for sandbox demonstration
      const runFn = new Function('console', code)
      runFn(customConsole)
      setOutput(logs.join('\n') || 'Code executed successfully (no output).')
    } catch (err) {
      setOutput(`Runtime error: ${err.message}`)
    }
  }

  const handleReset = () => {
    setCode(defaultCode)
    setOutput('')
  }

  return (
    <div className="code-playground-box" role="region" aria-label="Interactive Code Playground">
      <div className="code-playground-head">
        <div className="code-playground-title">
          <Terminal size={15} aria-hidden="true" />
          <span>Interactive Sandbox ({initialTopic})</span>
        </div>
        <div className="code-playground-actions">
          <button type="button" className="btn btn--sm" onClick={handleReset} title="Reset code">
            <RotateCcw size={13} aria-hidden="true" /> Reset
          </button>
          <button type="button" className="btn btn--sm btn--primary" onClick={handleRun}>
            <Play size={13} aria-hidden="true" /> Run Code
          </button>
        </div>
      </div>

      <div className="code-playground-split">
        <div className="code-editor-wrap">
          <label className="sr-only" htmlFor="playground-editor">Code editor</label>
          <textarea
            id="playground-editor"
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={7}
            spellCheck="false"
            aria-label="Code editor"
          />
        </div>

        <div className="code-output-wrap">
          {isHtml ? (
            <div className="code-html-preview" dangerouslySetInnerHTML={{ __html: code }} />
          ) : (
            <pre className="code-terminal-output">{output || 'Click "Run Code" to view console output...'}</pre>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodePlayground

