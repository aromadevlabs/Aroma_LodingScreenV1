// Configuration File for Aroma DevLabs Loading Screen

const CONFIG = {
    // Server Information
    server: {
        name: "City_Name", // keep this the same
        description: "City_description", // change city_description here
        version: "Version 1.0", // Keep version
        cityBase: "CITY_BASE" // Set city base here, chicago, new york, los santos, texas, atlanta, ect 
    },

    // Branding
    branding: {
        title: "City_Name", // Change to your city name here
        subtitle: "City_Subtitle", // change to your city subtitle here
        logoUrl: "logo.png", // change to your logo
        logoAlt: "Aroma DevLabs Logo" // alt logo text
    },
    
    // Executive Team Members
    executives: [
        { name: "Name_1", role: "Founder & CEO" }, // team member 1
        { name: "Name_2", role: "Co-Founder & CTO" }, // team member 2
        { name: "Name_3", role: "Head of Operations" }, // team member 3
        { name: "Name_4", role: "Community Manager" }, // team member 4
        { name: "Name_5", role: "Lead Developer" }, // team member 5
        { name: "Name_6", role: "Marketing Director" }, // team member 6
        { name: "Name_7", role: "HR Manager" }, // team member 7
        { name: "Name_8", role: "Finance Director" }, // team member 8
        { name: "Name_9", role: "Creative Director" }, // team member 9
        { name: "Name_10", role: "Support Lead" } // team member 10
    ], 

    // Music Settings
    // Developers/server owners when changing the music audio you must keep the file names the same you can't change it to info.mp3 must keep name music1.mp3, music2.mp3, music3.mp3
    music: { 
        tracks: [
            { file: "music1.mp3", name: "Track 1" }, // Must keep name music1.mp3 but you can change the name
            { file: "music2.mp3", name: "Track 2" }, // Must keep name music2.mp3 but you can change the name
            { file: "music3.mp3", name: "Track 3" }  // Must keep name music3.mp3 but you can change the name
        ],
        volume: 1.0, // Max Valume is 1.0 
    },

    // Weather System Settings
    weather: {
        enabled: true,
        defaultWeather: 'snow',
        snow: {
            interval: 100,
            lifetime: 9000,
            density: 3
        },
        rain: {
            interval: 30,
            lifetime: 2000,
            density: 3,
            splashChance: 0.5
        }
    },

    // Visual Effects Settings
    effects: {
        particles: {
            enabled: true,
            count: 100
        },
        stars: {
            enabled: true,
            count: 200
        }
    },

    // Loading Bar Settings
    loading: {
        updateInterval: 100,
        slowStart: 30,
        fastMiddle: 70,
        slowEnd: 95,
        minimumDisplayTime: 180000,
        delayBeforeClose: 3000
    },

    // Loading Tips Settings
    // change loading tips if needed
    tips: {
        enabled: true,
        rotationInterval: 7000,
        tips: [
            "Press F1 to open the main menu and access server features.",
            "Remember to read the server rules to avoid getting banned.",
            "Use /help in chat to see all available commands.",
            "Respect other players and enjoy your roleplay experience!",
            "Join our Discord for updates, events, and community support.",
            "Report any bugs or issues to staff members immediately.",
            "Your character's actions have consequences - roleplay wisely!",
            "Don't forget to save your progress regularly.",
            "Explore the city to discover hidden locations and secrets.",
            "Communication is key - use your mic for better roleplay.",
            "Follow traffic laws to avoid getting pulled over by police.",
            "Check the map (M key) to navigate around the city.",
            "Visit the bank to manage your finances safely.",
            "Jobs are a great way to earn money legally in the city.",
            "Customize your character at clothing stores around the map.",
            "Vehicle shops offer a variety of cars to purchase.",
            "Use /me for roleplay actions and /do for describing surroundings.",
            "Always have your ID ready when interacting with police.",
            "Hospital services are available if you get injured.",
            "Build relationships with other players for better RP experiences."
        ]
    },

    // Player Count Settings
    playerCount: {
        enabled: false,
        maxPlayers: 128,
        updateInterval: 5000,
        useRealData: false,
        simulatedCount: 24
    },
};

