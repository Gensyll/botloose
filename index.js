const fs = require('fs');
const Discord = require('Discord.js');
const {prefix, discordToken, testID, andrewClientID} = require('./config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Grab all commands from folder
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//triggers on ready - once following login
client.once('ready', () => {
    console.log('Client bot ready.');
});

client.on('message', message => {   

    //Deleting andrew's messages on receipt    
    client.commands.get('deleteGifs').execute(message, null);


    //Dip early if not relevant to bot
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const inputArgs = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = inputArgs.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try{
        command.execute(message, inputArgs);
    }catch(err){
        console.error(err);
        message.reply('An error occurred when attempting to execute that command.');
    }

    switch(commandName){
        // case 'server':
        //     message.channel.send(`Currently responding in ${message.guild.name}.`);
        //     break;
        case 'userinfo':
            client.commands.get('userinfo').execute(message, inputArgs);
            break;
        // case 'avatar':
        //     if(!message.mentions.users.size){
        //         return message.channel.send(`Avatar: <${message.author.displayAvatarURL({format: "png", dynamic: true})}>`);
        //     }
        //     const avatarList = message.mentions.users.map(user => {
        //         return `${user.username}'s avatar: <${user.displayAvatarURL({format: "png", dynamic: true})}>`;
        //     })
        //     break;
        default:
            message.reply(`Command not understood.`);
            break;
    };

});



client.login(discordToken);