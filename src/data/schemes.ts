import type { ColourScheme } from '../types'

export const presetSchemes: ColourScheme[] = [
  {
    id: 'foundation',
    name: 'Foundation image',
    notes: 'Approximate colours sampled conceptually from the foundation illustration.',
    colours: {
      weatherboards: '#D8C89C',
      door: '#AAB4A4',
      entryTrim: '#F4F0E4',
      windowTrim: '#F4F0E4',
      verandahCeiling: '#ECE8DC',
      verandahTimber: '#E8E1D2',
      deck: '#876A51',
    },
  },
  {
    id: 'vellum-green',
    name: 'Pale neutral + deep green',
    notes: 'Heritage-inspired concept. Digital values are indicative only.',
    colours: {
      weatherboards: '#C9CDBA',
      door: '#304035',
      entryTrim: '#EEE9DC',
      windowTrim: '#EEE9DC',
      verandahCeiling: '#E5E1D5',
      verandahTimber: '#EEE9DC',
      deck: '#725943',
    },
  },
  {
    id: 'warm-cream-green',
    name: 'Warm cream + green',
    notes: 'A warmer Federation-era direction.',
    colours: {
      weatherboards: '#D8BE82',
      door: '#35463B',
      entryTrim: '#F2E9D2',
      windowTrim: '#F2E9D2',
      verandahCeiling: '#EEE7D5',
      verandahTimber: '#F2E9D2',
      deck: '#72543E',
    },
  },
  {
    id: 'stone-burgundy',
    name: 'Stone + burgundy',
    notes: 'Alternative heritage contrast scheme.',
    colours: {
      weatherboards: '#C9C1AE',
      door: '#633E3B',
      entryTrim: '#EFE8D8',
      windowTrim: '#EFE8D8',
      verandahCeiling: '#E8E1D2',
      verandahTimber: '#EFE8D8',
      deck: '#6F5747',
    },
  },
]
