
function proceed(p){
//событие,происходящее с вер-тью p
    var ans = Math.random() < p;
    return ans;
}



function Chanel(pi){
    //вероятность необработки заявки
    this.pi = pi;
    //флаг пустоты канала
    this.isEmpty = true;
};

Chanel.prototype = {
    occupy : function(){
        //занять канал
        this.isEmpty = false;
    },
    handling : function(){
        this.isEmpty = proceed(1 - this.pi);
    }
};

function stateTransition(source,chanels){
    //обработка заявлений,освобожд каналы помечаются
    var len = chanels.length
    for(var i = 0;i < len;i++)
        if(!chanels[i].isEmpty){
            chanels[i].handling();
        }
    //разблокирвать источник,если освободился хоьб 1 канал
    if(source.isBlocked && chanels.some(function(el,i,arr){return el.isEmpty;}))
        source.unblock();
}


function Source(){
    //флаг блокировки источника
    this.isBlocked = false;
    //кол-во блокировок
    this.blockCount = 0;
};
Source.prototype = {
    appToService : function(chanels,queue) {//выработка заявки
    //обход каналов, попытка найти пустой
        var len = chanels.length;
        for(var i = 0;i < len;i++)
            if(chanels[i].isEmpty)
            {
                //если хоть 1 канал был пустым,заявки идёт туда
               chanels[i].occupy();
                return;
            }

        //все каналы заняты, работаем с очередью
        queue.addOrBlock(this);

    },
    unblock : function(){
        //разблокировать источник
        this.isBlocked = false;
    },

    blockProb : function(clock){//вероятность влокировки
        return this.blockCount / clock;
    }
};



function Queue(maxEl){
    //кол-во ел-тов в очереди
    this.elNum = 0;
    //максимальное кол-во ел-тов в очереди
    this.maxEl = maxEl;
    //суммарная длина очереди(надо для вычисл средней длины)
    this.sumLen = 0;
};

Queue.prototype = {

    blockSource : function(source){   //блокировка источника
        source.isBlocked = true;
        //увелич число блокировок источника(цель исслед)
        source.blockCount++;
    },
    addOrBlock : function(source){
        //добавить эл-т в очередь или блокировать источник
        if( this.elNum === this.maxEl )
            this.blockSource(source);
        else
        {
             //добавление в очередь
            this.elNum++;
        }
    },
    sumCurElNum : function(){
        // добавление в сумму кол-ва эл-тов в очереди
        // происходит на каждом такте
        this.sumLen += this.elNum;
    },

    avLength : function(clock){//средняя длина очереди
        return this.sumLen / clock ;
    },
    tryToServe : function(chanels){//попытка обслужить
        //собравшуюся очередь ,пока есть очередь и хотя бы 1 свободный канал
        // закинуть заявку из очереди в канал

        var chLen = chanels.length;
        for(var i = 0 ;i < chLen ;i++ ){
           if(chanels[i].isEmpty && this.elNum){
               chanels[i].occupy();
               this.elNum--;
           }
           else break;
         }
   }
};



//эмуляция СМО
function emulation(chanel1,chanel2,cl,queueLen,lockProb){
    //считывание параметров
    var pi_1 = parseFloat( chanel1.text);
    var pi_2 = parseFloat( chanel2.text);
    var clock = parseFloat( cl.text);

    //эмуляция работы СМО
    var source = new Source();

    //макс длина очереди = 1
    var queue = new Queue(1);
    //2 канала с вер отказа pi_1 и pi_2
    var chanels = [ new Chanel(pi_1),new Chanel(pi_2) ];
    console.log(chanels.length);
    for(var i = 0;i < clock;i++)
    {
        //попытаться разгрузить очередь
        queue.tryToServe(chanels);

        if(i % 2 === 0 && ( !source.isBlocked ))
            //заявка каждые 2 такта,либо обслуж либо в очередь
            source.appToService(chanels,queue);

        //подсчёт суммы длинн очереди на каждом такте
        queue.sumCurElNum();
        //переход в следующее состояние
        stateTransition(source,chanels);
    }

    // запись и вывод свойств
    queueLen.text = "queue Length: " + queue.avLength(clock).toString();
    lockProb.text = "lock Probability: " + source.blockProb(clock).toString();
}




