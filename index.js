require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;


    do{
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ingrese una ciudad o lugar: ');
                
                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                
                //Seleccionar el lugar
                const id = await listarLugares(lugares);

                if(id === '0') continue;

                const lugarSeleccionado = lugares.find(lugar=>lugar.id === id);
                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                //clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
                
                //Mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarSeleccionado.nombre);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:',lugarSeleccionado.lng);
                console.log('Temperatura:',clima.temp);
                console.log('Minima:',clima.min);
                console.log('Maxima:',clima.max);
                console.log('Como esta el clima:',clima.desc);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i)=>{
                    const idx = `${i +1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
        
        }



        if(opt !== 0) await pausa();
        
    } while (opt !== 0);

}

main();