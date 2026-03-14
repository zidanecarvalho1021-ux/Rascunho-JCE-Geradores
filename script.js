!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);

// Initialize Locomotive Scroll
const locomotiveScroll = new LocomotiveScroll({
  lenisOptions: {
    // Options (https://scroll.locomotive.ca/docs#/options)
    lerp: 0.1,
    duration: 0.75,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  }
});
window.ls = locomotiveScroll;


  setTimeout(function() {
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5LP92K2M');
  }, 2500);


    !function(key) {
    if (window.reb2b) return;
    window.reb2b = {loaded: true};
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
    document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
}("7N850H53VVN1");
  

document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('.featured-cs_list');
    if (list) {
        const wrappers = list.querySelectorAll('.u-display-contents');
        for (let i = wrappers.length - 1; i >= 0; i--) {
            const wrapper = wrappers[i];
            const parent = wrapper.parentNode;
            while (wrapper.firstChild) {
                parent.insertBefore(wrapper.firstChild, wrapper);
            }
            wrapper.remove();
        }
    }
});


function initDetectScrollingDirection() {
  let lastScrollTop = 0;
  const threshold = 10; // Minimal scroll distance to switch to up/down 
  const thresholdTop = 50; // Minimal scroll distance from top of window to start

  window.addEventListener('scroll', () => {
    const nowScrollTop = window.scrollY;

    if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
      // Update Scroll Direction
      const direction = nowScrollTop > lastScrollTop ? 'down' : 'up';
      document.querySelectorAll('[data-scrolling-direction]').forEach(el => 
        el.setAttribute('data-scrolling-direction', direction)
      );

      // Update Scroll Started
      const started = nowScrollTop > thresholdTop;
      document.querySelectorAll('[data-scrolling-started]').forEach(el => 
        el.setAttribute('data-scrolling-started', started ? 'true' : 'false')
      );

      lastScrollTop = nowScrollTop;
    }
  });
}

// Initialize Detect Scrolling Direction
document.addEventListener('DOMContentLoaded', () => {
  initDetectScrollingDirection();
});


function initPlayVideoHover() {
  const wrappers = document.querySelectorAll('[data-video-on-hover]');

  wrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const src = wrapper.getAttribute('data-video-src') || '';
    if (!video || !src) return;

    const hoverTargets = wrapper.closest('[data-video-on-hover-wrapper]') || wrapper;

    hoverTargets.addEventListener('mouseenter', () => {
      if (!video.getAttribute('src')) {
        video.setAttribute('src', src);
      }
      wrapper.dataset.videoOnHover = 'active';
      video.play().catch(err => {
        console.warn('play on hover is blocked:', err);
      });
    });

    hoverTargets.addEventListener('mouseleave', () => {
      wrapper.dataset.videoOnHover = 'not-active';
      setTimeout(() => {
        video.pause();
        video.currentTime = 0;
      }, 200);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPlayVideoHover();
});



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('code').forEach(codeEl => {
    const match = codeEl.textContent.match(/<i ph=([a-z0-9-]+)>/i);

    if (match) {
      const iconName = match[1]; // e.g. "timer"
      const iEl = document.createElement('i');
      iEl.className = `ph-duotone ph-${iconName}`;
      codeEl.replaceWith(iEl);
    }
  });
});


function initDynamicCustomTextCursor() {  
  let cursorItem = document.querySelector(".cursor");
  let cursorParagraph = cursorItem.querySelector("p");
  let targets = document.querySelectorAll("[data-cursor]");
  let xOffset = 6;
  let yOffset = 140;
  let cursorIsOnRight = false;
  let currentTarget = null;
  let lastText = '';

  // Position cursor relative to actual cursor position on page load
  gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset });

  // Use GSAP quick.to for a more performative tween on the cursor
  let xTo = gsap.quickTo(cursorItem, "x", { ease: "power3" });
  let yTo = gsap.quickTo(cursorItem, "y", { ease: "power3" });

  // Function to get the width of the cursor element including a buffer
  const getCursorEdgeThreshold = () => {
    return cursorItem.offsetWidth + 16; // Cursor width + 16px margin
  };

  // On mousemove, call the quickTo functions to the actual cursor position
  window.addEventListener("mousemove", e => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;
    let cursorX = e.clientX;
    let cursorY = e.clientY + scrollY; // Adjust cursorY to account for scroll

    // Default offsets
    let xPercent = xOffset;
    let yPercent = yOffset;

    // Adjust X offset dynamically based on cursor width
    let cursorEdgeThreshold = getCursorEdgeThreshold();
    if (cursorX > windowWidth - cursorEdgeThreshold) {
      cursorIsOnRight = true;
      xPercent = -100;
    } else {
      cursorIsOnRight = false;
    }

    // Adjust Y offset if in the bottom 10% of the current viewport
    if (cursorY > scrollY + windowHeight * 0.9) {
      yPercent = -120;
    }

    if (currentTarget) {
      let newText = currentTarget.getAttribute("data-cursor");
      if (newText !== lastText) { // Only update if the text is different
        cursorParagraph.innerHTML = newText;
        lastText = newText;

        // Recalculate edge awareness whenever the text changes
        cursorEdgeThreshold = getCursorEdgeThreshold();
      }
    }

    gsap.to(cursorItem, { xPercent: xPercent, yPercent: yPercent, duration: 0.9, ease: "power3" });
    xTo(cursorX);
    yTo(cursorY - scrollY);
  });

  // Add a mouse enter listener for each link that has a data-cursor attribute
  targets.forEach(target => {
    target.addEventListener("mouseenter", () => {
      currentTarget = target; // Set the current target

      let newText = target.getAttribute("data-cursor");

      // Update only if the text changes
      if (newText !== lastText) {
        cursorParagraph.innerHTML = newText;
        lastText = newText;

        // Recalculate edge awareness whenever the text changes
        let cursorEdgeThreshold = getCursorEdgeThreshold();
      }
    });
  });
}

// Initialize Dynamic Text Cursor (Edge Aware)
document.addEventListener('DOMContentLoaded', () => {
  initDynamicCustomTextCursor();
});


document.addEventListener('DOMContentLoaded', () => {
  const ACTIVE_MS = 5000, ANIMATING_MS = 500;

  const set = (el, s) => el.setAttribute('data-nav-cs-status', s);

  document.querySelectorAll('[data-nav-cs-initialize]').forEach(container => {
    const items = [...container.querySelectorAll('[data-nav-cs-status]')];
    if (!items.length) return;

    items.forEach(el => set(el, 'not-active'));
    let index = 0;
    set(items[index], 'active'); // first is active immediately

    const tick = () => {
      items.forEach(el => {
        if (el.getAttribute('data-nav-cs-status') === 'animating') set(el, 'not-active');
      });

      const cur = items[index];
      const nextIndex = (index + 1) % items.length;
      const next = items[nextIndex];

      set(cur, 'animating');     // outgoing animates
      set(next, 'active');       // incoming becomes active immediately

      setTimeout(() => {
        if (cur.getAttribute('data-nav-cs-status') === 'animating') set(cur, 'not-active');
      }, ANIMATING_MS);

      index = nextIndex;
    };

    setInterval(tick, ACTIVE_MS); // first switch occurs 5s after load
  });
});


