// public/scripts/menu-toggle.js
(function () {
  // breakpoint que coincide con "md" de Tailwind (>=768px => desktop)
  const DESKTOP_MQ = "(min-width: 768px)";

  // selectores
  const BTN_ID = "menu-btn";
  const PANEL_ID = "mobile-menu";
  const BAR_IDS = ["bar1", "bar2", "bar3"];

  // estado y handlers para poder removerlos
  let btn = null;
  let panel = null;
  let bound = false;
  let prevActiveElement = null;

  let onToggleClick = null;
  let onKeyDown = null;
  let onLinkClick = null;

  function isDesktop() {
    return window.matchMedia(DESKTOP_MQ).matches;
  }

  function lockScroll() {
    document.documentElement.style.overflow = "hidden";
  }
  function unlockScroll() {
    document.documentElement.style.overflow = "";
  }

  function setBurgerIcon(open) {
    const b1 = document.getElementById(BAR_IDS[0]);
    const b2 = document.getElementById(BAR_IDS[1]);
    const b3 = document.getElementById(BAR_IDS[2]);

    if (!b1 || !b2 || !b3) return;

    if (open) {
      b1.style.transform = "rotate(45deg) translate(6px,6px)";
      b2.style.opacity = "0";
      b3.style.transform = "rotate(-45deg) translate(6px,-6px)";
    } else {
      b1.style.transform = "none";
      b2.style.opacity = "1";
      b3.style.transform = "none";
    }
  }

  // focus trap: keep Tab inside panel while open (basic)
  function trapFocus(ev) {
    if (!panel) return;
    const focusable = panel.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (ev.key !== "Tab") return;

    if (ev.shiftKey) {
      // shift + tab
      if (document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      }
    } else {
      // tab
      if (document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    }
  }

  function openMenu() {
    if (!panel || !btn) return;
    panel.classList.remove("translate-x-full");
    panel.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    setBurgerIcon(true);
    lockScroll();

    // focus management
    prevActiveElement = document.activeElement;
    const firstFocusable = panel.querySelector('a,button,[tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeMenu() {
    if (!panel || !btn) return;
    panel.classList.add("translate-x-full");
    panel.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    setBurgerIcon(false);
    unlockScroll();

    // restore focus
    if (prevActiveElement && typeof prevActiveElement.focus === "function") {
      prevActiveElement.focus();
    }
    prevActiveElement = null;
  }

  function initMenuBindings() {
    if (bound) return;
    btn = document.getElementById(BTN_ID);
    panel = document.getElementById(PANEL_ID);
    if (!btn || !panel) return;

    // ensure initial ARIA state
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");

    onToggleClick = () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      open ? closeMenu() : openMenu();
    };

    onKeyDown = (e) => {
      // Escape closes
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      // trap focus
      trapFocus(e);
    };

    onLinkClick = (e) => {
      // close when clicking any internal link
      // if link has target="_blank" keep open behavior untouched
      if (e.target && e.target.closest) {
        const a = e.target.closest("a");
        if (a && a.target !== "_blank") closeMenu();
      }
    };

    btn.addEventListener("click", onToggleClick);
    window.addEventListener("keydown", onKeyDown);
    panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", onLinkClick));

    bound = true;
  }

  function destroyMenuBindings() {
    if (!bound) return;
    if (!btn || !panel) {
      bound = false;
      return;
    }

    btn.removeEventListener("click", onToggleClick);
    window.removeEventListener("keydown", onKeyDown);
    panel.querySelectorAll("a").forEach((a) => a.removeEventListener("click", onLinkClick));

    // reset UI state
    panel.classList.add("translate-x-full");
    panel.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    setBurgerIcon(false);
    unlockScroll();

    // clear references
    onToggleClick = null;
    onKeyDown = null;
    onLinkClick = null;
    btn = null;
    panel = null;
    bound = false;
  }

  // Called when breakpoint changes
  function handleBreakpointChange(e) {
    if (e.matches) {
      // desktop: destroy mobile menu bindings
      destroyMenuBindings();
    } else {
      // mobile: init bindings
      initMenuBindings();
    }
  }

  // initialize on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const mql = window.matchMedia(DESKTOP_MQ);
    // initial setup depending on viewport
    if (mql.matches) {
      destroyMenuBindings();
    } else {
      initMenuBindings();
    }

    // listen breakpoint changes
    // older browsers might not support addEventListener on MediaQueryList,
    // fallback to addListener if necessary
    try {
      mql.addEventListener("change", handleBreakpointChange);
    } catch (err) {
      mql.addListener(handleBreakpointChange);
    }
  });
})();
