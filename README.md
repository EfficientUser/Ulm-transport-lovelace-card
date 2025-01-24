# Ulm-transport-lovelace-card

The Custom Timetable Card is a Lovelace card for Home Assistant that displays public transport departure times. It offers extensive filtering and customization options, allowing you to tailor the displayed data to your needs.
Features
- Departure Times: Displays both countdown in minutes and exact departure time.
- Filters: Exclude unreachable departures, specific directions, line numbers, or platforms.
- Adapts to Home Assistant themes 


## Installation

1. Download the .js file for this card and save it in the www/ directory of your Home Assistant configuration folder.
2. Add the file as a resource in Home Assistant:
3. Navigate to Settings > Dashboards > Resources.
4. Click Add Resource and enter the path to the file (e.g., /local/custom-timetable-card.js) with the type set to JavaScript Module.


To use this card, you will also need a sensor that provides public transport data. You can create such sensors using the [HA-HBS-Ulm-Transport-Integration](https://github.com/horsebatterystaple/ha-hbs-ulm-transport-integration?tab=readme-ov-file).

### Example Configuration
Here is an example configuration for your Lovelace dashboard:

```
type: custom:timetable-card
entity: sensor.my_departures
max_departures: 5
lead_time: 3
exclude_directions:
  - Böfingen
  - Söflingen
exclude_lines:
  - "1"
  - "4"
exclude_platforms:
  - A
  - B
route_position: 80
```








## Parameters
 ### Required
**entity** : The sensor entity providing the departure data.

| Parameter            | Description                                                                                        | Default Value |
|----------------------|----------------------------------------------------------------------------------------------------|---------------|
| `entity`            | The sensor entity providing the departure data.                                                    | *(required)*  |
| `max_departures`    | Maximum number of departures to display.                                                           | `5`           |
| `lead_time`         | Minimum time in minutes required to reach a departure.                                             | `0`           |
| `exclude_directions`| List of directions to exclude (e.g., `[Böfingen, Söflingen]`).                                     | `[]`          |
| `exclude_lines`     | List of line numbers to exclude (e.g., `[1, 4]`).                                                  | `[]`          |
| `exclude_platforms` | List of platforms to exclude (e.g., `[A, B]`).                                                     | `[]`          |
| `route_position`    | Distance in pixels from the left edge                           | `68`          |

