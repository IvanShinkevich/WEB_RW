var express = require("express");
var bodyParser = require("body-parser");


var mongoClient = require("mongodb").MongoClient;


var url = "mongodb://localhost:27017/usersdb";




// var StationsToSend=[
//     {nameStart: 'Минск-Пассажирский',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00", //инфа, которая отправляется
// timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                             // в таблицу
//     {nameStart: 'Минск-Южный',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                             //
// timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                                 //
//     {nameStart: 'Минск-Северный',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                          //
// timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                                 //
//     {nameStart: 'Зелёное',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                                 //
// timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                                 //
//     {nameStart: 'Ляховичи',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                                //
// timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                                 //
//     {nameStart: 'Лебяжий',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                                 //
// timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                                 //
//     {nameStart: 'Минское Море',dateStart:"17.10.2017",dateEnd:"17.10.2017",nameTo: 'Барановичи-Полесские',timeStart:"16.00",                            //
// timeEnd:"18.00",inRoad:"2 hours",WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"},                                                                 //
// ];                                                                                                                                                      //



var ChoosenStations={
    nameStart: "", dateStart:"17.10.2017", dateEnd:"17.10.2017", nameTo: "", timeStart: "",
    timeEnd: "" , inRoad:"Calculating...", WagonType: "Плацкарт", cost:"20p", TicketsNumber:"3"
};


var Stations=[
    {  name: 'Минск-Пассажирский',date:"17.10.2017",time:"14.00"},
    {  name: 'Минск-Южный',date:"17.10.2017",time:"14.15"},
    {  name: 'Минск-Северный',date:"17.10.2017",time:"14.30"},
    {  name: 'Зелёное',date:"17.10.2017",time:"15.00"},
    {  name: 'Ляховичи',date:"17.10.2017",time:"15.20"},
    {  name: 'Лебяжий',date:"17.10.2017",time:"15.40"},
    {  name: 'Минское Море',date:"17.10.2017",time:"16.00"},
    {  name: 'Молодечно',date:"17.10.2017",time:"17.00"}
]


var app = express();
// создаем парсер для данных в формате json
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));



app.post("/ToTable", jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);


    var Way =JSON.parse(request.body);  // не работает. Надо запарсить и везде позаменять чтобы ок было
    
    console.log(Way.nameStart);
    console.log(Way.nameTo);

    ChoosenStations.nameStart=request.body.from;
    ChoosenStations.nameTo=request.body.to;
    console.log(ChoosenStations.nameStart);
    console.log(ChoosenStations.nameTo);
    for(var i=0;i<Stations.length;i++)
    {
        if(Stations[i].name==request.body.from)
             ChoosenStations.timeStart=Stations[i].time;
    }

    for(var i=0;i<Stations.length;i++)
    {
        if(Stations[i].name==request.body.to)
             ChoosenStations.timeEnd=Stations[i].time;
    }

    console.log(ChoosenStations);
});













app.get("/api/users", function(req, res) {

    mongoClient.connect(url, function(err, db) {
        db.collection("users").find({}).toArray(function(err, users) {
            res.send(users)
            db.close();
        });
    });
});




app.get("/api/Stations", function(req, res) {   //get запрос для таблицы
    res.send(JSON.stringify(ChoosenStations));   //
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