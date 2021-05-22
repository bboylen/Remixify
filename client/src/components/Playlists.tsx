import React from 'react';

interface PlaylistProps {
  user: Object
};

export const Playlists: React.FC<PlaylistProps> = (props) => {
const { user} = props;

return(
  <div className="Playlists">
    Playlists
  </div>
)
}