function initNavCareersPanning() {
  document.querySelectorAll('.nav_careers_canvas_wrap').forEach((wrap) => {
    const canvas = wrap.querySelector('.nav_careers_canvas');
    if (!canvas) return;

    const photo = canvas.querySelector('.nav_careers_canvas_photo'); // the element we scale
    const userWraps = canvas.querySelectorAll('.nav_careers_user_wrap');
    const ZOOM_SCALE = 1.05;

    let panRAF = null;
    let zoomRAF = null;

    // -------------------
    // PANNING (same as before)
    // -------------------
    function updatePan(clientX, clientY) {
      const wrapRect = wrap.getBoundingClientRect();
      const wrapW = wrapRect.width;
      const wrapH = wrapRect.height;

      const canvasW = canvas.scrollWidth;
      const canvasH = canvas.scrollHeight;

      const extraX = Math.max(0, canvasW - wrapW);
      const extraY = Math.max(0, canvasH - wrapH);

      const relX = Math.min(1, Math.max(0, (clientX - wrapRect.left) / wrapW));
      const relY = Math.min(1, Math.max(0, (clientY - wrapRect.top)  / wrapH));

      const tx = -extraX * relX;
      const ty = -extraY * relY;

      canvas.style.transform = `translate(${tx}px, ${ty}px)`;
    }

    function queuePan(e) {
      if (panRAF) cancelAnimationFrame(panRAF);
      const p = e.touches ? e.touches[0] : e;
      panRAF = requestAnimationFrame(() => updatePan(p.clientX, p.clientY));
    }

    wrap.addEventListener('pointermove', queuePan);
    wrap.addEventListener('pointerenter', queuePan);
    wrap.addEventListener('pointerleave', () => {
      // Keep last position, or reset if desired:
      // canvas.style.transform = 'translate(0px, 0px)';
    });

    wrap.addEventListener('touchstart', queuePan, { passive: true });
    wrap.addEventListener('touchmove',  queuePan, { passive: true });

    window.addEventListener('resize', () => {
      const rect = wrap.getBoundingClientRect();
      updatePan(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });

    // -------------------
    // HOVER-ZOOM (new)
    // -------------------
    if (photo && userWraps.length) {
      const setOriginAtPointer = (clientX, clientY) => {
        const rect = photo.getBoundingClientRect();
        const xPct = ((clientX - rect.left) / rect.width) * 100;
        const yPct = ((clientY - rect.top)  / rect.height) * 100;
        photo.style.transformOrigin = `${xPct}% ${yPct}%`;
      };

      const queueOrigin = (e) => {
        if (zoomRAF) cancelAnimationFrame(zoomRAF);
        const p = e.touches ? e.touches[0] : e;
        zoomRAF = requestAnimationFrame(() => setOriginAtPointer(p.clientX, p.clientY));
      };

      const zoomIn = (e) => {
        queueOrigin(e);
        photo.style.transform = `scale(${ZOOM_SCALE})`;
      };

      const zoomOut = () => {
        photo.style.transform = 'scale(1)';
      };

      // Delegate to each user “hotspot”
      userWraps.forEach((uw) => {
        uw.addEventListener('pointerenter', zoomIn);
        uw.addEventListener('pointermove',  queueOrigin);
        uw.addEventListener('pointerleave', zoomOut);

        // Touch: press to zoom, move updates origin, end cancels
        uw.addEventListener('touchstart', zoomIn, { passive: true });
        uw.addEventListener('touchmove',  queueOrigin, { passive: true });
        uw.addEventListener('touchend',  zoomOut);
        uw.addEventListener('touchcancel', zoomOut);
      });
    }
  });
}

// Run on DOMContentLoaded (or immediately if DOM is already ready)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavCareersPanning);
} else {
  initNavCareersPanning();
}


document.addEventListener('DOMContentLoaded', () => {
  const ACTIVE_MS = 5000, ANIMATING_MS = 500;

  const set = (el, s) => el.setAttribute('data-nav-cs-status', s);

  document.querySelectorAll('[data-nav-cs-initialize]').forEach(container => {
    const items = [...container.querySelectorAll('[data-nav-cs-status]')];
    if (!items.length) return;

    items.forEach(el => set(el, 'not-active'));
    let index = 0;
    set(items[index], 'active'); // first is active immediately

    const tick = () => {
      items.forEach(el => {
        if (el.getAttribute('data-nav-cs-status') === 'animating') set(el, 'not-active');
      });

      const cur = items[index];
      const nextIndex = (index + 1) % items.length;
      const next = items[nextIndex];

      set(cur, 'animating');     // outgoing animates
      set(next, 'active');       // incoming becomes active immediately

      setTimeout(() => {
        if (cur.getAttribute('data-nav-cs-status') === 'animating') set(cur, 'not-active');
      }, ANIMATING_MS);

      index = nextIndex;
    };

    setInterval(tick, ACTIVE_MS); // first switch occurs 5s after load
  });
});


function initNavCareersPanning() {
  document.querySelectorAll('.nav_careers_canvas_wrap').forEach((wrap) => {
    const canvas = wrap.querySelector('.nav_careers_canvas');
    if (!canvas) return;

    const photo = canvas.querySelector('.nav_careers_canvas_photo'); // the element we scale
    const userWraps = canvas.querySelectorAll('.nav_careers_user_wrap');
    const ZOOM_SCALE = 1.05;

    let panRAF = null;
    let zoomRAF = null;

    // -------------------
    // PANNING (same as before)
    // -------------------
    function updatePan(clientX, clientY) {
      const wrapRect = wrap.getBoundingClientRect();
      const wrapW = wrapRect.width;
      const wrapH = wrapRect.height;

      const canvasW = canvas.scrollWidth;
      const canvasH = canvas.scrollHeight;

      const extraX = Math.max(0, canvasW - wrapW);
      const extraY = Math.max(0, canvasH - wrapH);

      const relX = Math.min(1, Math.max(0, (clientX - wrapRect.left) / wrapW));
      const relY = Math.min(1, Math.max(0, (clientY - wrapRect.top)  / wrapH));

      const tx = -extraX * relX;
      const ty = -extraY * relY;

      canvas.style.transform = `translate(${tx}px, ${ty}px)`;
    }

    function queuePan(e) {
      if (panRAF) cancelAnimationFrame(panRAF);
      const p = e.touches ? e.touches[0] : e;
      panRAF = requestAnimationFrame(() => updatePan(p.clientX, p.clientY));
    }

    wrap.addEventListener('pointermove', queuePan);
    wrap.addEventListener('pointerenter', queuePan);
    wrap.addEventListener('pointerleave', () => {
      // Keep last position, or reset if desired:
      // canvas.style.transform = 'translate(0px, 0px)';
    });

    wrap.addEventListener('touchstart', queuePan, { passive: true });
    wrap.addEventListener('touchmove',  queuePan, { passive: true });

    window.addEventListener('resize', () => {
      const rect = wrap.getBoundingClientRect();
      updatePan(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });

    // -------------------
    // HOVER-ZOOM (new)
    // -------------------
    if (photo && userWraps.length) {
      const setOriginAtPointer = (clientX, clientY) => {
        const rect = photo.getBoundingClientRect();
        const xPct = ((clientX - rect.left) / rect.width) * 100;
        const yPct = ((clientY - rect.top)  / rect.height) * 100;
        photo.style.transformOrigin = `${xPct}% ${yPct}%`;
      };

      const queueOrigin = (e) => {
        if (zoomRAF) cancelAnimationFrame(zoomRAF);
        const p = e.touches ? e.touches[0] : e;
        zoomRAF = requestAnimationFrame(() => setOriginAtPointer(p.clientX, p.clientY));
      };

      const zoomIn = (e) => {
        queueOrigin(e);
        photo.style.transform = `scale(${ZOOM_SCALE})`;
      };

      const zoomOut = () => {
        photo.style.transform = 'scale(1)';
      };

      // Delegate to each user “hotspot”
      userWraps.forEach((uw) => {
        uw.addEventListener('pointerenter', zoomIn);
        uw.addEventListener('pointermove',  queueOrigin);
        uw.addEventListener('pointerleave', zoomOut);

        // Touch: press to zoom, move updates origin, end cancels
        uw.addEventListener('touchstart', zoomIn, { passive: true });
        uw.addEventListener('touchmove',  queueOrigin, { passive: true });
        uw.addEventListener('touchend',  zoomOut);
        uw.addEventListener('touchcancel', zoomOut);
      });
    }
  });
}

// Run on DOMContentLoaded (or immediately if DOM is already ready)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavCareersPanning);
} else {
  initNavCareersPanning();
}


