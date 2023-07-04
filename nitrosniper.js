const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const config = require("./config.json")
const bot = new Discord.Client();
const title = require('console-title');
const notifier = require('node-notifier');

let count = 0;
            var twirlTimer = (function() {
                var P = ["\\", "|", "/", "-"];
                var x = 0;
                return setInterval(function() {
                  process.stdout.write("\r                                                                  Loading " + P[x++]);
                  x &= 3;
                }, 250);
              })();
            //}

bot.on("ready", () => {
    clearInterval(twirlTimer)
    console.clear()
    console.log(chalk.red(`\n          ███▄▄▄▄      ▄█      ███        ▄████████  ▄██████▄          ▄████████ ███▄▄▄▄    ▄█     ▄███████▄    ▄████████    ▄████████     `))
    console.log(chalk.white(`          ███▀▀▀██▄   ███  ▀█████████▄   ███    ███ ███    ███        ███    ███ ███▀▀▀██▄ ███    ███    ███   ███    ███   ███    ███     `))
    console.log(chalk.red(`          ███   ███   ███▌    ▀███▀▀██   ███    ███ ███    ███        ███    █▀  ███   ███ ███▌   ███    ███   ███    █▀    ███    ███     `))
    console.log(chalk.white(`          ███   ███   ███▌     ███   ▀  ▄███▄▄▄▄██▀ ███    ███        ███        ███   ███ ███▌   ███    ███  ▄███▄▄▄      ▄███▄▄▄▄██▀     `))
    console.log(chalk.red(`          ███   ███   ███▌     ███     ▀▀███▀▀▀▀▀   ███    ███      ▀███████████ ███   ███ ███▌ ▀█████████▀  ▀▀███▀▀▀     ▀▀███▀▀▀▀▀       `))
    console.log(chalk.white(`          ███   ███   ███      ███     ▀███████████ ███    ███               ███ ███   ███ ███    ███          ███    █▄  ▀███████████     `))
    console.log(chalk.red(`          ███   ███   ███      ███       ███    ███ ███    ███         ▄█    ███ ███   ███ ███    ███          ███    ███   ███    ███     `))
    console.log(chalk.white(`           ▀█   █▀    █▀      ▄████▀     ███    ███  ▀██████▀        ▄████████▀   ▀█   █▀  █▀    ▄████▀        ██████████   ███    ███     `))
    console.log(chalk.red(`                                         ███    ███                                                                         ███    ███ \n\n`))
    console.log(chalk.italic(`                                                   https://discord.gg/CX4kbFJ\n                                                   https://pastebin.com/ZdD09Ngf\n`))

    console.log(`                                                Logged in as: ${chalk.bold(bot.user.tag)}\n                                                Email: ${chalk.bold(bot.user.email)}\n                                                ID: ${chalk.bold(bot.user.id)}\n`);
    title(`Nitro Sniper | Logged in as: ${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends | Developed by mithian`);
});

/*})
})*/

let repeated = [];
bot.on("message", message => {
    let code;
    if (message.channel.type != 'dm' && message.channel.type != 'group') {
        // Nitro Looter
        if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/")) {
            var start = new Date();
            var d = Date(Date.now()).toString()
            console.log(`[${chalk.magentaBright("RECEIVED")}] - ${chalk.underline(message.content)} - ${chalk.magentaBright("Sent by: " + message.author.tag)} - [in the server: ${chalk.cyan(message.guild.name + " | " + d)}]`);
            // Testing if the message is a nitro gift link.
            if (message.content.includes("discord.gift")) {
                code = message.content.split("discord.gift/").pop();
                code = code.replace(/\s+/g," "); // Replaces all break lines with spaces in one line.
                code = code.split(' ')[0]; // Removes everything after the code.

                // Repeated code skip.
                if (repeated.includes(code)) {
                    console.log(`${code} - Already claimed`);
                }
                else {
                    request.post({
                        url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                        headers: {
                            'Authorization': config.token
                        },
                        time: true
                    }, function (error, response, body) {
                        var result = JSON.parse(body);
                        var responseTime = new Date() - start;
                        console.log(`[${chalk.magentaBright('RECEIVED')}] - ${result.message} (${responseTime / 1000}s)`);
                        // Notification alerts.
                        notifier.notify({
                            title: 'Nitro Sniper',
                            icon: 'nitro-png-2.png',
                            appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                            message: result.message,
                            timeout: 0.1
                        });
                    });
                    repeated.push(code);
                }
            }
            // Otherwise, check if the message is another gift link variant.
            else if (message.content.includes("discordapp.com/gifts")){
                code = message.content.split("discordapp.com/gifts/").pop();
                code = code.replace(/\s+/g," "); // Replaces all break lines with spaces in one line.
                code = code.split(' ')[0]; // Removes everything after the code.
                
                if (repeated.includes(code)) {
                    console.log(`${code} - Already redeemed.`);
                }
                else {
                    request.post({
                        url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                        headers: {
                            'Authorization': config.token
                        },
                        time: true
                    }, function (error, response, body) {
                        var result = JSON.parse(body);
                        var responseTime = new Date() - start;
                        console.log(`[${chalk.magentaBright('RECEIVED')}] - ${result.message} (${responseTime / 1000}s)`);
                        // Notification alerts
                        notifier.notify({
                            title: 'Nitro Sniper',
                            icon: 'nitro-png-2.png',
                            appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                            message: result.message,
                            timeout: 0.1
                        });
                    });
                    repeated.push(code);
                }
            }
            count += 1;
            if (count == 1) {
                title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends | ${count.toString()} gift sent`)
            }
            else if (count > 1) {
                title(`${bot.user.tag} | ${bot.guilds.size} guilds | ${bot.user.friends.size} friends | ${count.toString()} gifts sent`)
            }
        }
    }
});
bot.login(config.token).catch(function (error) {
    console.log(error.message);
});
