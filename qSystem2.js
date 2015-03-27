function proceed(p){
//событие,происходящее с вер-тью p
    return Math.random() < p;
}

function Chanel(){
    //вероятность необработки заявки
    this.pi = 0;
    //флаг пустоты канала
    this.isEmpty = 0;
};

Chanel.prototype = {
    tryToFinish : function(){
    //проверяет,закончилась ли обработка заявки,устанавливает соотв флаг
      return  ( this.isEmpty = proceed(this.pi) );
    },
    tryToPass : function(){//засылка заявки в пустой канал
        if(this.isEmpty)
        {
            this.tryToFinish();
            //заявка обрабатывается
            return true;
        }
        //канал занят
        else return false;
    }

};
//2 канала
var chanels = [ new Chanel(),new Chanel() ];


var source = {
    //флаг блокировки источника
    isBlocked : false,
    //кол-во блокировок
    blockCount : 0,

    generateApp : function() {//выработка заявки
    //обход каналов, попытка найти пустой
        if (chanels.some(function (el) {return el.tryToPass();}))
        //если хоть 1 канал был пустым,заявки идёт туда
            return;

    //все каналы заняты, работаем с очередью
        queue.addAndCheck();
    }
};

var queue = {
    //кол-во ел-тов в очереди
    elNum : 0,
    //максимальное кол-во ел-тов в очереди
    maxEl : 0,
    //суммарная длина очереди(надо для вычисл средней длины)
    sumLen : 0,
    blockSource : function(){//блокировка источника
        source.isBlocked = true;
        //увелич число блокировок источника(цель исслед)
        source.blockCount++;
    },
    addAndCheck : function(){   //добавление в очередь,проверка на переполнение
        this.elNum++;
        this.sumLen++;

        if( this.elNum >= this.maxEl )
            this.blockSource();
    },
    avLength : function(clock){//средняя длина очереди
        return this.sumLen / clock ;
    }
};





