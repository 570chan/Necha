import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  User, Play, Menu, Home, Contact, 
  Heart, Settings, LogOut, Search, 
  PlayCircle, Music, Mic, Clock, Bell, 
  ImageIcon, Pause, RotateCcw, SkipBack, SkipForward,
  CreditCard, BookOpen, BarChart3, Radio, Youtube
} from 'lucide-react';

const MUSIC_URL = "https://upcdn.io/223k2d3/raw/%E3%80%9030%E5%88%86%E8%80%90%E4%B9%85%E3%83%95%E3%83%AA%E3%83%BCBGM%E3%80%91303%20PM%20_%20%E3%81%97%E3%82%83%E3%82%8D%E3%81%86%E3%80%90%E5%85%AC%E5%BC%8F%E3%80%91%20-%20%E3%81%97%E3%82%83%E3%82%8D%E3%81%86%20Sharou.mp3";
const BG_IMAGE_URL = "https://i.ibb.co/4wCD0cCk/IMG-20260419-18220889.jpg";

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const AudioVisualizer = ({ isPlaying, progress, onSeek }) => {
  const bars = [60, 40, 80, 50, 30, 70, 90, 40, 60, 80, 30, 50, 70, 40, 90, 60, 30, 80, 50, 40];
  return (
    <div className="hidden sm:flex items-center space-x-[3px] h-6 px-2 cursor-pointer group/viz">
      {bars.map((height, i) => {
        const barThreshold = (i / bars.length) * 100;
        const isActive = progress >= barThreshold;
        return (
          <div 
            key={i}
            onClick={(e) => { e.stopPropagation(); onSeek(barThreshold); }}
            className={`w-[2px] md:w-[3px] rounded-full transition-all duration-300 ease-out ${isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`}
            style={{ 
              height: `${height}%`,
              transform: isPlaying ? `scaleY(${0.7 + Math.random() * 0.6})` : 'scaleY(1)',
            }}
          />
        );
      })}
    </div>
  );
};

const TopNavBar = ({ isPlaying, progress, currentTime, duration, togglePlay, isVisible, onSeek }) => (
  <div className={`w-full h-14 bg-[#3E3B53]/90 backdrop-blur-md text-white flex items-center justify-between px-4 md:px-6 text-sm fixed top-0 z-50 shadow-md transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
    <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-2 md:px-4 py-1.5 space-x-2 md:space-x-3 cursor-pointer hover:bg-white/20 transition-all">
      <div className="bg-white/20 p-1 rounded-lg"><User size={14} /></div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-[8px] md:text-[10px] tracking-widest uppercase">@NAWSPHIC</span>
        <span className="hidden xs:block text-[8px] text-white/50 font-medium">RANK: 01</span>
      </div>
      <div className="hidden sm:block font-script text-base md:text-lg ml-2 italic text-[#DDE2EF] opacity-90 select-none">Leo/need</div>
    </div>
    <div className="flex items-center space-x-2 md:space-x-6">
      <div className="flex items-center bg-black/20 rounded-full px-3 py-1.5 space-x-2 md:space-x-3">
        <span className="text-[9px] md:text-[10px] font-mono w-auto min-w-[70px] whitespace-nowrap text-center text-white/70">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <AudioVisualizer isPlaying={isPlaying} progress={progress} onSeek={onSeek} />
        <button onClick={togglePlay} className="hover:scale-110 transition-transform active:scale-90">
          {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" />}
        </button>
      </div>
      <Menu size={20} className="cursor-pointer hover:rotate-90 transition-transform" />
    </div>
  </div>
);

const SideNavBar = ({ activeView, setActiveView, onTriggerHeader }) => {
  const navItems = [{ id: 'home', icon: Home }, { id: 'contacts', icon: Contact }, { id: 'favorites', icon: Heart }, { id: 'settings', icon: Settings }];
  const handleNavClick = (id) => {
    setActiveView(id);
    onTriggerHeader();
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-lg flex flex-row items-center justify-around px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-[100] md:left-6 md:top-24 md:bottom-6 md:w-16 md:h-auto md:flex-col md:py-8 md:rounded-full border border-white/40">
      <div onClick={onTriggerHeader} className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform flex-shrink-0 md:mb-10">
        <img src="https://i.ibb.co/5WVkbrNc/avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-row md:flex-1 md:flex-col space-x-4 sm:space-x-10 md:space-x-0 md:space-y-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'text-[#3E3B53] bg-white shadow-sm' : 'text-gray-500 hover:text-[#3E3B53]'}`}>
              <Icon size={22} className={isActive ? 'fill-current' : ''} />
            </button>
          );
        })}
      </div>
      <button className="p-2 text-gray-500 hover:text-red-500 md:mt-auto"><LogOut size={22} /></button>
    </div>
  );
};

