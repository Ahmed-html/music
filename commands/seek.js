const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "seek",
  description: "Seek to a position in the song",
  usage: "<time s/m/h>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["forward"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ Nothing is playing right now! So not halal mode."
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ You must be in a voice channel to use this command, idiot."
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: You must be in the same voice channel as me to use this command, do something right in your life."
      );
    if (!player.queue.current.isSeekable)
      return client.sendTime(
        message.channel,
        "❌ I'm not able to seek this song!\njust bully <!@718115170798534656> until he fixes it."
      );
    let SeekTo = client.ParseHumanTime(args.join(" "));
    if (!SeekTo)
      return client.sendTime(
        message.channel,
        `**Usage: **\`${GuildDB.prefix}seek <number s/m/h>\` \n**Example - **\`${GuildDB.prefix}seek 2m 10s\``
      );
    player.seek(SeekTo * 1000);
    message.react("✅");
  }}