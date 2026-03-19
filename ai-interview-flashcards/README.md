# Web Development Project 3 - *AI Interview Flashcards*

Submitted by: **Pallavi Bichpuriya**

This web app: **helps users practice AI, machine learning, and computer science concepts by guessing answers before flipping through an ordered set of flashcards.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - [x] Application features a clearly labeled input box with a submit button where users can type in a guess
  - [x] Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong
  - [x] Clicking on the submit button with a **correct** answer shows visual feedback that it is correct
- [x] **The user can navigate through an ordered list of cards**
  - [x] A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - [x] A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - [x] Both the next and back buttons have visual indication when the user is at the beginning or end of the list, preventing wrap-around navigation




## Optional Features

The following **optional** features are implemented:

- [ ] Users can use a shuffle button to randomize the order of the cards
  - [ ] Cards remain in the same sequence unless the shuffle button is clicked
  - [ ] Cards change to a random sequence once the shuffle button is clicked
- [x] A user’s answer may be counted as correct even when it is slightly different from the target answer
  - [x] Answers are normalized to ignore uppercase/lowercase differences and punctuation
  - [x] Some cards accept shorter equivalent phrasing instead of requiring one exact full sentence
- [ ] A counter displays the user’s current and longest streak of correct responses
  - [ ] The current counter increments when a user guesses an answer correctly
  - [ ] The current counter resets to 0 when a user guesses an answer incorrectly
  - [ ] A separate counter tracks the longest streak, updating if the current streak exceeds it
- [ ] A user can mark a card that they have mastered and have it removed from the pool of displayed cards
  - [ ] The user can mark a card to indicate that it has been mastered
  - [ ] Mastered cards are removed from the pool of displayed cards and added to a list of mastered cards

## Additional Features

The following **additional** features are implemented:

- [x] The flashcard stays locked until a guess is submitted, guiding the Project 3 flow
- [x] The app shows the current card position with a `Card X of Y` progress indicator
- [x] The flashcard supports keyboard interaction for accessibility

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://github.com/user-attachments/assets/0a95c297-a273-4a0b-9dd5-2742b0ca6daa

## Notes

One challenge was deciding how strict answer checking should be. I wanted the app to accept reasonable variations without making validation so loose that unrelated guesses counted as correct. Another small challenge was resetting the guess, feedback, and flipped state cleanly whenever the user moved between cards.

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