function initLogoWallCycle() {
  const loopDelay = 1.5;   // Loop Duration
  const duration  = 0.9;   // Animation Duration

  document.querySelectorAll('[data-logo-wall-cycle-init]').forEach(root => {
    const list   = root.querySelector('[data-logo-wall-list]');
    const items  = Array.from(list.querySelectorAll('[data-logo-wall-item]'));

    const shuffleFront = root.getAttribute('data-logo-wall-shuffle') !== 'false';
    const originalTargets = items
      .map(item => item.querySelector('[data-logo-wall-target]'))
      .filter(Boolean);

    let visibleItems   = [];
    let visibleCount   = 0;
    let pool           = [];
    let pattern        = [];
    let patternIndex   = 0;
    let tl;

    function isVisible(el) {
      return window.getComputedStyle(el).display !== 'none';
    }

    function shuffleArray(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function setup() {
      if (tl) {
        tl.kill();
      }
      visibleItems = items.filter(isVisible);
      visibleCount = visibleItems.length;

      pattern = shuffleArray(
        Array.from({ length: visibleCount }, (_, i) => i)
      );
      patternIndex = 0;

      // remove all injected targets
      items.forEach(item => {
        item.querySelectorAll('[data-logo-wall-target]').forEach(old => old.remove());
      });

      pool = originalTargets.map(n => n.cloneNode(true));

      let front, rest;
      if (shuffleFront) {
        const shuffledAll = shuffleArray(pool);
        front = shuffledAll.slice(0, visibleCount);
        rest  = shuffleArray(shuffledAll.slice(visibleCount));
      } else {
        front = pool.slice(0, visibleCount);
        rest  = shuffleArray(pool.slice(visibleCount));
      }
      pool = front.concat(rest);

      for (let i = 0; i < visibleCount; i++) {
        const parent =
          visibleItems[i].querySelector('[data-logo-wall-target-parent]') ||
          visibleItems[i];
        parent.appendChild(pool.shift());
      }

      tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay });
      tl.call(swapNext);
      tl.play();
    }

    function swapNext() {
      const nowCount = items.filter(isVisible).length;
      if (nowCount !== visibleCount) {
        setup();
        return;
      }
      if (!pool.length) return;

      const idx = pattern[patternIndex % visibleCount];
      patternIndex++;

      const container = visibleItems[idx];
      const parent =
        container.querySelector('[data-logo-wall-target-parent]') ||
        container.querySelector('*:has(> [data-logo-wall-target])') ||
        container;
      const existing = parent.querySelectorAll('[data-logo-wall-target]');
      if (existing.length > 1) return;

      const current  = parent.querySelector('[data-logo-wall-target]');
      const incoming = pool.shift();

      gsap.set(incoming, { yPercent: 50, autoAlpha: 0 });
      parent.appendChild(incoming);

      if (current) {
        gsap.to(current, {
          yPercent: -50,
          autoAlpha: 0,
          duration,
          ease: "expo.inOut",
          onComplete: () => {
            current.remove();
            pool.push(current);
          }
        });
      }

      gsap.to(incoming, {
        yPercent: 0,
        autoAlpha: 1,
        duration,
        delay: 0.1,
        ease: "expo.inOut"
      });
    }

    setup();

    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onEnter:     () => tl.play(),
      onLeave:     () => tl.pause(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.pause()
    });

    document.addEventListener('visibilitychange', () =>
      document.hidden ? tl.pause() : tl.play()
    );
  });
}

// Initialize Logo Wall Cycle
document.addEventListener('DOMContentLoaded', () => {
  initLogoWallCycle();
});


function initPreviewFollower() {
  // Find every follower wrap
  const wrappers = document.querySelectorAll('[data-follower-wrap]');

  wrappers.forEach(wrap => {
    const collection = wrap.querySelector('[data-follower-collection]');
    const items = wrap.querySelectorAll('[data-follower-item]');
    const follower = wrap.querySelector('[data-follower-cursor]');
    const followerInner = wrap.querySelector('[data-follower-cursor-inner]');

    let prevIndex = null;
    let firstEntry = true;

    const offset = 100; // The animation distance in %
    const duration = 0.5; // The animation duration of all visual transforms
    const ease = 'power2.inOut';

    // Initialize follower position
    gsap.set(follower, { xPercent: 5, yPercent: 5 });

    // Quick setters for x/y
    const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });

    // Move all followers on mousemove
    window.addEventListener('mousemove', e => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    // Enter/leave per item within this wrap
    items.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        const forward = prevIndex === null || index > prevIndex;
        prevIndex = index;

        // animate out existing visuals
        follower.querySelectorAll('[data-follower-visual]').forEach(el => {
          gsap.killTweensOf(el);
          gsap.to(el, {
            yPercent: forward ? -offset : offset,
            duration,
            ease,
            overwrite: 'auto',
            onComplete: () => el.remove()
          });
        });

        // clone & insert new visual
        const visual = item.querySelector('[data-follower-visual]');
        if (!visual) return;
        const clone = visual.cloneNode(true);
        followerInner.appendChild(clone);

        // animate it in (unless it's the very first entry)
        if (!firstEntry) {
          gsap.fromTo(clone,
            { yPercent: forward ? offset : -offset },
            { yPercent: 0, duration, ease, overwrite: 'auto' }
          );
        } else {
          firstEntry = false;
        }
      });

      item.addEventListener('mouseleave', () => {
        const el = follower.querySelector('[data-follower-visual]');
        if (!el) return;
        gsap.killTweensOf(el);
        gsap.to(el, {
          yPercent: -offset,
          duration,
          ease,
          overwrite: 'auto',
          onComplete: () => el.remove()
        });
      });
    });

    // If pointer leaves the collection, clear any visuals
    collection.addEventListener('mouseleave', () => {
      follower.querySelectorAll('[data-follower-visual]').forEach(el => {
        gsap.killTweensOf(el);
        gsap.delayedCall(duration, () => el.remove());
      });
      firstEntry = true;
      prevIndex = null;
    });
  });
}

// Initialize Image Preview Cursor Follower
document.addEventListener("DOMContentLoaded", () =>{
  initPreviewFollower();
})


