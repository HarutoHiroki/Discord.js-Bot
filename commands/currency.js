var https = require('https');

exports.run = (client, message, args) =>{
function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  var apiKey = 'f35c7e686d14fa19160c';

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://free.currconv.com/api/v7/convert?q=' + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      try {
        var jsonObj = JSON.parse(body);

        var val = jsonObj[query];
        if (val) {
          var total = val * amount;
          cb(null, Math.round(total * 100) / 100);
        } else {
          var err = new Error("Value not found for " + query);
          return message.channel.send(`An error occured: \`\`\`${err}\`\`\``)
          //console.log(err);
          cb(err);
        }
      } catch(e) {
        console.log("Parse error: ", e);
        message.channel.send("An error occured: ",e)
        cb(e);
      }
    });
  }).on('error', function(e){
    console.log("Got an error: ", e);
    message.channel.send("An error occured: ",e)
    cb(e);
  });
}

if(isNaN(args[0])) return message.reply(' please enter a valid number for amount.');
let a = parseInt(args[0]);

if(!args[1]) return message.reply(' please enter the base currency.');
let base = args[1].toUpperCase();
if (!base) {
  message.reply(' please enter the base currency.');
}

if(!args[2]) return message.reply(' please enter the target currency.');
let target = args[2].toUpperCase();
if (!target) {
  message.reply(' please enter the target currency.');
}

convertCurrency(a, base, target, function(err, amount) {
  if(err) console.log(err);
  message.channel.send(`**${a} ${base}** equals to **${amount} ${target}**`)
});
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'currency',
    description: 'Convert Currencies',
    category: "Useful",
    usage: 'currency <amount> [Base currency] [Target currency]'
  };