// Weather System Variables
let currentWeather = CONFIG.weather.defaultWeather;
let weatherInterval = null;

// Music Variables
let isPlaying = false;
let currentTrackIndex = 0;
let music, musicButton, musicIcon, trackInfo;

function initializeMusic() {
    music = document.getElementById('backgroundMusic');
    musicButton = document.getElementById('musicButton');
    musicIcon = document.getElementById('musicIcon');
    trackInfo = document.getElementById('trackInfo');
    
    music.volume = CONFIG.music.volume;
    
    // Load first track
    loadTrack(currentTrackIndex);
    
    // Add click event listener to music button
    if (musicButton) {
        musicButton.addEventListener('click', toggleMusic);
        console.log('[Music] Play/Pause button listener attached');
    }
    
    // Add click event listeners to prev/next buttons
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousTrack);
        console.log('[Music] Previous button listener attached');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTrack);
        console.log('[Music] Next button listener attached');
    }
    
    // Add error handling
    music.addEventListener('error', function(e) {
        console.error('Music loading error:', e);
        trackInfo.textContent = 'Track not found';
    });
    
    // Add ended event listener to auto-play next track
    music.addEventListener('ended', function() {
        if (isPlaying) {
            nextTrack();
        }
    });
    
    // Add stalled event listener
    music.addEventListener('stalled', function() {
        console.log('Music stalled, attempting to resume...');
        if (isPlaying) {
            music.load();
            music.play().catch(err => console.log('Resume failed:', err));
        }
    });
}

function loadTrack(index) {
    const track = CONFIG.music.tracks[index];
    music.src = track.file;
    music.load();
    trackInfo.textContent = track.name;
    
    if (isPlaying) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.log('Auto-play failed:', err);
                isPlaying = false;
                musicButton.classList.remove('playing');
            });
        }
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % CONFIG.music.tracks.length;
    loadTrack(currentTrackIndex);
    
    const nextBtn = document.getElementById('nextButton');
    nextBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        nextBtn.style.transform = '';
    }, 200);
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + CONFIG.music.tracks.length) % CONFIG.music.tracks.length;
    loadTrack(currentTrackIndex);
    
    const prevBtn = document.getElementById('prevButton');
    prevBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        prevBtn.style.transform = '';
    }, 200);
}

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        musicButton.classList.remove('playing');
        musicIcon.innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
    } else {
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                musicButton.classList.add('playing');
                musicIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
            }).catch(err => {
                console.log('Music play failed:', err);
                trackInfo.textContent = 'Click to retry playback';
            });
        }
    }
}

function updateVolume(value) {
    const volume = value / 100;
    
    if (music) {
        music.volume = volume;
    }
    
    const percentDisplay = document.getElementById('volumePercent');
    if (percentDisplay) {
        percentDisplay.textContent = value + '%';
    }
    
    const slider = document.getElementById('volumeSlider');
    if (slider) {
        slider.style.setProperty('--volume-percent', value + '%');
    }
    
    const volumeIcon = document.querySelector('.volume-icon');
    if (volumeIcon) {
        if (value == 0) {
            volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        } else if (value < 50) {
            volumeIcon.innerHTML = '<path d="M7 9v6h4l5 5V4l-5 5H7z"/>';
        } else {
            volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
        }
    }
}

