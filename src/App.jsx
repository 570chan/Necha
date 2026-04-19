import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  User, Play, Menu, Home, Contact, 
  Heart, Settings, LogOut, Search, 
  PlayCircle, Music, Mic, Clock, Bell, 
  ImageIcon, Pause, RotateCcw, SkipBack, SkipForward,
  CreditCard, BookOpen, BarChart3, Radio, Youtube
} from 'lucide-react';

const MUSIC_URL = "https://upcdn.io/223k2d3/raw/%E3%80%9030%E5%88%86%E8%80%90%E4%B9%85%E3%83%95%E3%83%AA%E3%83%BCBGM%E3%80%91303%20PM%20_%20%E3%81%97%E3%82%83%E3%82%8D%E3%81%86%E3%80%90%E5%85%AC%E5%BC%8F%E3%80%91%20-%20%E3%81%97%E3%82%83%E3%82%8D%E3%81%86%20Sharou.mp3";

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  [span_2](start_span)const mins = Math.floor(time / 60);[span_2](end_span)
  [span_3](start_span)const secs = Math.floor(time % 60);[span_3](end_span)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const AudioVisualizer = ({ isPlaying, progress, onSeek }) => {
  [span_4](start_span)const bars = [60, 40, 80, 50, 30, 70, 90, 40, 60, 80, 30, 50, 70, 40, 90, 60, 30, 80, 50, 40];[span_4](end_span)
  return (
    [span_5](start_span)<div className="hidden sm:flex items-center space-x-[3px] h-6 px-2 cursor-pointer group/viz">[span_5](end_span)
      {bars.map((height, i) => {
        [span_6](start_span)const barThreshold = (i / bars.length) * 100;[span_6](end_span)
        [span_7](start_span)const isActive = progress >= barThreshold;[span_7](end_span)
        return (
          <div 
            key={i}
            onClick={(e) => { e.stopPropagation(); onSeek(barThreshold); }}
            [span_8](start_span)className={`w-[2px] md:w-[3px] rounded-full transition-all duration-300 ease-out ${isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`}[span_8](end_span)
            style={{ 
              height: `${height}%`,
              transform: isPlaying ? [span_9](start_span)`scaleY(${0.7 + Math.random() * 0.6})` : 'scaleY(1)',[span_9](end_span)
            }}
          />
        [span_10](start_span));[span_10](end_span)
      })}
    </div>
  );
};

