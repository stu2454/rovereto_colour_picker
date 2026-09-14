import type { RegionDefinition } from '../types'

export const regions: RegionDefinition[] = [
  {
    id: 'weatherboards',
    label: 'Weatherboards',
    description: 'Main wall cladding',
    defaultColour: '#D8C89C',
  },
  {
    id: 'door',
    label: 'Front door',
    description: 'Door leaf only',
    defaultColour: '#AAB4A4',
  },
  {
    id: 'entryTrim',
    label: 'Door & sidelight trim',
    description: 'Architraves, sidelights and transom framing',
    defaultColour: '#F4F0E4',
  },
  {
    id: 'windowTrim',
    label: 'Window trim',
    description: 'Window architraves and sash framing',
    defaultColour: '#F4F0E4',
  },
  {
    id: 'verandahCeiling',
    label: 'Verandah ceiling',
    description: 'Soffit / ceiling boards',
    defaultColour: '#ECE8DC',
  },
  {
    id: 'verandahTimber',
    label: 'Verandah rafters',
    description: 'Exposed rafters and timber structure',
    defaultColour: '#E8E1D2',
  },
  {
    id: 'deck',
    label: 'Deck',
    description: 'Verandah floorboards',
    defaultColour: '#876A51',
  },
]