//Slider
document.addEventListener('DOMContentLoaded', () => {
  class Slider {
    constructor(groupElement) {
      this.group = groupElement;

      // Find key elements.
      this.sliderWrapper = this.group.querySelector('[gft-slider-wrapper]');
      if (!this.sliderWrapper) return; // Exit if no slider wrapper.
      this.slides = Array.from(this.sliderWrapper.children);
      this.totalSlides = this.slides.length;

      this.buttonWrapper = this.group.querySelector('[gft-button-wrapper]');
      this.nextBtn = this.buttonWrapper ? this.buttonWrapper.querySelector('[data-attribute="gft-slider-next"]') : null;
      this.prevBtn = this.buttonWrapper ? this.buttonWrapper.querySelector('[data-attribute="gft-slider-prev"]') : null;

      this.paginationWrapper = this.group.querySelector('[gft-pagination-wrapper]');
      this.paginationBulletClass = '';
      this.paginationBulletActiveClass = '';
      this.paginationDots = [];
      if (this.paginationWrapper) {
        this.paginationBulletClass = this.paginationWrapper.getAttribute('gft-pagination-class') || '';
        this.paginationBulletActiveClass = this.paginationWrapper.getAttribute('gft-pagination-active-class') || '';
        this.paginationWrapper.innerHTML = ''; // Clear placeholder content.
      }

      // Transition delay in ms (should match your CSS transition duration).
      this.transitionDelay = 500;

      // Autoplay configuration.
      this.autoplayAttr = this.group.getAttribute('gft-slider-autoplay');
      this.autoplayDelay = 5000; // Default delay.
      if (this.autoplayAttr && this.autoplayAttr.trim() !== '' && this.autoplayAttr.trim() !== 'pause') {
        this.autoplayDelay = parseInt(this.autoplayAttr, 10) || 5000;
      }
      this.autoplayIntervalId = null;

      // For managing pending transitions.
      this.pendingTimeout = null;
      this.pendingSlide = null;

      // Set initial slide statuses.
      this.currentIndex = 0;
      this.slides.forEach((slide, i) => {
        this.updateSlideStatus(slide, i === this.currentIndex);
      });

      // Setup pagination dots if available.
      if (this.paginationWrapper) {
        this.createPagination();
      }

      // Start autoplay if the attribute exists.
      if (this.autoplayAttr !== null) {
        this.startAutoplay();
      }

      // Expose autoplay control methods on the group element.
      this.group.pauseAutoplay = () => this.stopAutoplay();
      this.group.resumeAutoplay = () => this.startAutoplay();

      // Listen for custom events to control autoplay.
      this.group.addEventListener('pauseAutoplay', () => this.stopAutoplay());
      this.group.addEventListener('resumeAutoplay', () => this.startAutoplay());

      // Attach event listeners to navigation buttons.
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goToNextSlide());
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.goToPrevSlide());
    }

    /**
     * Updates the slide’s active state and accessibility attributes.
     * @param {HTMLElement} slide - The slide element.
     * @param {boolean} isActive - Whether the slide should be active.
     */
    updateSlideStatus(slide, isActive) {
      if (isActive) {
        slide.classList.add('is-active');
        slide.setAttribute('data-slider-status', 'active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('is-active');
        slide.setAttribute('data-slider-status', 'not-active');
        slide.setAttribute('aria-hidden', 'true');
      }
    }

    /**
     * Creates clickable pagination dots.
     */
    createPagination() {
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('div');
        if (this.paginationBulletClass) {
          dot.classList.add(this.paginationBulletClass);
        }
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => this.goToSlide(i));
        this.paginationWrapper.appendChild(dot);
        this.paginationDots.push(dot);
      }
      if (this.paginationDots[this.currentIndex] && this.paginationBulletActiveClass) {
        this.paginationDots[this.currentIndex].classList.add(this.paginationBulletActiveClass);
      }
    }

    /**
     * Starts the autoplay interval.
     */
    startAutoplay() {
      if (this.group.getAttribute('gft-slider-autoplay') === 'pause') return;
      if (this.autoplayIntervalId) clearInterval(this.autoplayIntervalId);
      this.autoplayIntervalId = setInterval(() => this.goToNextSlide(), this.autoplayDelay);
    }

    /**
     * Stops the autoplay interval.
     */
    stopAutoplay() {
      if (this.autoplayIntervalId) {
        clearInterval(this.autoplayIntervalId);
        this.autoplayIntervalId = null;
      }
    }

    /**
     * Transitions to a specific slide.
     * Cancels any pending transition to prevent a slide from being left in a "transition-out" state.
     * @param {number} index - The target slide index.
     */
    goToSlide(index) {
      if (index === this.currentIndex) return;

      // Cancel any pending transition.
      if (this.pendingTimeout) {
        clearTimeout(this.pendingTimeout);
        if (this.pendingSlide) {
          this.updateSlideStatus(this.pendingSlide, false);
          this.pendingSlide = null;
        }
        this.pendingTimeout = null;
      }

      const previousIndex = this.currentIndex;
      const previousSlide = this.slides[previousIndex];

      // Mark the previous slide as transitioning out.
      if (previousSlide.getAttribute('data-slider-status') === 'active') {
        previousSlide.classList.remove('is-active');
        previousSlide.setAttribute('data-slider-status', 'transition-out');
        this.pendingSlide = previousSlide;
        this.pendingTimeout = setTimeout(() => {
          this.updateSlideStatus(previousSlide, false);
          this.pendingTimeout = null;
          this.pendingSlide = null;
        }, this.transitionDelay);
      } else {
        this.updateSlideStatus(previousSlide, false);
      }

      // Activate the new slide immediately.
      this.currentIndex = index;
      const newSlide = this.slides[this.currentIndex];
      this.updateSlideStatus(newSlide, true);

      // Update pagination dots.
      if (this.paginationDots.length) {
        if (this.paginationBulletActiveClass && this.paginationDots[previousIndex]) {
          this.paginationDots[previousIndex].classList.remove(this.paginationBulletActiveClass);
        }
        if (this.paginationBulletActiveClass && this.paginationDots[this.currentIndex]) {
          this.paginationDots[this.currentIndex].classList.add(this.paginationBulletActiveClass);
        }
      }

      // Restart autoplay after manual interaction.
      if (this.group.getAttribute('gft-slider-autoplay') !== 'pause') {
        this.startAutoplay();
      }
    }

    /**
     * Advances to the next slide.
     */
    goToNextSlide() {
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.totalSlides) nextIndex = 0;
      this.goToSlide(nextIndex);
    }

    /**
     * Moves to the previous slide.
     */
    goToPrevSlide() {
      let prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) prevIndex = this.totalSlides - 1;
      this.goToSlide(prevIndex);
    }
  }

  // Initialize all slider groups on the page.
  const sliderGroups = document.querySelectorAll('[gft-slider-group]');
  sliderGroups.forEach(group => new Slider(group));
});

