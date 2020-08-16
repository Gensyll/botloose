const {andrewClientID} = require('../config.json');
const {blacklist} = require('../siteblacklist.json');

module.exports = {
    name: 'deleteGifs',
    description: 'Delete posted gif attachments',
    execute(message, args){
        if(message.author.id === andrewClientID){  
            console.log('author ID matches.');      
            //Check for posted GIF attachments
            if(message.attachments.size > 0){
                console.log(`attachments found: ${message.attachments.size}`);
                //Check for gif extension on the attachment
                if(message.attachments.every(attach => {
                    const url = attach.url;
                    console.log(`URL: ${url}`);
                    return url.indexOf('gif', url.length - 'gif'.length) !== -1;
                })){
                    message.delete()
                    .then(message.channel.send(`Deleted ${message.author.username}'s GIF. Thanks, :pinching_hand::eggplant:`))
                    .catch(err => {
                        message.channel.send(`Attempted to delete ${message.author.username}'s GIF, but an error occured.`);
                        console.log(err);
                    });        
                }                
            }      
            else{                
                //Check if its a URL
                if(message.content.startsWith('http://') || message.content.startsWith('https://')){
                    const urlTrimmedHttp = message.content.replace(/^https?:\/\//, '');
                    let urlNoSubDomain;
                    //TODO: figure out how to deal with URL possibly not having subdomain or HTTP(S)://
                    //Check if site has subdomain
                    if(urlTrimmedHttp.split('/')[0].split('.').length === 3){                        
                        urlTrimmedHttp.replace(/^.+?\./, '');
                    }
                    console.log(urlTrimmedHttp);
                                
                    if(!blacklist.every(site => {
                        return urlTrimmedHttp.split('/')[0].search(site);
                    })){
                        message.delete()
                        .then(message.channel.send(`Deleted ${message.author.username}'s GIF. Thanks, :pinching_hand::eggplant:`))
                        .catch(err => {
                            message.channel.send(`Attempted to delete ${message.author.username}'s GIF, but an error occured.`);
                            console.log(err);
                        });    
                    }
                }                
            }
        }
    },
};