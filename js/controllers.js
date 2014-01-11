
pomodogular.controller('PomodoroCtrl', function($scope, bell, timer, pomodoros) {

    $scope.dynamicTitle = true;
    $scope.showResetButton = false;
    $scope.remainingSeconds = 0;
    $scope.pomodoros = pomodoros;
    $scope.timer = timer;

    // fetch the localStorage to see if there is no pomodoro already running
    var storedTimer = angular.fromJson(localStorage.getItem('timer'));
    if (storedTimer) {
        var delta = (Date.now() - storedTimer.startedAt) / 1000;
        if (delta > 0) {
            var newDuration = parseInt(storedTimer.duration - delta, 10);
            timer.start({duration: newDuration, type: storedTimer.type});
        }
    }

    // watch the remaining seconds and update the scope.
    $scope.$watch(function(){return timer.remainingSeconds;}, function(remainingSeconds){
        $scope.remainingSeconds = remainingSeconds;
        if (remainingSeconds === 0) {
            bell.play();
            if (timer.type === 'pomodoro') {
                pomodoros.add();
            }
        }
    });


    $scope.start = function(){
        timer.start({duration: 25*60, type: 'pomodoro'});
    };
    
    $scope.shortBreak = function(){
        timer.start({duration: 5*60, type: 'shortBreak'});
    };

    $scope.longBreak = function(){
        timer.start({duration: 15*60, type: 'longBreak'});
    };

    $scope.stop = function(){
        timer.stop();
    };

    $scope.resetPomodoros = function() {
        var reply = confirm('Are you sure you want to reset your pomodoros ?');
        if (reply) {
            pomodoros.reset();
        }
    };

});