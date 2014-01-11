
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
