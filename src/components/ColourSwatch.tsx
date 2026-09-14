import { useState } from 'react'

interface Props {
  label: string
  value: string
  description?: string
  onChange: (value: string) => void
}

export function ColourSwatch({ label, value, description, onChange }: Props) {
  const [edit, setEdit] = useState({ base: value, text: value })
  // Reconcile during render, never in a delayed effect that can overwrite typing.
  if (edit.base !== value) setEdit({ base: value, text: value })
  const draft = edit.base === value ? edit.text : value
  const setDraft = (text: string) => setEdit({ base: value, text })
  const valid = /^#[0-9A-Fa-f]{6}$/.test(draft)
  return (
    <div className="swatch-row">
      <span className="swatch-text">
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </span>
      <span className="swatch-controls">
        <input
          aria-label={`${label} colour`}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          className="hex-input"
          aria-label={`${label} hex colour`}
          aria-invalid={!valid}
          title="Enter a six-digit hex colour, such as #AAB4A4"
          value={draft.toUpperCase()}
          onBlur={() => { if (!valid) setDraft(value) }}
          onChange={(event) => {
            const next = event.target.value
            setDraft(next)
            if (/^#[0-9A-Fa-f]{6}$/.test(next)) onChange(next)
          }}
          maxLength={7}
          spellCheck={false}
        />
      </span>
    </div>
  )
}
