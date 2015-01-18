var util = require('util');
var fs = require('fs');

var markov = require('markov')();

var corpus = fs.createReadStream(__dirname + '/preface.txt');

markov.seed(corpus, function () {
  var stdin = process.openStdin();
  util.print('> press enter to generate a dialectical tweet');

  stdin.on('data', function (line) {
    var words;
    while (!words || words.length > 140) {
      words = markov.fill(markov.pick(), 10).join(' ');
    }

    console.log(words);

    util.print('> press enter to generate a dialectical tweet');
  });
});
