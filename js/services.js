
pomodogular.constant('bell', document.querySelector('#audioAlert'));

pomodogular.factory('pomodoros', function(){

    var Pomodoros = function(){
        this.total = parseInt(localStorage.getItem('pomodoros'), 10) || 0;
    };

    Pomodoros.prototype.inc = function(){
        this.total += 1;
        localStorage.setItem('pomodoros', this.total);
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

pomodogular.directive('countdown', function() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var countdownEnabled = true;
            var countdown = '00:00';
            scope.$watch(attrs.enabled, function(enabled) {
                countdownEnabled = enabled;
                if (countdownEnabled === false) {
                    elem.text(attrs.defaultValue);
                }
                else {
                    elem.text(countdown);
                }
            });
            scope.$watch(attrs.countdown, function(seconds) {
                var minutes = parseInt(seconds/60, 10);
                minutes = _.str.pad(minutes, 2, '0');
                seconds = _.str.pad(seconds % 60, 2, '0');
                countdown = minutes+':'+seconds;
                if (countdownEnabled !== false) {
                    elem.text(countdown);
                }
            });
        }
    };
});
