const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('query-string');
const PATH = "www/";
let oglasi = [
    {
        'id': 1,
        'kategorija': "Stanovi",
        'datumIsteka': "29-9-2021",
        'cena': "34350 eur",
        'tekstOglasa': "Stan 50 m2,PVC solarija,Grejanje na gas,Vracar.",
        'tag':"Stan Vracar",
        'email': "sr.aleksa@gmail.com"
    },
    {
        'id': 2,
        'kategorija': "Stanovi",
        'datumIsteka': "05-10-2021",
        'cena': "58400 eur",
        'tekstOglasa': "Stan 64 m2,Kameni podovi,2 terase,Stolarija u boji drveta,Dusanovac.",
        'tag':"Stan Dusanovac",
        'email': "sr.aleksa@gmail.com"
    },
    {
        'id': 3,
        'kategorija': "Stanovi",
        'datumIsteka': "28-9-2021",
        'cena': "30100 eur",
        'tekstOglasa': "Povrsina 21 m2,U samom centru beograda,iznad Meka na slaviji,stan potrebno renovirati.",
        'tag':"Stan Slavija",
        'email': "sr.aleksa@gmail.com"
    },
    {
        'id': 4,
        'kategorija': "Stanovi",
        'datumIsteka': "14-11-2021",
        'cena': "136700 eur",
        'tekstOglasa': "Povrsina stana 98 m2,pogled na hram Svetog Save,3 kupatila i 4 spavace sobe,luksuzno opremljen.",
        'tag':"Stan",
        'email': "sr.aleksa@gmail.com"
    },
    {
        'id': 5,
        'kategorija': "Stanovi",
        'datumIsteka': "22-3-2022",
        'cena': "23000 eur",
        'tekstOglasa': "Stan 34 m2,stara gradnja,stan u solidnom stanju,prodaja sa sve namestajem,lokacija:Arandjelovac.",
        'tag':"Stan Arandjelovac",
        'email': "sr.aleksa@gmail.com"
    }
];

http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-oglasi"){ 
            //response = sviOglasi();
            response = poCeni();
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Svi oglasi</title>
                    <style>
                    body {
                        background: Khaki;
                    }
                    button {
                        background-color: #008CBA;
                        border: none;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                      }
                        table, th, td {
                            border-bottom: 1px solid #ddd;
                          }
                        th,td {
                            padding: 6px 13px;
                        }
                    </style>
                </head>
                <body>
                    <h3>Svi oglasi</h3>
                    <a href="/dodaj-oglas"><button>Dodaj oglas</button></a>         
                    <br>
                    <br>
                    <div id="prikaz">
                        <table id="mojaTabela">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Kategorija</th>
                                    <th>Datum isteka</th>
                                    <th>Cenaa</th>
                                    <th>Tekst oglasa</th>
                                    <th>Dodaj tekst oglasa</th>
                                    <th>Tag</th>
                                    <th>E-mail</th>
                                    <th>Brisanje</th>
                                </tr>
                            </thead>               
                            <tbody>
            `);
            for(let o of response){
                res.write(`
                    <tr>
                        <td>${o.id}</td>
                        <td>${o.kategorija}</td>
                        <td>${o.datumIsteka}</td>
                        <td id="cena">${o.cena}</td>
                        <td>${o.tekstOglasa}</td>
                        <td>
                        <a href='/postavi-tekstOglasa?id=${o.id}'><button>Postavi tekst</button></a></td>
                        <td>${o.tag}</td>
                        <td>${o.email}</td>
                        <td>
                            <form action='/obrisi-oglas' method='POST'>
                                <input type='hidden' name='id' value='${o.id}'>
                                <button type='submit'>Brisanje oglasa</button>
                            </form>
                        </td>
                    </tr>
                `);
            }
            res.end(`
                            </tbody>
                        </table>
                    </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/proba"){ 
            res.writeHead(302, {
                'Location': '/svi-oglasi'
            });
            res.end();
        }
        if (urlObj.pathname == "/postavi-tekstOglasa"){
            let oglas = oglasi.find(x => x.id == urlObj.query.id);
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Postavi tekst oglasa</title>
                </head>
                <body>
                    <h3>Postavi tekst oglasa</h3>
                    <a href="/svi-oglasi">Svi oglasi</a>
                    <br><br>
                    <form action='/postavi-tekstOglasa' method='POST'>
                        ID: <input type='number' name='id' value='${oglas.id}' readonly><br><br>
                        TEKST OGLASA: <input type='text' name='tekstOglasa' value='${oglas.tekstOglasa}'><br><br>
                        <button type='submit'>POSTAVI TEKST OGLASA</button>
                    </form>
                </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/dodaj-oglas"){
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dodaj oglas</title>
                </head>
                <body>
                    <h3>Dodaj oglas</h3>
                    <a href="/svi-oglasi">Svi oglasi</a>
                    <
                    <br><br>
                    <form action='/dodaj-oglas' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                        Kategorija: <select name="kategorija" id="kategorija">
                                        <option value="Automobili">Automobili</option>
                                        <option value="Stanovi">Stanovi</option>
                                        <option value="Alati">Alati</option>
                                        <option value="Poducavanje">Poducavanje</option>
                                    </select><br><br>
                        Datum isteka: <input type='text' name='datumIsteka'><br><br>
                        Cena: <input type='text' name='cena'><br><br>
                        Tekst oglasa: <input type='text' name='tekstOglasa'><br><br>
                        Tag: <input type='text' name='tag'><br><br>
                        E-mail: <input type='email' name='email'><br><br>
                        <button type='submit'>DODAJ OGLAS</button>  <input type="reset">
                    </form>
                </body>
                </html>
            `);
        }
    }
    else if(req.method == "POST") {
        if (urlObj.pathname == "/postavi-tekstOglasa"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                postaviTekstOglasa(querystring.parse(body).id,querystring.parse(body).tekstOglasa)
                res.writeHead(302, {
                    'Location': '/svi-oglasi'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/obrisi-oglas"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                obrisiOglas(querystring.parse(body).id)
                res.writeHead(302, {
                    'Location': '/svi-oglasi'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/dodaj-oglas"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajOglas(querystring.parse(body).id,querystring.parse(body).kategorija,querystring.parse(body).datumIsteka,querystring.parse(body).cena,querystring.parse(body).tekstOglasa,querystring.parse(body).tag,querystring.parse(body).email);
                res.writeHead(302, {
                    'Location': '/svi-oglasi'
                });
                res.end();
            });
        }
    }
}).listen(13814);
console.log("Port: 13814");

function sviOglasi(){
    return oglasi;
}
function poCeni(){
  return oglasi.sort((a, b) => a.cena - b.cena);  
}
function postaviTekstOglasa(id,tekstOglasa){
    for(let i=0;i<oglasi.length;i++){
        if(oglasi[i].id == id){
            oglasi[i].tekstOglasa = tekstOglasa
        }
    }
}
function obrisiOglas(id){
    let pomocni = []
    for(let i=0;i<oglasi.length;i++){
        if(oglasi[i].id != id){
            pomocni.push(oglasi[i])
        }
    }
    oglasi = pomocni
    return oglasi
}
function dodajOglas(id,kategorija,datumIsteka,cena,tekstOglasa,tag,email){
    let oglas = {
        'id': id,
        'kategorija': kategorija,
        'datumIsteka': datumIsteka,
        'cena': cena,
        'tekstOglasa': tekstOglasa,
        'tag' : tag,
        'email' : email
    };
    oglasi.push(oglas);
}
    