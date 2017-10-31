var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createS
erver();
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
bot.dialog('/video', [
    function (session) {
        var videoCard = new builder.VideoCard(session)
        .title('jigsaw')
        .subtitle('el juego continua')
        .text(', es un personaje de ficción protagonista de la saga Saw, cuyas principales características son los "juegos" que utiliza para justificar sus acciones. Está interpretado por el actor estadounidense Tobin Bell. La primera película, Saw (James Wan), fue estrenada en 2004 y desde ese momento estrenaron secuelas cada año hasta 2010; Saw II (Darren Lynn Bousman), estrenada en 2005, Saw III (Darren Lynn Bousman), estrenada en 2006, Saw IV (Darren Lynn Bousman) estrenada en 2007, Saw V (David Hackl), estrenada en 2008, Saw VI (Kevin Greutert), estrenada en el 2009 y Saw 3D (Kevin Greutert), estrenada en el 2010, Jigsaw, estrenada en el 2017; cada una se ha estrenado en vísperas de Halloween.')
        .image(builder.CardImage.create(session, 'https://i0.wp.com/sqmagz.com/wp-content/uploads/2017/07/jigsawpostertrialer.jpg?resize=656%2C381'))
        .media([
            { url: 'https://soundcloud.com/jigsaw-audio' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.vanguardia.com/entretenimiento/cine/video-413286-jigsaw-8-el-juego-del-miedo-continua', 'Learn More')
        ]);


        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(videoCard);
        session.send(msj);
        session.endDialog();

    }
]);