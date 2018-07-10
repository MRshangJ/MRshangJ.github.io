//请求http服务模块;
const http=require("http");
//请求fs文件系统模块;
const fs=require("fs");
//请求路径服务;
const path=require("path");
//请求操作字符串服务;
const querystring=require("querystring");
//请求content-type格式服务;
const mime=require("mime");

//http创建服务;
http.createServer((request,response)=>{
    //暂时设置响应终止,检查页面效果;
    //response.end("ShangJ");//监听成功,注释该语句;
    //声明变量承接,我们要制作的后台数据库根目录字符串路径;
    let url=path.join(__dirname,"root")
    let rootUrl=path.join(__dirname,"root",querystring.unescape(request.url));//讲url转码成中文可识别形式;
    console.log(rootUrl);
    //首先要判断服务器是否拥有我们设置的根目录路径;
    let isExist=fs.existsSync(rootUrl)
        //如果不存在说明没有,那么我们需要终止相应,展示404页面,并且修改响应头为404;
        if(!isExist){
            response.writeHead(404,{
                "content-type":"text/html;charset=utf-8"
            })
            response.end("<h1>404 file not found</h1>")
        //else说明路径正确,下一步我们只需要判断根目录中的内容类型就可以;
        }else{
            //判断根目录下的文件类型;
            fs.readdir(rootUrl,(err,files)=>{
                //如果返回err,说明根目录之下并不是一个文件夹,而是实实在在的文件,例如html;
                if(err){
                //如果是一个文件,那么直接采用fs的readFILE进行解析并显示在页面之上;
                fs.readFile(rootUrl,(err,data)=>{
                    response.writeHead(200,{
                        "content-type":mime.getType(rootUrl)                  
                    })
                    response.end(data);
                })
                //进入datas,则是证明根目录之下是一个文件夹,从而被fs.readdir所甄别出来;
                }else{
                    //如果根目录是一个文件夹,那么我们首先需要判断根目录文件夹中是否拥有index.html,如果有则直接显示在页面上;
                    if(files.indexOf("index.html")!=-1){
                        //不等于-1,说明files中拥有index.html,那么渲染页面;
                       fs.readFile(path.join(rootUrl,"index.html"),(err,data)=>{
                        //渲染页面前,设置响应头的content-type,这里为了准确识别文件格式,引入了,mime模块;
                        response.writeHead(200,{
                            "content-type":mime.getType(path.join(rootUrl,"index.html"))
                        })
                        response.end(data);
                        });
                    }else{
                        //如果根目录中没有index.html,那么我们需要遍历readir回调函数中的files提取出我们需要的页面结构;
                        let rootData=``;
                        //循环遍历files数组;
                        for(let i=0;i<files.length;i++){
                            //这里判断是否在能够访问次级文件夹中的文件;
                            rootData+=`<h2><a href="${request.url=='/'?'':request.url}/${files[i]}">${files[i]}</a></h2>`;
                        }
                        //设置响应头的content-type;
                        console.log(rootUrl)
                        response.writeHead(200,{
                            "content-type":"text/html;charset=utf-8"
                        })
                        //渲染到页面;
                        response.end(rootData);
                    }
                }
            })
        }
    //使用创建好的http服务,监听端口以及IP地址;
}).listen(80,"127.0.0.1",()=>console.log("监听正在进行中..."));