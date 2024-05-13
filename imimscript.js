document.addEventListener('DOMContentLoaded', () => {
    // Initialize Spotify Web Playback SDK
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'YOUR_ACCESS_TOKEN'; // Replace with your Spotify access token
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(token); }
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Connect to the player!
        player.connect();

        // Play a track when card is hovered
        const card = document.getElementById('card1'); // Replace 'card1' with the ID of your card
        card.addEventListener('mouseover', () => {
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                const play = ({
                    spotify_uri,
                    playerInstance: {
                        _options: {
                            getOAuthToken,
                            id
                        }
                    }
                }) => {
                    getOAuthToken(access_token => {
                        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                            method: 'PUT',
                            body: JSON.stringify({ uris: [spotify_uri] }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${access_token}`
                            },
                        });
                    });
                };
                play({
                    playerInstance: player,
                    spotify_uri: 'https://open.spotify.com/track/2qpacEyFxmbxCpIEqZkqvC?si=a223822a3d644144'
                });
            });
        });
    };
});
