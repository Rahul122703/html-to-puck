import { useState } from "react";
// import { compile } from "../../../compiler/src/compiler";
import { compile } from "@html-to-puck/compiler/src/compiler";
import { generateComponent } from "@html-to-puck/compiler/src/generators/components";

function App() {
  const [html, setHtml] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleConvert = async () => {
    const { tree, context } = compile(html);
    const result = await generateComponent(
      "PlaygroundComponent",
      tree,
      context,
    );
    setGeneratedCode(result);
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
      <div className='mx-auto max-w-[1700px] px-6 py-8'>
        {/* Header */}
        <div className='mb-8 flex flex-col gap-3'>
          <span className='w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700'>
            HTML → Puck Converter
          </span>

          <h1 className='text-4xl font-bold tracking-tight text-slate-900'>
            HTML to Puck Playground
          </h1>

          <p className='max-w-3xl text-slate-600'>
            Paste your static HTML, convert it into a fully editable Puck
            ComponentConfig, and inspect the generated TypeScript instantly.
          </p>
        </div>

        {/* Main Layout */}
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
          {/* HTML Panel */}
          <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
              <div>
                <h2 className='text-lg font-semibold text-slate-900'>
                  HTML Input
                </h2>
                <p className='mt-1 text-sm text-slate-500'>
                  Paste the HTML you want to convert.
                </p>
              </div>

              <div className='rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>
                HTML
              </div>
            </div>

            {/* Editor */}
            <div className='p-6'>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder={`<section>
  <h1>Hello World</h1>
  <p>This is my website.</p>
</section>`}
                spellCheck={false}
                className='h-[600px] w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-5 font-mono text-[14px] leading-7 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'
              />

              <div className='mt-5 flex items-center justify-between'>
                <p className='text-sm text-slate-500'>
                  Supports HTML with Tailwind CSS classes.
                </p>

                <button
                  onClick={handleConvert}
                  className='inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]'
                >
                  Convert to Puck
                </button>
              </div>
            </div>
          </section>

          {/* Output Panel */}
          <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
              <div>
                <h2 className='text-lg font-semibold text-slate-900'>
                  Generated Component
                </h2>
                <p className='mt-1 text-sm text-slate-500'>
                  Generated TypeScript ComponentConfig.
                </p>
              </div>

              <div className='rounded-lg bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
                TSX
              </div>
            </div>

            {/* Editor */}
            <div className='p-6'>
              <textarea
                value={generatedCode}
                readOnly
                spellCheck={false}
                placeholder='// Your generated Puck component will appear here...'
                className='h-[656px] w-full resize-none rounded-xl border border-slate-300 bg-slate-900 p-5 font-mono text-[14px] leading-7 text-green-300 outline-none placeholder:text-slate-500'
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
