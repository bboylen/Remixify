# Remixify

An app that remixes your existing Spotify playlists using Spotify's API. It keeps the same artists, but selects new, random songs by them!

## Technologies Used
- Typescript (front end)
- React
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
This was the first app that I have built using Node.js & Express, so there was an initial challenge in getting up to speed. I quickly grew to enjoy working with Express though, and it has surpassed Ruby on Rails as my preferred backend. With Rails I would be frustrated with the 'magic' that obfuscates design decisions from the user. I think Express is a better framework for learning back-end as it forces you to create your own structure.

Working with Spotify's API was a pleasant experience, although their docs  could use some work. I used the librarys `passport-spotify` to handle OAuth and `spotify-web-api-node` to simplify the API requests.

This was also my first time working with MongoDB, or any NoSQL database for that matter. I really enjoyed working with it, it was incredibly easy to learn and never caused any problems. Mongoose etc
