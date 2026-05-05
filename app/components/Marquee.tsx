'use client'

export function Marquee() {
  const line1 = 'MARKETER ✦ DRUMMER ✦ DREAMER ✦ BUILDER ✦ WRITER ✦ OPERATOR ✦ MUSICIAN ✦ '
  const line2 = 'OXFORD ✦ ZOMATO ✦ SCHBANG ✦ DELHI ✦ LONDON ✦ MUMBAI ✦ '

  return (
    <section
      className="bg-ink overflow-hidden"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="overflow-hidden mb-4">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-ltr 30s linear infinite' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="font-display font-light text-cream flex-shrink-0"
              style={{ fontSize: '8vw' }}
            >
              {line1}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden" style={{ marginTop: '0.5rem' }}>
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-rtl 35s linear infinite' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="font-display font-light text-cream flex-shrink-0"
              style={{ fontSize: '8vw' }}
            >
              {line2}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
