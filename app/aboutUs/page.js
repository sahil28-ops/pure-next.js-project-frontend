// pages/about.js
import Head from 'next/head';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>About Us</title>
      </Head>

      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            ABOUT US
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Helping businesses<br />
            succeed through the<br />
            power of video.
          </h2>

          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Video is the future of business in this digital-focused world.
            </p>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Vidyard uses video to change the way companies connect and<br />
              communicate. We help organizations of all sizes humanize<br />
              their communications and personalize their customer
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}