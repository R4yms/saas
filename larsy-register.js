//-------------------------Required Modules--------------------------\\


const Discord = require('discord.js');//
const client = new Discord.Client();//
const Settings = require('./Settings/Settings.json');//
const Roles = require('./Settings/Roles.json');//
const Channels = require('./Settings/Channels.json');//
const ServerSettings = require('./Settings/ServerSettings.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./Util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const { Webhook, MessageBuilder } = require('discord-webhook-node');//
const welcome = new Webhook(Channels.Channels.WelcomeWebhook);//


//-------------------------Required Modules--------------------------\\


var prefix = Settings.prefix;//

const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./Commands/', (err, files) => {//
    if (err) console.error(err);//
    log("                          ")
    log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
    log(`   ${dev} ${y}${s}${r}${a}${l}`)
    log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
    log("                          ")
    log(`[ ${y}${s}${r}${a}${l} ] Komutlar Yükleniyor...`);//
    log("                          ")
    log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
    files.forEach(f => {//
        let cmds = require(`./Commands/${f}`);//
        log(`[COMMAND] ${cmds.help.name}     `);//
      
        client.commands.set(cmds.help.name, cmds);//
        cmds.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, cmds.help.name);//
        });
    });
});

fs.readdir("./Events/", (err, files) => {
if(err) return console.error(err);
log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
log("                          ")
log(`[ ${y}${s}${r}${a}${l} ] Eventler Yükleniyor...`);//
log("                          ")
log("‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒")
files.filter(rgevents => rgevents.endsWith(".js")).forEach(rgevents => {
let EventLoad = require(`./Events/${rgevents}`);
if(!EventLoad.configuration) return console.log(`[Event] ${rgevents}`)
client.on(EventLoad.configuration.name, EventLoad)})});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === Settings.Owner) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(Settings.token);


client.on("message", message => {
    if(message.content.toLowerCase() == "larsy") 
    return message.channel.send(`Larsy Adamdır Gerisi Yalandır :heart:`)
});

//---------------------------Komutlar------------------------------------\\


client.on("guildMemberAdd", async (member) => {
    member.roles.add(Roles.Unregister) //kayıtsız rolu verir
    member.roles.add(Roles.Unregister) //kayıtsız rolu verir
    member.roles.add(Roles.Unregister) //kayıtsız rolu verir
    member.roles.add(Roles.Unregister) //kayıtsız rolu verir        
    member.setNickname(ServerSettings.WelcomeName) //ismini degistirir 
    member.setNickname(ServerSettings.WelcomeName) //ismini degistirir 
    member.setNickname(ServerSettings.WelcomeName) //ismini degistirir  
    member.setNickname(ServerSettings.WelcomeName) //ismini degistirir 
    });


//---------------------------Komutlar------------------------------------\\   


//---------------------------BOTU SESE SOKMA---------------------------\\ 


    client.on("ready", async () => {
      let botVoiceChannel = client.channels.cache.get(Settings.botVoiceChannelID);
      if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor, Lütfen Ses Kanal ID'sini Kontrol Et."));
    });
    

//---------------------------BOTU SESE SOKMA---------------------------\\      
    

//-------------------------GUVENILIRLIK KONTROL--------------------------\\    


    client.on("guildMemberAdd", member => {  
      let los = client.users.cache.get(member.id);
      require("moment-duration-format");
        const kurulus = new Date().getTime() - los.createdAt.getTime();  
        var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")  
      var kontrol;
    if (kurulus < 1296000000) kontrol = `Güvenilir Değil`
    if (kurulus > 1296000000) kontrol = `Güvenilir Görünüyor`
      moment.locale("tr");
      const kanal = member.guild.channels.cache.get(Channels.Channels.WelcomeChat)     
      const kuruluss = new Date().getTime() - los.createdAt.getTime();  
      const gecen = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
      const korumatarih = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 


//-------------------------GUVENILIRLIK KONTROL--------------------------\\


//---------------------------HOSGELDIN MESAJI---------------------------\\  


welcome.send(`
      **Sunucumuza Yeni Bir Üye Katıldı.**

**• Sunucumuza Hoşgeldin ${los}.**

**• Sunucumuz Seninle Beraber ${üyesayısı} Kişiye Ulaştı.**

**• \`✢\` Tagımızı Alarak Ailemize Katılabilirsin.**

**• <@&${Roles.Registerer}> Senin Ile İlgilenicektir.**

**• Hesabın ${gecen} Önce Oluşturulmuş.**

**• Bu Kullanıcı ${kontrol}.**

**• Confirmed Odalarından Birine Geçerek Kaydolabilirsin.**`)

    })
  

  //---------------------------HOSGELDIN MESAJI---------------------------\\


  //---------------------------SUPHELI SISTEM----------------------------\\


  client.on("guildMemberAdd", member => {
    let loss = client.users.cache.get(member.id);
    const sphlogs = member.guild.channels.cache.get(Channels.Channels.SupheliLogss)
    const kanall = member.guild.channels.cache.get(Channels.Channels.WelcomeChat)     
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
     member.roles.remove(Roles.Unregister)
     member.roles.remove(Roles.Unregister)   
     member.roles.remove(Roles.Unregister)
     member.roles.remove(Roles.Unregister)      
     member.roles.add(Roles.Supheli)
     member.roles.add(Roles.Supheli)
     member.roles.add(Roles.Supheli)
     member.roles.add(Roles.Supheli)     
     member.roles.add(Roles.Jail)
     member.roles.add(Roles.Jail)
    member.roles.add(Roles.Jail)
     member.roles.add(Roles.Jail) 
     member.setNickname(ServerSettings.SupheliName)
     member.setNickname(ServerSettings.SupheliName)
     member.setNickname(ServerSettings.SupheliName)
     member.setNickname(ServerSettings.SupheliName)

  member.user.send('**Selam Hesabın Yeni Açıldığı İçin Şüpheli Hesap Katagorisine Giriyor Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.**')
  setTimeout(() => {

  kanall.send(`${loss} **Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Şüpheliye Atıldın.**`)

  const suphelilogs = new MessageBuilder()
  .setTitle(`Şüpheliye Atıldı`)
  .setDescription(`${loss} **Şüpheliye Atıldı**`)
  .setColor("#323131")
  .setTimestamp()

  sphlogs.send(suphelilogs)  
  
  }, 1000)
  
  
     }
          else {
  
          }
      });


  //--------------------------- SUPHELI SISTEM----------------------------\\   

//---DEV---\\
var dev = "Developed By"
var y = "𝙻"
var s = "𝚊"
var r = "𝚛"
var a = "𝚜"
var l = "𝚢"
//---DEV---\\