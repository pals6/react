
https://github.com/user-attachments/assets/bde1ed46-d505-42f8-9fc5-5079013c81e3
# Web Development Project 5 - New York Breweries Dashboard

Submitted by: **Pallavi Bichpuriya**

This web app: **A React dashboard for exploring New York breweries with live filters, custom SVG charts, and direct detail pages for each brewery while keeping a persistent sidebar visible across views.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on a brewery card in the dashboard list navigates to a detail view for that brewery
  - The detail view includes extra information not shown on the dashboard cards, such as the direct detail URL, full address, country, coordinates, and city/type comparison counts
  - The same sidebar remains visible in the detail view as in the dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - Each brewery detail view uses its own hash-based URL such as `#/brewery/<id>`
  - *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - A bar chart shows which cities have the highest brewery concentration in the current filtered view
  - A donut chart shows how brewery types are distributed in the current filtered view

## Optional Features

The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data
  - The app includes a "What This Snapshot Shows" panel that summarizes the current filtered results in plain English
  - The dashboard headings and chart annotations explain what each visualization is showing
- [x] The site allows users to toggle between different data visualizations
  - Buttons let the user show or hide the city chart and brewery type chart independently

## Additional Features

The following **additional** features are implemented:

- [x] Search by brewery name or city with live updates
- [x] Multiple filters can be applied at the same time
- [x] Dropdown filters for brewery type and city
- [x] ZIP-code bounds filter using number inputs
- [x] Summary cards for breweries shown, cities represented, website links, and most common brewery type
- [x] Loading and error states for the API request
- [x] Custom SVG charts were built without using a charting library
- [x] Responsive split layout keeps the sidebar visible on larger screens and stacks cleanly on mobile
- [x] Detail pages include direct links to the brewery website and a Google Maps lookup
- [x] A back-to-dashboard action makes it easy to return from a detail page to the dashboard view

## Video Walkthrough

Here's a walkthrough of implemented user stories:




https://github.com/user-attachments/assets/413d4f2f-e3ee-4534-92e4-e0b06c29172e





## Notes

One challenge was extending a simple filtered dashboard into a multi-view app without pulling in a routing library. I handled that by using hash-based URLs so each brewery still has a direct link while the sidebar remains visible across both the dashboard and detail views. Another challenge was adding charts without a chart package, so I built custom SVG bar and donut charts directly from the fetched API data and added toggles so each visualization can be shown or hidden independently.

## License

    Copyright 2026 Pallavi Bichpuriya

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
