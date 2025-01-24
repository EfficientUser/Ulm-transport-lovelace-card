# Ulm (swu) public transport lovelace-card

The Custom Timetable Card is a Lovelace card for Home Assistant that displays public transport departure times from SWU. It offers extensive filtering and customization options, allowing you to tailor the displayed data to your needs.

Features:
- Departure Times: Displays both countdown in minutes and exact departure time.
- Filters: Exclude unreachable departures, specific directions, line numbers, or platforms.
- Adapts to Home Assistant themes 

<img width="600" alt="image" src="https://github.com/user-attachments/assets/bf24bfb1-fa50-4c95-b3fb-7c301708b0b9" />




## Installation

To use this card, you will also need a sensor that provides public transport data. You can create such sensors using the [HA-HBS-Ulm-Transport-Integration](https://github.com/horsebatterystaple/ha-hbs-ulm-transport-integration?tab=readme-ov-file).

1. Download the .js file for this card and save it in the www/ directory of your Home Assistant configuration folder.
2. Add the file as a resource in Home Assistant:
  + Navigate to Settings > Dashboards > Resources.
  +. Click Add Resource and enter the path to the file (e.g., /local/custom-timetable-card.js) with the type set to JavaScript Module.




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
  - 1
  - 4
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


## Screenshots

### 1.
<img width="399" alt="image" src="https://github.com/user-attachments/assets/3a268684-92b7-4da9-99ae-0c0354620dc6" />

### 2. 

<img width="413" alt="image" src="https://github.com/user-attachments/assets/e40474c8-b612-4250-b00f-66a4c4768de0" />

