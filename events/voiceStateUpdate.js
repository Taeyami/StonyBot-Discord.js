const { MessageActionRow, MessageButton, Discord, MessageEmbed } = require('discord.js');

const { prefix } = require("../utils/config.json");

const dataBase = require('nippy.db');

const vc = dataBase('./data/voice.sqlite')

const cn = dataBase('./data/coin.sqlite')

const pr = dataBase('./data/privateRoom.sqlite')

const Activites = new Map();

const moment = require('moment');

const mdf = require('moment-duration-format');

module.exports = {
  event: "voiceStateUpdate",
  execute: async (oldState, newState) => {

    // statistic

    if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
    if(!oldState.channelId && newState.channelId) {
        Activites.set(oldState.id, Date.now());
    }
    let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); 
    } else data = Activites.get(oldState.id);
    let duration = Date.now() - data;

    let voiceTime = moment.duration(duration).format("m")
    let arr = []
    while (voiceTime > 0) {
        voiceTime--;
        arr.push(Math.floor(Math.random() * 80) + 10)
    }

    if(oldState.channelId && !newState.channelId) { 
        Activites.delete(oldState.id);
        vc.add(`${oldState.guild.id}.${oldState.id}.channel.${oldState.channelId}`, duration);
    } else if(oldState.channelID && newState.channelId){
        Activites.set(oldState.id, Date.now());
        vc.add(`${oldState.guild.id}.${oldState.id}.channel.${oldState.channelId}`, duration);
    }

    if (arr.leght > 0) {
        let sum = arr.reduce( (a,b) => a + b);
        cn.add(`${oldState.guild.id}.${oldState.id}.coins`, sum)
    }

    // private rooms

    let channelid = pr.get(`${newState?.guild?.id}.${newState?.channel?.userLimit}`)

    if (channelid == undefined) channelid = pr.get(`${oldState?.guild?.id}.${oldState?.channel?.userLimit}`)

    if (channelid == undefined) return;

    let categoryid = pr.get(`${oldState.guild.id}.category`)

    let dataChannel = pr.get(`${oldState?.guild?.id}`)

    let channelData = Object.keys(dataChannel).map(id => {
        return {
            userLimit: id,
            channelID: dataChannel[id]
        }
    })

    for (var i = channelData.length - 1; i >= 0; i--) {
        if (!newState.guild.channels.cache.has(categoryid)) {
            pr.delete(`${oldState.guild.id}`)
        }
        if (!newState.guild.channels.cache.has(channelData[i].channelID)) {
            pr.delete(`${oldState.guild.id}.${channelData[i].userLimit}`)
        }
    }

    if(newState.channel?.id == channelid){
        newState.guild.channels.create(`${newState.member.user.username}'s channel`,{
            userLimit: newState?.channel?.userLimit,
            type: 'GUILD_VOICE',
            parent: categoryid,
            permissionOverwrites:[{
                id:newState.member.id,
                allow: ["MANAGE_CHANNELS"]
            },{
                id:newState.guild.id,
                deny:["MANAGE_CHANNELS"]
            }] 
        }).then(channel=>{
            newState.setChannel(channel)
        })
    }

    if(oldState.channel?.id != channelid && oldState.channel?.parent?.id == categoryid && !oldState.channel?.members.size) oldState.channel.delete(); 
  }
}