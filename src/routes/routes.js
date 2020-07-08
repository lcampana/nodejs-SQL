const router=require('express').Router();
const sql=require("../sql/sql.js");
var tablas=[]


function getTable(titulo, data){
    if(data.length===0)return "No Data";
    const tit=titulo.toLowerCase();
    const style=`<style>table, th, td {border: 1px solid black;border-collapse: collapse;}th,td{padding: 5px;text-align: left;}table#${tit} tr:nth-child(even){background-color: #eee;}table#${tit} tr:nth-child(odd){background-color: #fff;}table#${tit} th{background-color: gray;color: white;}</style>`;
    const header=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>${tit}</title>${style}</head><body>`
    var txt="";
    Object.keys(data[0]).forEach(function(k){
            txt=txt+`<th>${k}</th>`
    });    
    var salida=`<table id="${tit}" style="width:100%"><caption>${titulo}</caption><tr>${txt}</tr>`;
    var result=""
    for(l in data){
        txt="<tr>"
        Object.keys(data[l]).forEach(function(k){
            txt=txt+`<td>${data[l][k]}</td>`
        });    
        result=result+txt+"</tr>";
    }
    return header+salida+result+"</table></body></html>";
}


function setRoutes(tbl){
    tablas=tbl
    router.get("/query",(req,res)=>{
        var q=req.query.q;
        if(q){
            console.log(q);
            sql.get(q.toString(),function(err,result){
                if(err){
					console.log(err);
                    res.sendStatus(404).send(err);
                }
                else{
					res.type('html');
                    res.send(getTable(q,result));
                } 
            })
        }
    });
    for(let t in tbl){
        router.get(`/${tbl[t]}`,(req,res)=>{
            sql.get(`SELECT TOP 100 * FROM ${tbl[t]}`,function(err,result){
                if(err){
                    res.sendStatus(404).send(err);
                }else{
                    res.type('html');
                    res.send(getTable(`${tbl[t]}`,result));
                } 
            });
        });
    }
}

router.get("/tables",(req,res)=>{
    res.send(tablas)
});

router.get("/params",(req,res)=>{
  var cs=req.query.cs;
    if(cs){
        sql.setConnectionString(cs);
        res.send("Setting ConnectionString to: "+cs)
    }
});

router.get("/help",(req,res)=>{
        const help="api/params?cs={String Connection}<br>api/tables<br>api/{Table}";
        res.send(help)
    }
);  

exports.setRoutes=setRoutes
module.exports =router;
