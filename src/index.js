const express=require("express");
const app=express();
const morgan=require("morgan");

//settings
app.set("port",process.env.PORT || 3000);
app.set('json spaces',2);

//uses
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api',require('./routes/routes'));

app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
    console.log('connecting db');
});



