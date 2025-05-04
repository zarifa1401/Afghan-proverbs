import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

type Proverb = {
  id: number;
  textDari: string;
  textPashto: string;
  translationEn: string;
  meaning: string;
  category: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [proverbs, setProverbs] = useState<Proverb[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Proverb[]>([]);

  useEffect(() => {
    fetch('/api/proverbs')
      .then(res => res.json())
      .then(data => setProverbs(data));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/proverbs/search?q=${searchQuery}`);
    setSearchResults(await res.json());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 p-8">
      <Head>
        <title>Afghan Proverbs</title>
      </Head>

      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800">Afghan Proverbs</h1>
        <button
          onClick={() => signIn()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {session ? "Admin Mode" : "Admin Login"}
        </button>
      </header>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in Dari, Pashto, or English..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button 
          type="submit" 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(searchResults.length > 0 ? searchResults : proverbs).map((proverb) => (
          <div key={proverb.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800">{proverb.translationEn}</h2>
            <p className="text-right text-lg mt-2 text-blue-600">{proverb.textDari}</p>
            <p className="text-right text-lg mt-1 text-green-600">{proverb.textPashto}</p>
            <p className="mt-4 text-gray-600">{proverb.meaning}</p>
            <span className="inline-block mt-3 px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">
              {proverb.category}
            </span>
          </div>
        ))}
      </div>

      <button 
        onClick={async () => {
          const res = await fetch('/api/proverbs/random');
          const randomProverb = await res.json();
          alert(`Random Proverb:\n${randomProverb.translationEn}`);
        }}
        className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700"
      >
        ✨ Random Proverb
      </button>
    </div>
  );
}