const TopNavBar = ({ isPlaying, progress, currentTime, duration, togglePlay, isVisible, onSeek }) => (
  [span_11](start_span)<div className={`w-full h-14 bg-[#3E3B53] text-white flex items-center justify-between px-4 md:px-6 text-sm fixed top-0 z-50 shadow-md transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>[span_11](end_span)
    [span_12](start_span)<div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-2 md:px-4 py-1.5 space-x-2 md:space-x-3 cursor-pointer hover:bg-white/20 transition-all">[span_12](end_span)
      [span_13](start_span)<div className="bg-white/20 p-1 rounded-lg"><User size={14} /></div>[span_13](end_span)
      <div className="flex flex-col leading-none">
        [span_14](start_span)<span className="font-bold text-[8px] md:text-[10px] tracking-widest uppercase">@NAWSPHIC</span>[span_14](end_span)
        [span_15](start_span)<span className="hidden xs:block text-[8px] text-white/50 font-medium">RANK: 01</span>[span_15](end_span)
      </div>
      [span_16](start_span)<div className="hidden sm:block font-script text-base md:text-lg ml-2 italic text-[#DDE2EF] opacity-90 select-none">Leo/need</div>[span_16](end_span)
    </div>
    [span_17](start_span)<div className="flex items-center space-x-2 md:space-x-6">[span_17](end_span)
      [span_18](start_span)<div className="flex items-center bg-black/20 rounded-full px-3 py-1.5 space-x-2 md:space-x-3">[span_18](end_span)
        <span className="text-[9px] md:text-[10px] font-mono w-auto min-w-[70px] whitespace-nowrap text-center text-white/70">
          {formatTime(currentTime)} / {formatTime(duration)}
        [span_19](start_span)</span>[span_19](end_span)
        [span_20](start_span)<AudioVisualizer isPlaying={isPlaying} progress={progress} onSeek={onSeek} />[span_20](end_span)
        [span_21](start_span)<button onClick={togglePlay} className="hover:scale-110 transition-transform active:scale-90">[span_21](end_span)
          {isPlaying ? [span_22](start_span)<Pause size={14} fill="white" /> : <Play size={14} fill="white" />}[span_22](end_span)
        </button>
      </div>
      [span_23](start_span)<Menu size={20} className="cursor-pointer hover:rotate-90 transition-transform" />[span_23](end_span)
    </div>
  </div>
);

const SideNavBar = ({ activeView, setActiveView, onTriggerHeader }) => {
  [span_24](start_span)const navItems = [{ id: 'home', icon: Home }, { id: 'contacts', icon: Contact }, { id: 'favorites', icon: Heart }, { id: 'settings', icon: Settings }];[span_24](end_span)
  const handleNavClick = (id) => {
    [span_25](start_span)setActiveView(id);[span_25](end_span)
    [span_26](start_span)onTriggerHeader();[span_26](end_span)
  };
  return (
    [span_27](start_span)<div className="fixed bottom-0 left-0 right-0 h-16 bg-[#DDE2EF] flex flex-row items-center justify-around px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-[100] md:left-6 md:top-24 md:bottom-6 md:w-16 md:h-auto md:flex-col md:py-8 md:rounded-full border border-white/20">[span_27](end_span)
      [span_28](start_span)<div onClick={onTriggerHeader} className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform flex-shrink-0 md:mb-10">[span_28](end_span)
        [span_29](start_span)<img src="https://i.ibb.co/5WVkbrNc/avatar.jpg" alt="Profile" className="w-full h-full object-cover" />[span_29](end_span)
      </div>
      [span_30](start_span)<div className="flex flex-row md:flex-1 md:flex-col space-x-4 sm:space-x-10 md:space-x-0 md:space-y-8">[span_30](end_span)
        {navItems.map((item) => {
          [span_31](start_span)const Icon = item.icon;[span_31](end_span)
          [span_32](start_span)const isActive = activeView === item.id;[span_32](end_span)
          return (
            [span_33](start_span)<button key={item.id} onClick={() => handleNavClick(item.id)} className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'text-[#3E3B53] bg-white/50 shadow-sm' : 'text-gray-400 hover:text-[#3E3B53]'}`}>[span_33](end_span)
              <Icon size={22} className={isActive ? [span_34](start_span)'fill-current' : ''} />[span_34](end_span)
            </button>
          );
        [span_35](start_span)})}[span_35](end_span)
      </div>
      [span_36](start_span)<button className="p-2 text-gray-400 hover:text-red-500 md:mt-auto"><LogOut size={22} /></button>[span_36](end_span)
    </div>
  );
};

