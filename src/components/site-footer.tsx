import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src="/images/pegasus.png"
            alt="Pegasus MedFlight"
            width={1110}
            height={1210}
            className="mb-5 h-16 w-auto sm:h-20"
          />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {SITE.oneLiner}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Ground medical courier and logistics intelligence. Not an air ambulance.
          </p>
          <address className="mt-6 text-sm not-italic text-fg">
            Phoenix, Arizona
            <span className="mt-1 block text-muted">San Diego, California</span>
          </address>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-kicker text-subtle">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-kicker text-subtle">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <Link to="/request" className="hover:text-fg">
                Get Started
              </Link>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-fg">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.legal.dba}. {SITE.legal.city}.
          </p>
          <p>HIPAA-aware · BBP-aware · Chain of custody</p>
        </div>
      </div>
    </footer>
  );
}
