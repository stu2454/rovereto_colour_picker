import { useEffect, useState } from 'react'
import { Copy, RotateCcw, Save, SlidersHorizontal } from 'lucide-react'
import { ColourSwatch } from './components/ColourSwatch'
import { ElevationCanvas } from './components/ElevationCanvas'
import { SchemeCard } from './components/SchemeCard'
import { regions } from './data/regions'
import { presetSchemes } from './data/schemes'
import type { ColourScheme, RegionColourMap, RegionId } from './types'
import {
  loadActiveColours,
  loadSchemeName,
  saveSchemeName,
  loadSavedSchemes,
  saveActiveColours,
  saveSchemes,
} from './utils/storage'

const foundation = presetSchemes[0].colours

export default function App() {
  const [colours, setColours] = useState<RegionColourMap>(
    () => loadActiveColours() ?? foundation,
  )
  const [saved, setSaved] = useState<ColourScheme[]>(loadSavedSchemes)
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>('weatherboards')
  const [detailStrength, setDetailStrength] = useState(0.7)
  const [inspect, setInspect] = useState(false)
  const [schemeName, setSchemeName] = useState(loadSchemeName)
  const [schemeStatus, setSchemeStatus] = useState('')

  const [storageError, setStorageError] = useState(false)
  useEffect(() => {
    const handleError = () => setStorageError(true)
    window.addEventListener('dorrigo-storage-error', handleError)
    return () => window.removeEventListener('dorrigo-storage-error', handleError)
  }, [])
  useEffect(() => saveActiveColours(colours), [colours])

  useEffect(() => { saveSchemeName(schemeName) }, [schemeName])

  const updateRegion = (id: RegionId, value: string) => {
    setColours((current) => ({ ...current, [id]: value }))
  }

  const applyScheme = (scheme: ColourScheme) => {
    setColours({ ...scheme.colours })
    setSchemeName(scheme.name)
    setSchemeStatus(`Loaded “${scheme.name}”.`)
  }

  const addScheme = () => {
    const trimmed = schemeName.trim()
    if (!trimmed) {
      setSchemeStatus('Enter a name before saving your scheme.')
      return
    }

    const next: ColourScheme = {
      id: `custom-${crypto.randomUUID()}`,
      name: trimmed,
      notes: 'Saved locally in this browser.',
      colours: { ...colours },
    }

    const updated = [...saved, next]
    setSaved(updated)
    const persisted = saveSchemes(updated)
    setSchemeStatus(persisted
      ? `Saved “${trimmed}”. It will be available when you reopen this address in the same browser.`
      : 'This scheme is available for this session only because browser storage is unavailable.')
  }

  const removeScheme = (id: string) => {
    const updated = saved.filter((item) => item.id !== id)
    setSaved(updated)
    saveSchemes(updated)
  }

  const copyJson = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(
        {
          name: schemeName,
          colours,
        },
        null,
        2,
      ),
    )
  }

  return (
    <main>
      <header className="app-header">
        <div>
          <p className="eyebrow">38 Myrtle Street — concept tool</p>
          <h1>Dorrigo House Colour Visualiser</h1>
          <p className="lede">
            Test heritage-inspired paint combinations on a fixed architectural elevation.
          </p>
        </div>
        <div className="header-note">
          <strong>Important</strong>
          <span>
            Screen colours are comparative only. Confirm final choices with physical sample pots
            in the actual verandah light.
          </span>
        </div>
      </header>

      {storageError && <p role="alert">Browser storage is unavailable. Changes work for this session but may not survive a refresh.</p>}
      <section className="workspace">
        <ElevationCanvas
          inspect={inspect}
          colours={colours}
          detailStrength={detailStrength}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        <aside className="control-panel">
          <div className="panel-heading">
            <SlidersHorizontal size={18} />
            <h2>Colours</h2>
          </div>

          <div className="swatch-list">
            {regions.map((region) => (
              <div
                key={region.id}
                className={selectedRegion === region.id ? 'region-active' : ''}
                onClick={() => setSelectedRegion(region.id)}
                onFocus={() => setSelectedRegion(region.id)}
              >
                <ColourSwatch
                  label={region.label}
                  description={region.description}
                  value={colours[region.id]}
                  onChange={(value) => updateRegion(region.id, value)}
                />
              </div>
            ))}
          </div>

          {import.meta.env.DEV && (
            <label className="inspection-toggle">
              <input type="checkbox" checked={inspect} onChange={(event) => setInspect(event.target.checked)} />
              Inspect mask outlines
            </label>
          )}
          <label className="opacity-control">
            <span>
              <strong>Line/shadow strength</strong>
              <small>{Math.round(detailStrength * 100)}%</small>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={detailStrength}
              onChange={(event) => setDetailStrength(Number(event.target.value))}
            />
          </label>

          <div className="panel-actions">
            <button
              className="button-secondary"
              onClick={() => setColours(foundation)}
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button className="button-secondary" onClick={copyJson}>
              <Copy size={16} />
              Copy JSON
            </button>
          </div>

          <div className="save-box">
            <label>
              <span>Scheme name</span>
              <input
                value={schemeName}
                onChange={(event) => setSchemeName(event.target.value)}
              />
            </label>
            <button onClick={addScheme}>
              <Save size={16} />
              Save scheme
            </button>
            <p className="canvas-note" role="status">{schemeStatus}</p>
          </div>
        </aside>
      </section>

      <section className="schemes-section" aria-labelledby="saved-heading">
        <div className="section-heading">
          <h2 id="saved-heading">Saved schemes</h2>
          <p>Kept in this browser after a restart. Reopen this same web address to load them.</p>
        </div>
        {saved.length === 0 ? <p>No saved schemes yet. Name your colours and choose Save scheme.</p> : (
          <div className="scheme-grid">
            {saved.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme}
                onApply={() => applyScheme(scheme)} onDelete={() => removeScheme(scheme.id)} />
            ))}
          </div>
        )}
      </section>
      <section className="schemes-section" aria-labelledby="presets-heading">
        <div className="section-heading">
          <h2 id="presets-heading">Preset schemes</h2>
          <p>Digital approximations — confirm colours with physical paint samples.</p>
        </div>
        <div className="scheme-grid">
          {presetSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} onApply={() => applyScheme(scheme)} />
          ))}
        </div>
      </section>
    </main>
  )
}
