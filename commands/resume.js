const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "resume",
  description: "Resumes the music",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: [],
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

    if (player.playing)
      return client.sendTime(
        message.channel,
        "❌ Music is already resumed, idiot."
      );
    player.pause(false);
    await message.react("✅");
  }}