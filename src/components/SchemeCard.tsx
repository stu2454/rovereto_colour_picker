import type { ColourScheme } from '../types'

interface Props {
  scheme: ColourScheme
  onApply: () => void
  onDelete?: () => void
}

export function SchemeCard({ scheme, onApply, onDelete }: Props) {
  return (
    <article className="scheme-card">
      <div>
        <h3>{scheme.name}</h3>
        {scheme.notes && <p>{scheme.notes}</p>}
      </div>
      <div className="mini-swatches" aria-hidden="true">
        {Object.values(scheme.colours).map((colour, index) => (
          <span key={`${colour}-${index}`} style={{ background: colour }} />
        ))}
      </div>
      <div className="scheme-card-actions">
        <button onClick={onApply}>{onDelete ? 'Load scheme' : 'Apply'}</button>
        {onDelete && (
          <button className="button-quiet danger" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </article>
  )
}
