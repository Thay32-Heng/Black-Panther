export default function TelemetrySection() {
  return (
          <section className="telemetry" aria-labelledby="telemetry-title">
        <div className="telemetry-inner">
          <header className="telemetry-heading">
            <p className="telemetry-overline">/ Live Telemetry</p>
            <h2 id="telemetry-title">The Pulse of the Engineer.</h2>
            <p className="telemetry-intro">
              Real-time metrics from my personal APIs. Because what kind of data
              engineer doesn&apos;t track their own data?
            </p>
          </header>

          <div className="telemetry-console">
            <div className="console-bar">
              <div className="console-id">
                <span className="console-crosshair" aria-hidden="true" />
                <span>PERSONAL_OS / TELEMETRY</span>
              </div>
              <div className="console-status">
                <span>API CONNECTED</span>
                <span>POLL: 60S</span>
              </div>
            </div>

            <div className="metrics-grid">
              <article className="metric-card commits-card">
                <div className="metric-topline">
                  <span>01 / GITHUB</span>
                  <span className="metric-signal" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <p className="metric-label">GitHub Commits</p>
                <p className="metric-context">Last 30 Days</p>
                <div className="metric-value-row">
                  <strong>184</strong>
                  <span>+12.4%</span>
                </div>
                <div className="commit-summary">
                  <span>
                    ACTIVE DAYS <strong>22</strong>
                  </span>
                  <span>
                    LONGEST STREAK <strong>09</strong>
                  </span>
                </div>
                <div className="commit-graph" aria-hidden="true">
                  {[2, 4, 3, 5, 7, 4, 6, 8, 5, 7, 9, 6, 8, 10].map(
                    (height, index) => (
                      <i
                        className={index > 10 ? "commit-bar commit-bar-active" : "commit-bar"}
                        style={{ height: `${height * 3}px` }}
                        key={`${height}-${index}`}
                      />
                    ),
                  )}
                </div>
              </article>

              <article className="metric-card listening-card">
                <div className="metric-topline">
                  <span>02 / SPOTIFY API</span>
                  <svg className="music-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 17V5l10-2v12M9 8l10-2" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="16" cy="16" r="3" />
                  </svg>
                </div>
                <p className="metric-label">Now Listening</p>
                <div className="track-info">
                  <span className="album-art" aria-hidden="true">
                    <i />
                  </span>
                  <div>
                    <strong>Midnight Signal</strong>
                    <span>Data After Dark</span>
                  </div>
                </div>
                <div className="audio-wave" aria-hidden="true">
                  {[4, 9, 15, 8, 18, 12, 20, 9, 16, 6, 12, 4].map(
                    (height, index) => (
                      <i style={{ height: `${height}px` }} key={`${height}-${index}`} />
                    ),
                  )}
                </div>
              </article>

              <article className="metric-card status-card">
                <div className="metric-topline">
                  <span>03 / INFRASTRUCTURE</span>
                  <span className="uptime">99.99%</span>
                </div>
                <p className="metric-label">System Status</p>
                <div className="system-online">
                  <span className="online-orbit" aria-hidden="true">
                    <i />
                  </span>
                  <strong>Online</strong>
                </div>
                <div className="system-stats">
                  <span>
                    LATENCY <strong>24ms</strong>
                  </span>
                  <span>
                    SERVICES <strong>08/08</strong>
                  </span>
                </div>
              </article>
            </div>

            <div className="console-footer">
              <span>LAST SYNC: JUST NOW</span>
              <span>ALL SYSTEMS NOMINAL</span>
            </div>
          </div>
        </div>
      </section>
  )
}
