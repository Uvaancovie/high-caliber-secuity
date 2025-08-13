export type PersonalInput = {
  guard_id: number
  start_time: string // ISO
  end_time: string // ISO
  area?: { city?: string; area?: string } | null
  base_hourly_cents: number // looked up from DB
  risk_multiplier?: number // looked up from DB, default 1.0
}

export type BusinessInput = {
  num_guards: number
  coverage_hours_per_day: 12 | 24
  days_per_month?: number // default 30.4
  level_hourly_cents: number // looked up from DB
  armed: boolean
  include_cctv: boolean
  site_factor?: number // default 1.0
}

const NIGHT_START = 20 // 20:00
const NIGHT_END = 6 // 06:00
const WEEKEND_PCT = 15
const NIGHT_PCT = 20

export function hoursBetweenCeil(startISO: string, endISO: string) {
  const ms = new Date(endISO).getTime() - new Date(startISO).getTime()
  const h = Math.ceil(ms / (60 * 60 * 1000))
  return Math.min(Math.max(h, 1), 24)
}

export function overlapsNight(startISO: string, endISO: string) {
  // Max window is 24h, so check two night windows.
  const start = new Date(startISO)
  const end = new Date(endISO)
  const windows = [0, 1].map((d) => {
    const nightStart = new Date(start)
    nightStart.setDate(start.getDate() + d)
    nightStart.setHours(NIGHT_START, 0, 0, 0)
    const nightEnd = new Date(nightStart)
    nightEnd.setDate(nightStart.getDate() + (NIGHT_START > NIGHT_END ? 1 : 0))
    nightEnd.setHours(NIGHT_END, 0, 0, 0)
    return [nightStart.getTime(), nightEnd.getTime()] as const
  })
  const s = start.getTime(),
    e = end.getTime()
  return windows.some(([ns, ne]) => Math.max(s, ns) < Math.min(e, ne))
}

export function isWeekend(startISO: string) {
  const d = new Date(startISO).getDay() // 0=Sun .. 6=Sat
  return d === 0 || d === 6
}

export function computePersonalQuote(input: PersonalInput) {
  const hours = hoursBetweenCeil(input.start_time, input.end_time)
  const base = input.base_hourly_cents * hours
  const night_pct = overlapsNight(input.start_time, input.end_time) ? NIGHT_PCT : 0
  const weekend_pct = isWeekend(input.start_time) ? WEEKEND_PCT : 0
  const surcharge_factor = (1 + night_pct / 100) * (1 + weekend_pct / 100)
  const risk = input.risk_multiplier ?? 1.0
  const total_cents = Math.round(base * surcharge_factor * risk)

  return {
    hours,
    base_cents: base,
    risk_multiplier: risk,
    surcharges: { night_pct, weekend_pct, risk_multiplier: risk },
    total_cents,
    currency: "ZAR",
  }
}

export function computeBusinessQuote(input: BusinessInput) {
  const ARMED_SURCHARGE_PCT = 30
  const CCTV_FEE_MONTHLY_CENTS = 450000 // R4,500
  const monthly_hours = input.coverage_hours_per_day * (input.days_per_month ?? 30.4)
  const armed_factor = input.armed ? 1 + ARMED_SURCHARGE_PCT / 100 : 1
  const site_factor = input.site_factor ?? 1.0

  const labour_cents = Math.round(
    input.num_guards * input.level_hourly_cents * monthly_hours * armed_factor * site_factor,
  )
  const extras_cents = input.include_cctv ? CCTV_FEE_MONTHLY_CENTS : 0
  const total_cents = labour_cents + extras_cents

  return {
    num_guards: input.num_guards,
    coverage_hours_per_day: input.coverage_hours_per_day,
    days_per_month: input.days_per_month ?? 30.4,
    base_hourly_cents: input.level_hourly_cents,
    armed: input.armed,
    armed_pct: ARMED_SURCHARGE_PCT,
    site_factor,
    include_cctv: input.include_cctv,
    labour_cents,
    extras: { cctv_cents: extras_cents },
    total_cents,
    currency: "ZAR",
  }
}
