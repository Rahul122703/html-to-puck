import { useState } from "react";
// import { compile } from "../../../compiler/src/compiler";
import { compile } from "@html-to-puck/compiler/src/compiler";
import { generateComponent } from "@html-to-puck/compiler/src/generators/components";

function App() {
  const [html, setHtml] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    const { tree, context } = compile(html);
    const result = await generateComponent(
      "PlaygroundComponent",
      tree,
      context,
    );
    setGeneratedCode(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedCode) return;

    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <main className='h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100'>
      <div className='flex h-full flex-col p-4 sm:p-5'>
        {/* Compact Top Bar */}
        <header className='mb-4 flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur'>
          <div className='flex items-center gap-3'>
            <div className='rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700'>
              HTML → PUCK
            </div>
            <div className='hidden sm:block'>
              <h1 className='text-sm font-semibold text-slate-900'>
                HTML to Puck Playground
              </h1>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={handleCopy}
              disabled={!generatedCode}
              className='inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={handleConvert}
              className='inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]'
            >
              Convert to Puck
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className='grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-2'>
          {/* HTML Panel */}
          <section className='flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
            <div className='flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-3'>
              <div>
                <h2 className='text-sm font-semibold text-slate-900'>
                  HTML Input
                </h2>
                <p className='text-xs text-slate-500'>Paste your HTML here.</p>
              </div>

              <span className='rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600'>
                HTML
              </span>
            </div>

            <div className='flex min-h-0 flex-1 p-4'>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder={`<section>
  <h1>Hello World</h1>
  <p>This is my website.</p>
</section>`}
                spellCheck={false}
                className='h-full w-full min-h-0 resize-none rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-[14px] leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100/70'
              />
            </div>
          </section>

          {/* Output Panel */}
          <section className='flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
            <div className='flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-3'>
              <div>
                <h2 className='text-sm font-semibold text-slate-900'>
                  Generated Component
                </h2>
                <p className='text-xs text-slate-500'>
                  TypeScript output appears here.
                </p>
              </div>

              <span className='rounded-lg bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700'>
                TSX
              </span>
            </div>

            <div className='flex min-h-0 flex-1 p-4'>
              <textarea
                value={generatedCode}
                readOnly
                spellCheck={false}
                placeholder='// Your generated Puck component will appear here...'
                className='h-full w-full min-h-0 resize-none rounded-xl border border-slate-300 bg-slate-950 p-4 font-mono text-[14px] leading-6 text-emerald-300 outline-none placeholder:text-slate-500'
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
