//importar un servidor
const http = require('http');

//importar const url
const url = require('url');

//importar axios
const axios = require('axios')

//importar uuid
const {
  v4: uuidv4
} = require('uuid')

//importar moment
const moment = require('moment')

//Importar Lodash
const _ = require('lodash')

//importar chalk
const chalk = require('chalk');


//crear array de usuarios
let arrayUsuarios = []


//crear servidor
http.createServer((req, res) => {
    const params = url.parse(req.url, true).query
    if (req.url.includes('/usuarios')) {

      //axios para get
      axios.get("https://randomuser.me/api")
        .then((data) => {
          // Paso 3

          const {
            first,
            last
          } = data.data.results[0].name

          const id = uuidv4().slice(0, 6)

          const timeStamp = moment().format('MMMM Do YYYY, H:mm:ss a')

          arrayUsuarios.push({
            nombre: first,
            apellido: last,
            id: id,
            timeStamp: timeStamp
          })

          let htmlString = ''
          let chalkString = ''

          _.forEach(arrayUsuarios, (e, i) => {

            htmlString += `<p>${i+1}. Nombre: ${e.nombre} - Apellido: ${e.apellido} - ID: ${e.id} - Timestamp: ${e.timeStamp}</p>`

            chalkString += `${i+1}. Nombre: ${e.nombre} - Apellido: ${e.apellido} - ID: ${e.id} - Timestamp: ${e.timeStamp}`

          })

          console.log(chalk.blue.bgWhite(chalkString));

          res.writeHead(200, {
            'Content-Type': 'text/html'
          })

          res.end(htmlString)
        })
        // Paso 4
        .catch((e) => {
          console.log(e);
        });

    }
  })
  .listen(8080, () => console.log('Escuchando el puerto 8080 '))