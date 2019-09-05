const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
  constructor() {
    super('commandBlocked', {
      event: 'commandBlocked',
      emitter: 'commandHandler'
    });
  }

  async exec(message, command, reason) {
    const responce = {
      owner: () => this.client.getReply(message, 'ownerOnly'),
      guild: () => this.client.getReply(message, 'guildOnly'),
      blacklist: () => this.client.getReply(message, 'blacklisted')
    }[reason];


    if (!responce) return;
    if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
      message.reply(await responce());
    }
  }
}

module.exports = CommandBlockedListener;
