(function() {
    const portalId = "tour-portal-overlay";
    let inactivityTimer;

    // ===== Screen 2 (portal / unit-picker) palette =====
    const bgColor = "#12160d";            // Rich, solid dark olive-green
    const accentColor = "#C7D26B";        // muted olive-lime accent
    const creamColor = "#EFE9D8";         // warm off-white for body/headings

    const suaveFontUrl = "https://cdn.jsdelivr.net/gh/jiaseeds/artha-sondris@76b825702f01bab855cbd6720b16ae4ad6b9fcd1/Suave.ttf";
    const yumeLogo = "https://github.com/virtual-sudo/Yume-Landing-Page/blob/main/YUME_logo-05.png?raw=true";
    const bottomPattern = "https://github.com/jiaseeds/artha-sondris@76b825702f01bab855cbd6720b16ae4ad6b9fcd1/sondris-pattern.png?raw=true";
    
    // Background image
    const bgImage = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000";

    const kizuna = "https://github.com/virtual-sudo/Yume-Landing-Page/blob/main/kizuna.png?raw=true";
    const kokoro = "https://github.com/virtual-sudo/Yume-Landing-Page/blob/main/kokoro.png?raw=true";

    // Logic to clear the timer when the user is active
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        if (!document.getElementById(portalId)) {
            inactivityTimer = setTimeout(init, 180000); // 3 minutes
        }
    };

    const loadFonts = () => {
        if (!document.getElementById('google-fonts-yume')) {
            const fonts = document.createElement('link');
            fonts.id = 'google-fonts-yume';
            fonts.rel = 'stylesheet';
            fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght=100;200;300;400;500&family=Playfair+Display:ital,wght=0,400;0,700;1,400&family=Noto+Serif+JP:wght=100;200;400;700&display=swap';
            document.head.appendChild(fonts);
        }
    };

    const cleanup = () => {
        [portalId, portalId + "-style"].forEach(id => {
            document.getElementById(id)?.remove();
        });
    };

    const injectStyles = () => {
        cleanup();
        
        const style = document.createElement('style');
        style.id = portalId + "-style";
        style.innerHTML = `
            @font-face { font-family: 'SuaveCustom'; src: url('${suaveFontUrl}') format('truetype'); font-display: swap; }

            .gold-flake {
                position: absolute; 
                background: #A9AE60; 
                z-index: 25; 
                opacity: 0.35; 
                filter: blur(1px);
                animation: flakeDrift linear infinite;
                pointer-events: none;
            }
            @keyframes flakeDrift {
                0% { transform: translate(0, -10vh) rotate(0deg) scale(0.8); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.5; }
                100% { transform: translate(150px, 110vh) rotate(360deg) scale(1.2); opacity: 0; }
            }

            /* =========================================================
               SCREEN 2 (DSHUD Unit Portal overlay) Styles
               ========================================================= */
            #${portalId} {
                position: fixed; inset: 0; z-index: 2147483646;
                background: ${bgColor};
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                font-family: 'SuaveCustom', serif; color: ${creamColor};
                transition: opacity 0.8s ease; opacity: 0;
                overflow: hidden;
            }

            /* Elegant border corner markers matching design specs */
            .portal-corner {
                position: absolute;
                width: 50px;
                height: 50px;
                border-color: rgba(199, 210, 107, 0.4);
                border-style: solid;
                pointer-events: none;
                z-index: 15;
                transition: all 0.5s ease;
            }
            .portal-corner.top-left {
                top: 40px;
                left: 40px;
                border-width: 1px 0 0 1px;
            }
            .portal-corner.top-right {
                top: 40px;
                right: 40px;
                border-width: 1px 1px 0 0;
            }
            .portal-corner.bottom-left {
                bottom: 40px;
                left: 40px;
                border-width: 0 0 1px 1px;
            }
            .portal-corner.bottom-right {
                bottom: 40px;
                right: 40px;
                border-width: 0 1px 1px 0;
            }

            /* Subtle elegant horizontal line under logo, fading on ends */
            .logo-divider-line {
                width: 180px;
                height: 1px;
                background: linear-gradient(to right, rgba(199, 210, 107, 0), rgba(199, 210, 107, 0.5) 50%, rgba(199, 210, 107, 0));
                margin-top: 30px;
                margin-bottom: 50px;
                z-index: 10;
                position: relative;
            }

            /* Main wrapper for elements layered behind the interactive content */
            #${portalId} .portal-bg-container {
                position: absolute;
                inset: 0;
                z-index: 1;
                pointer-events: none;
            }

            /* Minimal landscape background image (styled at 4% opacity to be just slightly visible) */
            .portal-image-bg {
                position: absolute;
                inset: 0;
                background-image: url('${bgImage}');
                background-size: cover;
                background-position: center;
                opacity: 0.04;
                filter: grayscale(30%) blur(2px);
                z-index: 1;
            }

            /* Radial Vignette mask over the background image to fade the edges dynamically */
            .portal-vignette {
                position: absolute;
                inset: 0;
                background: radial-gradient(circle, rgba(18,22,13,0) 20%, ${bgColor} 90%);
                z-index: 2;
            }

            .portal-pattern { position: absolute; bottom: 0; left: 0; width: 100%; height: 140px; background-image: url('${bottomPattern}'); background-repeat: repeat-x; background-position: bottom; background-size: contain; opacity: 0.85; pointer-events: none; z-index: 5; filter: sepia(0.25) hue-rotate(45deg) saturate(1.4); }

            /* Balanced width layout for the two cards */
            .tour-container { 
                display: flex; 
                gap: 2vw; 
                width: 80%; 
                max-width: 1100px; 
                height: 50vh; 
                z-index: 10; 
                margin-bottom: 50px; 
                position: relative; 
            }
            .tour-card { flex: 1; position: relative; overflow: hidden; border: 1px solid rgba(199,210,107,0.25); transition: 0.7s; cursor: pointer; }
            .tour-card:hover { flex: 1.3; border-color: ${accentColor}; }
            .tour-img { position: absolute; inset: 0; background-size: cover; background-position: center; transition: 1.5s; filter: brightness(0.4) saturate(0.9); }
            .tour-card:hover .tour-img { transform: scale(1.1); filter: brightness(0.7) saturate(1); }
            .tour-content { position: absolute; bottom: 0; padding: 2vw; width: 100%; box-sizing: border-box; background: linear-gradient(transparent, rgba(10,14,7,0.9)); pointer-events: none; }
            .tour-title { font-size: 1.6rem; text-transform: uppercase; color: ${creamColor}; }
            .tour-subtitle { font-family: 'Inter', sans-serif; font-size: 1.1rem; letter-spacing: 0.1em; color: ${accentColor}; font-weight: 300; text-transform: uppercase; }

            @media (max-width: 768px) {
                .tour-container { flex-direction: column; height: auto; width: 85%; }
                .tour-card { height: 150px; }
                .portal-pattern { height: 80px; }
                .portal-corner { width: 30px; height: 30px; }
                .portal-corner.top-left { top: 20px; left: 20px; }
                .portal-corner.top-right { top: 20px; right: 20px; }
                .portal-corner.bottom-left { bottom: 20px; left: 20px; }
                .portal-corner.bottom-right { bottom: 20px; right: 20px; }
                .logo-divider-line { width: 120px; margin-top: 20px; margin-bottom: 30px; }
            }
        `;
        document.head.appendChild(style);
    };

    const toggleFS = () => {
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        if (isFull) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        } else {
            const el = document.documentElement;
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        }
    };

    const generateGoldFlakes = (count) => {
        let flakesHTML = '';
        for(let i=0; i<count; i++) {
            const left = Math.random() * 100;
            const sizeW = 4 + Math.random() * 10;
            const sizeH = 4 + Math.random() * 15;
            const duration = 12 + Math.random() * 18;
            const delay = Math.random() * -20;
            const borderR = Math.random() > 0.5 ? '2px' : '0px';
            flakesHTML += `<div class="gold-flake" style="left:${left}%; width:${sizeW}px; height:${sizeH}px; border-radius:${borderR}; animation-duration:${duration}s; animation-delay:${delay}s;"></div>`;
        }
        return flakesHTML;
    };

    const createUI = () => {
        clearTimeout(inactivityTimer);

        // ===== BUILD SCREEN 2 =====
        const portal = document.createElement('div');
        portal.id = portalId;
        portal.ondblclick = (e) => { e.stopPropagation(); toggleFS(); };
        portal.innerHTML = `
            <!-- Classic L-shaped corners inspired by the reference design -->
            <div class="portal-corner top-left"></div>
            <div class="portal-corner top-right"></div>
            <div class="portal-corner bottom-left"></div>
            <div class="portal-corner bottom-right"></div>

            <div class="portal-bg-container">
                <div class="portal-image-bg"></div>
                <div class="portal-vignette"></div>
                ${generateGoldFlakes(25)}
            </div>
            
            <img src="${yumeLogo}" style="height:100px; z-index:10; position:relative;">
            
            <!-- Subtle horizontal line below the logo -->
            <div class="logo-divider-line"></div>

            <div class="tour-container">
                <div class="tour-card" onclick="forceJump('FURNISHED','kizuna')">
                    <div class="tour-img" style="background-image:url('${kizuna}')"></div>
                    <div class="tour-content">
                        <div class="tour-title">Kizuna(集い)</div>
                    </div>
                </div>
                <div class="tour-card" onclick="forceJump('FURNISHED','kokoro')">
                    <div class="tour-img" style="background-image:url('${kokoro}')"></div>
                    <div class="tour-content">
                        <div class="tour-title">Kokoro(心)</div>
                    </div>
                </div>
            </div>
            <div class="portal-pattern"></div>
        `;

        document.body.prepend(portal);

        // Bind jump capabilities
        setupForceJump(portal);

        // Trigger smooth visual fade-in
        setTimeout(() => {
            portal.style.opacity = "1";
        }, 50);
    };

    function setupForceJump(portalElement) {
        window.forceJump = function(media, subtitle) {
            console.clear();
            console.log("CARD CLICKED:", media, subtitle);

            const subClean = String(subtitle || "").toLowerCase().trim();

            // 1. Instantly assign hardcoded index based on subtitle parameter
            let panoIndex = null;
            if (subClean === "kizuna") {
                panoIndex = 10;
            } else if (subClean === "kokoro") {
                panoIndex = 11;
            }

            const root = tour?.getRoot?.() || tour?.root || tour;
            const p = window.player || window.vtour || root?.locManager?.rootPlayer || root?.player || tour?.player;

            // 2. Fallback search logic only if index isn't hardcoded
            if (panoIndex === null) {
                const defs = root?.locManager?.rootPlayer?.bs?.definitions || root?.locManager?.rootPlayer?.definitions;
                if (defs) {
                    const mediaClean = String(media || "").toLowerCase().trim();
                    for (let i = 0; i < defs.length; i++) {
                        const item = defs[i];
                        if (!item) continue;

                        const label = String(item.label || item.data?.label || "").toLowerCase().trim();
                        const sub = String(item?.data?.subtitle || item?.bs?.subtitle || item?.bd?.subtitle || "").toLowerCase().trim();

                        if (label === mediaClean && sub === subClean) {
                            panoIndex = i;
                            break;
                        }
                    }
                }
            }

            if (panoIndex === null) {
                console.error("Could not find index match for:", subtitle);
                return;
            }

            console.log("USING PANORAMA INDEX:", panoIndex);

            if (!p) {
                console.error("Player or viewer structure was not found.");
                return;
            }

            const runMethods = () => {
                const methods = [
                    () => p.setMediaByIndex(panoIndex),
                    () => p.SetMediaByIndex(panoIndex),
                    () => p.openPanorama(panoIndex),
                    () => p.loadScene(panoIndex),
                    () => p.moveTo(panoIndex),
                    () => tour.setMediaByIndex(panoIndex),
                    () => tour.SetMediaByIndex(panoIndex)
                ];

                for (let fn of methods) {
                    try {
                        fn();
                        console.log("OPENED TARGET PANORAMA INDEX:", panoIndex);

                        if (p.drawScene) p.drawScene();
                        if (p.render) p.render();
                        if (p.update) p.update();

                        return true;
                    } catch (e) {}
                }
                return false;
            };

            // Attempt navigation instantly, retry if loader is busy
            if (!runMethods()) {
                console.log("Player busy, retrying scene jump...");
                const interval = setInterval(() => {
                    if (runMethods()) clearInterval(interval);
                }, 250);

                setTimeout(() => {
                    clearInterval(interval);
                }, 5000);
            }

            // Cleanly fade out the portal
            if (portalElement) {
                portalElement.style.opacity = "0";
                setTimeout(() => {
                    portalElement.style.display = "none";
                }, 1000);
            }
        };
    }

    const init = () => {
        loadFonts();
        injectStyles();
        createUI();
    };

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => document.addEventListener(evt, resetInactivityTimer, true));

    if (document.body) {
        init();
    } else {
        const checkBody = setInterval(() => {
            if (document.body) {
                clearInterval(checkBody);
                init();
            }
        }, 50);
    }
})();
