"use client";

import React, { useState, useMemo } from 'react';
import { 
  Mail, Linkedin, Send, User, Building, AtSign, FileText, HelpCircle,
  BookOpen, FileText as FileTextIcon, Video, Podcast as PodcastIcon, ArrowRight, 
  Play, Headphones, ExternalLink, Clock, Calendar, User as UserIcon, Filter,
  ChevronLeft, ChevronRight, X, Newspaper,
} from 'lucide-react';
import { usePodcasts, Podcast } from '@/lib/api/fetch.podcasts';

type InsightType = 'podcasts' | 'articles';

const PODCASTS_PER_PAGE = 6;

/*
  Static articles list — pulled from Matteo's LinkedIn Pulse posts.
  `image` is a placeholder for now; replace with a real thumbnail URL
  whenever you have one, same field, no other code changes needed.
  `fullText` is shown in the popup modal; `link` is the "View on
  LinkedIn" fallback/source link.
*/
type Article = {
  slug: string;
  title: string;
  link: string;
  image: string;
  fullText: string;
};

const ARTICLES: Article[] = [
  {
    slug: 'let-talk-true-wealth',
    title: "Let's Talk About True Wealth",
    link: 'https://www.linkedin.com/pulse/let-talk-true-wealth-matteo-rizzi-d2tle',
    image: '/articles/2.png',
    fullText:
      "In the sky again guys, in a longer than expected flight which of course leads to more thinking and mumbling because there is only so many idle things you can do on a Sunday in August.\n\nI have spent the last four days in a warm little simple house in the middle of Italy countryside nearby my place, not exactly a crowded place, but believe you me we made it so with 7 adults and 11 teenagers sharing two bathrooms and a very cozy long table, playing a series of games together divided in four teams, where parents and children are mixed up and end up competing with unsuspected eagerness to win.\n\nGames vary between arch shooting, volleyball, basketball free shots, a little like our very own Olympic Games. It has been going for five years now, and it s my third one, my family being a late joiner of this happy crowd (coming from my sister's former faculty mates whom I know as well for decades).\n\nVery long intro, right? And not sure if you see the connection with the title of the post: it is not easy to find time to actually play with your children. Not just because of agenda sync, but also for lack of purpose, logistic, or the right context. In the past three months we also took the time for our first long haul trip together, ending up exploring Vietnam for few days, choosing on purpose a country where none of us had set foot on before.\n\nI know that the sentence \"building memories together\" sounds cheesy and soulless, but believe me it goes very deep when I think about it, considering also the couple of weeks spent - working remotely - at my parents place, where of course the dynamics are very different, yet the mindfulness and the gratitude for that type of time spent are very similar.\n\nI have already wrote about how it feels to be both a parent and a full time son (meaning without any need to babysit your parents, to a degree) when you are so close to the third time of your life, and every year of this gift that Life brings looks like a blessing I do feel privileged to have. And I mean that.\n\nWith this, it comes also some sort of fear. Fear of the ineluctable, of something that might unbalance forever this golden balance, or the simple acknowledgement that life throws curve balls all the time, and eventually they will come.\n\nSometimes I don't know how to deal, fully, with that. You can't leave in fear for something that eventually could happen and you have no control over it, no matter how mindful and over careful you might be with you and your loved ones. At the same time, I am sure there is a way to equip your mind and soul with the right assets in order to deal with whatever happens, and that training is each and everyone's responsibility.\n\nAn age has come for me where you just need to look around and see there are so many reasons to be grateful just for being able to write this post (not because I believe is a work of art, but simply because of the circumstances that allowed me to be in the right mindset to do so).\n\nThere is something else I have discovered as well: when I look at the sources of fulfilment, happiness, energy, peace and contentment that makes my life beautiful, I already see they have the following in common:\n\nthey never change, potentially, and you can carry them forever. They are infinite.\nthey all start (no exception) within myself and the way I decide to influence my own perception of what surrounds me\nthey are free\n\nI feel like there is a lot of work to do on my side, still, to be honest. I am still too attached to status, external recognition, some sort of fame, and the perception of \"loosing the grip\" especially when your work is built on your own brand. That is my fragility, the one I don't mind to expose, even if I have not completely figured out how to truly set myself free.\n\nI will finished with little story that just happened to me: during these three days in the mountains, the last evening we decided to listen to a sample of teenagers that cooked pizza for all 18 of us using a single owen, highjacking the kitchen for the whole evening, and leaving an epic mess that really looked discouraging. Adults were talking deeply about a doctors related subject (as families) and all the kids sat down and started a role game.\n\nI knew we had to leave early the day after so … I took a stab and clean up 90% of the whole kitchen by myself, and went to bed whilst both groups were still engaging in their own activities.\n\nI didn't think anyone noticed, because the entropy of such a large group somehow always ends up making any job done. The day after, once everyone returned home, my sister says \"hey brother, thanks for cleaning up yesterday, we were really relieved when we saw at 1am that we didn't need to clean anymore\". I almost already forgot about it, but hearing that a gesture you made brought a smile to people you care … it mattered.\n\nAnd all of a sudden I realised how many of these gestures (thinking of my parents to start with) gets unnoticed or taken for granted, and appreciated a lot the lesson that 90 minutes cleaning an hopeless kitchens brought me.\n\nTraining your noticing, your array of feelings, your attention, the way you express your love. I hope now the connection with the title is clearer.\n\nRebelliously yours\n\nMatteo",
  },
  {
    slug: 'new-beginnings-way',
    title: 'New Beginnings, in a Way',
    link: 'https://www.linkedin.com/pulse/new-beginnings-way-matteo-rizzi-jh04f',
    image: '/articles/4.png',
    fullText:
      "Looking back to this newsletter series - it has been 4 years now - i decided (what I started) it would have been different from writing what people wanted to read, or stuff about my work pretending I am lecturing or I know better, or even some pseudo business wisdom disguised in a blog post format.\n\nSo I went personal. I want to re-remind myself here and now that this newsletter has TWO main human targets, for now, and I believe only one of them seldomly reads this.\n\nI want my kids to have a trace, as long as I can, into a way to get to know some of my thinking. Of course, needless to say, everyone of the other 3000 people this thing reaches out are not only welcome to read but also to interact.\n\nIf you cared to read the other chapters, you know few things about me, including the fact I meditate daily for quite some time, that I would choose freedom over comfort every day of my life (one of my top 3 Tattoo sentences I would pick), and that my professional life is a portfolio of activities all around content development, coaching, investing (mostly time, and some money), podcasting, and more.\n\nWhan I have an interaction with a human that is either warmly introduced by a dear friend, or simply serendipitly (neologism? don't care) shows up in life, and the \"let's tell our life story\" introductory moment comes up (as it should) and when I listen to myself talking, I realise it might come out as mess. I already wrote about the \"what do you do\" hard to explain question, but in a recent conversation something else came up ...\n\nWhat do I WANT to be? That changed everything. For many reasons. to start with, because I didn't know what to answer.\n\nIt looked like I needed to choose among one of the current things I do. Content Guru for events organisation, the most charismatic moderator and podcaster of the planet, a \"DuoLingo meets keynote speaker\", the best startup pitch coach anyone can hire, or the Talent enabler in Africa, so young students can get the job of their dreams. All of them look appealing to me, to be honest, and not because of the money involved (which varies, of course) or for the \"prestige\" related to that (because I am frankly too old to care), but because they fit into the mindset, expertise and legacy I want to live by.\n\nThis is not easy to convey, though. So maybe I need to find another layer, something that is assembling all these pieces and elevate the \"what do I WANT to be\" in \"how I WANT to be\" perhaps?\n\nI came across a bunch of tools, recently, one of them being the breathwork course from Dan Brule (which I just started). The power of breathing as a meaning to focus, to heal, to get energy, and to reduce anxiety and stress, something most of us overlook. That would be ONE piece of what comes next.\n\nSo i embarked on a journey, with the ultimate goal of helping others to fast track their path to a better version of themselves. Not for money, not for recognition, not for meaningless popularity, but because I believe it's my call. How am I going to do this? Working on myself first, then trying and reiterate, then launch something at the crossway of meditation, coaching, breathing techniques, and self help.\n\nAll of a sudden, adding this layer reconcile a lot of the activities I mentioned earlier, because somehow they all have to do with inspiring people, or trying to at least, as well as creating meaningful connections, and be that energy that helps people manifesting the life they want. Only, this time, much more intentionally.\n\nOn this, I am applying the first lesson that this new pattern has taught me and I am happily sharing with you, and I can tell it's working already: the law of attraction is not about stubbornly repeating the same mantra so that your brain will be conditioned to the reality that will make your desires happen. Gratitude and recognition, feeling of abundance in your life will set your vibes to be able to welcome what will make you happy, in the best possible path, without any expectations, and in a reality you can shape by yourself. Quick tip on this? Do NOT focus on the actual end desired goal. Focus on the journey that enables that, without any attachment to the outcome or any sense of need or urgency.\n\nYou don't get me? it's fine. That's why i am still iterating. But i KNOW it's working for me, and since my first read of \"The power of Positive Thinking\" of Norman Vincent Peale back in 1992 when someone gifted me that book, almost 35 years later, i have been trying to find a way to humbly share my learnings, and now I am determinate to ground it.\n\nso this time, more than ever, stay tuned\n\nRebelliously yours\n\nMatteo",
  },
  {
    slug: 'things-happen-when-you-truly-dont-care',
    title: "Things That Happen When You Truly Don't Care",
    link: 'https://www.linkedin.com/pulse/things-happen-when-you-truly-dont-care-matteo-rizzi-ykuwe',
    image: '/articles/3.png',
    fullText:
      "The subtle art of not giving a f**k, a book I enjoyed a lot, kind of misguided me for a while. I saw this as the rebellious « achieve full freedom » vibe, where nothing touches you, and you only selectively focus on things you truly care for.\n\nNow, it means to me something slightly different, which is also a lifelong way of thinking I have learned: the healthiest (and fastest) way to reach your goals is not to become obsessed by them.\n\nYour happiness, your inner peace, your drive, your motivation have to come from the way you work on yourself, rather than the supposed joy of getting what you want.\n\nSeems like counterintuitive, right?\n\nA lot of visualisation exercises (that I also practiced back in the days) asked you to picture yourself with that « whatever » was the goal you wanted to achieve.\n\n« Imagine your bank account filled with money, you driving the car of your dreams, feel it, as if you had it already » … I, at least, heard it a lot in a bunch of practices practices.\n\nI am not questioning whether this approach is right or wrong, works or doesn't, I am just describing what worked out for me, and how I intentionally stand by in my practice: the only objective, goal, aspiration, is simply to develop such a symbiotic relationship with my higher self to become one, a single entity, spiritually guided.\n\nHow does my higher self talk to me?\n\nWhat does he say?\n\nWhen and how?\n\nThis is an amazing discovery journey, and I can share - as I do, always - how it s working out for me.\n\n« Breath, you are loved »\n\n« Abundance is your birthright »\n\n« Be grateful, you can't do anything wrong. This is the shortest path to achieve what will make you respond to your call »\n\n« If you have the option, be kind, always »\n\nThe Universe talks to each of us in different ways.\n\nAm I sounding delusional, shallow, senseless?\n\nSo be it.\n\nI am sharing (and will keep doing so) a collection of thoughts, practices, beliefs, and attitudes that are actually working for me, simply because it might constitute a call for some of you guys to approach life in a different way.\n\nHow do I know (how can I proof, I can hear some people asking) that is working or has worked for me?\n\nWell, in order to explain that, it needs to go personal, again.\n\nMy dad and I communicate with \"being there for each other\", not with words. Words and feelings are for my mum. This is the relationship they have with me.\n\nMy dad recently, commenting the fact that my sister bought the first house in Germany, where she lives for a while right now, said something that truly resonated: what our kids have done is nothing else than a miracle.\n\nLet's reflect a bit and the feeling I have is \"what were the odds\"?\n\nComing from a small fishers village in Italy, in a family of five with a single basic salary and no estate (meaning my parents paid rent for 30 years) adding also 7 years of (local) economy crisis that made my dad get intermittent and unpredictable income, I reached financial independence before my 50s, without any startup exit, without any sudden heritage, without winning the lottery, just with a very early belief that true freedom was the main asset I needed to realise my dreams. What \"financial independence\" means? simply, being able to live where i like and work on what i love, and support who I care for.\n\nAnd a bit of blessing.\n\nAnd a bit of intuition.\n\nAnd a bit of timing.\n\nAnd a lot of mistakes I learned from.\n\nAnd consciously focusing on investing in myself first.\n\nAnd investing in assets and not liabilities.\n\nAnd more … for another day …\n\nLet me end this post with a self assessment test you can put yourself in and at the same time will allow me to proof a point: for whatever blessed reason, you have one million to invest, and you own nothing (yet): no assets, no house, no cars, and have a simple job just enough to pay the bills and maybe to save a little.\n\nOne million. All of a sudden.\n\nYou have to spend it on you and your loved ones, let the charity out for a second.\n\nI can think of at least three categories of mindset:\n\nyou simply burn it, since \"you only live once\", so as soon as it makes you happy, and until it lasts, it doesn't matter how short sighted is the buy. For while, a significant one, you and the people around you live the best possible life.\nYou want to make a point: so you buy the best possible combination of House and Car, so you and your family can finally be in another league, and elevate yourself. You get that house that makes family super happy, and that Mercedes you always wanted. Money is gone, but you have great things that lasts for a while.\nYou use this as the opportunity to set up your future: the objective is not to get the best house or car that money can buy, but rather the best compromise allowing you to free up from rental and public transportation, then a down payment for two small apartments your can rent out and use debt smartly so you have a steady income (maybe not immediately, but you get the point). Now you are free from rent for life, you have a nice hybrid car to move and you build the foundations for your future.\n\nI know VERY well what my mindset would be and the choice sometimes is more instinctive than you think: it has roots in your past, in your family culture, in the way you were raised.\n\nSo time has come, right now, to finally take an helicopter view on the past 30 years of my life, realising that I was training, focusing, planning, visualising, and \"vibrating\" in a way that today looks way less random than the collection of scattered events I sometimes tend to see.\n\nNow, and every day a bit more, it makes more sense. The next step is sharing. And this (that you are reading) seems like a good place to start.\n\nRebelliously yours\n\nMatteo",
  },
  {
    slug: 'third-time-second-mountain',
    title: 'The Third Time, or the Second Mountain',
    link: 'https://www.linkedin.com/pulse/third-time-second-mountain-matteo-rizzi-7gnje',
    image: '/articles/1.png',
    fullText:
      "I always mentioned that I am approaching my third time, which is an Italian expression translated to English for when a rugby match is over, and it s time to celebrate, or get together, analyse the match, and also swimming in a lot of beers.\n\nI mentioned my intention (and I did start already) to coach adults in this phase of life when you are at least preparing to what's coming next, simply by giving personal growth instruments that worked for me, but also for many others.\n\nThen, a dear friend i unexpectedly reunited with during a party (and I do maybe two of them per year, so the Universe was calling) when I share my plans she said: \"what you really mean is the Second Mountain, read David Brooks book about it\".\n\nAnd she is right.\n\nConcept is very simple: most lives can be described as the sequence of two mountains to climb (and in the middle, of course, a stiff descent): the first mountain is the self-centered one, the one where you push to be somewhat you think is you career goal, your ultimate fulfillment. Some of us never go down from the first mountain, for a very long time … you feel empowered, strong, full of energy and drive.\n\nThen, says Brooks, something happens, an unexpected event, rarely a Damascus mystical show, but more often a loss of someone you love, or a bad career event, or in some cases some physical condition where your body tells you to stop, or worse. Then the descent begins, and with that another set of beliefs starts kicking in.\n\nWhere you are not at the center anymore.\n\nYou realise, at your own pace, that your well being is connected to respond to a greater call, where everyone else but you is at the center. It doesn't need to be about millions of people, it can be about your mum left alone and you taking quality time to be with her, or just helping your community of neighbours, or even simply open your eyes and figure that when you are not obsessed with yourself anymore there are everyday opportunities spanning various timeframes to simply be selfless and find joy in helping others. In your own way.\n\nThe second mountain.\n\nI see it as a climbing and then walking on another plateau, together with others as well. If the first mountain has a peak where there is only space for one person (yourself and your ego, as one), the second mountain is the opposite, the upper part is actually a vast path for many to walk together.\n\nAnd if you allow more metaphor, the path to get to the plateau is actually as diverse as every soul searching for its purpose is.\n\nSo now it gets clearer; I want to help people to get to their second mountain.\n\nI took time to come see my kids where they live and study together, just to be their cook, cleaning partner and a bit of a (willing) ATM. I don't think I ever spent more than 3 weeks without spending quality time together. For sure, part of my healing journey.\n\nIn my second mountain, I am climbing as we speak.\n\nFirst mountain is long gone, I still see few friends posting selfies from the peak, and I wish them all the best. The beauty of the second mountain climbing is that the sender to get there is as rewarding as getting up there. Sometimes you don't even need to walk to get closer, you just stand still, breathe deeply and vibrate at the frequency of the new path.\n\nSo stay tuned, while I figure the best way to help.\n\nRebelliously yours\n\nMatteo",
  },
];

