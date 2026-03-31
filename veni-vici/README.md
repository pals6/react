# Web Development Project 4 - *Veni Vici!*

Submitted by: **Pallavi Bichpuriya**

This web app: **A React-based dog discovery app that uses The Dog API to display one random dog breed at a time along with its image and matching attributes. Users can click attribute tags to add them to a ban list, which prevents future results with those banned values from appearing.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image is consistent across API calls

- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time
  - Displayed attributes match the displayed image
  - There is at least one image per API call

- [x] **API call response results should appear random to the user**
  - Clicking on the API call button generates a seemingly random new result each time
  - Repeat results are possible but not frequent

- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - Multiple displayed attributes are clickable
  - Clicking on a clickable attribute not already in the ban list immediately adds it to the ban list
  - Clicking on an attribute in the ban list immediately removes it from the ban list

- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the Discover button does not display any future dog whose shown attributes contain a banned value
  - More banned values may increase the frequency of repeat results

- [x] _To ensure an accurate grade, the recording shows that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_

## Optional Features

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [ ] Users can see a stored history of their previously displayed results from this session
  - [ ] A dedicated section of the application displays all the previous images/attributes seen before
  - [ ] Each time the API call button is clicked, the history updates with the newest API result

## Additional Features

The following **additional** features are implemented:

- [x] Normalized ban checking so values with different capitalization or spacing are still filtered correctly
- [x] Cleaner pill-style attribute buttons and improved layout/styling for a better user experience
- [x] Safer filtering logic to avoid broken results when some API fields are missing

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://github.com/user-attachments/assets/dbfcb144-b0b5-447d-8c57-94f8b1c44889

## Notes

One challenge I encountered was that the image search endpoint in The Dog API often returned images without breed metadata, even when using parameters meant to filter for breeds. Because of that, I switched to the breeds endpoint and selected a random breed from there instead. Another challenge was making sure banned traits were actually filtered correctly, since values could differ slightly in capitalization or spacing. I fixed that by normalizing values before comparing them.

## License

    Copyright [2026] [Pallavi Bichpuriya]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
