

const sql = require('msnodesqlv8')
var connectionString = "Driver={SQL Server Native Client 11.0}";
//connectionString = "server=DET407\\SQLEXPRESS;Database=Detector;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const route=require("../routes/routes.js");


function get(query,callback) {
    sql.query(connectionString, query,callback);
}


function setConnectionString(cs){
    connectionString = cs.toString()+";"+connectionString;
    if(connectionString.toLowerCase().includes("server=")){
        
    }else{
        connectionString=cs+";"+connectionString;
    }
    console.log(connectionString)
    getTables();
}

function getTables(){
    if(connectionString.toLowerCase().includes("server="))
        get("SELECT * FROM INFORMATION_SCHEMA.TABLES",function(err,result){
            if(err){
                console.log(err);
            }
            else{
                var tables=[]
                for(l in result){
                    tables.push(`${result[l]['TABLE_NAME']}`);
                }
                route.setRoutes(tables);
            } 
            });
}

exports.get=get
exports.setConnectionString=setConnectionString

