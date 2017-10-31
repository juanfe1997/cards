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
bot.dialog('/signin', [
    function (session) {
        var signInCard = new builder.SigninCard(session)
        .text('Logueate con Instagram')
        .button('Sign-in', 'https://www.instagram.com/?hl=es');
    
        
        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(signInCard);
        session.send(msj);
        session.endDialog();
    
    }  
]);