// Weather System Functions
function setWeather(type) {
    if (!CONFIG.weather.enabled) return;
    
    document.querySelectorAll('.weather-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById('weather' + type.charAt(0).toUpperCase() + type.slice(1)).classList.add('active');
    
    stopWeather();
    currentWeather = type;
    
    const background = document.getElementById('background');
    const overlay = document.getElementById('overlay');
    
    background.className = 'background';
    overlay.className = 'overlay';
    
    if (type === 'rain') {
        background.classList.add('weather-rain');
        overlay.classList.add('weather-rain');
    } else if (type === 'clear') {
        background.classList.add('weather-clear');
        overlay.classList.add('weather-clear');
    }
    
    startWeather(type);
}

function startWeather(type) {
    const container = document.getElementById('weatherContainer');
    
    if (type === 'snow') {
        weatherInterval = setInterval(() => {
            for (let i = 0; i < CONFIG.weather.snow.density; i++) {
                createSnowflake(container);
            }
        }, CONFIG.weather.snow.interval);
    } else if (type === 'rain') {
        weatherInterval = setInterval(() => {
            for (let i = 0; i < CONFIG.weather.rain.density; i++) {
                createRaindrop(container);
            }
        }, CONFIG.weather.rain.interval);
    }
}

function stopWeather() {
    if (weatherInterval) {
        clearInterval(weatherInterval);
        weatherInterval = null;
    }
    
    const container = document.getElementById('weatherContainer');
    container.innerHTML = '';
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
    snowflake.style.opacity = Math.random() * 0.6 + 0.3;
    container.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, CONFIG.weather.snow.lifetime);
}

function createRaindrop(container) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    
    const leftPos = Math.random() * 100;
    raindrop.style.left = leftPos + '%';
    raindrop.style.height = (Math.random() * 10 + 15) + 'px';
    raindrop.style.animationDuration = (Math.random() * 0.3 + 0.4) + 's';
    
    container.appendChild(raindrop);
    
    if (Math.random() < CONFIG.weather.rain.splashChance) {
        setTimeout(() => {
            createRainSplash(container, leftPos);
        }, parseFloat(raindrop.style.animationDuration) * 1000);
    }
    
    setTimeout(() => {
        raindrop.remove();
    }, CONFIG.weather.rain.lifetime);
}

function createRainSplash(container, leftPos) {
    const splash = document.createElement('div');
    splash.classList.add('rain-splash');
    splash.style.left = leftPos + '%';
    splash.style.bottom = '0';
    container.appendChild(splash);
    
    setTimeout(() => {
        splash.remove();
    }, 400);
}

// Starfield Effect
function createStars() {
    if (!CONFIG.effects.stars.enabled) return;
    
    const starfield = document.getElementById('starfield');
    const starCount = CONFIG.effects.stars.count;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starfield.appendChild(star);
    }
}

