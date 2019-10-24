const file = require('./config.json')
const ytdl = require('ytdl-core-discord')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

let botChannelID = "";
let djKhaledQuotes = [
    "Another one, no. Another two, drop two singles at a time.",
    "Congratulations, you played yourself.",
    "I can deal with everything. I got the answer for anything. This DJ Khaled.",
    "The key is to make it.",
    "There will be road blocks but we will overcome it.",
    "They will try to close the door on you, just open it.",
    "The key to more success is coco butter.",
    "They dont want you to jet ski.",
    "Those that weather the storm are the great ones.",
    "You smart! You loyal! Youre a genius!",
    "Baby, you smart. I want you to film me taking a shower.",
    "You want my advice? Dont play yourself.",
    "Always have faith. Always have hope.",
    "Key to more success is clean heart and clean face.",
    "Smh they get mad when u have joy.",
    "I dont have no favorite rock bands. Im a fan of rock music though.",
    "I wanted to see what type of trees is growing in Marcy Projects, what type of water Jay Z was drinking.",
    "Those that weather the storm r the great ones.",
    "The other day the grass was brown, its green cuz i aint give up.",
    "Never surrender.",
    "Give thanks to the most high.",
    "They dont want you to win. They dont want you to have the No. record in the country. They dont want you get healthy. They dont want you to exercise. And they dont want you to have that view.",
    "We go hard. In everything we do were going to accomplish our victory and our goal. If it takes a day, a year, or 20 years, were going to win.",
    "Bless up.",
    "Always have Faith. Always have Hope",
    "I know that Ive been put on this Earth to make people happy, to inspire people, and to uplift people. Thats a beautiful thing.",
    "Be a star. Be a Superstar.",
    "I remember when I aint have a jacuzzi.",
    "Almond milk + cinnamon crunch = major key to success.",
    "When you stop making excuses and you work hard and go hard you will be very successful.",
    "The key is to enjoy life, because they dont want you to enjoy life.",
    "In life everyone has a choice. The key is: make a right choice.",
    "Bless up. Dont play yourself.",
    "You do know it cost money to put a t-shirt on your back? You do know it cost money have a house? You do know it cost money to eat? Get money, dont let these people fool you.",
    "We have to get money. We have no choice. It cost money to eat.",
    "They never said winning was easy.",
    "Working all winter shining all summer.",
    "Give thanks to the most high.",
    "Some of the guys when they play, they try to keep it reality. Nah, I need the best everything.",
    "The key is: never fold."
]

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
    if(msg.content === 'dj khaled random quote') {
        const length = djKhaledQuotes.length
        const randomIndex = Math.floor(Math.random() * length)
        msg.reply(djKhaledQuotes[randomIndex])
    }
})

// play music
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