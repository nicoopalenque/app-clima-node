const inquirer = require('inquirer');

require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opcion:',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opcion   '.white);
    console.log('========================='.green);
    console.log('\n');

    const {opcion} = await inquirer.prompt(questions);
    return opcion;
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async( message ) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length == 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc
}

const listarLugares = async( lugares = [] )=>{

    const choices = lugares.map( (lugar, i) =>{
        const idx = `${i+1}.`.green;
        return {
           value: lugar.id,
           name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccionar un lugar:',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id
    // {
        // value: '1',
        // name: `${'1.'.green} Crear tarea`
    // },
}

const mostrarListadoChecklist = async( tareas = [] )=>{

    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i+1}.`.green;

        return {
           value: tarea.id,
           name: `${idx} ${tarea.desc}`,
           checked: (tarea.completadoEn) ? true : false
        }
    })
    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}