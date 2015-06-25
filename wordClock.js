/**
 * Created by oromanko on 6/25/15.
 */

window.onload =  function () {
    function WordClock () {
        this.isAdjustedClock = false;
        this.currentMinutes = 0;
        this.currentHours = 0;
        this.adjustInterval = 0;
    }
    WordClock.prototype.generateClock = function () {
        var minuteWords = ['quarter', 'twenty', 'five', 'half', 'ten'];
        var hourWords = ['nine', 'one', 'six', 'three', 'four', 'five', 'eleven', 'seven', 'twelve', 'ten', 'oclock'];
        var specWords = ['to', 'past'];
        var clockWords = {
            "minuteWords": {
                "values": minuteWords,
                "prefix": "mm_"
            },
            "specWords": {
                "values": specWords,
                "prefix": "sw_"
            },
            "hourWords": {
                "values": hourWords,
                "prefix": "hh_"
            }
        };

        for (var clockWord in clockWords) {
            var words = clockWords[clockWord].values;
            for (var i in words) {
                var element = document.createElement("span");
                element.id = clockWords[clockWord].prefix + words[i];
                element.className = "clockWordDisabled";
                element.innerHTML = words[i];
                document.body.appendChild(element);
                document.body.appendChild(document.createElement("br"));
            }

        }
        this._updateClock();
    };


    WordClock.prototype._updateClock = function () {
        var hourWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

        var currentTime = new Date(Date.now());
        this.currentMinutes = currentTime.getMinutes();
        if (!this.isAdjustedClock)
            this._adjustClock();
        else this.adjustInterval = 300000;
        this.currentHours =  currentTime.getHours();
        if(this.currentHours > 12) {
            this.currentHours -= 12;
        }

        this._resetClock();

        var elementsToEnable = [];

        if (this.currentMinutes > 30) {
            this.currentMinutes = 60 - this.currentMinutes;
            if (this.currentMinutes >=0 && this.currentMinutes <=3) {
                this.currentHours++;
            } else {
                elementsToEnable.push(document.getElementById("sw_to"));
            }
        } else {
            elementsToEnable.push(document.getElementById("sw_past"));
        }

        elementsToEnable.push(document.getElementById("hh_" + hourWords[this.currentHours-1]));


        if (this.currentMinutes >= 0 && this.currentMinutes <= 3) {
            elementsToEnable.push(document.getElementById("hh_oclock"));
        } else if (this.currentMinutes > 3 && this.currentMinutes <=7) {
            elementsToEnable.push(document.getElementById("mm_five"));
        } else if (this.currentMinutes > 7 && this.currentMinutes <=12) {
            elementsToEnable.push(document.getElementById("mm_ten"));
        } else if (this.currentMinutes > 12 && this.currentMinutes <= 17) {
            elementsToEnable.push(document.getElementById("mm_quarter"));
        } else if (this.currentMinutes > 17 && this.currentMinutes <= 22) {
            elementsToEnable.push(document.getElementById("mm_twenty"));
        } else if (this.currentMinutes > 22 && this.currentMinutes <= 27) {
            elementsToEnable.push(document.getElementById("mm_twenty"));
            elementsToEnable.push(document.getElementById("mm_five"));
        } else if (this.currentMinutes > 27 && this.currentMinutes <= 30) {
            elementsToEnable.push(document.getElementById("mm_half"));
        }

        for (var i in elementsToEnable) {
            var element = elementsToEnable[i];
            element.className = "clockWordEnabled";
        }

        window.setInterval(this._updateClock.bind(this), this.adjustInterval);
    };

    WordClock.prototype._resetClock = function () {
        var enabledElements = (document.getElementsByClassName("clockWordEnabled"));
        for (var i in enabledElements) {
            var element = enabledElements[i];
            element.className = "clockWordDisable";
        }
    };

    WordClock.prototype._adjustClock = function () {
        var result = this.currentMinutes % 5;
        if (result !== 0) {
            if (result < 2) {
                this.currentMinutes -= result;
            } else {
                this.currentMinutes += (5-result);
            }

            this.adjustInterval = result * 60 * 1000;
        }
        this.isAdjustedClock = true;
    }
    var clock = new WordClock();
    clock.generateClock();
};