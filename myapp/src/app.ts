import * as express from 'express';
import {Cat,CatType} from './app.model';

const app: express.Express = express();

//* logging middelware
app.use((req, res, next) => {
    console.log(req.rawHeaders[1]);
    console.log('this is logging middelware');
    next();
});

//* json middleware
app.use(express.json());


//* READ 고양이 전체 데이터 다 조회
app.get('/cats', (req, res)=>{
    try {
        const cats = Cat;
       // throw new Error("db connect error");
        res.status(200).send({
            success: true,
            data:{
                cats,
            },
        });
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});

//* READ 특정 고양이 데이터 조회
app.get('/cats/:id', (req, res)=>{
    try {
        const params = req.params;
        console.log(params);
        const cats = Cat.find((cat)=>{
            return cat.id === params.id;
        })
        res.status(200).send({
            success: true,
            data:{
                cats,
            },
        });
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});

//* CREATE 새로운 고양이 추가 API
app.post('/cats', (req, res)=>{
    try{
        const data = req.body;
        console.log(data);
        Cat.push(data); // create
        res.status(200).send({
            success: true,
            data: { data },
        });
    }catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});


/* 404 middle ware */
app.use((req,res,next)=>{
    console.log('this is error middelware');
    res.send({error: '404 not found error'});
});


app.listen(3000, ()=>{console.log('server is on...');
});




