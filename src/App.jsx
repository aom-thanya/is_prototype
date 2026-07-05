import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IS</span>
              </div>
              <span className="font-semibold text-xl text-gray-900">Prototype</span>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 font-medium">Home</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 font-medium">Features</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 font-medium">Resources</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 font-medium">Pricing</a>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-900 font-medium px-3 py-2">Log in</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">Sign up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              What's new
              <span className="ml-2 flex items-center text-blue-600">
                Just shipped v1.0 <span className="ml-1">→</span>
              </span>
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Beautiful UI for your next prototype
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-10 max-w-2xl mx-auto">
            Build faster with our premium components, carefully crafted following the best design systems. Start your next project with confidence.
          </p>
          
          <div className="flex items-center justify-center gap-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors text-lg">
              Get started
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4Z"/></svg>
              View demo
            </button>
          </div>
        </div>
        
        {/* Mockup/Image placeholder */}
        <div className="mt-16 sm:mt-24">
          <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4 mx-auto max-w-5xl">
            <div className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 aspect-[16/9] flex items-center justify-center bg-gray-50 overflow-hidden relative">
              {/* Fake UI inside */}
              <div className="absolute top-0 left-0 w-full h-12 border-b border-gray-200 bg-white flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-gray-400 font-medium">Dashboard Preview</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
