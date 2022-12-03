const webpush = require('web-push');
const http = require('http'); 
const server = http.createServer(function (req, res) {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        const vapidKeys = {
            publicKey: 'BFNSjyAQ6OX8-VuTd1I4ozeeu8H62PjpwifShjm_wcRfNOEQJr2qEfdE7_qKZHlI6m3dQUo7nUkrTcOTTha973w',
            privateKey: '1smTxgLcd3yCl7saH6vmMIJOEHPaKu_cYwEdMfJLoAw'
        };

        const subscription = {
            endpoint: 'https://fcm.googleapis.com/fcm/send/egWz5oQItOA:APA91bG6TDZqOcvLxDESw6YIiyF7xJGibQigS9CnAa9vHyhfCfO8c3SOgZmtDpRJJ6imk55rHxXwnZ0Mtzc-8L8wduerCpzwPfcQ4MPv8M1SChGUZa-xUhG9W_OAz0VOzsKZVVt-43XA',
            expirationTime: null,
            keys: {
                auth: '22jSDSUKZ4MLHM4XXmHojQ',
                p256dh: 'BFMHxK_fVNnsnixKUBMyKQFpi5n9DKGxm9-ek5QDEqHPVwRGyBf14cX6QqKP5cDXTsTEvYtfD9uQ_xybqYmQT8Q',
            },
        };

        const payload = {
            notification: {
                title: 'Title of Push notification',
                body: 'Hello World!, This is message for Push notification!',
                icon: 'assets/icons/icon-384x384.png'    
            },
        };

        const options = {
            vapidDetails: {
                subject: 'mailto:example_email@example.com',
                publicKey: vapidKeys.publicKey,
                privateKey: vapidKeys.privateKey,
            },
            TTL: 60,
        };

        webpush.sendNotification(subscription, JSON.stringify(payload), options)
            .then((_) => {
                console.log('SENT!!!');
                console.log(_);
            })
            .catch((_) => {
                console.log(_);
            });
        res.end();
    }
});
server.listen(5000); //6 - listen for any incoming requests
console.log('Node.js web server at port 5000 is running..')