import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class SpotifyAlbumCommand extends Command {
  public constructor() {
    super('spotify-album', {
      category: 'spotify',
      ownerOnly: false,
      args: [
        {
          id: 'album',
          match: 'content',
          prompt: {
            start: 'Input album name.',
            retry: 'You have to provide album name.'
          }
        }
      ]
    });
  }

  public async exec(message: Message, { album }: { album: string }) {
    const res = await this.client.APIManager.spotify.searchAlbums(album, { limit: 1 });
    if (!res.body.albums!.items.length) {
      return message.util!.reply('Nothing found!');
    }
    return message.util!.send(`https://open.spotify.com/album/${res.body.albums!.items[0].id}`);
  }
}

module.exports = SpotifyAlbumCommand;