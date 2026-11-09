function SpeakerIcon({ on }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5 H8 L13 5.5 V18.5 L8 14.5 H4 Z" fill="currentColor" fillOpacity="0.2" />
      {on ? (
        <>
          <path d="M16 9 C17.4 10.4 17.4 13.6 16 15" />
          <path d="M18.6 6.6 C21.4 9.4 21.4 14.6 18.6 17.4" />
        </>
      ) : (
        <>
          <path d="M16.5 9.5 L21 14.5" />
          <path d="M21 9.5 L16.5 14.5" />
        </>
      )}
    </svg>
  );
}

// Compact button used inside the navbar.
export function MusicToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      className={`music-toggle ${playing ? 'is-on' : ''}`}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Turn music off' : 'Turn music on'}
    >
      <SpeakerIcon on={playing} />
      <span className="music-toggle-text">{playing ? 'Music On' : 'Music Off'}</span>
    </button>
  );
}

// Floating round button, always visible on the main website.
export function FloatingMusic({ playing, notice, onToggle }) {
  return (
    <div className="music-float">
      {notice && (
        <p className="music-notice" role="status">
          {notice}
        </p>
      )}
      <button
        type="button"
        className={`music-float-btn ${playing ? 'is-on' : ''}`}
        onClick={onToggle}
        aria-pressed={playing}
        aria-label={playing ? 'Music On - tap to turn off' : 'Music Off - tap to turn on'}
        title={playing ? 'Music On' : 'Music Off'}
      >
        <SpeakerIcon on={playing} />
        {playing && (
          <span className="music-bars" aria-hidden="true">
            <i /><i /><i />
          </span>
        )}
      </button>
    </div>
  );
}
