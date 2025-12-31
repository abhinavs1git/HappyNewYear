// script.js
// Complete recreation of the Vercel demo with high-fidelity animations and assets
// Customizations for "Aru" included

const name = "Aru";

// Helper to create the Mac-style window header
const windowHeader = `
  <div class="window-controls">
    <div class="window-control close"></div>
    <div class="window-control minimize"></div>
    <div class="window-control maximize"></div>
  </div>
`;

// Helper for "NO" button logic
let noClickCount = 0;

const scenes = [
    // 0: Landing Page
    {
        html: `
      <div class="window relative max-w-2xl w-full p-10 text-center mx-auto glass-panel animate-fade-in">
        ${windowHeader}
        <div class="flex flex-col items-center justify-center min-h-[400px]">
           <img src="https://cdn-icons-png.flaticon.com/512/2378/2378030.png" class="w-24 h-24 mb-6 animate-bounce drop-shadow-md" alt="Cat Icon">
           <h1 class="text-6xl md:text-8xl font-display text-[#4A4341] mb-2 relative z-10 drop-shadow-sm leading-tight">
             HAPPY NEW YEAR!
           </h1>
           <h2 class="text-8xl md:text-9xl font-display text-[#c31432] mb-8 relative z-10 drop-shadow-md">
             2026
           </h2>
           <p class="font-hand text-3xl text-[#4A4341] mb-10 font-bold">See what i made for you 💖</p>
           <button id="startBtn" class="cute-button text-xl px-12 py-4 shadow-xl hover:scale-105 transition-transform">
             START THE JOURNEY 🚀
           </button>
        </div>
      </div>
    `,
        init: () => {
            document.getElementById("startBtn").addEventListener("click", () => goTo(1));
        }
    },

    // 1: Red Envelope / Greeting / Apology
    {
        html: `
        <div class="perspective-1000 w-full max-w-4xl mx-auto h-[700px] flex items-center justify-center animate-fade-in">
           <div class="envelope-container relative w-full max-w-lg cursor-pointer transition-transform duration-700 hover:scale-[1.02]">
              
              <!-- Envelope Front -->
              <div class="envelope bg-[#c31432] rounded-lg shadow-2xl relative overflow-hidden flex flex-col items-center p-8 z-20 h-[350px] justify-center border-t-2 border-[#ff5f5f]">
                 <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-30"></div>
                 <h2 class="text-white font-display text-5xl mb-6 drop-shadow-md text-center">Only For You</h2>
                 <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4 border border-white/30 shadow-inner">
                    <span class="text-5xl">💌</span>
                 </div>
                 <p class="text-white/90 font-hand text-xl animate-pulse">Tap to open</p>
              </div>
              
              <!-- Letter Inside -->
              <div class="letter absolute top-0 left-4 right-4 bg-[#fdfcf0] h-[550px] shadow-lg rounded-t-lg transition-all duration-1000 ease-in-out transform translate-y-4 z-10 flex flex-col items-center p-8 text-center" id="letterContent">
                  <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 pointer-events-none"></div>
                  
                  <!-- Stickers -->
                  <img src="https://new-year-special-free-demo.vercel.app/assets/intro1-ClxBlgZE.png" class="absolute -top-10 -left-10 w-28 h-28 rotate-[-15deg] drop-shadow-lg filter contrast-125 z-30" alt="Santa Cat">
                  <img src="https://new-year-special-free-demo.vercel.app/assets/intro2-BSPQ82Ji.png" class="absolute -bottom-6 -right-6 w-28 h-28 rotate-[15deg] drop-shadow-lg filter contrast-125 z-30" alt="Strawberry Cat">
                  
                  <h2 class="text-4xl font-display text-[#c31432] mb-6 mt-8 relative z-20">Happy New Year To You ${name}!</h2>
                  
                  <div class="overflow-y-auto max-h-[320px] px-4 custom-scrollbar space-y-4 relative z-20 w-full text-left">
                    <p class="font-hand text-2xl text-[#4A4341] leading-relaxed">
                      I know I'm a bit late (or early?), and I know I've messed up in the past. 😔
                    </p>
                    <p class="font-hand text-2xl text-[#4A4341] leading-relaxed">
                      But you mean so much to me, and I wanted to start 2026 by making you smile.
                    </p>
                    <p class="font-hand text-2xl text-[#4A4341] leading-relaxed font-bold">
                      Will you forgive this silly person and let me wish you properly? 🥺
                    </p>
                  </div>
                  
                  <div class="mt-auto pt-6 w-full flex flex-col gap-3 justify-center items-center relative z-20">
                     <button id="forgiveBtn" class="cute-button bg-[#28ca42] text-white border-none shadow-md hover:bg-[#1e9932] text-xl px-8 w-full max-w-xs">
                        Yes, I forgive you 💖
                     </button>
                     <button id="pleadBtn" class="text-gray-400 font-hand text-lg hover:text-[#c31432] transition-colors underline decoration-dotted">
                        No, try harder...
                     </button>
                  </div>
              </div>
           </div>
        </div>
      `,
        init: () => {
            const envelopeContainer = document.querySelector('.envelope-container');
            const envelope = document.querySelector('.envelope');
            const letter = document.getElementById('letterContent');
            const forgiveBtn = document.getElementById('forgiveBtn');
            const pleadBtn = document.getElementById('pleadBtn');
            let isOpen = false;

            envelopeContainer.onclick = (e) => {
                if (isOpen || e.target.closest('button')) return;
                isOpen = true;

                // Animate opening
                letter.classList.remove('translate-y-4', 'z-10');
                letter.classList.add('-translate-y-32', 'z-30'); // Move letter UP out of envelope
                envelope.classList.add('translate-y-60', 'opacity-0', 'pointer-events-none'); // Move envelope DOWN and fade

                envelopeContainer.style.cursor = 'default';
            };

            forgiveBtn.onclick = () => goTo(2);

            let pleadCount = 0;
            pleadBtn.onclick = (e) => {
                e.stopPropagation();
                pleadCount++;
                const text = ["Please? 🥺", "Pretty please? 🌸", "I made this for you! 🎁", "Don't be mean! 😿", "Okay, I'll cry... 😭"];
                pleadBtn.innerText = text[Math.min(pleadCount, text.length - 1)];
                pleadBtn.classList.add('animate-shake');
                setTimeout(() => pleadBtn.classList.remove('animate-shake'), 500);
            };
        }
    },

    // 2: Bucket List / Goals
    {
        html: `
      <div class="w-full max-w-md bg-[#FDFCF0] p-8 md:p-10 rounded-sm shadow-2xl border-[12px] border-white relative mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500 animate-fade-in group perspective-1000">
        <!-- Felt texture overlay -->
        <div class="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>
        
        <!-- Tape at top -->
        <div class="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 rotate-1 backdrop-blur-sm shadow-sm border border-white/50"></div>

        <div class="relative z-10 text-center">
          <h2 class="text-4xl md:text-5xl font-display text-[#5a433f] mb-1">Goals for 2026</h2>
          <h3 class="text-3xl font-hand text-[#D32F2F] mb-8 transform -rotate-2">Bucket List</h3>

          <ul class="space-y-6 text-left pl-4">
            <li class="flex items-start gap-4">
               <span class="text-2xl mt-1">🌍</span>
               <span class="font-hand text-2xl text-[#4a433f] leading-tight">Visit a place you've always wanted to see</span>
            </li>
            <li class="flex items-start gap-4">
               <span class="text-2xl mt-1">📚</span>
               <span class="font-hand text-2xl text-[#4a433f] leading-tight">Learn or read more consistently</span>
            </li>
            <li class="flex items-start gap-4">
               <span class="text-2xl mt-1">🧘‍♀️</span>
               <span class="font-hand text-2xl text-[#4a433f] leading-tight">Take better care of your mind and body</span>
            </li>
            <li class="flex items-start gap-4">
               <span class="text-2xl mt-1">❤️</span>
               <span class="font-hand text-2xl text-[#4a433f] leading-tight">Spend quality time with people who matter</span>
            </li>
          </ul>

          <div class="mt-10 border-t-2 border-dashed border-[#D32F2F]/20 pt-6">
            <p class="font-hand text-[#8d6e63] mb-4 text-lg italic">Ready to step into 2026?</p>
            <button id="letsGoBtn" class="cute-button bg-[#D32F2F] text-white px-10 py-3 shadow-lg hover:bg-[#b71c1c] text-xl w-full">
              LET'S GO! ➔
            </button>
          </div>
        </div>
      </div>
    `,
        init: () => {
            document.getElementById("letsGoBtn").addEventListener("click", () => goTo(3));
        }
    },

    // 3: Music (Cassettes)
    {
        html: `
      <div class="w-full max-w-lg mx-auto p-4 perspective-1000 animate-fade-in">
        <div class="text-center mb-6">
           <h2 class="text-6xl font-display text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-2">Dedicated To You</h2>
           <p class="font-hand text-2xl text-white/90 drop-shadow-md">Click to listen 🎵</p>
        </div>

        <div class="flex flex-col gap-6" style="max-height: 60vh; overflow-y: auto; padding-right: 10px; padding-bottom: 20px;">
          
          <!-- Cassette 1 -->
          <div class="cassette relative w-full h-56 bg-[#222] rounded-xl border-[6px] border-[#333] shadow-2xl overflow-hidden group hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer" 
               data-audio="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b8/69/a5/b869a548-d715-2764-b85b-b9cd311b24da/mzaf_7509861625630347065.plus.aac.p.m4a">
             <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-50"></div>
             <!-- Screws -->
             <div class="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#555] shadow-[inset_0_1px_2px_rgba(0,0,0,1)]"></div>
             <div class="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#555] shadow-[inset_0_1px_2px_rgba(0,0,0,1)]"></div>
             <div class="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-[#555] shadow-[inset_0_1px_2px_rgba(0,0,0,1)]"></div>
             <div class="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#555] shadow-[inset_0_1px_2px_rgba(0,0,0,1)]"></div>
             
             <!-- Label -->
             <div class="absolute top-5 left-1/2 -translate-x-1/2 w-[92%] h-[55%] bg-[#F5F5DC] rounded-md flex overflow-hidden shadow-sm">
                <div class="w-1/3 h-full bg-[#ff7bb5] flex items-center justify-center border-r-2 border-black/10 overflow-hidden relative">
                   <img src="https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/82/ee/3c/82ee3cbf-2f77-13f5-a1fc-23df0cb52d87/193436370950_Cover.jpg/600x600bb.jpg" class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Album Art">
                   <div class="text-5xl font-bold text-white relative z-10 drop-shadow-md">A</div>
                </div>
                <div class="flex-grow flex flex-col justify-center px-4 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
                   <h3 class="font-hand text-3xl text-black font-bold leading-tight">Belong Together</h3>
                   <p class="font-sans text-sm text-gray-500 uppercase tracking-widest mt-1">Mark Ambor • Preview</p>
                </div>
             </div>

             <!-- Reel Window -->
             <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-[25%] bg-[#1a1a1a] rounded-md border-2 border-[#444] shadow-[inset_0_2px_5px_rgba(0,0,0,1)] flex justify-center items-center gap-8 backdrop-blur-sm">
                <div class="reel w-14 h-14 rounded-full border-[5px] border-white/20 bg-transparent flex items-center justify-center relative">
                   <div class="w-full h-1.5 bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                   <div class="h-full w-1.5 bg-white/20 absolute left-1/2 -translate-x-1/2"></div>
                   <div class="w-10 h-10 bg-white/10 rounded-full"></div>
                </div>
                <div class="w-20 h-10 bg-[#000] rounded-sm opacity-80 border border-white/5"></div>
                <div class="reel w-14 h-14 rounded-full border-[5px] border-white/20 bg-transparent flex items-center justify-center relative">
                   <div class="w-full h-1.5 bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                   <div class="h-full w-1.5 bg-white/20 absolute left-1/2 -translate-x-1/2"></div>
                   <div class="w-10 h-10 bg-white/10 rounded-full"></div>
                </div>
             </div>
          </div>

          <!-- Cassette 2 -->
          <div class="cassette relative w-full h-56 bg-[#222] rounded-xl border-[6px] border-[#333] shadow-2xl overflow-hidden group hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer" 
               data-audio="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/d4/c1/00/d4c100e1-e10e-2921-e7b5-e35fe63686b7/mzaf_5395771005331787492.plus.aac.p.m4a">
             <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-50"></div>
             <div class="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             <div class="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             <div class="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             <div class="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             
             <div class="absolute top-5 left-1/2 -translate-x-1/2 w-[92%] h-[55%] bg-[#F5F5DC] rounded-md flex overflow-hidden shadow-sm">
                <div class="w-1/3 h-full bg-[#28ca42] flex items-center justify-center border-r-2 border-black/10 relative overflow-hidden">
                   <img src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5d/8b/b8/5d8bb828-6871-0390-52b1-714a7ed0e38f/artwork.jpg/600x600bb.jpg" class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Album Art">
                   <div class="text-5xl font-bold text-white relative z-10 drop-shadow-md">B</div>
                </div>
                <div class="flex-grow flex flex-col justify-center px-4 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
                   <h3 class="font-hand text-3xl text-black font-bold leading-tight">Iraaday</h3>
                   <p class="font-sans text-sm text-gray-500 uppercase tracking-widest mt-1">Abdul Hannan • Preview</p>
                </div>
             </div>

             <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-[25%] bg-[#1a1a1a] rounded-md border-2 border-[#444] shadow-inner flex justify-center items-center gap-8">
                <div class="reel w-14 h-14 rounded-full border-[5px] border-white/20 bg-transparent flex items-center justify-center relative">
                   <div class="w-full h-1.5 bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                   <div class="h-full w-1.5 bg-white/20 absolute left-1/2 -translate-x-1/2"></div>
                </div>
                <div class="w-20 h-10 bg-[#000] rounded-sm opacity-80 border border-white/5"></div>
                <div class="reel w-14 h-14 rounded-full border-[5px] border-white/20 bg-transparent flex items-center justify-center relative">
                   <div class="w-full h-1.5 bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                   <div class="h-full w-1.5 bg-white/20 absolute left-1/2 -translate-x-1/2"></div>
                </div>
             </div>
          </div>

          <!-- Cassette 3 -->
           <div class="cassette relative w-full h-56 bg-[#222] rounded-xl border-[6px] border-[#333] shadow-2xl overflow-hidden group hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer" 
                data-audio="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fa/93/fe/fa93fec8-adc4-1398-447a-69aca2622c25/mzaf_13909236668081502666.plus.aac.p.m4a">
             <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-50"></div>
             <div class="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             <div class="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             <div class="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             <div class="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#555] shadow-inner"></div>
             
             <div class="absolute top-5 left-1/2 -translate-x-1/2 w-[92%] h-[55%] bg-[#F5F5DC] rounded-md flex overflow-hidden shadow-sm">
                <div class="w-1/3 h-full bg-[#8e24aa] flex items-center justify-center border-r-2 border-black/10 relative overflow-hidden">
                   <img src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/89/a6/f7/89a6f7be-a0e0-2524-a13b-6b5df7b7534a/06UMGIM24399.rgb.jpg/600x600bb.jpg" class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Album Art">
                   <div class="text-5xl font-bold text-white relative z-10 drop-shadow-md">C</div>
                </div>
                <div class="flex-grow flex flex-col justify-center px-4 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
                   <h3 class="font-hand text-3xl text-black font-bold leading-tight">Somewhere Only We Know</h3>
                   <p class="font-sans text-sm text-gray-500 uppercase tracking-widest mt-1">Keane • Preview</p>
                </div>
             </div>

             <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-[25%] bg-[#1a1a1a] rounded-md border-2 border-[#444] shadow-inner flex justify-center items-center gap-8">
                <div class="reel w-14 h-14 rounded-full border-[5px] border-white/20 bg-transparent flex items-center justify-center relative">
                   <div class="w-full h-1.5 bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                   <div class="h-full w-1.5 bg-white/20 absolute left-1/2 -translate-x-1/2"></div>
                </div>
                <div class="w-20 h-10 bg-[#000] rounded-sm opacity-80 border border-white/5"></div>
                <div class="reel w-14 h-14 rounded-full border-[5px] border-white/20 bg-transparent flex items-center justify-center relative">
                   <div class="w-full h-1.5 bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                   <div class="h-full w-1.5 bg-white/20 absolute left-1/2 -translate-x-1/2"></div>
                </div>
             </div>
          </div>

        </div>

        <div class="mt-6 text-center bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
            <p id="nowPlayingText" class="text-white font-hand text-xl mb-4 text-[#ff7bb5]">Select a track to start...</p>
            <button id="nextSongsBtn" class="bg-white text-black px-10 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm">
              Next Page ➡️
            </button>
        </div>
        <audio id="musicPlayer" class="hidden"></audio>
      </div>
    `,
        init: () => {
            const btn = document.getElementById('nextSongsBtn');
            const cassettes = document.querySelectorAll('.cassette');
            const player = document.getElementById('musicPlayer');
            const nowPlayingText = document.getElementById('nowPlayingText');

            cassettes.forEach(cassette => {
                cassette.onclick = () => {
                    // Stop others
                    cassettes.forEach(c => {
                        c.querySelectorAll('.reel').forEach(r => r.classList.remove('animate-[spin_2s_linear_infinite]'));
                        c.classList.remove('scale-105', 'border-[#ff7bb5]');
                        c.classList.add('border-[#333]');
                    });

                    // Play this one
                    const src = cassette.dataset.audio;
                    const title = cassette.querySelector('h3').innerText;

                    if (!player.paused && player.src === src) {
                        player.pause();
                        nowPlayingText.innerText = "Paused ⏸️";
                    } else {
                        player.src = src;
                        player.play();
                        cassette.classList.add('scale-105', 'border-[#ff7bb5]');
                        cassette.classList.remove('border-[#333]');
                        cassette.querySelectorAll('.reel').forEach(r => r.classList.add('animate-[spin_2s_linear_infinite]'));
                        nowPlayingText.innerText = `Now Playing: ${title} 🎵`;
                    }
                };
            });

            if (btn) btn.onclick = () => {
                player.pause();
                goTo(4);
            }
        }
    },

    // 4: Flip Cards (Messages)
    {
        html: `
      <div class="window relative max-w-4xl w-full p-8 text-center mx-auto animate-fade-in glass-panel">
        ${windowHeader}
        <h2 class="text-4xl md:text-5xl font-display text-[#4A4341] mb-10 mt-6 drop-shadow-sm">
          Tap the cards to reveal 💖
        </h2>
        
        <div class="flex flex-wrap justify-center gap-10 mb-10 px-4">
          
          <!-- Card 1 -->
          <div class="flip-card w-72 h-52 cursor-pointer perspective-1000">
            <div class="flip-card-inner relative w-full h-full duration-700 preserve-3d shadow-xl rounded-2xl">
              <!-- Front: Cat Image -->
              <div class="flip-card-front absolute w-full h-full backface-hidden rounded-2xl overflow-hidden border-4 border-white/40">
                 <img src="https://new-year-special-free-demo.vercel.app/assets/pic1-eD0FbaSJ.jpg" alt="Cat Pic 1" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                 <div class="absolute inset-0 bg-black/10"></div>
                 <div class="absolute bottom-3 right-3 text-2xl animate-bounce">👆</div>
              </div>
              <!-- Back: Text -->
              <div class="flip-card-back absolute w-full h-full backface-hidden bg-white rounded-2xl flex items-center justify-center p-6 border-4 border-[#ff7bb5] rotate-y-180 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                 <p class="handwriting text-3xl text-[#c31432] font-bold leading-tight drop-shadow-sm">
                   You have the prettiest smile in the world 💖
                 </p>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="flip-card w-72 h-52 cursor-pointer perspective-1000">
            <div class="flip-card-inner relative w-full h-full duration-700 preserve-3d shadow-xl rounded-2xl">
              <!-- Front: Cat Image -->
              <div class="flip-card-front absolute w-full h-full backface-hidden rounded-2xl overflow-hidden border-4 border-white/40">
                 <img src="https://new-year-special-free-demo.vercel.app/assets/pic2-CLkR5Udc.jpg" alt="Cat Pic 2" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                 <div class="absolute inset-0 bg-black/10"></div>
                  <div class="absolute bottom-3 right-3 text-2xl animate-bounce">👆</div>
              </div>
              <!-- Back: Text -->
              <div class="flip-card-back absolute w-full h-full backface-hidden bg-white rounded-2xl flex items-center justify-center p-6 border-4 border-[#28ca42] rotate-y-180 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                 <p class="handwriting text-3xl text-[#0b6e1b] font-bold leading-tight drop-shadow-sm">
                   I want to go everywhere with you 🌍
                 </p>
              </div>
            </div>
          </div>

           <!-- Card 3 -->
          <div class="flip-card w-72 h-52 cursor-pointer perspective-1000">
            <div class="flip-card-inner relative w-full h-full duration-700 preserve-3d shadow-xl rounded-2xl">
               <!-- Front: Cat Image -->
              <div class="flip-card-front absolute w-full h-full backface-hidden rounded-2xl overflow-hidden border-4 border-white/40">
                 <img src="https://new-year-special-free-demo.vercel.app/assets/pic3-D47Ivlf_.jpg" alt="Cat Pic 3" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                 <div class="absolute inset-0 bg-black/10"></div>
                  <div class="absolute bottom-3 right-3 text-2xl animate-bounce">👆</div>
              </div>
              <!-- Back: Text -->
              <div class="flip-card-back absolute w-full h-full backface-hidden bg-white rounded-2xl flex items-center justify-center p-6 border-4 border-[#ffdc47] rotate-y-180 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                 <p class="handwriting text-3xl text-[#dfa300] font-bold leading-tight drop-shadow-sm">
                   Making 2026 our best year yet! 🤙
                 </p>
              </div>
            </div>
          </div>
        </div>

        <button id="nextMsgBtn" class="cute-button text-lg px-8 py-3">Next 🌟</button>
      </div>
    `,
        init: () => {
            // Add click handlers for flip effect
            document.querySelectorAll('.flip-card').forEach(card => {
                card.onclick = () => {
                    const inner = card.querySelector('.flip-card-inner');
                    // Toggle rotation
                    if (inner.style.transform === 'rotateY(180deg)') {
                        inner.style.transform = 'rotateY(0deg)';
                    } else {
                        inner.style.transform = 'rotateY(180deg)';
                    }
                };
            });

            document.getElementById("nextMsgBtn").addEventListener("click", () => goTo(5));
        }
    },

    // 5: Ignite Spark
    {
        html: `
      <div class="window relative max-w-md w-full p-10 text-center mx-auto glass-panel animate-fade-in">
        ${windowHeader}
        <h2 class="text-5xl font-display text-[#4A4341] mb-8 mt-6">
          Ready for 2026?
        </h2>
        <div class="mb-10 flex justify-center perspective-1000">
          <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop" alt="Cute Cat" class="w-72 h-72 rounded-xl shadow-2xl border-4 border-white object-cover animate-bounce transform hover:scale-105 transition-transform duration-300">
        </div>
        <button id="igniteBtn" class="cute-button text-xl px-10 py-4 shadow-[0_0_20px_rgba(255,123,181,0.6)] animate-pulse hover:shadow-[0_0_30px_rgba(255,123,181,0.9)]">
           IGNITE THE SPARK 🔥
        </button>
      </div>
    `,
        init: () => {
            document.getElementById("igniteBtn").addEventListener("click", () => goTo(6));
        }
    },

    // 6: Final Personal Note
    {
        html: `
      <div class="window relative max-w-lg w-full p-10 text-center mx-auto glass-panel animate-fade-in">
        ${windowHeader}
        <h2 class="text-4xl md:text-5xl font-display text-[#4A4341] mb-8 mt-6">
          From the heart, ${name}
        </h2>
        <div class="bg-white/80 p-8 rounded-xl shadow-inner mb-8 border border-white/50 relative">
           <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#ff7bb5] rounded-full flex items-center justify-center text-white shadow-md">❤</div>
           <p class="handwriting text-3xl text-[#4A4341] leading-relaxed">
            May peace, love, and growth accompany you all year round. 
            <br>You truly deserve the best.
          </p>
        </div>
        <button id="sealBtn" class="cute-button text-xl px-12">Seal It ✉️</button>
      </div>
    `,
        init: () => {
            document.getElementById("sealBtn").addEventListener("click", () => goTo(7));
        }
    },

    // 7: Sealed / Restart
    {
        html: `
      <div class="text-center z-20 max-w-lg mx-auto animate-fade-in px-4">
        <h2 class="text-5xl md:text-6xl font-display text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-4">Sealed ✉️</h2>
        
        <div class="mb-8 animate-bounce">
            <h1 class="font-display text-7xl md:text-8xl text-[#ffdc47] drop-shadow-[0_0_15px_rgba(255,220,71,0.8)] transform -rotate-3">
                I LOVE YOU ❤️
            </h1>
        </div>

        <div class="bg-white/90 backdrop-blur-md p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 mb-12 transform hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff7bb5] via-[#ffdc47] to-[#28ca42]"></div>
          <div class="font-hand text-4xl md:text-5xl text-[#D4AF37] drop-shadow-sm leading-relaxed">
            Happy New Year! <br>May 2026 be kind, exciting, and full of opportunities 🌟
          </div>
        </div>
        <button id="restartBtn" class="px-12 py-5 bg-white/10 backdrop-blur border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#c31432] transition-all tracking-[0.3em] uppercase text-sm shadow-lg">
          Restart the Journey
        </button>
      </div>
    `,
        init: () => {
            document.getElementById("restartBtn").addEventListener("click", () => goTo(0));
        }
    }
];

