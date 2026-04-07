
https://github.com/user-attachments/assets/bde1ed46-d505-42f8-9fc5-5079013c81e3
# Web Development Project 5 - New York Breweries Dashboard

Submitted by: **Pallavi Bichpuriya**

This web app: **A React dashboard that fetches brewery data from the Open Brewery DB API and helps users explore New York breweries with summary stats, live search, and category filtering.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 10 unique items, one per card
  - Each brewery card includes at least two features, including brewery type, city, state, phone number, and website availability
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - Total breweries currently shown
  - Average number of breweries per city in the current filtered results
  - Most common brewery type in the current filtered results
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar filters breweries by name or city
  - The results update dynamically as the user types
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter uses brewery type, which is different from the search bar
  - The results update dynamically as the selected type changes

## Optional Features

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - A text input is used for search
  - A dropdown is used for brewery type filtering
- [ ] The user can enter specific bounds for filter values

## Additional Features

The following **additional** features are implemented:

- [x] A dynamic "What This Snapshot Shows" insight panel summarizes the current filtered data in plain English
- [x] Loading and error states are displayed while the API request is in progress or if it fails
- [x] Brewery cards include external website links when available
- [x] Responsive card layout with simple custom styling

## Video Walkthrough

Here's a walkthrough of implemented user stories:




https://github.com/user-attachments/assets/413d4f2f-e3ee-4534-92e4-e0b06c29172e





## Notes

One challenge was turning raw API data into a dashboard that felt more meaningful than just a list of results. I addressed that by adding summary statistics, combining search and dropdown filtering, and including a short insight panel that explains what the current filtered view shows. Another small challenge was handling missing API fields gracefully so the app would still render cleanly even when some breweries did not have a phone number or website listed.

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
