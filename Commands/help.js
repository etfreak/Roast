/*
*
*   Things to add to r!help:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");

exports.run = async (client, message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase() === prefixFile.prefix + "help") {
        let helpIcon = client.user.displayAvatarURL;
        let helpEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("Roast-Bot Help:")
            .addBlankField()
            .setThumbnail(helpIcon)
            .addField("***Commands:***\n\nr!help", "List of Roast-Bot Commands.")
            .addField("r!bot", "Learn more about Roast-Bot.")
            .addField("r!roast *@user*, r!roast, or r!roast *roastNumber*", "Generate a random roast with the number of roast it was.")
            .addField("r!invite", "Link to invite Roast-Bot to a server.")
            .addField("r!server", "Info about your server.")
            .addField("r!meme, or r!meme *memeNumber*", "Sends a meme to the current channel.")
            .addField("r!clear *NUMBER*", "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**")
            .addField("r!say", "To use this command use `r!say ` and then what you want Roast-Bot to say.")
            .addField("r!urban *whatToSearch*", "Search up anything on the Urban Dictionary!")
            .addField("r!user, or r!user *@user*", "r!user returns stats about you, or the person you tagged. The stats include: current presence, user id, current game, when their account was created and more!")
            .addField("r!feedback *feedbackMsg*", "`r!feedback` sends your feedback to me so I can improve Roast-Bot! If you ever are using Roast-Bot and a command isn't working or something else is wrong you can also report them here.")
            .addBlankField()
            .addField("***Utilities:***\n\nXP-System", "Everytime you use a Roast-Bot command your XP increases! `Use r!level` to check your level and XP! Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 5,000XP")
            .addField("Custom Prefix:", "If you don't like Roast-Bot's prefix(r!) you can change it to anything you want by using `r!prefix newPrefix`. To view your prefix use `r!prefix`. The prefix by default is r!. **Note:** YOU CAN ONLY CHANGE YOUR PREFIX WITH `r!prefix newPrefix`. If you forget your prefix you can always change it with `r!prefix newPrefix` or view it with `r!prefix`.")
            .addField("On-Off:", "If you want to turn any command on/off just use `r!off commandName` to turn the command off. To turn a command back on use `r!on commandName`. *Note:* `r!help` and `r!invite` cannot be turned off.")
            .addBlankField()
            .addField("***Command Help:***", "If your still having trouble using a command you can use `r!commandName help` for more detailed help. If you still don't understand please join the support server.")
            .addBlankField()
            .addField("Roast-Bot Development Server:", "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D \n\n")
            .setFooter("v2.2.0, for release notes join the Roast-Bot help server. ");

        return message.channel.send({ embed: helpEmbed })
        .then(msg => msg.react('✅'))
        .then(mReaction => mReaction.message.react('❎') )
        .then(mReaction => {

            
            // createReactionCollector - responds on each react, AND again at the end.
            const collector = mReaction.message
                .createReactionCollector(reactionFilter, { time: 15000 });
        
            // set collector events
            collector.on('collect', r => {
                // immutably copy embed's Like field to new obj
                let embedLikeField = Object.assign({}, embed.fields[0]);
        
                // update 'field' with new value
                embedLikeField.value = '<3 <3 <3';
        
                // create new embed with old title & description, new field
                const newEmbed = new Discord.RichEmbed({
                    title: embed.title,
                    description: embed.description,
                    fields: [ embedLikeField ]
                });
        
                // edit message with new embed
                // NOTE: can only edit messages you author
                r.message.edit(newEmbed)
                .then(newMsg => console.log(`new embed added`))
                .catch(console.log);
            });
            collector.on('end', collected => console.log(`Collected ${collected.size} reactions`));
        })
        /*
        .catch(console.log);
        .then(async (reactions, helpEmbed) => {

            await reactions.react("⏪");
            await reactions.react("◀");
            await reactions.react("▶");
            await reactions.react("⏩");
            await reactions.react("⏹");
            await reactions.react("🔢");

            const filter = (reaction) => {
                return ["⏪", "◀", "▶", "⏩", "⏹", "🔢"].includes(reaction.emoji.name);
            };

            reactions.awaitReactions(filter, { max: 1 })
                .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "▶") {
                    let secondPage = new Discord.RichEmbed()
                        secondPage.addField("Test field", "tset field");
                       helpEmbed.edit(secondPage);
                    }
                });
        });
        */
    }
};