const DashboardView = ({ isPlaying, progress, currentTime, duration, togglePlay, isLooping, setIsLooping, onSeek }) => {
  [span_37](start_span)const [isCardExpanded, setIsCardExpanded] = useState(false);[span_37](end_span)
  [span_38](start_span)const cardRef = useRef(null);[span_38](end_span)
  [span_39](start_span)const progressBarRef = useRef(null);[span_39](end_span)

  useEffect(() => {
    const handleClickOutside = (event) => {
      [span_40](start_span)if (cardRef.current && !cardRef.current.contains(event.target)) setIsCardExpanded(false);[span_40](end_span)
    };
    [span_41](start_span)document.addEventListener("mousedown", handleClickOutside);[span_41](end_span)
    [span_42](start_span)return () => document.removeEventListener("mousedown", handleClickOutside);[span_42](end_span)
  }, []);

  const handleBarClick = (e) => {
    [span_43](start_span)const rect = progressBarRef.current.getBoundingClientRect();[span_43](end_span)
    [span_44](start_span)onSeek(((e.clientX - rect.left) / rect.width) * 100);[span_44](end_span)
  };

  return (
    [span_45](start_span)<div className="w-full md:ml-28 p-4 sm:p-6 md:p-8 max-w-[1400px] animate-in fade-in duration-700 pb-40 md:pb-8">[span_45](end_span)
      [span_46](start_span)<div className="flex justify-between items-end mb-6">[span_46](end_span)
        [span_47](start_span)<div className="text-gray-400 text-[10px] md:text-xs tracking-widest font-bold uppercase">Dashboard / <span className="text-[#3E3B53]">Hoshino Ichika</span></div>[span_47](end_span)
        [span_48](start_span)<div className="hidden xs:flex text-gray-400 text-[10px] items-center space-x-1 uppercase tracking-tighter"><Clock size={12} /><span>{new Date().toLocaleDateString('vi-VN')}</span></div>[span_48](end_span)
      </div>

      [span_49](start_span)<div className="relative w-full sm:w-2/3 md:w-1/2 mb-8">[span_49](end_span)
        [span_50](start_span)<input type="text" placeholder="Search lessons..." className="w-full bg-[#DDE2EF] text-[#3E3B53] rounded-2xl py-2.5 px-6 outline-none shadow-sm focus:ring-2 ring-[#3E3B53]/10 text-sm" />[span_50](end_span)
        [span_51](start_span)<Search className="absolute right-5 top-2.5 text-gray-400" size={18} />[span_51](end_span)
      </div>

      [span_52](start_span)<div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">[span_52](end_span)
        [span_53](start_span)<div className="md:col-span-8 flex flex-col gap-6 md:gap-8">[span_53](end_span)
          [span_54](start_span)<div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 relative shadow-sm h-48 md:h-64 flex flex-col justify-center overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#3E3B53]/10">[span_54](end_span)
            [span_55](start_span)<div className="w-2/3 md:w-1/2 z-10 relative transition-transform duration-500 group-hover:translate-x-2">[span_55](end_span)
              [span_56](start_span)<div className="text-gray-400 text-[10px] md:text-xs mb-1 font-bold">Project Sekai</div>[span_56](end_span)
              [span_57](start_span)<h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-[#3E3B53] leading-tight mb-4 md:mb-6 italic">Welcome!<br/>to our band Leo-need!!!</h1>[span_57](end_span)
              [span_58](start_span)<button className="bg-[#65637B] hover:bg-[#3E3B53] text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold flex items-center space-x-3 transition-all active:scale-95 shadow-lg">[span_58](end_span)
                [span_59](start_span)<span>Play Now</span><PlayCircle size={14} fill="white" />[span_59](end_span)
              </button>
            </div>
            [span_60](start_span)<div className="absolute right-[-10px] bottom-[-10px] w-[50%] md:w-[55%] h-[110%] md:h-[120%] z-20 flex items-end justify-end transition-all duration-700 group-hover:scale-110 group-hover:rotate-2">[span_60](end_span)
               [span_61](start_span)<img src="https://i.ibb.co/j9qXdqNM/taoanhdep-xoa-nen-anh-92883.png" alt="Character" className="max-h-full object-contain object-bottom drop-shadow-2xl" />[span_61](end_span)
            </div>
          </div>

          <div>
            [span_62](start_span)<div className="flex justify-between items-end mb-4 px-1">[span_62](end_span)
              [span_63](start_span)<div className="flex items-center space-x-2"><BookOpen size={18} className="text-[#3E3B53]" /><h2 className="text-[#3E3B53] font-bold text-sm md:text-base">New Courses</h2></div>[span_63](end_span)
              [span_64](start_span)<button className="text-gray-400 text-[10px] font-bold">view all</button>[span_64](end_span)
            </div>
            [span_65](start_span)<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">[span_65](end_span)
              [span_66](start_span){[ { title: 'Songwriting &\nArrangement', icon: Music, dur: '4 weeks' }, { title: 'Stage\nPerformance', icon: PlayCircle, dur: '3 weeks' }, { title: 'Recording &\nProduction Basics', icon: Mic, dur: '3 weeks' } ].map((course, i) => ([span_66](end_span)
                [span_67](start_span)<div key={i} className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 shadow-sm hover:-translate-y-1 transition-all cursor-pointer group">[span_67](end_span)
                  [span_68](start_span)<div className="flex items-start space-x-4 mb-6 md:mb-10">[span_68](end_span)
                    [span_69](start_span)<div className="bg-[#F3F5FA] p-3 rounded-2xl group-hover:bg-[#DDE2EF] transition-colors"><course.icon size={20} className="text-gray-500" /></div>[span_69](end_span)
                    [span_70](start_span)<div className="text-[#3E3B53] font-bold text-xs md:text-sm leading-tight whitespace-pre-line">{course.title}</div>[span_70](end_span)
                  </div>
                  [span_71](start_span)<div className="text-[10px] text-gray-400 font-bold">Duration: <span className="text-[#3E3B53]">{course.dur}</span></div>[span_71](end_span)
                </div>
              ))}
            </div>
          </div>

          [span_72](start_span)<div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-all duration-500">[span_72](end_span)
            [span_73](start_span)<div className="flex-1 mr-6 md:mr-12">[span_73](end_span)
              [span_74](start_span)<div className="text-[10px] md:text-xs text-gray-400 font-bold mb-3 md:mb-4 uppercase tracking-wider">Overall Progress</div>[span_74](end_span)
              [span_75](start_span)<div className="w-full bg-[#F3F5FA] h-2 md:h-3 rounded-full overflow-hidden">[span_75](end_span)
                [span_76](start_span)<div className="bg-[#595A72] w-[65%] h-full rounded-full transition-all duration-700 group-hover:bg-[#3E3B53] group-hover:w-[75%]"></div>[span_76](end_span)
              </div>
            </div>
            [span_77](start_span)<div className="text-2xl md:text-4xl font-black text-[#3E3B53] transition-transform group-hover:scale-110">65%</div>[span_77](end_span)
          </div>
        </div>

        [span_78](start_span)<div className="md:col-span-4 flex flex-col gap-6 md:gap-8">[span_78](end_span)
          [span_79](start_span)<div className="space-y-4">[span_79](end_span)
            [span_80](start_span)<div className="flex items-center space-x-2 px-1"><CreditCard size={16} className="text-[#3E3B53]" /><h2 className="text-[#3E3B53] font-bold text-sm">Collection Card</h2></div>[span_80](end_span)
            <div ref={cardRef} onClick={() => setIsCardExpanded(!isCardExpanded)} className={`bg-white rounded-[24px] shadow-sm overflow-hidden transition-all duration-500 cursor-pointer ${isCardExpanded ? [span_81](start_span)'shadow-xl' : 'hover:shadow-lg hover:-translate-y-1'}`}>[span_81](end_span)
              [span_82](start_span)<div className="p-5 flex justify-between items-center">[span_82](end_span)
                <div className="flex-1">
                  [span_83](start_span)<div className="text-[#3E3B53] text-[13px] font-bold uppercase tracking-tight">Birthday Card</div>[span_83](end_span)
                  [span_84](start_span)<div className="text-gray-400 text-[10px] mt-1 italic">all ways jump! with you</div>[span_84](end_span)
                </div>
                [span_85](start_span)<div className="w-14 h-14 rounded-2xl bg-blue-50 overflow-hidden ml-3 shadow-inner"><img src="https://i.ibb.co/Lz0Y8Y0/Card-Ichika-Birthday.png" alt="Card" className="w-full h-full object-cover" /></div>[span_85](end_span)
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isCardExpanded ? [span_86](start_span)'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>[span_86](end_span)
                [span_87](start_span)<div className="px-5 pb-5 pt-2 border-t border-gray-50 bg-gradient-to-b from-white to-[#F9FAFC]">[span_87](end_span)
                  [span_88](start_span)<div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md mb-4"><img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover" alt="Donate" /></div>[span_88](end_span)
                  [span_89](start_span)<div className="text-center"><p className="text-[#3E3B53] text-[10px] font-bold opacity-80">✨ Support me ✨</p><div className="text-[9px] text-gray-400 font-medium mt-1 uppercase tracking-[0.2em] animate-pulse">donate me</div></div>[span_89](end_span)
                </div>
              </div>
            </div>

            [span_90](start_span)<div className="bg-white rounded-[24px] p-5 shadow-sm flex justify-between items-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border border-transparent hover:border-[#DDE2EF]">[span_90](end_span)
              [span_91](start_span)<div className="flex-1">[span_91](end_span)
                [span_92](start_span)<div className="text-[#3E3B53] text-[13px] font-bold uppercase">Member Card</div>[span_92](end_span)
                [span_93](start_span)<div className="text-gray-400 text-[10px] mt-1 italic">Leo/need official member</div>[span_93](end_span)
              </div>
              [span_94](start_span)<div className="w-14 h-14 rounded-2xl bg-purple-50 overflow-hidden ml-3"><img src="https://images.unsplash.com/photo-1514525253361-b83f859b73c0?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="Member" /></div>[span_94](end_span)
            </div>
          </div>

          [span_95](start_span)<div className="flex flex-col gap-6">[span_95](end_span)
            [span_96](start_span)<div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-50">[span_96](end_span)
              [span_97](start_span)<div className="p-4 md:p-5 flex items-start space-x-4 cursor-pointer hover:bg-gray-50 border-b border-gray-50">[span_97](end_span)
                 [span_98](start_span)<div className="p-2 bg-[#F3F5FA] rounded-xl"><Clock size={16} className="text-gray-400" /></div>[span_98](end_span)
                 [span_99](start_span)<div className="flex-1"><div className="text-[#3E3B53] text-[11px] font-bold">Band practice starts soon</div><div className="text-gray-400 text-[9px] mt-1">Don't forget your guitar!</div></div>[span_99](end_span)
              </div>

              [span_100](start_span)<div className="p-6 flex flex-col bg-white">[span_100](end_span)
                [span_101](start_span)<div className="flex items-start space-x-4 mb-6">[span_101](end_span)
                  <div className={`p-3 rounded-2xl transition-all duration-500 ${isPlaying ? [span_102](start_span)'bg-[#3E3B53] text-white shadow-lg animate-pulse' : 'bg-[#F3F5FA] text-gray-400'}`}><Radio size={20} /></div>[span_102](end_span)
                  [span_103](start_span)<div className="flex-1 min-w-0"><div className="text-[#3E3B53] text-sm font-bold truncate">303 PM</div><div className="text-gray-400 text-[11px] mt-0.5 truncate">Sharou (しゃろう)</div></div>[span_103](end_span)
                </div>
                
                [span_104](start_span)<div className="flex items-center justify-center space-x-8 mb-6 w-full">[span_104](end_span)
                  <button onClick={() => setIsLooping(!isLooping)} className={`transition-colors ${isLooping ? [span_105](start_span)'text-blue-500' : 'text-gray-300'}`}><RotateCcw size={16} /></button>[span_105](end_span)
                  [span_106](start_span)<button className="text-gray-400 hover:text-[#3E3B53]"><SkipBack size={20} fill="currentColor" /></button>[span_106](end_span)
                  [span_107](start_span)<button onClick={togglePlay} className="w-14 h-14 flex items-center justify-center bg-[#3E3B53] text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl">[span_107](end_span)
                    {isPlaying ? [span_108](start_span)<Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}[span_108](end_span)
                  </button>
                  [span_109](start_span)<button className="text-gray-400 hover:text-[#3E3B53]"><SkipForward size={20} fill="currentColor" /></button>[span_109](end_span)
                </div>

                [span_110](start_span)<div className="relative group select-none">[span_110](end_span)
                  [span_111](start_span)<div className="flex justify-between text-[10px] font-mono text-gray-400 mb-2"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>[span_111](end_span)
                  [span_112](start_span)<div ref={progressBarRef} onClick={handleBarClick} className="w-full h-2 bg-[#F3F5FA] rounded-full overflow-hidden cursor-pointer relative">[span_112](end_span)
                    [span_113](start_span)<div className="h-full bg-[#3E3B53] transition-all duration-200" style={{ width: `${progress}%` }}></div>[span_113](end_span)
                  </div>
                </div>
              </div>

              [span_114](start_span)<div className="p-4 md:p-5 flex items-start space-x-4 cursor-pointer hover:bg-gray-50 border-t border-gray-50">[span_114](end_span)
                 [span_115](start_span)<div className="p-2 bg-[#F3F5FA] rounded-xl"><ImageIcon size={16} className="text-gray-400" /></div>[span_115](end_span)
                 [span_116](start_span)<div className="flex-1"><div className="text-[#3E3B53] text-[11px] font-bold">New Outfit Unlocked</div><div className="text-gray-400 text-[9px] mt-1">Check it out in the wardrobe!</div></div>[span_116](end_span)
              </div>
            </div>

            [span_117](start_span)<div className="bg-white rounded-[24px] p-4 shadow-sm border border-transparent">[span_117](end_span)
              [span_118](start_span)<div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100">[span_118](end_span)
                [span_119](start_span)<img src="https://i.ibb.co/VWxCNrCT/899db6193d3e0a7828d58e552546054a.jpg" alt="Feature Preview" className="w-full h-full object-cover" />[span_119](end_span)
              </div>
              [span_120](start_span)<div className="px-1">[span_120](end_span)
                [span_121](start_span)<div className="text-[#3E3B53] text-[13px] font-bold leading-tight">The Beginning of Something New</div>[span_121](end_span)
                [span_122](start_span)<div className="flex items-center space-x-2 mt-1">[span_122](end_span)
                  [span_123](start_span)<Youtube size={12} className="text-red-500" />[span_123](end_span)
                  [span_124](start_span)<span className="text-gray-400 text-[10px] font-medium uppercase tracking-tighter">Most Popular Video</span>[span_124](end_span)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Khoảng đệm cuối cùng để ko bị SideNavBar che */}
      <div className="h-20 md:hidden"></div> 
    </div>
  );
};

