import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6"><Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Go home</Link></div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Try again</button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Projeto dos 100K" },
      { name: "description", content: "Estratégias práticas para vender na Shopee." },
      { name: "author", content: "Mark Diniz" },
      { property: "og:title", content: "Projeto dos 100K" },
      { property: "og:description", content: "Estratégias práticas para vender na Shopee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }, { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const STYLE_ID = "nextgen-live-cta-fix";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        .nextgen-cta-logo{width:30px!important;height:30px!important;object-fit:contain!important;display:block!important;flex:0 0 auto!important;background:transparent!important;border:0!important;box-shadow:none!important}
        .nextgen-cta-trust{display:flex!important;justify-content:center!important;align-items:center!important;width:100%!important;margin:8px auto 0!important;line-height:0!important;background:transparent!important}
        .nextgen-cta-trust img{display:block!important;width:min(100%,462px)!important;height:auto!important;max-height:38px!important;object-fit:contain!important;background:transparent!important;border:0!important}
        .nextgen-live-countdown{background:linear-gradient(100deg,#ff7b32 0%,#ff3d2e 55%,#ff3328 100%)!important;color:#fff!important;text-align:center!important}
        .nextgen-live-countdown .countdown-values{display:flex!important;align-items:baseline!important;justify-content:center!important;gap:4px!important}
        .nextgen-live-countdown .countdown-item{display:flex!important;align-items:baseline!important;gap:2px!important}
        .nextgen-live-countdown .countdown-num{font-size:24px!important;line-height:1!important;font-weight:800!important}
        .nextgen-live-countdown .countdown-unit{font-size:9px!important;font-weight:600!important}
        .nextgen-live-countdown .countdown-sep{font-size:18px!important}
      `;
      document.head.appendChild(style);
    }

    const normalize = (value: string) => (value || "").replace(/\s+/g, " ").trim().toUpperCase();
    const CTA_TEXT = "QUERO DOMINAR AS VENDAS";
    const TIMER_KEY = "nextgen_24h_offer_started";
    const DURATION = 24 * 60 * 60 * 1000;

    const findCtas = () => Array.from(document.querySelectorAll<HTMLElement>("a,button,[role='button']")).filter((el) => normalize(el.textContent || "").includes(CTA_TEXT));

    const cleanOldEnhancement = () => {
      document.querySelectorAll<HTMLElement>(".nextgen-cta-enhanced").forEach((el) => {
        el.classList.remove("nextgen-cta-enhanced");
        el.querySelectorAll(".nextgen-store-logo").forEach((img) => img.remove());
      });
      document.querySelectorAll(".nextgen-trust-strip").forEach((el) => el.remove());
    };

    const addLogoAndTrust = () => {
      findCtas().forEach((cta) => {
        cta.classList.add("nextgen-cta-active");
        if (!cta.querySelector(".nextgen-cta-logo")) {
          const logo = document.createElement("img");
          logo.className = "nextgen-cta-logo";
          logo.src = "https://present-crimson-8pbuvjls.edgeone.dev/";
          logo.alt = "";
          logo.setAttribute("aria-hidden", "true");
          logo.onerror = () => { logo.style.display = "none"; };
          const text = cta.querySelector<HTMLElement>(".elementor-button-content-wrapper") || cta;
          text.insertBefore(logo, text.firstChild);
        }

        const parent = cta.closest<HTMLElement>(".elementor-element") || cta.parentElement;
        if (parent && !parent.querySelector(":scope > .nextgen-cta-trust")) {
          const trust = document.createElement("div");
          trust.className = "nextgen-cta-trust";
          const img = document.createElement("img");
          img.src = "/images/compra-segura.webp";
          img.alt = "Compra segura, satisfação garantida e privacidade protegida";
          trust.appendChild(img);
          parent.appendChild(trust);
        }
      });
    };

    const setupCountdown = () => {
      const label = Array.from(document.querySelectorAll<HTMLElement>("body *")).find((el) => normalize(el.textContent || "").includes("OFERTA ENCERRA EM:") && (el.textContent || "").length < 100);
      if (!label) return;
      let host = label.closest<HTMLElement>(".elementor-element") || label.parentElement;
      if (!host) return;
      let box = host.querySelector<HTMLElement>(".nextgen-live-countdown");
      if (!box) {
        const old = host.querySelectorAll(".countdown-item,.countdown-sep,#cd-dias,#cd-horas,#cd-min,#cd-seg");
        if (old.length) {
          box = document.createElement("div");
          box.className = "nextgen-live-countdown";
          box.innerHTML = `<div class="countdown-values"><span class="countdown-item"><span class="countdown-num" data-next="dias">00</span><span class="countdown-unit">dias</span></span><span class="countdown-sep">:</span><span class="countdown-item"><span class="countdown-num" data-next="horas">24</span><span class="countdown-unit">horas</span></span><span class="countdown-sep">:</span><span class="countdown-item"><span class="countdown-num" data-next="min">00</span><span class="countdown-unit">min</span></span><span class="countdown-sep">:</span><span class="countdown-item"><span class="countdown-num" data-next="seg">00</span><span class="countdown-unit">seg</span></span></div>`;
          old[0].closest<HTMLElement>(".countdown-wrap")?.replaceWith(box) || host.appendChild(box);
        }
      }
      if (!box) return;
      const started = localStorage.getItem(TIMER_KEY);
      const remaining = started ? Math.max(0, Number(started) + DURATION - Date.now()) : DURATION;
      const total = Math.floor(remaining / 1000);
      const values: Record<string, number> = { dias: Math.floor(total / 86400), horas: Math.floor((total % 86400) / 3600), min: Math.floor((total % 3600) / 60), seg: total % 60 };
      Object.entries(values).forEach(([key, value]) => { const el = box!.querySelector<HTMLElement>(`[data-next="${key}"]`); if (el) el.textContent = String(value).padStart(2, "0"); });
    };

    const startTimer = () => { if (!localStorage.getItem(TIMER_KEY)) localStorage.setItem(TIMER_KEY, String(Date.now())); };
    const bind = () => findCtas().forEach((cta) => { if (cta.dataset.nextgen24Bound) return; cta.dataset.nextgen24Bound = "1"; cta.addEventListener("click", startTimer, true); });

    cleanOldEnhancement();
    addLogoAndTrust();
    bind();
    setupCountdown();
    const timer = window.setInterval(() => setupCountdown(), 1000);
    const observer = new MutationObserver(() => { addLogoAndTrust(); bind(); setupCountdown(); });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { clearInterval(timer); observer.disconnect(); };
  }, []);

  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
