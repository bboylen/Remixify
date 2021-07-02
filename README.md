# Remixify

An app that remixes your existing Spotify playlists. It keeps the same artists, but selects new, random songs by them!

Built with Typescript/React/Express/Mongo DB

![remix-main](https://user-images.githubusercontent.com/52515015/124209213-bd4c7000-daae-11eb-85ab-3553a2cf6de1.png)
## Built with responsive design in mind
<img src="https://user-images.githubusercontent.com/52515015/124208438-26cb7f00-daad-11eb-880a-93d7392bb524.png" width=250>

## Features
- OAuth authentication through Spotify
- Web session is stored via a cookie on the user's browser
- User's playlists are loaded into sidebar and can be selected for display
- Remixed playlists are created on Spotify and saved in Remixify's database
- Filters playlists grabbed from Spotify, so remixed ones are displayed separately

## Setup 

Installation:
`npm install && npm run install-client && npm run install-server`

Start:
`npm start`

Build:
`npm build`