//Video Player
document.addEventListener('DOMContentLoaded', () => {
  class VideoPlayer {
    constructor(embed) {
      this.embed = embed;
      this.group = embed.closest('[gft-video-group]');
      this.video = null;
      this.controlsAttached = false;
      this.isDragging = false;
      this.hoverTimeout = null;
      this.initialActivateHandler = this.initialActivate.bind(this);
    }

    init() {
      // Prevent multiple initializations.
      if (this.video) return;
      
      const videoSrc = this.embed.getAttribute('gft-video-src');
      if (!videoSrc) return;

      // Create and configure the video element.
      const video = document.createElement('video');
      video.src = videoSrc;
      video.muted = true;
      video.autoplay = true;
      video.loop = false;
      video.playsInline = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      this.embed.appendChild(video);
      this.video = video;

      // Initialize group attributes and styling.
      if (this.group) {
        this.group.setAttribute('gft-video-initialized', 'false');
        this.group.setAttribute('gft-video-status', 'pause');
        this.group.setAttribute('gft-video-sound', 'muted');
        this.group.setAttribute('gft-video-metadata', 'not-loaded');
        this.group.setAttribute('gft-video-hover', 'false');
        this.group.setAttribute('gft-video-end', 'false');
      }
      
      video.addEventListener('ended', () => {
        if (this.group) {
          this.group.setAttribute('gft-video-end', 'true');
          this.group.setAttribute('gft-video-status', 'pause');
        }
      });

      // Add hover listeners to show/hide controls.
      // This works for both desktop (mousemove) and mobile (touchstart and touchmove)
      const handleHover = () => {
        if (this.group) {
          this.group.setAttribute('gft-video-hover', 'true');
          // Clear any existing timeout so we restart the timer each time
          if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
          }
          // After 3 seconds of no hover activity, set the attribute back to false
          this.hoverTimeout = setTimeout(() => {
            this.group.setAttribute('gft-video-hover', 'false');
          }, 2000);
        }
      };

      // Attach events for desktop and mobile
      this.group.addEventListener('mousemove', handleHover);
      this.group.addEventListener('touchstart', handleHover);
      this.group.addEventListener('touchmove', handleHover);
      this.video.addEventListener('click', handleHover);


      // Video event listeners for metadata and time updates.
      video.addEventListener('loadedmetadata', () => {
        // Set the metadata attribute on the video group
        if (this.group) {
          this.group.setAttribute('gft-video-metadata', 'loaded');
        }
        const timerDisplay = this.group ? this.group.querySelector('[gft-video-timer]') : null;
        if (timerDisplay) {
          timerDisplay.innerText = `${this.formatTime(video.currentTime)} / ${this.formatTime(video.duration)}`;
        }
      });

      video.addEventListener('timeupdate', () => {
        // Only update progress if not dragging
        if (this.isDragging) return;
      
        const timerDisplay = this.group ? this.group.querySelector('[gft-video-timer]') : null;
        const timeline = this.group ? this.group.querySelector('[gft-video-timeline]') : null;
        const progressBar = this.group ? this.group.querySelector('[gft-video-progress]') : null;
        if (timerDisplay && video.duration) {
          timerDisplay.innerText = `${this.formatTime(video.currentTime)} / ${this.formatTime(video.duration)}`;
        }
        if (timeline && progressBar && video.duration) {
          const percentage = (video.currentTime / video.duration) * 100;
          progressBar.style.width = percentage + '%';
        }
      });

      // Attach the video group controls only once per group.
      if (this.group && !this.controlsAttached) {
        this.attachControlListeners();
        this.controlsAttached = true;
      }

      // Attach initial activation listener.
      video.addEventListener('click', this.initialActivateHandler);
      const initializer = this.group ? this.group.querySelector('[gft-video-initializer]') : null;
      if (initializer) {
        initializer.addEventListener('click', e => {
          e.stopPropagation();
          handleHover();
          this.initialActivate();
        });
      }
    }

    attachControlListeners() {
      if (!this.group) return;
      const playControl = this.group.querySelector('[gft-video-play-control]');
      const soundControl = this.group.querySelector('[gft-video-sound-control]');
      const timeline = this.group.querySelector('[gft-video-timeline]');
      const progressBar = this.group.querySelector('[gft-video-progress]');
      const progressDot = this.group.querySelector('[gft-video-progress-dot]');
      const deinitControl = this.group.querySelector('[gft-video-deinitialize]');

      if (playControl) {
        playControl.addEventListener('click', e => {
          e.stopPropagation();
          if (this.video) {
            if (this.video.paused) {
              this.video.play();
              this.group.setAttribute('gft-video-status', 'play');
            } else {
              this.video.pause();
              this.group.setAttribute('gft-video-status', 'pause');
            }
          }
        });
      }

      if (soundControl) {
        soundControl.addEventListener('click', e => {
          e.stopPropagation();
          if (this.video) {
            this.video.muted = !this.video.muted;
            this.group.setAttribute('gft-video-sound', this.video.muted ? 'muted' : 'unmuted');
          }
        });
      }

      if (deinitControl) {
        deinitControl.addEventListener('click', e => {
          e.stopPropagation();
          // Pause and mute the video.
          if (this.video) {
            this.video.muted = true;
          }
          // Update group attributes to mark it as deinitialized.
          this.group.setAttribute('gft-video-initialized', 'false');
        });
      }

      if (timeline && progressBar && progressDot) {
        // Utility function to update progress from a clientX value.
        const updateProgress = clientX => {
          const timelineRect = timeline.getBoundingClientRect();
          let newX = clientX - timelineRect.left;
          newX = Math.max(0, Math.min(newX, timelineRect.width));
          const percentage = newX / timelineRect.width;
          progressBar.style.width = (percentage * 100) + '%';
          if (this.video && this.video.duration) {
            this.video.currentTime = percentage * this.video.duration;
          }
          // Update timer display with the new time value.
          const timerDisplay = this.group ? this.group.querySelector('[gft-video-timer]') : null;
          if (timerDisplay && this.video && this.video.duration) {
            timerDisplay.innerText = `${this.formatTime(percentage * this.video.duration)} / ${this.formatTime(this.video.duration)}`;
          }
        };
      
        // --- Dragging the Progress Dot ---  
        const startDrag = (startEvent, isTouch) => {
          startEvent.preventDefault();
          const timelineRect = timeline.getBoundingClientRect();
          // Set the dragging flag to true.
          this.isDragging = true;
      
          const onMove = moveEvent => {
            let clientX = isTouch
              ? moveEvent.touches[0].clientX
              : moveEvent.clientX;
            let newX = clientX - timelineRect.left;
            newX = Math.max(0, Math.min(newX, timelineRect.width));
            const percentage = newX / timelineRect.width;
            progressBar.style.width = (percentage * 100) + '%';
      
            // Update timer display dynamically while dragging.
            const timerDisplay = this.group ? this.group.querySelector('[gft-video-timer]') : null;
            if (timerDisplay && this.video && this.video.duration) {
              timerDisplay.innerText = `${this.formatTime(percentage * this.video.duration)} / ${this.formatTime(this.video.duration)}`;
            }
          };
      
          const onEnd = endEvent => {
            let clientX = isTouch
              ? endEvent.changedTouches[0].clientX
              : endEvent.clientX;
            updateProgress(clientX);
            if (isTouch) {
              document.removeEventListener('touchmove', onMove);
              document.removeEventListener('touchend', onEnd);
            } else {
              document.removeEventListener('mousemove', onMove);
              document.removeEventListener('mouseup', onEnd);
            }
            // Reset the dragging flag.
            this.isDragging = false;
          };
      
          if (isTouch) {
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onEnd);
          } else {
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
          }
        };
      
        // Mouse events for dragging the progress dot.
        progressDot.addEventListener('mousedown', e => {
          startDrag(e, false);
        });
      
        // Touch events for dragging the progress dot.
        progressDot.addEventListener('touchstart', e => {
          startDrag(e, true);
        });
      
        // --- Direct Tap/Click on Timeline (if not dragging) ---  
        timeline.addEventListener('click', e => {
          // Avoid processing if the click is on the dot.
          if (e.target === progressDot) return;
          updateProgress(e.clientX);
        });
      
        timeline.addEventListener('touchend', e => {
          if (e.changedTouches && e.changedTouches.length > 0) {
            const touch = e.changedTouches[0];
            updateProgress(touch.clientX);
          }
        });
      }
    }

    initialActivate() {
      if (!this.group || !this.video) return;
      // Do nothing if already activated.
      if (this.group.getAttribute('gft-video-initialized') === 'true') return;

      // Unmute, reset time, and play the video.
      this.video.currentTime = 0;
      this.video.muted = false;
      this.group.setAttribute('gft-video-sound', 'unmuted');
      this.video.play();
      this.group.setAttribute('gft-video-initialized', 'true');
      this.group.setAttribute('gft-video-status', 'play');

      // Dispatch an event so that another script can pause slider autoplay.
      const activatedEvent = new CustomEvent('videoActivated', {
        detail: { video: this.video }
      });
      this.group.dispatchEvent(activatedEvent);

      // Remove the initial activation listener so it only runs once.
      this.video.removeEventListener('click', this.initialActivateHandler);
      
      // Attach toggle functionality for subsequent clicks on the video.
      this.video.addEventListener('click', this.togglePlay.bind(this));
    }

    togglePlay(e) {
      // Toggle play/pause on click of an already activated video.
      if (!this.video) return;
      if (this.video.paused) {
        this.video.play();
        if (this.group) {
          this.group.setAttribute('gft-video-status', 'play');
        }
      } else {
        this.video.pause();
        if (this.group) {
          this.group.setAttribute('gft-video-status', 'pause');
        }
      }
      // Prevent event propagation if necessary.
      e.stopPropagation();
    }

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    remove() {
      if (this.video) {
        this.video.pause();
        this.embed.removeChild(this.video);
        this.video = null;
        if (this.group) {
          this.group.setAttribute('gft-video-initialized', 'false');
          this.group.setAttribute('gft-video-status', 'pause');
          this.group.setAttribute('gft-video-metadata', 'not-loaded');
        }
      }
    }
  }

  // Global IntersectionObserver: initialize videos only when they are in viewport and their slide is active.
  const videoObserver = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      const embed = entry.target;
      if (entry.isIntersecting) {
        // Only initialize if the embed’s parent slide is active.
        const slide = embed.closest('[data-slider-status]');
        if (slide && slide.getAttribute('data-slider-status') === 'active') {
          // Create a VideoPlayer instance if not already done.
          if (!embed._videoPlayer) {
            embed._videoPlayer = new VideoPlayer(embed);
          }
          embed._videoPlayer.init();
          observerInstance.unobserve(embed);
        }
      }
    });
  }, { threshold: 0.1 });

  // MutationObserver: when a slide’s status changes, either observe for video initialization or remove players.
  const slideObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-slider-status') {
        const slide = mutation.target;
        const status = slide.getAttribute('data-slider-status');
        const embeds = slide.querySelectorAll('[gft-video-src]');
        if (status === 'active') {
          // When active, observe each embed for lazy initialization.
          embeds.forEach(embed => {
            if (!embed.querySelector('video')) {
              videoObserver.observe(embed);
            }
          });
        } else {
          // When inactive, remove any existing video players and stop observing.
          embeds.forEach(embed => {
            if (embed._videoPlayer) {
              embed._videoPlayer.remove();
            }
            videoObserver.unobserve(embed);
          });
        }
      }
    });
  });

  // Observe all slides that contain a video embed.
  const slides = document.querySelectorAll('[data-slider-status]');
  slides.forEach(slide => {
    if (slide.querySelector('[gft-video-src]')) {
      slideObserver.observe(slide, { attributes: true, attributeFilter: ['data-slider-status'] });
    }
  });

  // For slides already active on load, start observing their embeds.
  const activeSlides = document.querySelectorAll('[data-slider-status="active"]');
  activeSlides.forEach(slide => {
    const embeds = slide.querySelectorAll('[gft-video-src]');
    embeds.forEach(embed => {
      if (!embed.querySelector('video')) {
        videoObserver.observe(embed);
      }
    });
  });
});


