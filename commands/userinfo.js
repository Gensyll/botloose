module.exports = {
    name: 'userinfo',
    description: 'Display user info',
    execute(message, args){
        message.channel.send(`User ${message.author.username} represented by client ID ${message.author.id}`);
    },
};