function goTo(index) {
    const app = document.getElementById("app");

    // Fade out
    app.style.opacity = '0';
    app.style.transform = 'translateY(10px) scale(0.98)';

    setTimeout(() => {
        app.innerHTML = scenes[index].html;
        if (scenes[index].init) scenes[index].init();

        // Fade in
        app.style.opacity = '1';
        app.style.transform = 'translateY(0) scale(1)';
    }, 400);
}

// Initial setup ensuring smooth transitions
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    app.style.transition = "opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
});

// Snowflake generator
function createSnowflakes() {
    const container = document.body;
    for (let i = 0; i < 15; i++) {
        const flake = document.createElement("div");
        flake.className = "snowflake";
        flake.style.position = "fixed";
        flake.style.top = "-20px";
        flake.style.left = Math.random() * 100 + "%";
        flake.style.fontSize = (Math.random() * 20 + 10) + "px";
        flake.style.opacity = Math.random() * 0.6 + 0.3;
        flake.style.animation = `snow ${Math.random() * 10 + 15}s linear infinite`;
        flake.style.pointerEvents = "none";
        flake.innerText = "❄";
        // flake.style.fontFamily = "Arial"; 
        container.appendChild(flake);
    }
}

// Sparkle effect
function addSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.width = '3px';
        sparkle.style.height = '3px';
        sparkle.style.backgroundColor = '#fff'; // White sparkles for purple bg
        sparkle.style.borderRadius = '50%';
        sparkle.style.boxShadow = '0 0 8px #fff, 0 0 15px #FFD700';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 2s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2000);
    }, 400);
}

window.addEventListener("load", () => {
    createSnowflakes();
    addSparkles();
    goTo(0);
});