//Pause Slide autochange when video is initialized
document.addEventListener('DOMContentLoaded', () => {
  // Listen for the custom "videoActivated" event dispatched by a video group.
  document.querySelectorAll('[gft-video-group]').forEach(group => {
    group.addEventListener('videoActivated', (e) => {
      // Find the nearest slider group that contains this video group.
      const sliderGroup = group.closest('[gft-slider-group]');
      if (sliderGroup && typeof sliderGroup.pauseAutoplay === 'function') {
        sliderGroup.pauseAutoplay();
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const SWIPE_THRESHOLD = 50; // minimalna odległość w px, żeby uznać gest za swipe

  const testimonialAreas = document.querySelectorAll('[testimonial-main-content]');

  testimonialAreas.forEach(area => {
    let startX = 0;
    let startY = 0;
    let isMoving = false;

    area.addEventListener('touchstart', e => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isMoving = true;
    }, { passive: true });

    area.addEventListener('touchmove', e => {
      if (!isMoving || !e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      // Jeśli ruch bardziej poziomy niż pionowy, blokujemy scroll strony.
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault();
      }
    }, { passive: false });

    area.addEventListener('touchend', e => {
      if (!isMoving || !e.changedTouches || e.changedTouches.length === 0) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      isMoving = false;

      // Za mały ruch albo bardziej pionowy – ignorujemy.
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

      const sliderGroup = area.closest('[gft-slider-group]');
      if (!sliderGroup) return;

      const nextBtn = sliderGroup.querySelector('[data-attribute="gft-slider-next"]');
      const prevBtn = sliderGroup.querySelector('[data-attribute="gft-slider-prev"]');

      // Swipe w lewo → następny slide
      if (dx < 0 && nextBtn) {
        nextBtn.click();
      }
      // Swipe w prawo → poprzedni slide
      else if (dx > 0 && prevBtn) {
        prevBtn.click();
      }
    }, { passive: true });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".accordion_wrap").forEach((component, listIndex) => {
    if (component.dataset.scriptInitialized) return;
    component.dataset.scriptInitialized = "true";

    const closePrevious = component.getAttribute("data-close-previous") !== "false";
    const closeOnSecondClick = component.getAttribute("data-close-on-second-click") !== "false";
    const openOnHover = component.getAttribute("data-open-on-hover") === "true";
    const openByDefault = component.getAttribute("data-open-by-default") !== null && !isNaN(+component.getAttribute("data-open-by-default")) ? +component.getAttribute("data-open-by-default") : false;
		const list = component.querySelector(".accordion_list");
    let previousIndex = null,
      closeFunctions = [];

    function removeCMSList(slot) {
      const dynList = Array.from(slot.children).find((child) => child.classList.contains("w-dyn-list"));
      if (!dynList) return;
      const nestedItems = dynList?.firstElementChild?.children;
      if (!nestedItems) return;
      const staticWrapper = [...slot.children];
      [...nestedItems].forEach(el => el.firstElementChild && slot.appendChild(el.firstElementChild));
      staticWrapper.forEach((el) => el.remove());
    }
    removeCMSList(list);

    component.querySelectorAll(".accordion_component").forEach((card, cardIndex) => {
      const button = card.querySelector(".accordion_toggle_button");
      const content = card.querySelector(".accordion_content_wrap");
      const icon = card.querySelector(".accordion_toggle_icon");

      if (!button || !content || !icon) return console.warn("Missing elements:", card);

      button.setAttribute("aria-expanded", "false");
      button.setAttribute("id", "accordion_button_" + listIndex + "_" + cardIndex);
      content.setAttribute("id", "accordion_content_" + listIndex + "_" + cardIndex);
      button.setAttribute("aria-controls", content.id);
      content.setAttribute("aria-labelledby", button.id);
      content.style.display = "none";

      const refresh = () => {
        tl.invalidate();
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      };
      const tl = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: "power1.inOut" }, onComplete: refresh, onReverseComplete: refresh });
      tl.set(content, { display: "block" });
      tl.fromTo(content, { height: 0 }, { height: "auto" });
      tl.fromTo(icon, { rotate: 0 }, { rotate: -180 }, "<");

      const closeAccordion = () => card.classList.contains("is-opened") && (card.classList.remove("is-opened"), tl.reverse(), button.setAttribute("aria-expanded", "false"));
      closeFunctions[cardIndex] = closeAccordion;

      const openAccordion = (instant = false) => {
        if (closePrevious && previousIndex !== null && previousIndex !== cardIndex) closeFunctions[previousIndex]?.();
        previousIndex = cardIndex;
        button.setAttribute("aria-expanded", "true");
        card.classList.add("is-opened");
        instant ? tl.progress(1) : tl.play();
      };
      if (openByDefault === cardIndex + 1) openAccordion(true);

      button.addEventListener("click", () => (card.classList.contains("is-opened") && closeOnSecondClick ? (closeAccordion(), (previousIndex = null)) : openAccordion()));
      if (openOnHover) button.addEventListener("mouseenter", () => openAccordion());
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".approach_asset", {
    rotate: 90,
    ease: "none",
    scrollTrigger: {
      trigger: "#our-approach",     // trigger element
      start: "top bottom",          // trigger top reaches viewport bottom
      end: "bottom top",            // trigger bottom reaches viewport top
      scrub: 1,                  // smooths with scroll
      // markers: true               // uncomment for debugging
    }
  });
});


function initLogoWallCycle() {
  const loopDelay = 1.5;   // Loop Duration
  const duration  = 0.9;   // Animation Duration

  document.querySelectorAll('[data-logo-wall-cycle-init]').forEach(root => {
    const list   = root.querySelector('[data-logo-wall-list]');
    const items  = Array.from(list.querySelectorAll('[data-logo-wall-item]'));

    const shuffleFront = root.getAttribute('data-logo-wall-shuffle') !== 'false';
    const originalTargets = items
      .map(item => item.querySelector('[data-logo-wall-target]'))
      .filter(Boolean);

    let visibleItems   = [];
    let visibleCount   = 0;
    let pool           = [];
    let pattern        = [];
    let patternIndex   = 0;
    let tl;

    function isVisible(el) {
      return window.getComputedStyle(el).display !== 'none';
    }

    function shuffleArray(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function setup() {
      if (tl) {
        tl.kill();
      }
      visibleItems = items.filter(isVisible);
      visibleCount = visibleItems.length;

      pattern = shuffleArray(
        Array.from({ length: visibleCount }, (_, i) => i)
      );
      patternIndex = 0;

      // remove all injected targets
      items.forEach(item => {
        item.querySelectorAll('[data-logo-wall-target]').forEach(old => old.remove());
      });

      pool = originalTargets.map(n => n.cloneNode(true));

      let front, rest;
      if (shuffleFront) {
        const shuffledAll = shuffleArray(pool);
        front = shuffledAll.slice(0, visibleCount);
        rest  = shuffleArray(shuffledAll.slice(visibleCount));
      } else {
        front = pool.slice(0, visibleCount);
        rest  = shuffleArray(pool.slice(visibleCount));
      }
      pool = front.concat(rest);

      for (let i = 0; i < visibleCount; i++) {
        const parent =
          visibleItems[i].querySelector('[data-logo-wall-target-parent]') ||
          visibleItems[i];
        parent.appendChild(pool.shift());
      }

      tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay });
      tl.call(swapNext);
      tl.play();
    }

    function swapNext() {
      const nowCount = items.filter(isVisible).length;
      if (nowCount !== visibleCount) {
        setup();
        return;
      }
      if (!pool.length) return;

      const idx = pattern[patternIndex % visibleCount];
      patternIndex++;

      const container = visibleItems[idx];
      const parent =
        container.querySelector('[data-logo-wall-target-parent]') ||
        container.querySelector('*:has(> [data-logo-wall-target])') ||
        container;
      const existing = parent.querySelectorAll('[data-logo-wall-target]');
      if (existing.length > 1) return;

      const current  = parent.querySelector('[data-logo-wall-target]');
      const incoming = pool.shift();

      gsap.set(incoming, { yPercent: 50, autoAlpha: 0 });
      parent.appendChild(incoming);

      if (current) {
        gsap.to(current, {
          yPercent: -50,
          autoAlpha: 0,
          duration,
          ease: "expo.inOut",
          onComplete: () => {
            current.remove();
            pool.push(current);
          }
        });
      }

      gsap.to(incoming, {
        yPercent: 0,
        autoAlpha: 1,
        duration,
        delay: 0.1,
        ease: "expo.inOut"
      });
    }

    setup();

    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onEnter:     () => tl.play(),
      onLeave:     () => tl.pause(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.pause()
    });

    document.addEventListener('visibilitychange', () =>
      document.hidden ? tl.pause() : tl.play()
    );
  });
}

// Initialize Logo Wall Cycle
document.addEventListener('DOMContentLoaded', () => {
  initLogoWallCycle();
});


document.addEventListener('DOMContentLoaded', function () {
    document
        .getElementById('cookies-settings-link')
        .addEventListener('click', function (event) {
            event.preventDefault();
            Cookiebot.show();
        });
});



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-form-validate]").forEach((form) => {
    form.setAttribute("novalidate", "true");

    const submitWrapper = form.querySelector("[data-submit]");
    if (!submitWrapper) return;

    const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    // Find required inputs — check both [required] and [aria-required="true"]
    const getRequiredInput = (wrapper) =>
      wrapper.querySelector('[required], [aria-required="true"]');

    const validate = (showErrors = false) => {
      let valid = true;

      form.querySelectorAll("[data-validate]").forEach((wrapper) => {
        const input = getRequiredInput(wrapper);
        if (!input) return;

        const value = input.value.trim();
        let fieldValid = value.length > 0;

        if (fieldValid && input.type === "email") {
          fieldValid = validateEmail(value);
        }

        wrapper.classList.toggle("is-filled", value.length > 0);

        if (showErrors) {
          wrapper.classList.toggle("is-error", !fieldValid);
        }

        if (!fieldValid) valid = false;
      });

      if (showErrors) {
        submitWrapper.classList.toggle("is-error", !valid);
      }
      submitWrapper.classList.toggle("is-valid", valid);
      return valid;
    };

    // Live validation
    form.querySelectorAll("[data-validate]").forEach((wrapper) => {
      const input = getRequiredInput(wrapper);
      if (!input) return;
      input.addEventListener("input", () => {
        wrapper.classList.remove("is-error");
        validate(false);
      });
    });

    // Block submit — capture phase
    form.addEventListener(
      "submit",
      (e) => {
        if (!validate(true)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      },
      true
    );

    // Block button click — capture phase
    submitWrapper.addEventListener(
      "click",
      (e) => {
        if (!validate(true)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      },
      true
    );

    validate(false);
  });
});


