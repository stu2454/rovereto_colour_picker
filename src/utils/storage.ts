import type { ColourScheme, RegionColourMap } from '../types'
import { regions } from '../data/regions'

const ACTIVE_KEY = 'dorrigo-colour-visualiser:active'
const NAME_KEY = 'dorrigo-colour-visualiser:active-name'
const SAVED_KEY = 'dorrigo-colour-visualiser:saved'

export function isColourMap(value: unknown): value is RegionColourMap {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return regions.every(({ id }) => {
    const colour = (value as Record<string, unknown>)[id]
    return typeof colour === 'string' && /^#[0-9a-f]{6}$/i.test(colour)
  })
}

export function loadActiveColours(): RegionColourMap | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(ACTIVE_KEY) ?? 'null')
    return isColourMap(value) ? value : null
  } catch { return null }
}

function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    // Restricted storage or quota must not prevent in-memory editing.
    window.dispatchEvent(new Event('dorrigo-storage-error'))
    return false
  }
}
export function saveActiveColours(colours: RegionColourMap) { persist(ACTIVE_KEY, colours) }

export function loadSavedSchemes(): ColourScheme[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]')
    if (!Array.isArray(value)) return []
    return value.filter((item): item is ColourScheme =>
      item && typeof item === 'object' && typeof item.id === 'string' &&
      typeof item.name === 'string' && item.name.trim().length > 0 &&
      (item.notes === undefined || typeof item.notes === 'string') && isColourMap(item.colours))
  } catch { return [] }
}
export function saveSchemes(schemes: ColourScheme[]) { return persist(SAVED_KEY, schemes) }

export function loadSchemeName(): string {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(NAME_KEY) ?? 'null')
    return typeof value === 'string' ? value : 'My scheme'
  } catch { return 'My scheme' }
}
export function saveSchemeName(name: string) { return persist(NAME_KEY, name) }
