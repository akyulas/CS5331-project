const spawner = require('node:child_process').spawn;

const data_sample =  '{ $ne : -1 }' 
const python_process = spawner('python', ['./identify.py', JSON.stringify( data_sample )])
python_process.stdout.on('data', (data) =>{
    console.log( data.toString() );
});

// node identify.ts