const DashboardView = ({ isPlaying, progress, currentTime, duration, togglePlay, isLooping, setIsLooping, onSeek }) => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const cardRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) setIsCardExpanded(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBarClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    onSeek(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <div className="w-full md:ml-28 p-4 sm:p-6 md:p-8 max-w-[1400px] animate-in fade-in duration-700 pb-40 md:pb-8">
      <div className="flex justify-between items-end mb-6">
        <div className="text-white drop-shadow-md text-[10px] md:text-xs tracking-widest font-bold uppercase">Dashboard / <span className="text-white/80">Hoshino Ichika</span></div>
        <div className="hidden xs:flex text-white drop-shadow-md text-[10px] items-center space-x-1 uppercase tracking-tighter"><Clock size={12} /><span>{new Date().toLocaleDateString('vi-VN')}</span></div>
      </div>

      <div className="relative w-full sm:w-2/3 md:w-1/2 mb-8">
        <input type="text" placeholder="Search lessons..." className="w-full bg-white/20 backdrop-blur-md text-white placeholder:text-white/60 rounded-2xl py-2.5 px-6 outline-none shadow-sm border border-white/30 focus:ring-2 ring-white/50 text-sm" />
        <Search className="absolute right-5 top-2.5 text-white/60" size={18} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-8 flex flex-col gap-6 md:gap-8">
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-6 md:p-10 relative shadow-lg h-48 md:h-64 flex flex-col justify-center overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl">
            <div className="w-2/3 md:w-1/2 z-10 relative transition-transform duration-500 group-hover:translate-x-2">
              <div className="text-gray-500 text-[10px] md:text-xs mb-1 font-bold">Project Sekai</div>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-[#3E3B53] leading-tight mb-4 md:mb-6 italic">Welcome!<br/>to our band Leo-need!!!</h1>
              <button className="bg-[#65637B] hover:bg-[#3E3B53] text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold flex items-center space-x-3 transition-all active:scale-95 shadow-lg">
                <span>Play Now</span><PlayCircle size={14} fill="white" />
              </button>
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] w-[50%] md:w-[55%] h-[110%] md:h-[120%] z-20 flex items-end justify-end transition-all duration-700 group-hover:scale-110 group-hover:rotate-2">
               <img src="https://i.ibb.co/j9qXdqNM/taoanhdep-xoa-nen-anh-92883.png" alt="Character" className="max-h-full object-contain object-bottom drop-shadow-2xl" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-4 px-1">
              <div className="flex items-center space-x-2"><BookOpen size={18} className="text-white drop-shadow-sm" /><h2 className="text-white drop-shadow-sm font-bold text-sm md:text-base">New Courses</h2></div>
              <button className="text-white/80 text-[10px] font-bold">view all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[ { title: 'Songwriting &\nArrangement', icon: Music, dur: '4 weeks' }, { title: 'Stage\nPerformance', icon: PlayCircle, dur: '3 weeks' }, { title: 'Recording &\nProduction Basics', icon: Mic, dur: '3 weeks' } ].map((course, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-md rounded-[24px] md:rounded-[32px] p-5 md:p-6 shadow-sm hover:-translate-y-1 transition-all cursor-pointer group border border-white/20">
                  <div className="flex items-start space-x-4 mb-6 md:mb-10">
                    <div className="bg-[#F3F5FA] p-3 rounded-2xl group-hover:bg-[#DDE2EF] transition-colors"><course.icon size={20} className="text-gray-500" /></div>
                    <div className="text-[#3E3B53] font-bold text-xs md:text-sm leading-tight whitespace-pre-line">{course.title}</div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold">Duration: <span className="text-[#3E3B53]">{course.dur}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-all duration-500 border border-white/20">
            <div className="flex-1 mr-6 md:mr-12">
              <div className="text-[10px] md:text-xs text-gray-500 font-bold mb-3 md:mb-4 uppercase tracking-wider">Overall Progress</div>
              <div className="w-full bg-white/50 h-2 md:h-3 rounded-full overflow-hidden">
                <div className="bg-[#595A72] w-[65%] h-full rounded-full transition-all duration-700 group-hover:bg-[#3E3B53] group-hover:w-[75%]"></div>
              </div>
            </div>
            <div className="text-2xl md:text-4xl font-black text-[#3E3B53] transition-transform group-hover:scale-110">65%</div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 px-1"><CreditCard size={16} className="text-white drop-shadow-sm" /><h2 className="text-white drop-shadow-sm font-bold text-sm">Collection Card</h2></div>
            <div ref={cardRef} onClick={() => setIsCardExpanded(!isCardExpanded)} className={`bg-white/80 backdrop-blur-md rounded-[24px] shadow-sm overflow-hidden transition-all duration-500 cursor-pointer border border-white/20 ${isCardExpanded ? 'shadow-xl' : 'hover:shadow-lg hover:-translate-y-1'}`}>
              <div className="p-5 flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-[#3E3B53] text-[13px] font-bold uppercase tracking-tight">Birthday Card</div>
                  <div className="text-gray-500 text-[10px] mt-1 italic">all ways jump! with you</div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 overflow-hidden ml-3 shadow-inner"><img src="https://i.ibb.co/Lz0Y8Y0/Card-Ichika-Birthday.png" alt="Card" className="w-full h-full object-cover" /></div>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isCardExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5 pt-2 border-t border-gray-50 bg-gradient-to-b from-white to-[#F9FAFC]">
                  <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md mb-4"><img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover" alt="Donate" /></div>
                  <div className="text-center"><p className="text-[#3E3B53] text-[10px] font-bold opacity-80">✨ Support me ✨</p><div className="text-[9px] text-gray-500 font-medium mt-1 uppercase tracking-[0.2em] animate-pulse">donate me</div></div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-[24px] p-5 shadow-sm flex justify-between items-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border border-white/20">
              <div className="flex-1">
                <div className="text-[#3E3B53] text-[13px] font-bold uppercase">Member Card</div>
                <div className="text-gray-500 text-[10px] mt-1 italic">Leo/need official member</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 overflow-hidden ml-3"><img src="https://images.unsplash.com/photo-1514525253361-b83f859b73c0?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="Member" /></div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-[32px] shadow-sm overflow-hidden border border-white/20">
              <div className="p-4 md:p-5 flex items-start space-x-4 cursor-pointer hover:bg-white/50 border-b border-gray-100/50">
                 <div className="p-2 bg-[#F3F5FA] rounded-xl"><Clock size={16} className="text-gray-400" /></div>
                 <div className="flex-1"><div className="text-[#3E3B53] text-[11px] font-bold">Band practice starts soon</div><div className="text-gray-500 text-[9px] mt-1">Don't forget your guitar!</div></div>
              </div>

              <div className="p-6 flex flex-col bg-transparent">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`p-3 rounded-2xl transition-all duration-500 ${isPlaying ? 'bg-[#3E3B53] text-white shadow-lg animate-pulse' : 'bg-[#F3F5FA] text-gray-400'}`}><Radio size={20} /></div>
                  <div className="flex-1 min-w-0"><div className="text-[#3E3B53] text-sm font-bold truncate">303 PM</div><div className="text-gray-500 text-[11px] mt-0.5 truncate">Sharou (しゃろう)</div></div>
                </div>
                
                <div className="flex items-center justify-center space-x-8 mb-6 w-full">
                  <button onClick={() => setIsLooping(!isLooping)} className={`transition-colors ${isLooping ? 'text-blue-500' : 'text-gray-400'}`}><RotateCcw size={16} /></button>
                  <button className="text-gray-400 hover:text-[#3E3B53]"><SkipBack size={20} fill="currentColor" /></button>
                  <button onClick={togglePlay} className="w-14 h-14 flex items-center justify-center bg-[#3E3B53] text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl">
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </button>
                  <button className="text-gray-400 hover:text-[#3E3B53]"><SkipForward size={20} fill="currentColor" /></button>
                </div>

                <div className="relative group select-none">
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-2"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
                  <div ref={progressBarRef} onClick={handleBarClick} className="w-full h-2 bg-[#F3F5FA] rounded-full overflow-hidden cursor-pointer relative">
                    <div className="h-full bg-[#3E3B53] transition-all duration-200" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5 flex items-start space-x-4 cursor-pointer hover:bg-white/50 border-t border-gray-100/50">
                 <div className="p-2 bg-[#F3F5FA] rounded-xl"><ImageIcon size={16} className="text-gray-400" /></div>
                 <div className="flex-1"><div className="text-[#3E3B53] text-[11px] font-bold">New Outfit Unlocked</div><div className="text-gray-500 text-[9px] mt-1">Check it out in the wardrobe!</div></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-[24px] p-4 shadow-sm border border-white/20">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100">
                <img src="https://i.ibb.co/VWxCNrCT/899db6193d3e0a7828d58e552546054a.jpg" alt="Feature Preview" className="w-full h-full object-cover" />
              </div>
              <div className="px-1">
                <div className="text-[#3E3B53] text-[13px] font-bold leading-tight">The Beginning of Something New</div>
                <div className="flex items-center space-x-2 mt-1">
                  <Youtube size={12} className="text-red-500" />
                  <span className="text-gray-500 text-[10px] font-medium uppercase tracking-tighter">Most Popular Video</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Khoảng đệm để ko bị SideNavBar che trên mobile */}
      <div className="h-20 md:hidden"></div> 
    </div>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  const triggerHeader = useCallback(() => {
    setIsHeaderVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsHeaderVisible(false), 5000);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      if (isLooping) { audio.currentTime = 0; audio.play(); }
      else { setIsPlaying(false); setProgress(0); setCurrentTime(0); }
    };
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [isLooping]);

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(console.error);
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (percent) => {
    if (!audioRef.current || isNaN(audioRef.current.duration)) return;
    const newTime = (percent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percent);
  };

  return (
    <div className="min-h-screen font-sans pt-14 selection:bg-[#3E3B53] selection:text-white overflow-x-hidden bg-fixed bg-cover bg-center"
         style={{ backgroundImage: `url('${BG_IMAGE_URL}')` }}>
      
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
      
      <TopNavBar isPlaying={isPlaying} progress={progress} currentTime={currentTime} duration={duration} togglePlay={togglePlay} isVisible={isHeaderVisible} onSeek={handleSeek} />
      
      <SideNavBar activeView={activeView} setActiveView={setActiveView} onTriggerHeader={triggerHeader} />
      
      <main className="flex justify-center w-full relative z-10">
        {activeView === 'home' ? (
          <DashboardView isPlaying={isPlaying} progress={progress} currentTime={currentTime} duration={duration} togglePlay={togglePlay} isLooping={isLooping} setIsLooping={setIsLooping} onSeek={handleSeek} />
        ) : (
          <div className="w-full md:ml-28 p-8 min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
            <h2 className="text-xl font-bold text-white drop-shadow-lg opacity-80 uppercase tracking-widest">Section {activeView}</h2>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Dancing+Script:wght@700&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #000; }
        .font-script { font-family: 'Dancing Script', cursive; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #3E3B53; border-radius: 10px; }
      `}} />
    </div>
  );
}
 
