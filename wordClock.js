/**
 * Created by oromanko on 6/25/15.
 */

window.onload =  function () {
    function WordClock () {
        this.simulateClock = false;
        this.simulateClockInterval = 3 * WordClock.MSEC_IN_SEC;
        this.currentSeconds = this.currentMinutes = this.currentHours = this.updateInterval = 0;
        this.clockWords = null;
    }

    WordClock.CLOCK_MULTIPLE_OF_NUM = 5;
    WordClock.SEC_IN_MIN = WordClock.MIN_IN_HR = 60;
    WordClock.MSEC_IN_SEC = 1000;
    WordClock.TWELVE_HOUR_CLOCK_FORMAT = 12;
    WordClock.TWENTY_FOUR_HOUR_CLOCK_FORMAT = 24;

    WordClock.prototype.generateClock = function () {

        if (this.simulateClock === true) {
            WordClock.prototype._clockSimulator = clock._generateClockSimulator(new Date());
        }

        var hourWords = ["twelve","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];
        var minuteWords = ['quarter', 'twenty', 'five', 'half', 'ten'];
        var specWords = ['to', 'past', 'oclock'];

        this.clockWords = {
            minuteWords: {
                values: minuteWords,
                prefix: "mm_"
            },
            specWords: {
                values: specWords,
                prefix: "sw_"
            },
            hourWords: {
                values: hourWords,
                prefix: "hh_"
            }
        };

        for (var clockWord in this.clockWords) {
            if (this.clockWords.hasOwnProperty(clockWord)) {
                var words = this.clockWords[clockWord].values;
                var element;
                for (var i in words) {
                    if (words.hasOwnProperty(i)) {
                        element = document.getElementById(this.clockWords[clockWord].prefix + words[i]);
                        element.className = "clockWordDisabled";
                    }
                }
            }
        }
        this._updateClock();
    };

    WordClock.prototype._updateClock = function () {

        var elementsToEnable = [];
            
        var currentTime = this.simulateClock ? this._clockSimulator() : new Date();

        this.currentSeconds = currentTime.getSeconds();
        this.currentMinutes = currentTime.getMinutes();
        this.currentHours = currentTime.getHours();

        if (this.currentMinutes % WordClock.CLOCK_MULTIPLE_OF_NUM !== 0) {
            this._adjustClock();
        } else {
            this.updateInterval = WordClock.CLOCK_MULTIPLE_OF_NUM * WordClock.SEC_IN_MIN * WordClock.MSEC_IN_SEC;
        }

        this._resetClock();

        if (this.currentMinutes > 30) {
            this.currentHours++;
            this.currentMinutes = WordClock.MIN_IN_HR - this.currentMinutes;

            if (this.currentMinutes !==0) {
                elementsToEnable.push(document.getElementById("sw_to"));
            }
        } else if (this.currentMinutes > 0) {
            elementsToEnable.push(document.getElementById("sw_past"));
        }

        if (this.currentHours === WordClock.TWENTY_FOUR_HOUR_CLOCK_FORMAT) {
            this.currentHours = 0;
        }

        if(this.currentHours >= WordClock.TWELVE_HOUR_CLOCK_FORMAT) {
            this.currentHours -= WordClock.TWELVE_HOUR_CLOCK_FORMAT;
        }

        elementsToEnable.push(document.getElementById("hh_" + this.clockWords.hourWords.values[this.currentHours]));

        switch (this.currentMinutes) {
            case 0: elementsToEnable.push(document.getElementById("sw_oclock")); break;
            case 5:  elementsToEnable.push(document.getElementById("mm_five")); break;
            case 10: elementsToEnable.push(document.getElementById("mm_ten")); break;
            case 15: elementsToEnable.push(document.getElementById("mm_quarter")); break;
            case 20: elementsToEnable.push(document.getElementById("mm_twenty")); break;
            case 25: elementsToEnable.push(document.getElementById("mm_twenty"));
                     elementsToEnable.push(document.getElementById("mm_five")); break;
            case 30: elementsToEnable.push(document.getElementById("mm_half")); break;
            default: throw new Error("Invalid minutes");
        }


        for (var i = 0; i<elementsToEnable.length; i++) {
            var element = elementsToEnable[i];
            element.className = "clockWordEnabled";
        }

        var interval = this.simulateClock ? this.simulateClockInterval : this.updateInterval;
        window.setTimeout(this._updateClock.bind(this), interval);

    };

    WordClock.prototype._resetClock = function () {
        var enabledElements = (document.getElementsByClassName("clockWordEnabled"));
        for (var i=enabledElements.length - 1; i>=0; i--) {
            var element = enabledElements[i];
            element.className = "clockWordDisabled";
        }
    };

    WordClock.prototype._adjustClock = function () {
        var remainder = this.currentMinutes % WordClock.CLOCK_MULTIPLE_OF_NUM;

        if (remainder !== 0) {
            if (remainder < 3) {
                this.currentMinutes -= remainder;
            } else {
                this.currentMinutes += (WordClock.CLOCK_MULTIPLE_OF_NUM - remainder);
            }

            var secBeforeUpdate = ((WordClock.CLOCK_MULTIPLE_OF_NUM - remainder) * WordClock.SEC_IN_MIN);
            this.updateInterval = (secBeforeUpdate - this.currentSeconds) * WordClock.MSEC_IN_SEC;

        } else {
            this.updateInterval = WordClock.CLOCK_MULTIPLE_OF_NUM * WordClock.SEC_IN_MIN * WordClock.MSEC_IN_SEC;
        }
    };
    WordClock.prototype._generateClockSimulator = function (startDate) {
        var date = startDate;
        var hours = date.getHours();
        var minutes = date.getMinutes();

        return function () {
            minutes += WordClock.CLOCK_MULTIPLE_OF_NUM;

            if (hours < WordClock.TWENTY_FOUR_HOUR_CLOCK_FORMAT) {
                if (minutes >= WordClock.MIN_IN_HR) {
                    minutes = 0;
                    hours++;
                }
            } else {
                hours = 0;
                minutes = 0;
            }

            date.setHours(hours);
            date.setMinutes(minutes);

            return date;
        };
    };
    var clock = new WordClock();
    clock.simulateClock = false;
    clock.generateClock();

};