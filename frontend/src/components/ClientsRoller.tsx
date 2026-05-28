const clients = [
  { name: "Writewisely.ai",       logo: "/company-logo/writewisely.jpeg" },
  { name: "DemandGeography",      logo: "/company-logo/dg.png"          },
  { name: "ApexGeeks",            logo: null },
  { name: "HFDyslexia",           logo: null },
  { name: "Trustpilot",           logo: null },
  { name: "FJ Mobile",            logo: null },
  { name: "ProduceMarketGuide",   logo: null },
  { name: "AGCEUOnline",          logo: null },
  { name: "AGCEU",                logo: null },
];

const doubled = [...clients, ...clients];

export default function ClientsRoller() {
  return (
    <section className="mb-20 md:mb-28">
      <p className="text-xs text-[#3a3a3a] uppercase tracking-widest text-center mb-7">
        Trusted by
      </p>

      <div className="overflow-hidden relative">
        {/* edge fades */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#090909] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#090909] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 min-w-max"
          style={{ animation: "marquee-rtl 32s linear infinite" }}
        >
          {doubled.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 flex-shrink-0 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.015]"
            >
              {client.logo && (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-4 w-auto grayscale opacity-40"
                />
              )}
              <span className="text-sm text-[#4a4a4a] whitespace-nowrap font-medium">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
