import { useId, useState } from 'react'
import type { RegionColourMap, RegionId } from '../types'
import { regions } from '../data/regions'
import { maskGeometry } from './maskGeometry'
import { architecturalDetail } from '../utils/architecturalDetail'

const foundationUrl = `${import.meta.env.BASE_URL}assets/foundation-elevation.png`

interface Props {
  colours: RegionColourMap
  detailStrength: number
  selectedRegion: RegionId | null
  onSelectRegion: (region: RegionId) => void
  inspect?: boolean
}

export function ElevationCanvas({ colours, detailStrength, selectedRegion, onSelectRegion, inspect = false }: Props) {
  const [coordinates, setCoordinates] = useState('')
  const [detail, setDetail] = useState<string>()
  const uid = useId().replace(/:/g, '')
  const ceilingId = `${uid}-ceiling`
  const wallId = `${uid}-wall`
  const paintId = `${uid}-paint`
  const unpaintedId = `${uid}-unpainted`
  const clipFor = (id: RegionId) => id === 'verandahCeiling' ? `url(#${ceilingId})`
    : id === 'weatherboards' ? `url(#${wallId})` : undefined
  const maskPaths = (fill: string) => regions.map(({ id }) => (
    <path key={id} d={maskGeometry[id]} fillRule="evenodd" fill={fill} clipPath={clipFor(id)} />
  ))
  return (
    <div className="elevation-shell">
      <div className="elevation-stage">
        <img src={foundationUrl} width="1448" height="1086"
          alt="Front elevation of the Dorrigo weatherboard house"
          onLoad={(event) => setDetail(architecturalDetail(event.currentTarget))} />
        <svg className="mask-layer" viewBox="0 0 1448 1086"
          preserveAspectRatio="xMidYMid meet" aria-label="Colour overlay regions"
          onPointerMove={(event) => {
            if (!inspect) return
            const point = event.currentTarget.createSVGPoint()
            point.x = event.clientX
            point.y = event.clientY
            const matrix = event.currentTarget.getScreenCTM()
            if (matrix) {
              const local = point.matrixTransform(matrix.inverse())
              setCoordinates(`${Math.round(local.x)}, ${Math.round(local.y)}`)
            }
          }} onPointerLeave={() => setCoordinates('')}>
          {/* Clip ceiling and wall separately: rafters cross the shared y=75 edge. */}
          <defs>
            <clipPath id={ceilingId}><path d="M0 0H1448V75H0Z" /></clipPath>
            <clipPath id={wallId}><path d="M0 75H1448V918H0Z" /></clipPath>
            <mask id={paintId} maskUnits="userSpaceOnUse" x="0" y="0" width="1448" height="1086">
              {maskPaths('white')}
            </mask>
            <mask id={unpaintedId} maskUnits="userSpaceOnUse" x="0" y="0" width="1448" height="1086">
              <rect width="1448" height="1086" fill="white" />
              {maskPaths('black')}
            </mask>
          </defs>
          {/* A: Actual paint colour, independent of detail strength. */}
          {regions.map(({ id, label }) => (
            <path key={id} d={maskGeometry[id]} fillRule="evenodd"
              clipPath={clipFor(id)}
              data-region={id} data-active-colour={colours[id]}
              fill={colours[id]} opacity={1}
              className={`mask${inspect ? ' inspected' : ''}${inspect && selectedRegion === id ? ' selected' : ''}`}
              role="button" tabIndex={0} aria-label={`Select ${label}`} aria-pressed={selectedRegion === id}
              onClick={() => onSelectRegion(id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelectRegion(id)
                }
              }} />
          ))}
          {/* B: Neutral local linework; smooth areas are transparent. */}
          {detail && <image data-layer="architectural-detail" href={detail} width="1448" height="1086"
            mask={`url(#${paintId})`} opacity={detailStrength} pointerEvents="none" />}
          {/* C: Exact original glass, hardware and other unpainted pixels. */}
          <image href={foundationUrl} width="1448" height="1086"
            mask={`url(#${unpaintedId})`} pointerEvents="none" />
        </svg>
      </div>
      <p className="canvas-note">
        {inspect ? `Mask inspection · ${selectedRegion ?? 'No region selected'} ${selectedRegion ? colours[selectedRegion].toUpperCase() : ''} · ${coordinates || 'Move over the elevation for coordinates'}`
          : 'Digital colour simulation — confirm with physical paint samples.'}
      </p>
    </div>
  )
}
