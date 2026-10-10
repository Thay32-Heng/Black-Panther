import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "http://localhost:3000";

const siteTitle = "Heng Sengthay — Data Science & Engineering";
const siteDescription =
  "Portfolio of Heng Sengthay, a Y3 Data Science and Engineering student at RUPP looking for internship opportunities in data science, data engineering, analytics, and machine learning.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: siteTitle,
    template: "%s — Heng Sengthay",
  },
  description: siteDescription,
  applicationName: "Heng Sengthay",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Heng Sengthay",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

// Browser extensions (Bitdefender, Grammarly, ColorZilla, LanguageTool, ...) inject
// attributes such as `bis_skin_checked` into the DOM before React hydrates. React treats
// those extra attributes as hydration mismatches and `suppressHydrationWarning` on a
// single element only covers that element, not its children. Strip the known attributes
// before hydration and keep observing briefly in case an extension injects them late.
const extensionAttributeGuard = `(function () {
  var ATTRS = [
    "bis_skin_checked",
    "bis_register",
    "cz-shortcut-listen",
    "data-gr-ext-installed",
    "data-new-gr-c-s-check-loaded",
    "data-lt-installed",
    "data-lt-tmp-id",
    "data-lastpass-icon-root",
    "data-lastpass-root",
    "fdprocessedid",
    "data-google-query-id"
  ];
  var PREFIXES = ["__processed_"];
  function isExtensionAttribute(name) {
    if (!name) return false;
    if (ATTRS.indexOf(name) !== -1) return true;
    for (var i = 0; i < PREFIXES.length; i++) {
      if (name.indexOf(PREFIXES[i]) === 0) return true;
    }
    return false;
  }
  function stripElement(element) {
    if (!element || element.nodeType !== 1) return;
    var attributes = element.attributes;
    for (var i = attributes.length - 1; i >= 0; i--) {
      if (isExtensionAttribute(attributes[i].name)) {
        element.removeAttribute(attributes[i].name);
      }
    }
  }
  function stripTree(root) {
    if (!root || root.nodeType !== 1) return;
    stripElement(root);
    var elements = root.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++) stripElement(elements[i]);
  }
  stripTree(document.documentElement);
  if (typeof MutationObserver === "undefined") return;
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      if (mutation.type === "attributes") {
        if (isExtensionAttribute(mutation.attributeName)) {
          mutation.target.removeAttribute(mutation.attributeName);
        }
      } else {
        for (var j = 0; j < mutation.addedNodes.length; j++) {
          stripTree(mutation.addedNodes[j]);
        }
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true
  });
  window.setTimeout(function () {
    observer.disconnect();
  }, 15000);
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: extensionAttributeGuard }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
