# Web Development Final Project - HobbyHub

Submitted by: Pallavi Bichpuriya

This web app: creates a hobby forum where users can publish posts, browse a searchable and sortable feed, open dedicated post pages, leave comments, upvote threads, and edit or delete existing posts.

Time spent: XX hours

## Required Features

The following **required** functionality is completed:

- [x] A create form allows the user to create posts.
- [x] The form requires a post title.
- [x] The form includes optional textual content and an optional external image URL.
- [x] The home feed displays previously created posts.
- [x] Each feed card shows only the creation time, title, and upvotes count.
- [x] Clicking a post opens a dedicated page for that post.
- [x] Users can sort posts by creation time or upvotes count.
- [x] Users can search for posts by title.
- [x] Each dedicated post page displays additional information, including content, image, and comments.
- [x] Users can leave comments underneath a post on the post page.
- [x] Each post includes an upvote button on the post page.
- [x] Users can upvote any post any number of times.
- [x] A previously created post can be edited from its post page.
- [x] A previously created post can be deleted from its post page.

## Stretch Features

The following **stretch** features are implemented:

- [x] The app shows loading states whenever post data is being fetched.

## Video Walkthrough

Add your GIF walkthrough here before submission.

## Notes

- Post records are stored through the existing Supabase `Posts` table.
- External image URLs, upvotes, and comments are persisted in browser local storage so the full Week 9 feature set works without requiring additional table migrations.

## License

Copyright 2026 Pallavi Bichpuriya

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
