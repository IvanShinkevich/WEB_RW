var express = require("express");
var bodyParser = require("body-parser");


var mongoClient = require("mongodb").MongoClient;


var url = "mongodb://localhost:27017/usersdb";




var StationsToSend=[{nameStart: 'Минск-Пассажирский1',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00", //инфа, которая отправляется
timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                             // в таблицу
{nameStart: 'Минск-Пассажирский2',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                     //
timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                             //
{nameStart: 'Минск-Пассажирский3',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                     //
timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"}];                                                            //




var app = express();
// создаем парсер для данных в формате json
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));

app.get("/api/users", function(req, res) {

    mongoClient.connect(url, function(err, db) {
        db.collection("users").find({}).toArray(function(err, users) {
            res.send(users)
            db.close();
        });
    });
});




app.get("/api/Stations", function(req, res) {   //get запрос для таблицы
    res.send(JSON.stringify(StationsToSend));   //
});                                             //





app.post("/user", jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    mongoClient.connect(url, function(err, db) {

        var collection = db.collection("users");
        var user = { name: request.body.userName, age: request.body.userAge };
        collection.insertOne(user, function(err, result) {

            if (err) {
                return console.log(err);
            }
            // else {
            //     db.collection("users").find({}).toArray(function(err, users) {
            //         response.send(users);
            //         db.close();
            //     });
            // }
        });
    });
    response.json(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, response) {
    
    response.send("<h1>Главная страница</h1>");
    
});

app.listen(3000);