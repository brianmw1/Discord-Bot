const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();

client.login('MzAwODI4NjE1OTEyOTgwNDgw.C8yO9A.9ROT0tuboGCPivhe-L9rRuJytaw');

client.on('ready', () => {
  console.log('Hello. Silvia is now ready.');
});

function commandIs(string, message) {
  return message.content.toLowerCase().startsWith("-" + string);
}

//Removes the command of the message, returns message without command
function removeCommand(message) {
  return message.substr(message.indexOf(' ')+1);
}
//gets the command of the message, splitting the command and its arguments
function getCommand(message) {
  return message.split(' ')[0];
}
//command object descriptions, used for the help command.
var commands = {
  "help": {
    name: "help",
    help: "-help <command>",
    description: "shows help page for specified command. If no command is specified, brings up"
    + " the general help page."
  },
  "ha": {
    name: "ha",
    help: "-ha",
    description: ":haHAAb: emote"
  },
  "decide": {
    name: "decide",
    help: "-decide <arg1> | <arg2> | ...",
    description: "decides on an argument at random"
  },
  "yn": {
    name: "yn",
    help: "-yn <yes/no/maybe>",
    description: 'requests a gif from ' + 'http://yesno.wtf/api/?force='+ ' api based on the argument.'
  },
  "addgav": {
    name: "addgav",
    help: "-addgav <quote>",
    description: "adds the quote to the \"gav\" database"
  },
  "gavquote": {
    name: "gavquote",
    help: "-gavquote",
    description: "reads a random quote from \"gav\" database and sends the message"
  },
  "addbrian": {
    name: "addbrian",
    help: "-addbrian <quote>",
    description: "adds the quote to the \"brianquote\" database"
  },
  "brianquote": {
    name: "brianquote",
    help: "-brianquote",
    description: "reads a random quote from the \"brian\" data base"
  },
  "item": {
    name: "item",
    help: "-item <unique PoE item>",
    description: "retrieves the stat information of the item from pathofexile.gamepedia.com"
  }
};

client.on('message', message => {
  if(commandIs("help", message) || commandIs("tasukete", message)) {
    if (getCommand(message.content) === '-help' && message.content.split(" ").length === 1) {
      message.channel.sendEmbed({
        color: 330066,
        title: '___Help___',
        description: 'The following are a list of commands and their formats.',
        fields:
        [{
            name:'Commands:',
            value:
            '-help <command name>\n' +
            '-ha\n' +
            '-decide <arg1> | <arg2> | ...\n' +
            '-addgav <quote>\n' +
            '-gavquote\n' +
            '-addbrian <quote>\n' +
            '-brianquote\n' +
            '-yn <yes/no/maybe>\n' +
            '-item <unique PoE item>'
        }]
      });
    }
    else if(getCommand(message.content) === '-help' && message.content.split(" ").length === 2) {
        var arg = removeCommand(message.content);
        if(commands[arg] === undefined) {
          message.channel.sendMessage('Please try the \'help\' command using a valid command name.'
          + ' Also, do not include the \'-\' prefix for the command name.');
        } else {
          message.channel.sendMessage(commands[arg].help + '\n\t'
          + commands[arg].description, {code:true});
        }
    }
  }

  // ha command for certain server, just much easier to type -haha.
  if (commandIs("ha", message)) {
    if (getCommand(message.content) === '-ha' && message.content.split(" ").length === 1) {
      message.delete();
      message.channel.sendMessage('<:haHAAb:286363409757241354>').catch(console.error);
    }
  }
  if (commandIs("decide", message)) {
    if (getCommand(message.content) === '-decide' && message.content.split(" ").length > 1) {
      var arg = removeCommand(message.content); // removes the command from the string
      arg = arg.split('|'); //splits the new string by '|' character, if arg length is still 1 not enough
      //arguments
      if (arg.length === 1) {
        message.channel.sendMessage(message.author.username + ', please pass more than one arguments to the '
        + message.content + ' command, and try again.');
        //returns message.content because the whole string is ^command without arguments
      } else {
        message.channel.sendMessage(arg[Math.floor(Math.random() * arg.length)]);
      }
    }
  }

  if (commandIs("addgav", message)) {
    var fs = require("fs");
    if (getCommand(message.content) === '-addgav' && message.content.split(" ").length === 1) {
      message.channel.sendMessage("There is no quote to be added.");
    } else if(getCommand(message.content) === '-addgav' && message.content.split(" ").length > 1) {
      var arg = removeCommand(message.content);
      fs.appendFile('gavquote.txt', arg + '.end\r\n', function(err) {
    });
      message.channel.sendMessage("I have added the quote at your request.");
    }
  }

  if(commandIs("gavquote", message)) {
    var fs = require("fs");
    if(getCommand(message.content) === '-gavquote' && message.content.split(" ").length === 1) {
      fs.readFile('gavquote.txt', 'utf8', function(err, data) {
        if (err) return console.error(err);
        var lines = data.split('.end\r\n');
        var line = lines[Math.floor(Math.random() * lines.length)];
        while(line === '') {
          line = lines[Math.floor(Math.random() * lines.length)];
        }
        message.channel.sendMessage(line, {code:true});
      });
    }
  }

  if (commandIs("addbrian", message)) {
    var fs = require("fs");
    if (getCommand(message.content) === '-addbrian' && message.content.split(" ").length === 1) {
      message.channel.sendMessage("There is no quote to be added.");
    } else if(getCommand(message.content) === '-addbrian' && message.content.split(" ").length > 1) {
    var arg = removeCommand(message.content);
    fs.appendFile('brianquote.txt', arg + '.end\r\n', function(err) {
    });
        message.channel.sendMessage("I have added the quote at your request.");
    }
  }

  if(commandIs("brianquote", message)) {
    var fs = require("fs");
    if(getCommand(message.content) === '-brianquote' && message.content.split(" ").length === 1) {
      fs.readFile('brianquote.txt', 'utf8', function(err, data) {
        if (err) return console.error(err);
        var lines = data.split('.end\r\n');
        var line = lines[Math.floor(Math.random() * lines.length)];
        while(line === '') {
          line = lines[Math.floor(Math.random() * lines.length)];
        }
        message.channel.sendMessage(line, {code:true});
      });
    }
  }

  if(commandIs("yn", message)) {
    var suffix = removeCommand(message.content).toLowerCase();
    if(!(getCommand(message.content) === '-yn')) {
      message.channel.sendMessage("Please pass an argument (yes/no/maybe) to the -yn command");
    } else if (!(suffix === 'yes' || suffix === 'no' || suffix === 'maybe')) {
      message.channel.sendMessage("Your argument is not yes, no, or maybe. Please try again.");
    } else if (getCommand(message.content) === '-yn' && message.content.split(" ").length === 2) {
      var request = require('request');
      request('http://yesno.wtf/api/?force=' + suffix, function(error,response,body) {
        if(!error && response.statusCode == 200) {
          var yn = JSON.parse(body);
          message.channel.sendMessage(yn.image);
        } else {
          console.log("warn", "Got an error: ", error, ", status: ", response.statusCode);
        }
      });
    }
  }

  //poe commands
  if(commandIs("item", message)) {
    //use request in javascript
  }
});
