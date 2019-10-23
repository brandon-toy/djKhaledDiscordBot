const file = require('./config.json')
const ytdl = require('ytdl-core-discord')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

let botChannelID = "";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
    if (msg.content === 'anothaone') {
        voiceChannelID = msg.member.voice.channelID;
        msg.reply(voiceChannelID)
        console.log(voiceChannelID)
        if(voiceChannelID != null) {
            // console.log(client.channels)
            const channel = client.channels.get(voiceChannelID);
            channel.join().then(connection => { 
                console.log("Playing anothaone")
                connection.play('./audio/anothaone.mp3')
            }).catch(e => {
                console.error(e);
            });
            // channel.leave()
        } else {
            msg.reply('DJ Khaled require you to join a channel')
        }
    } else if(msg.content === 'dj khaled singalong') {
        voiceChannelID = msg.member.voice.channelID;
        if (voiceChannelID != null) {
            botChannelID = voiceChannelID
            const channel = client.channels.get(voiceChannelID);
            channel.join().then(connection => {
                console.log("Playing dj khaled singalong");
                connection.play('./audio/djKhaledGame.mp3')
            }).catch(e => {
                console.error(e);
            });
        }
    } else if(msg.content === 'dj khaled please stop') {
        if (botChannelID != "") {
            const channel = client.channels.get(botChannelID);
            botChannelID = ""
            channel.leave()
        } 
    }
})

client.on('message', async msg => {
    if(msg.content === 'dj khaled play im the one') {
        voiceChannelID = msg.member.voice.channelID;
        if (voiceChannelID != null) {
            botChannelID = voiceChannelID
            const channel = client.channels.get(voiceChannelID);
            channel.join().then(connection => {
                console.log("Playing dj khaled im the one");
                youtubeVideo('youtube.com/watch?v=MlqUWSZSfXM',connection)
            }).catch(e => {
                console.error(e);
            });
        }
    } else if(msg.content === 'dj khaled x ziad') {
        voiceChannelID = msg.member.voice.channelID;
        if (voiceChannelID != null) {
            botChannelID = voiceChannelID
            const channel = client.channels.get(voiceChannelID);
            channel.join().then(connection => {
                console.log("Playing Ziad x DJ Khaled Collab");
                youtubeVideo('https://www.youtube.com/watch?v=CaQGESGNwTo',connection)
            }).catch(e => {
                console.error(e);
            });
        }
    }
})
async function youtubeVideo(url, connection) {
    const ytdlOptions = {
        filter: 'audioonly',
        quality: 'highestaudio',
        format: 'mp3',
        hightWaterMark: 1 << 25
    };
    const stream = ytdl(url, ytdlOptions);
    connection.play(await stream, { type: 'opus', 'highWaterMark': 1 });
}

client.login(file.botToken)