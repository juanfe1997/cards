var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/audio', [
    function (session) {
        var audioCard = new builder.AudioCard(session)
        .title('Air Force One')
        .subtitle('harrison ford')
        .text('Harrison Ford as President Marshall ... "We will no longer negotiate. We will no longer tolerate and we will no longer be afraid.....it')
        .image(builder.CardImage.create(session, 'http://panoramanegro.com.ar/wp-content/uploads/2015/07/IMAGEN-ATLETICO-NACIONAL.png'))
        .media([
            { url: 'http://www.wavlist.com/movies/066/af1-afraid.wav' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://es.wikipedia.org/wiki/Air_Force_One', 'Read More')
        ]);
        
    var msj = new builder.Message(session).addAttachment(audioCard);
    session.send(msj);
    session.endDialog();

    }
]);