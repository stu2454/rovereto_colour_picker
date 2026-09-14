export type RegionId =
  | 'weatherboards'
  | 'door'
  | 'entryTrim'
  | 'windowTrim'
  | 'verandahCeiling'
  | 'verandahTimber'
  | 'deck'

export type RegionColourMap = Record<RegionId, string>

export interface RegionDefinition {
  id: RegionId
  label: string
  description: string
  defaultColour: string
}

export interface ColourScheme {
  id: string
  name: string
  notes?: string
  colours: RegionColourMap
}
