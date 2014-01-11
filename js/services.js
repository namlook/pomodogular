
pomodogular.constant('bell', document.querySelector('#audioAlert'));

pomodogular.factory('pomodoros', function(){

    var Pomodoros = function(){
        this.total = parseInt(localStorage.getItem('pomodoros'), 10) || 0;
    };

    Pomodoros.prototype.add = function(){
        this.total += 1;
        localStorage.setItem('pomodoros', this.total);
    };

    Pomodoros.prototype.reset = function(){
        this.total = 0;
        localStorage.removeItem('pomodoros');
    };

    return new Pomodoros();
});

pomodogular.factory('timer', function($interval){

    var Timer = function(){
        this._interval = null;
        this.duration = null;
        this.remainingSeconds = null;
        this.isStarted = false;
    };

    Timer.prototype.stop = function() {
        $interval.cancel(this._interval);
        this._interval = null;
        this.duration = null;
        this.remainingSeconds = null;
        this.isStarted = false;
        localStorage.removeItem('timer');
    };

    Timer.prototype.start = function(options) {
        options = options || {};
        this.duration = options.duration;
        this.remainingSeconds = options.duration;
        this.type = options.type;
        this.isStarted = true;

        localStorage.setItem('timer', angular.toJson({
            startedAt: Date.now(),
            duration: options.duration,
            type: options.type
        }));

        $interval.cancel(this._interval);
        var that = this;
        this._interval = $interval(function(){
            if (that.remainingSeconds > 0){
                that.remainingSeconds = that.remainingSeconds - 1;
            }
            else {
                that.stop();
            }
        }, 1000);
    };

    return new Timer();
});
