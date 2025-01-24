class CustomTimetableCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Das 'entity' ist erforderlich.");
    }
    this.config = config;
  }

  render() {
    const entityId = this.config.entity;
    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      this.shadowRoot.innerHTML = `
        <div class="card">
          <div class="title">Entity nicht gefunden: ${entityId}</div>
        </div>
      `;
      return;
    }

    // Konfigurationsparameter
    const maxDepartures = this.config.max_departures ?? 5; // Maximale Anzahl anzuzeigender Fahrten
    const leadTime = this.config.lead_time ?? 0; // Mindestzeit in Minuten, um eine Fahrt zu erreichen
    const excludeDirections = this.config.exclude_directions || []; // Auszuschließende Richtungen
    const excludeLines = this.config.exclude_lines || []; // Auszuschließende Liniennummern
    const excludePlatforms = this.config.exclude_platforms || []; // Auszuschließende Bussteige
    const routePosition = this.config.route_position ?? 68; // Abstand der Route-Elemente vom linken Rand

    // Daten filtern
    const departures = stateObj.attributes.departures || [];
    const filteredDepartures = departures
      .filter(
        (dep) =>
          dep.countdown >= leadTime && // Nur Fahrten, die erreichbar sind
          !excludeDirections.includes(dep.direction) && // Ausschluss bestimmter Richtungen
          !excludeLines.includes(dep.route_number) && // Ausschluss bestimmter Liniennummern
          !excludePlatforms.includes(dep.platform) // Ausschluss bestimmter Bussteige
      )
      .slice(0, maxDepartures); // Maximale Anzahl anzuzeigender Fahrten

    const title = stateObj.attributes.friendly_name || 'Timetable';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: var(--card-background-color, white);
          border-radius: 15px;
          padding: 16px;
          font-family: var(--primary-font-family, Arial, sans-serif);
          color: var(--primary-text-color, #333);
        }

        .title {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 16px;
          text-align: center;
        }

        .departure {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 12px;
          border: 1px solid var(--divider-color, #ddd);
          border-radius: 12px;
          background-color: var(--secondary-background-color, #f9f9f9);
        }

        
        .time {
          width: 70px; 
          text-align: left; 
        }

        .time .minutes {
          font-size: 1.2em;
          font-weight: bold;
        }

        .time .exact {
          font-size: 0.9em;
          color: var(--secondary-text-color, #666);
        }

        
        .combined-route {
          display: flex;
          align-items: center;
          margin-left: ${routePosition}px; 
        }

        
        .vertical-line {
          width: 2px;
          background-color: var(--divider-color, #ccc);
          align-self: stretch; 
        }

        
        .symbol-direction {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 10px; 
        }

        
        .route-symbol-and-number {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px; 
          background-color: #d82020; 
          color: white; 
          font-weight: bold;
          font-size: 1.2em; 
          padding: 4px 8px; 
          margin-bottom: 4px; 
        }

        .route-symbol-and-number ha-icon {
          margin-right: 6px; 
        }

        .direction {
          font-weight: bold;
          font-size: 1em; 
          color: var(--primary-text-color, #333);
        }

        .platform {
          font-size: 1em; 
          font-weight: bold; 
          color: var(--primary-text-color, #333); 
          margin-left:auto; 
        }
      </style>
      <div class="card">
        <div class="title">${title}</div>
        ${
            filteredDepartures.length > 0
                ? filteredDepartures.map(
                    (dep) => `
              <div class="departure">
                <!-- Countdown-Bereich -->
                <div class="time">
                  <span class="minutes">${dep.countdown <= 1 ? 'jetzt' : `${dep.countdown} min`}</span>
                  <span class="exact">${dep.time_str}</span>
                </div>

                <!-- Vertikale Linie + Symbol + Richtung -->
                <div class="combined-route">
                  <div class="vertical-line"></div>
                  <div class="symbol-direction">
                    <div class="route-symbol-and-number">
                      <ha-icon icon="${dep.route_number <= 2 ? 'mdi:tram' : 'mdi:bus'}"></ha-icon>
                      ${dep.route_number}
                    </div>
                    <div class="direction">→ ${dep.direction}</div>
                  </div>
                </div>

                <!-- Plattform-Anzeige -->
                <div class="platform">${dep.platform}</div>
              </div>
            `
                ).join('')
                : '<p>Keine verfügbaren Abfahrten</p>'
            }
      </div>
    `;
  }

  set hass(hass) {
    this._hass = hass;

    if (this.config && this.config.entity) {
      this.render();
    }
  }

  get hass() {
    return this._hass;
  }
}

customElements.define('custom-timetable-card', CustomTimetableCard);
