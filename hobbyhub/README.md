# Web Development Final Project - HobbyHub

Submitted by: **Pallavi Bichpuriya**

This web app: **is a hobby-focused discussion forum where users can create posts, browse a searchable and sortable feed, open dedicated post pages, leave comments, upvote threads, and edit or delete their posts.**

Time spent: **TBD** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - [x] Form requires users to add a post title
  - [x] Forms should have the *option* for users to add:
    - [x] additional textual content
    - [x] an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - [x] Web app must include home feed displaying previously created posts
  - [x] By default, each post on the posts feed should show only the post's:
    - [x] creation time
    - [x] title
    - [x] upvotes count
  - [x] Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - [x] Users can sort posts by either:
    - [x] creation time
    - [x] upvotes count
  - [x] Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - [x] The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - [x] content
    - [x] image
    - [x] comments
  - [x] Users can leave comments underneath a post on the post page
  - [x] Each post includes an upvote button on the post page.
    - [x] Each click increases the post's upvotes count by one
    - [x] Users can upvote any post any number of times
- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - [x] After a user creates a new post, they can go back and edit the post
  - [x] A previously created post can be deleted from its post page

The following **optional** features are implemented:

- [x] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [x] A custom HobbyHub visual theme with a redesigned feed, post editor, and dedicated discussion page.
* [x] Local persistence for image URLs, upvotes, and comments so forum interactions remain available after refresh on the same browser.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='REPLACE_WITH_YOUR_GIF_LINK' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One of the main challenges in this project was balancing the required forum features with the existing Supabase table structure. The app stores the core post records in Supabase while using local browser storage for image URLs, comments, and upvote tracking, which allowed the full Week 9 experience to work without requiring additional database migrations.

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