const MediaInsights: React.FC = () => {
  const { data, isLoading, isError, error } = usePodcasts();
  const [activeTab, setActiveTab] = useState<InsightType>('podcasts');
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const podcasts = data?.podcastsdata || [];

  const categories = useMemo(() => {
    const catMap = new Map<number, string>();
    podcasts.forEach(pod => {
      if (pod.podCat && !catMap.has(pod.podCat)) {
        catMap.set(pod.podCat, pod.category_name);
      }
    });
    return Array.from(catMap.entries()).map(([id, name]) => ({ id, name }));
  }, [podcasts]);

  const filteredPodcasts = useMemo(() => {
    if (selectedCategory === 'all') return podcasts;
    return podcasts.filter(pod => pod.podCat === selectedCategory);
  }, [podcasts, selectedCategory]);

  const totalPages = Math.ceil(filteredPodcasts.length / PODCASTS_PER_PAGE);

  const paginatedPodcasts = useMemo(() => {
    const start = (currentPage - 1) * PODCASTS_PER_PAGE;
    return filteredPodcasts.slice(start, start + PODCASTS_PER_PAGE);
  }, [filteredPodcasts, currentPage]);

  const handleFilterChange = (cat: number | 'all') => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleTabChange = (type: InsightType) => {
    setIsTabLoading(true);
    setActiveTab(type);
    setSelectedCategory('all');
    setCurrentPage(1);
    setTimeout(() => setIsTabLoading(false), 300);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getHost = (podcast: Podcast) => podcast.podHost || 'Industry Expert';

  const getTabConfig = (type: InsightType) => ({
    podcasts: { icon: PodcastIcon, label: 'Podcasts', color: 'from-green-500 to-emerald-600' },
    articles: { icon: Newspaper, label: 'Articles', color: 'from-orange-500 to-red-600' },
  }[type]);

  /* ── Pagination Bar ── */
  const PaginationBar = () =>
    totalPages > 1 ? (
      <div className="flex flex-col items-center gap-3 mt-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200 ${
                currentPage === page
                  ? 'bg-primary text-white shadow-lg'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Showing {(currentPage - 1) * PODCASTS_PER_PAGE + 1}–
          {Math.min(currentPage * PODCASTS_PER_PAGE, filteredPodcasts.length)} of {filteredPodcasts.length} podcasts
        </p>
      </div>
    ) : null;

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Knowledge Hub</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4">
              Media & Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Thought leadership, interviews, and expert analysis on fintech, innovation, and the future of finance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-56 bg-gradient-to-r from-gray-300 to-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                  </div>
                  <div className="h-10 bg-gray-300 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Error state ── */
  if (isError) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Podcasts</h3>
            <p className="text-gray-600 mb-4">
              {error?.message || 'There was an error loading the podcast data. Please try again later.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Knowledge Hub</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4">
            Media & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thought leadership, interviews, and expert analysis on fintech, innovation, and the future of finance.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 flex flex-wrap gap-1 justify-center">
            {(['podcasts', 'articles'] as InsightType[]).map((type) => {
              const config = getTabConfig(type);
              const Icon = config.icon;
              const count = type === 'podcasts' ? podcasts.length : ARTICLES.length;
              return (
                <button
                  key={type}
                  onClick={() => handleTabChange(type)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === type
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ARTICLES TAB — 4-column grid, click opens modal
        ══════════════════════════════════════════ */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTICLES.map((article) => (
              <button
                key={article.slug}
                onClick={() => setSelectedArticle(article)}
                className="group text-left bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-lg bg-gradient-to-r from-orange-500 to-red-600">
                    <Newspaper className="w-3 h-3" />
                    Article
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Category Filter Bar — podcasts only */}
        {activeTab === 'podcasts' && categories.length > 0 && (
          <div className="flex justify-center mb-10">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-md border border-white/30 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                All Categories ({podcasts.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.name} ({podcasts.filter(p => p.podCat === cat.id).length})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Podcasts grid */}
        {activeTab === 'podcasts' && (
          isTabLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-56 bg-gradient-to-r from-gray-300 to-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-full" />
                      <div className="h-4 bg-gray-300 rounded w-2/3" />
                    </div>
                    <div className="h-10 bg-gray-300 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPodcasts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PodcastIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Podcasts in this Category</h3>
              <p className="text-gray-500">Try selecting a different category or check back later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPodcasts.map((podcast, index) => (
                  <div
                    key={podcast.podNo || podcast.podId}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={podcast.podImage || 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop'}
                        alt={podcast.podTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600">
                        <PodcastIcon className="w-3 h-3" />
                        Podcast
                      </div>
                      {podcast.category_name && (
                        <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                          {podcast.category_name}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                        {getHost(podcast) && (
                          <>
                            <div className="flex items-center gap-1">
                              <UserIcon className="w-3 h-3" />
                              <span className="font-medium">{getHost(podcast)}</span>
                            </div>
                            <span>•</span>
                          </>
                        )}
                        {podcast.addeddate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(podcast.addeddate)}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {podcast.podTitle}
                      </h3>

                      <p
                        className="text-gray-600 text-sm mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: podcast.podDescription }}
                      />

                      <a
                        href={podcast.podLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group/link"
                      >
                        <Play className="w-4 h-4" />
                        Listen Now
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <PaginationBar />
            </>
          )
        )}
      </div>

      {/* ══════════════════════════════════════════
          ARTICLE MODAL — full text + LinkedIn fallback
      ══════════════════════════════════════════ */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">

            <div className="relative h-48 shrink-0 overflow-hidden rounded-t-3xl">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="absolute bottom-4 left-5 right-5 text-white text-xl font-bold">
                {selectedArticle.title}
              </h2>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {selectedArticle.fullText}
              </p>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-white shrink-0 flex gap-3 rounded-b-3xl">
              <a
                href={selectedArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold bg-primary text-white hover:opacity-90 transition-opacity shadow-lg"
              >
                <ExternalLink className="w-4 h-4" />
                View on LinkedIn
              </a>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaInsights;
