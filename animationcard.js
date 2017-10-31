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
bot.dialog('/animation', [
    function (session) {
        var animationCard = new builder.AnimationCard(session)
        .title('It')
        .subtitle('Animation Card')
        .image(builder.CardImage.create(session))
        .media([
            { url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif' }
        ]);
        
    var msj = new builder.Message(session).addAttachment(animationCard);
    session.send(msj);
    session.endDialog();

    }
]);