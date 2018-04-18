const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
  if(args[0] == "help"){
    message.reply("Usage: -removerole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

  message.channel.send('Done, SIR!')

  try{
    await rMember.send(`[Legion Bavarian Communications] You lost the ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`Removed ${gRole.name} from <@${rMember.id}>.`)
  }
}

module.exports.help = {
  name: "removerole"
}