(function () {
  // Zbierz dostępne customy z <symbol id="..."> w spricie
  function collectCustomIds() {
    var ids = new Set();
    document.querySelectorAll('svg symbol[id]').forEach(function (sym) {
      ids.add(sym.id);
    });
    return ids;
  }

  // wyciągnij klasę ikony "ph-*" z <i class="ph-duotone ph-xxx">
  function getIconId(el) {
    var cls = Array.from(el.classList);
    return cls.find(function (c) { return c.startsWith('ph-') && c !== 'ph-duotone'; }) || null;
  }

  function upgradeOne(el, customIds) {
    var id = getIconId(el);
    if (!id) return;

    // jeśli nie ma takiego symbolu w spricie → to Phosphor, nic nie robimy
    if (!customIds.has(id)) return;

    // zamień zawartość na SVG <use> do symbolu
    el.innerHTML =
      '<svg aria-hidden="true" focusable="false" width="1em" height="1em" style="vertical-align:-0.125em">' +
        '<use href="#' + id + '" xlink:href="#' + id + '"></use>' +
      '</svg>';
  }

  function process(root, customIds) {
    root.querySelectorAll('i.ph-duotone').forEach(function (el) {
      upgradeOne(el, customIds);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1) zbuduj cache symboli (O(liczba symboli))
    var customIds = collectCustomIds();

    // 2) przerób istniejące
    process(document, customIds);

    // 3) nasłuchuj dynamicznych zmian (CMS listy, lazy-load, filtry)
    var mo = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes && m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.matches && n.matches('i.ph-duotone')) upgradeOne(n, customIds);
          if (n.querySelectorAll) process(n, customIds);
        });
      });
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    // (opcjonalnie) jeśli kiedyś dołożysz sprite dynamicznie po DOMContentLoaded,
    // możesz odświeżyć cache:
    // customIds = collectCustomIds();
  });
})();


