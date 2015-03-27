function proceed(p){
//событие,происходящее с вер-тью p
    return  Math.random() < p;
}

//----------------канал----------------------

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
        //обработка заявки с вероятностью закончить на этом
        //такте = 1 - pi
        this.isEmpty = proceed(1 - this.pi);
    }
};


//---------------источник--------------------

function Source(cycles){
    //число тактов до появления заявки на выходе источника
    //1,2,0(блокировка)
    this.cycles = cycles;
    //значение блокировки
    this.blockCycle = 0;
    //цикл,на котором вырабатывается заявка
    this.workingCycle = 1;
    //макс число тактов до появл заявки
    this.nCycles = cycles;
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
        //кол-во тактов до появл заявки = 2(максимальный)
        this.cycles = this.nCycles;
    },

    blockProb : function(clock){//вероятность влокировки
        return this.blockCount / clock;
    }
    ,
    setMaxCycle : function(){//поставить отсчёт до выработки заявки
        // на макс. значение
        this.cycles = this.nCycles;
    },
    isBlocked : function(){//проверка на заблокированность очереди
        return this.cycle === this.blockCycle;
    }

};


//------------------очередь-----------------
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
        source.cycles = source.blockCycle;
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

function stateTransition(source,chanels){
    //обработка заявлений,освобожд каналы помечаются
    var len = chanels.length
    for(var i = 0;i < len;i++)
        if(!chanels[i].isEmpty){
            chanels[i].handling();
        }
    //разблокирвать источник,если освободился хоть бы 1 канал
    if(source.cycles === source.blockCycle && chanels.some(function(el,i,arr){return el.isEmpty;}))
        source.unblock();
}

//эмуляция СМО
function emulation(chanel1,chanel2,cl,queueLen,lockProb){
    //считывание параметров
    var pi_1 = parseFloat( chanel1.text);
    var pi_2 = parseFloat( chanel2.text);
    var clock = parseFloat( cl.text);

    //эмуляция работы СМО
    //число тактов до появления заявки на выходе ист-ка = 2
    var source = new Source(2);

    //макс длина очереди = 1
    var queue = new Queue(1);
    //2 канала с вер отказа pi_1 и pi_2
    var chanels = [ new Chanel(pi_1),new Chanel(pi_2) ];



    //генератор тактов
    for(var i = 0;i < clock;i++)
    {
        //попытаться разгрузить очередь,если таковая имеется
        queue.tryToServe(chanels);

        if(source.cycles === source.workingCycle)
        {//время выработки заявки

            //заявка каждые 2 такта,либо обслуж либо в очередь
            source.appToService(chanels,queue);

            //проверка на возможную блокировку
            if(!source.isBlocked())
                //начать отсчёт заново
                source.setMaxCycle();
        }
        else if (source.cycles !== source.blockCycle)
            source.cycles--;    // отсчитывать время до заявки

        //вывод состояния на консоль
        /*console.log(queue.elNum + " " + source.cycles + " " + (!chanels[0].isEmpty + 0) +
                    " " + ( !chanels[1].isEmpty + 0) );
        */

        //подсчёт суммы длинн очереди на каждом такте
        queue.sumCurElNum();
        //переход в следующее состояние
        stateTransition(source,chanels);
    }

    // запись и вывод свойств
    queueLen.text = "queue Length: " + queue.avLength(clock).toString();
    lockProb.text = "lock Probability: " + source.blockProb(clock).toString();
}