export default function App() {
  [span_125](start_span)const [activeView, setActiveView] = useState('home');[span_125](end_span)
  [span_126](start_span)const [isPlaying, setIsPlaying] = useState(false);[span_126](end_span)
  [span_127](start_span)const [progress, setProgress] = useState(0);[span_127](end_span)
  [span_128](start_span)const [currentTime, setCurrentTime] = useState(0);[span_128](end_span)
  [span_129](start_span)const [duration, setDuration] = useState(0);[span_129](end_span)
  [span_130](start_span)const [isLooping, setIsLooping] = useState(false);[span_130](end_span)
  [span_131](start_span)const [isHeaderVisible, setIsHeaderVisible] = useState(false);[span_131](end_span)
  [span_132](start_span)const audioRef = useRef(null);[span_132](end_span)
  [span_133](start_span)const timeoutRef = useRef(null);[span_133](end_span)

  const triggerHeader = useCallback(() => {
    [span_134](start_span)setIsHeaderVisible(true);[span_134](end_span)
    [span_135](start_span)if (timeoutRef.current) clearTimeout(timeoutRef.current);[span_135](end_span)
    [span_136](start_span)timeoutRef.current = setTimeout(() => setIsHeaderVisible(false), 5000);[span_136](end_span)
  }, []);

  useEffect(() => {
    [span_137](start_span)const audio = audioRef.current;[span_137](end_span)
    if (!audio) return;
    [span_138](start_span)const onLoadedMetadata = () => setDuration(audio.duration);[span_138](end_span)
    const onTimeUpdate = () => {
      [span_139](start_span)setCurrentTime(audio.currentTime);[span_139](end_span)
      [span_140](start_span)setProgress((audio.currentTime / audio.duration) * 100);[span_140](end_span)
    };
    const onEnded = () => {
      if (isLooping) { audio.currentTime = 0; audio.play(); [span_141](start_span)}
      else { setIsPlaying(false); setProgress(0); setCurrentTime(0); }[span_141](end_span)
    };
    [span_142](start_span)audio.addEventListener('loadedmetadata', onLoadedMetadata);[span_142](end_span)
    [span_143](start_span)audio.addEventListener('timeupdate', onTimeUpdate);[span_143](end_span)
    [span_144](start_span)audio.addEventListener('ended', onEnded);[span_144](end_span)
    return () => {
      [span_145](start_span)audio.removeEventListener('loadedmetadata', onLoadedMetadata);[span_145](end_span)
      [span_146](start_span)audio.removeEventListener('timeupdate', onTimeUpdate);[span_146](end_span)
      [span_147](start_span)audio.removeEventListener('ended', onEnded);[span_147](end_span)
    };
  }, [isLooping]);

  const togglePlay = () => {
    [span_148](start_span)if (isPlaying) audioRef.current.pause();[span_148](end_span)
    [span_149](start_span)else audioRef.current.play().catch(console.error);[span_149](end_span)
    [span_150](start_span)setIsPlaying(!isPlaying);[span_150](end_span)
  };

  const handleSeek = (percent) => {
    [span_151](start_span)if (!audioRef.current || isNaN(audioRef.current.duration)) return;[span_151](end_span)
    [span_152](start_span)const newTime = (percent / 100) * audioRef.current.duration;[span_152](end_span)
    [span_153](start_span)audioRef.current.currentTime = newTime;[span_153](end_span)
    [span_154](start_span)setCurrentTime(newTime);[span_154](end_span)
    [span_155](start_span)setProgress(percent);[span_155](end_span)
  };

  return (
    [span_156](start_span)<div className="min-h-screen bg-[#EEF0F5] font-sans pt-14 selection:bg-[#3E3B53] selection:text-white overflow-x-hidden">[span_156](end_span)
      [span_157](start_span)<audio ref={audioRef} src={MUSIC_URL} preload="auto" />[span_157](end_span)
      [span_158](start_span)<TopNavBar isPlaying={isPlaying} progress={progress} currentTime={currentTime} duration={duration} togglePlay={togglePlay} isVisible={isHeaderVisible} onSeek={handleSeek} />[span_158](end_span)
      [span_159](start_span)<SideNavBar activeView={activeView} setActiveView={setActiveView} onTriggerHeader={triggerHeader} />[span_159](end_span)
      [span_160](start_span)<main className={`transition-all duration-500 flex justify-center`}>[span_160](end_span)
        {activeView === 'home' ? (
          <DashboardView isPlaying={isPlaying} progress={progress} currentTime={currentTime} duration={duration} togglePlay={togglePlay} isLooping={isLooping} setIsLooping={setIsLooping} onSeek={handleSeek} />
        ) : (
          [span_161](start_span)<div className="w-full md:ml-28 p-8 min-h-[calc(100vh-3.5rem)] flex items-center justify-center"><h2 className="text-xl font-bold text-[#3E3B53] opacity-40 uppercase tracking-widest">Section {activeView}</h2></div>[span_161](end_span)
        )}
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Dancing+Script:wght@700&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; [span_162](start_span)}
        .font-script { font-family: 'Dancing Script', cursive; }[span_162](end_span)
        ::-webkit-scrollbar { width: 5px; [span_163](start_span)}
        ::-webkit-scrollbar-thumb { background: #3E3B53; border-radius: 10px; }[span_163](end_span)
      `}} />
    </div>
  );
}
 