/*!
 * Based on theme-collector.js from lumosframework/scripts (MIT)
 * Copyright (c) Lumos
 * License: MIT — see https://github.com/lumosframework/scripts/blob/main/LICENSE
 * Modifications by <Your Name/Org>, 2025
 */

/**
 * Theme Collector 1.2.1
 * Uses the --_s-colors---* variable collection by default
 */
function getColorThemes({ variablePrefix = "--_s-colors---" } = {}) {
  const STORAGE_KEYS = {
    THEMES: `colorThemes_data_${variablePrefix}`,
    PUBLISH_DATE: `colorThemes_publishDate_${variablePrefix}`,
  };

  function getPublishDate() {
    const htmlComment = document.documentElement.previousSibling;
    return htmlComment?.nodeType === Node.COMMENT_NODE
      ? new Date(
          htmlComment.textContent.match(/Last Published: (.+?) GMT/)?.[1] || ""
        ).getTime()
      : null;
  }

  function loadFromStorage() {
    try {
      const storedPublishDate = localStorage.getItem(STORAGE_KEYS.PUBLISH_DATE);
      const currentPublishDate = getPublishDate();
      if (
        !currentPublishDate ||
        !storedPublishDate ||
        storedPublishDate !== currentPublishDate.toString()
      )
        return null;
      const raw = localStorage.getItem(STORAGE_KEYS.THEMES);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
      return null;
    }
  }

  function saveToStorage(themes) {
    try {
      const publishDate = getPublishDate();
      if (publishDate) {
        localStorage.setItem(STORAGE_KEYS.PUBLISH_DATE, publishDate.toString());
        localStorage.setItem(STORAGE_KEYS.THEMES, JSON.stringify(themes));
      }
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }

  window.colorThemes = window.colorThemes || {
    themes: {},
    getTheme(themeName = "", brandName = "") {
      if (!themeName) return this.getTheme(Object.keys(this.themes)[0], brandName);
      const theme = this.themes[themeName];
      if (!theme) return {};
      if (!theme.brands || Object.keys(theme.brands).length === 0) return theme;
      if (!brandName) return theme.brands[Object.keys(theme.brands)[0]];
      return theme.brands[brandName] || {};
    },
  };

  const cachedThemes = loadFromStorage();
  if (cachedThemes) {
    window.colorThemes.themes = cachedThemes;
    document.dispatchEvent(new CustomEvent("colorThemesReady"));
    return;
  }

  const firstLink = document.querySelector('link[rel="stylesheet"]');
  if (!firstLink?.href) return null;

  const escapeForRegExp = (s) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const varPrefixEsc = escapeForRegExp(variablePrefix);

  const themeVariables = new Set();
  const themeClasses = new Set();
  const brandClasses = new Set();

  fetch(firstLink.href)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Failed to fetch stylesheet: ${response.statusText}`);
      return response.text();
    })
    .then((cssText) => {
      // Collect variables that start with --_s-colors---
      const varDeclRE = new RegExp(`${varPrefixEsc}[\\w-]+:\\s*[^;]+`, "g");
      (cssText.match(varDeclRE) || []).forEach((decl) =>
        themeVariables.add(decl.split(":")[0].trim())
      );

      // Discover theme/brand toggling classes
      (cssText.match(/\.u-(theme|brand)-[\w-]+/g) || []).forEach((className) => {
        if (className.startsWith(".u-theme-")) themeClasses.add(className);
        if (className.startsWith(".u-brand-")) brandClasses.add(className);
      });

      const themeVariablesArray = Array.from(themeVariables);

      function checkClass(themeClass, brandClass) {
        const el = document.documentElement;
        const previous = el.className;

        el.className = "";
        if (themeClass) el.classList.add(themeClass);
        if (brandClass) el.classList.add(brandClass);

        const styleObject = {};
        themeVariablesArray.forEach((variable) => {
          styleObject[variable] = getComputedStyle(el).getPropertyValue(variable);
        });

        el.className = previous;
        return styleObject;
      }

      themeClasses.forEach((themeClassWithDot) => {
        const themeName = themeClassWithDot.replace(".", "").replace("u-theme-", "");
        window.colorThemes.themes[themeName] = { brands: {} };

        if (brandClasses.size) {
          brandClasses.forEach((brandClassWithDot) => {
            const brandName = brandClassWithDot.replace(".", "").replace("u-brand-", "");
            window.colorThemes.themes[themeName].brands[brandName] = checkClass(
              themeClassWithDot.slice(1),
              brandClassWithDot.slice(1)
            );
          });
        } else {
          window.colorThemes.themes[themeName] = checkClass(
            themeClassWithDot.slice(1)
          );
        }
      });

      if (!themeClasses.size && themeVariablesArray.length) {
        window.colorThemes.themes.default = checkClass();
      }

      saveToStorage(window.colorThemes.themes);
      document.dispatchEvent(new CustomEvent("colorThemesReady"));
    })
    .catch((error) => console.error("Error:", error.message));
}

window.addEventListener("DOMContentLoaded", () => {
  // Your collection uses variables like: --_s-colors---background--primary
  getColorThemes({ variablePrefix: "--_s-colors---" });
});



document.addEventListener("colorThemesReady", () => {
  // Build the timeline once
  const navTl = gsap.timeline({ paused: true });
  navTl.to(".nav_component", { duration: 0.3, ...colorThemes.getTheme("light") });

  // Helper: is any Webflow dropdown toggle expanded?
  const isAnyDropdownExpanded = () =>
    !!document.querySelector('.w-dropdown-toggle[aria-expanded="true"]');

  let lastLightActive = null;

  function syncWithScrollState() {
    const started = document.body.getAttribute("data-scrolling-started") === "true";
    const lightActive = started || isAnyDropdownExpanded();

    if (lightActive !== lastLightActive) {
      if (lightActive) navTl.play();
      else navTl.reverse();
      lastLightActive = lightActive;
    }
  }

  // Initial sync
  syncWithScrollState();

  // Watch scroll-start attribute and aria-expanded changes anywhere in the DOM
  const observer = new MutationObserver(syncWithScrollState);
  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["data-scrolling-started", "aria-expanded"],
  });

  // Fallback: also react to interactions that may toggle aria-expanded
  document.addEventListener("click", syncWithScrollState, true);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") syncWithScrollState();
  }, true);
});

!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