// Particle System
function createParticles() {
    if (!CONFIG.effects.particles.enabled) return;
    
    const particlesContainer = document.getElementById('particles');
    const colors = ['blue', 'cyan', 'white'];
    const particleCount = CONFIG.effects.particles.count;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.classList.add(`particle-${color}`);
        
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100 + 20}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.animationDuration = `${Math.random() * 6 + 6}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Loading Progress
let loadingStartTime = Date.now();

function updateProgress() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.querySelector('.loading-text');
    
    window.addEventListener('message', function(e) {
        if (e.data.eventName === 'loadProgress') {
            const progress = e.data.loadFraction * 100;
            loadingBar.style.width = progress + '%';
            
            if (progress >= 100) {
                const elapsedTime = Date.now() - loadingStartTime;
                const remainingTime = Math.max(0, CONFIG.loading.minimumDisplayTime - elapsedTime);
                
                setTimeout(() => {
                    loadingText.textContent = 'READY TO CONNECT';
                    
                    if (CONFIG.music.stopOnLoadComplete && music) {
                        music.pause();
                        musicButton.classList.remove('playing');
                        isPlaying = false;
                    }
                    
                    setTimeout(() => {
                        if (window.nuiHandoverData) {
                            window.nuiHandoverData.loadingScreenComplete = true;
                        }
                    }, CONFIG.loading.delayBeforeClose);
                }, remainingTime);
            }
        }
    });
}

function fallbackProgress() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.querySelector('.loading-text');
    let progress = 0;
    const startTime = Date.now();

    function animate() {
        if (progress <= 100) {
            if (loadingBar.style.width === '' || parseFloat(loadingBar.style.width) === 0) {
                loadingBar.style.width = progress + '%';
            }
            
            if (progress < CONFIG.loading.slowStart) {
                progress += Math.random() * 2;
            } else if (progress < CONFIG.loading.fastMiddle) {
                progress += Math.random() * 3;
            } else if (progress < CONFIG.loading.slowEnd) {
                progress += Math.random() * 1.5;
            } else {
                progress += Math.random() * 0.5;
            }
            
            setTimeout(animate, CONFIG.loading.updateInterval);
        } else {
            loadingBar.style.width = '100%';
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, CONFIG.loading.minimumDisplayTime - elapsedTime);
            
            setTimeout(() => {
                loadingText.textContent = 'READY TO CONNECT';
                
                if (CONFIG.music.stopOnLoadComplete && music) {
                    music.pause();
                    musicButton.classList.remove('playing');
                    isPlaying = false;
                }
                
                setTimeout(() => {
                    if (window.nuiHandoverData) {
                        window.nuiHandoverData.loadingScreenComplete = true;
                    }
                }, CONFIG.loading.delayBeforeClose);
            }, remainingTime);
        }
    }

    setTimeout(animate, 1000);
}

// Populate Dynamic Content
function populateContent() {
    document.querySelector('.info-text').textContent = CONFIG.server.description;
    document.querySelector('.brand-title').textContent = CONFIG.branding.title;
    document.querySelector('.subtitle').textContent = CONFIG.branding.subtitle;
    document.querySelector('.version').textContent = CONFIG.server.version;
    document.querySelector('.city-Base').textContent = CONFIG.server.cityBase;
    
    const logoImg = document.querySelector('.logo-image');
    logoImg.src = CONFIG.branding.logoUrl;
    logoImg.alt = CONFIG.branding.logoAlt;
    
    document.querySelector('#backgroundMusic source').src = CONFIG.music.file;
}

// Initialize Everything
function initialize() {
    console.log('[Init] Starting initialization...');
    
    populateContent();
    initializeMusic();
    createStars();
    createParticles();
    updateProgress();
    fallbackProgress();
    
    if (CONFIG.weather.enabled) {
        setWeather(CONFIG.weather.defaultWeather);
        initializeWeatherButtons();
    }
    
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.style.setProperty('--volume-percent', '100%');
        volumeSlider.addEventListener('input', function(e) {
            updateVolume(e.target.value);
        });
    }
    
    setTimeout(() => {
        if (CONFIG.tips.enabled) {
            initializeTips();
        }
        if (CONFIG.playerCount.enabled) {
            initializePlayerCount();
        }
        // Initialize executive panel
        initializeExecutivePanel();
        
        // Initialize visibility toggle
        initializeVisibilityToggle();
    }, 500);
    
    console.log('[Init] Initialization complete');
}

// Initialize Weather Button Event Listeners
function initializeWeatherButtons() {
    const snowBtn = document.getElementById('weatherSnow');
    const rainBtn = document.getElementById('weatherRain');
    const clearBtn = document.getElementById('weatherClear');
    
    if (snowBtn) {
        snowBtn.addEventListener('click', function() {
            setWeather('snow');
        });
    }
    
    if (rainBtn) {
        rainBtn.addEventListener('click', function() {
            setWeather('rain');
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            setWeather('clear');
        });
    }
    
    console.log('[Weather] Button event listeners attached');
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Player Count System
let currentPlayerCount = CONFIG.playerCount.simulatedCount;

function initializePlayerCount() {
    if (!CONFIG.playerCount.enabled) return;
    
    const playerCountElement = document.getElementById('playerCount');
    const playerPercentElement = document.getElementById('playerPercent');
    
    if (!playerCountElement) {
        console.error('Player count element not found!');
        return;
    }
    
    updatePlayerCount();
    
    setInterval(() => {
        updatePlayerCount();
    }, CONFIG.playerCount.updateInterval);
}

function updatePlayerCount() {
    const playerCountElement = document.getElementById('playerCount');
    const playerPercentElement = document.getElementById('playerPercent');
    const playerBarFill = document.getElementById('playerBarFill');
    
    if (!playerCountElement) return;
    
    if (CONFIG.playerCount.useRealData) {
        currentPlayerCount = Math.min(
            CONFIG.playerCount.maxPlayers,
            Math.max(0, currentPlayerCount + Math.floor(Math.random() * 5) - 2)
        );
    } else {
        currentPlayerCount = Math.min(
            CONFIG.playerCount.maxPlayers,
            Math.max(0, CONFIG.playerCount.simulatedCount + Math.floor(Math.random() * 5) - 2)
        );
    }
    
    playerCountElement.textContent = `${currentPlayerCount}/${CONFIG.playerCount.maxPlayers}`;
    
    const percentage = Math.round((currentPlayerCount / CONFIG.playerCount.maxPlayers) * 100);
    if (playerPercentElement) {
        playerPercentElement.textContent = `${percentage}% Full`;
    }
    
    if (playerBarFill) {
        playerBarFill.style.width = `${percentage}%`;
    }
    
    console.log(`Player count updated: ${currentPlayerCount}/${CONFIG.playerCount.maxPlayers}`);
}

// Loading Tips System
let currentTipIndex = 0;
let tipInterval = null;

function initializeTips() {
    const tipElement = document.getElementById('loadingTip');
    
    if (!tipElement) {
        console.error('Loading tip element not found!');
        return;
    }
    
    if (!CONFIG.tips.enabled || CONFIG.tips.tips.length === 0) {
        console.log('Tips disabled or no tips available');
        return;
    }
    
    console.log('[Tips] Initializing with', CONFIG.tips.tips.length, 'tips');
    
    tipElement.textContent = CONFIG.tips.tips[0];
    tipElement.style.opacity = '1';
    
    if (tipInterval) {
        clearInterval(tipInterval);
    }
    
    tipInterval = setInterval(() => {
        showTip();
    }, CONFIG.tips.rotationInterval);
}

function showTip() {
    const tipElement = document.getElementById('loadingTip');
    
    if (!tipElement) {
        console.error('Tip element disappeared!');
        return;
    }
    
    tipElement.style.opacity = '0';
    
    setTimeout(() => {
        currentTipIndex = (currentTipIndex + 1) % CONFIG.tips.tips.length;
        tipElement.textContent = CONFIG.tips.tips[currentTipIndex];
        tipElement.style.opacity = '1';
    }, 500);
}

// ========================================
// EXECUTIVE TEAM PANEL SYSTEM
// ========================================

let execCurrentPage = 0;
let execItemsPerPage = 5;
let execTotalPages = 0;

function initializeExecutivePanel() {
    console.log('[Executive] Initializing executive panel...');
    
    if (!CONFIG.executives || CONFIG.executives.length === 0) {
        console.warn('[Executive] No executives configured');
        return;
    }
    
    const contentDiv = document.getElementById('executiveTeamContent');
    if (!contentDiv) {
        console.error('[Executive] Content div not found');
        return;
    }
    
    // Calculate total pages
    execTotalPages = Math.ceil(CONFIG.executives.length / execItemsPerPage);
    console.log('[Executive] Total executives:', CONFIG.executives.length);
    console.log('[Executive] Total pages:', execTotalPages);
    
    // Display first page
    displayExecutivePage(0);
    
    // Setup navigation if needed
    if (execTotalPages > 1) {
        setupExecutiveNavigation();
    }
    
    console.log('[Executive] Executive panel initialized');
}

function displayExecutivePage(pageIndex) {
    const contentDiv = document.getElementById('executiveTeamContent');
    if (!contentDiv) return;
    
    execCurrentPage = pageIndex;
    
    const startIndex = pageIndex * execItemsPerPage;
    const endIndex = Math.min(startIndex + execItemsPerPage, CONFIG.executives.length);
    
    let html = '';
    for (let i = startIndex; i < endIndex; i++) {
        const exec = CONFIG.executives[i];
        html += `
            <div class="executive-member-card">
                <div class="executive-member-name">${exec.name}</div>
                <div class="executive-member-role">${exec.role}</div>
            </div>
        `;
    }
    
    contentDiv.innerHTML = html;
    
    // Update navigation state
    updateExecutiveNavigation();
    
    console.log('[Executive] Displaying page', pageIndex + 1, 'of', execTotalPages);
}

function setupExecutiveNavigation() {
    const navDiv = document.getElementById('executiveTeamNav');
    const prevBtn = document.getElementById('execPrevBtn');
    const nextBtn = document.getElementById('execNextBtn');
    const dotsDiv = document.getElementById('execPageDots');
    
    if (!navDiv || !prevBtn || !nextBtn || !dotsDiv) {
        console.error('[Executive] Navigation elements not found');
        return;
    }
    
    // Show navigation
    navDiv.style.display = 'flex';
    
    // Create page dots
    dotsDiv.innerHTML = '';
    for (let i = 0; i < execTotalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('executive-page-dot');
        if (i === 0) dot.classList.add('active');
        dotsDiv.appendChild(dot);
    }
    
    // Attach event listeners
    prevBtn.addEventListener('click', function() {
        if (execCurrentPage > 0) {
            displayExecutivePage(execCurrentPage - 1);
            console.log('[Executive] Previous button clicked');
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (execCurrentPage < execTotalPages - 1) {
            displayExecutivePage(execCurrentPage + 1);
            console.log('[Executive] Next button clicked');
        }
    });
    
    console.log('[Executive] Navigation setup complete');
}

function updateExecutiveNavigation() {
    const prevBtn = document.getElementById('execPrevBtn');
    const nextBtn = document.getElementById('execNextBtn');
    const dots = document.querySelectorAll('.executive-page-dot');
    
    if (!prevBtn || !nextBtn) return;
    
    // Update button states
    prevBtn.disabled = (execCurrentPage === 0);
    nextBtn.disabled = (execCurrentPage === execTotalPages - 1);
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === execCurrentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ========================================
// VISIBILITY TOGGLE FUNCTIONALITY
// ========================================

let uiVisible = true;

function initializeVisibilityToggle() {
    console.log('[Visibility] Initializing visibility toggle...');
    
    const toggleBtn = document.getElementById('visibilityToggle');
    if (!toggleBtn) {
        console.error('[Visibility] Toggle button not found');
        return;
    }
    
    toggleBtn.addEventListener('click', toggleUIVisibility);
    console.log('[Visibility] Toggle button initialized');
}

function toggleUIVisibility() {
    uiVisible = !uiVisible;
    console.log('[Visibility] Toggling UI visibility:', uiVisible);
    
    // Get all UI elements (everything except weather, background, and toggle button)
    const uiElements = document.querySelectorAll('.ui-element');
    const corners = document.querySelectorAll('.corner-tl, .corner-tr, .corner-bl, .corner-br');
    const toggleBtn = document.getElementById('visibilityToggle');
    
    if (uiVisible) {
        // Show UI
        uiElements.forEach(el => el.classList.remove('ui-hidden'));
        corners.forEach(corner => corner.classList.remove('ui-hidden'));
        
        // Change icon to "eye open"
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
        `;
        console.log('[Visibility] UI shown');
    } else {
        // Hide UI
        uiElements.forEach(el => el.classList.add('ui-hidden'));
        corners.forEach(corner => corner.classList.add('ui-hidden'));
        
        // Change icon to "eye closed"
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
            </svg>
        `;
        console.log('[Visibility] UI hidden');
    }
}
