# Remixify

An app that remixes your existing Spotify playlists using Spotify's API. It keeps the same artists, but selects new, random songs by them!

## Technologies Used
- Typescript (on front end)
- React
- Ant Design (React UI Library)
- Express (Node.js)
- MongoDB
- Mongoose ODM
- Deployed on Heroku

## Display
![remix-main](https://user-images.githubusercontent.com/52515015/124209213-bd4c7000-daae-11eb-85ab-3553a2cf6de1.png)
## Built with responsive design in mind
<img src="https://user-images.githubusercontent.com/52515015/124208438-26cb7f00-daad-11eb-880a-93d7392bb524.png" width=250>

## Features
- OAuth 2.0 authentication through Spotify
- Web session is stored via a cookie on the user's browser
- User's playlists are loaded into sidebar and can be selected for display & remixing
- Remixed playlists are created on Spotify and saved in Remixify's database
- Filters playlists grabbed from Spotify, so remixed ones are displayed separately
- Remix algorithm minimizes the generation of duplicate songs

## Setup 

Installation:
`npm install && npm run install-client && npm run install-server`

Start:
`npm start`

Build:
`npm build`

## Takeaways
This was the first app that I have built using Node.js & Express, so there was an initial challenge in just getting up to speed. However, I quickly grew to enjoy working with Express, and it has surpassed Ruby on Rails as my preferred backend framework. While Rails is easy to pick-up due to its opinionated nature, I think Express is a better framework for learning back-end as it forces you to create your own structure.

Working with Spotify's API was a pleasant experience, although their docs are unclear at times. I used the librarys `passport-spotify` to handle OAuth and `spotify-web-api-node` to simplify my API request code.

This was also my first time working with MongoDB, or any NoSQL database for that matter. I really enjoyed working with it, it was incredibly easy to learn and never caused any problems. I can see why it is such a popular choice for web apps such as mine, that really do not need the specificity and data integrity provided by a relational database. 

On the front end side I used Typescript, which is new to me. Once I got past the initial confusion about syntax it was really easy to understand and work with. The main benefit was how Typescript integrates nicely with VS Code by underlining code that does not have the proper arguments. This made it easy to make changes in one module, and not forget to make the corresponding changes in another module.

I have worked with API's before in React, but never with this level of complexity. Remixify makes sequential fetch calls for a few features, so it was really handy to write `async` functions using `await`. I also learned how to use a new React Hook `useContext`, which essentially allows one to share state across React components without passing props down the component tree. `useContext` was handy for storing and accessing stateful information about whether the user was authenticated and whether the app was in production or development.

This was also my first time using Ant Design, or any React component library for that matter. I'm glad I wrote the CSS/React for all my previous projects manually for the learning benefits, but it was super nice to use a library full of much better designed components than I am capable of building and styling. I think the final design came out really nice, with the exception of some AntD design features I couldn't find a way to circumvent.

This was a great learning project for me - I'm really happy with how it looks and performs. I was and still am hoping to add more functionality to Remixify, but the existing features already took me some time. I may come back to this, but there are other projects I am itching to get started on first!
