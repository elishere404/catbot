require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`✅ ${client.user.username}#${client.user.discriminator} is online.`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!ping')) {
    await message.reply('pong!')
  }

  if (message.content.startsWith('!catfact')) {
    try {
      const response = await axios.get('https://catfact.ninja/fact');
      const fact = response.data.fact;
      await message.channel.send(`Cat Fact: ${fact}`);
    } catch (error) {
      await message.channel.send('Sorry, I could not fetch a cat fact at the moment.');
    }
  }

  if (message.content.startsWith('!kitty')) {
    try {
      const catGifUrl = `https://cataas.com/cat?type=square&${Date.now()}`; 
      const embed = new EmbedBuilder()
        .setTitle("Random cat picture of the day!")
        .setColor(0xFF5733)
        .setImage(catGifUrl); 
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      await message.channel.send('sorry, i could not fetch a random cat picture at the moment.');
    }
  }
});

client.login(TOKEN);