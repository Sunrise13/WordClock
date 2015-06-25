/**
 * Created by oromanko on 6/25/15.
 */

window.onload =  function () {
    function WordClock () {
        this.isAdjustedClock = false;
        this.currentSeconds = 0;
        this.currentMinutes = 0;
        this.currentHours = 0;
        this.adjustInterval = 0;
        this.intervalID = 0;
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
        var hourWords = ["twelve","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];

        var currentTime = new Date(Date.now());
        console.log(currentTime);
        this.currentSeconds = currentTime.getSeconds();
        console.log("seconds" + this.currentSeconds);
        this.currentMinutes = currentTime.getMinutes();
        console.log("minutes" + this.currentMinutes);
        if (this.currentMinutes % 5 !== 0)
            this._adjustClock();
        else {
            //window.clearInterval(this.intervalID);
            this.adjustInterval = 300000;
        }

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

        elementsToEnable.push(document.getElementById("hh_" + hourWords[this.currentHours]));


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

        window.setTimeout(this._updateClock.bind(this), this.adjustInterval);
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
            console.log("result" + result);

            this.adjustInterval = ((5-result) * 60 * 1000) - (this.currentSeconds*1000);
            console.log("adjustInterval" + this.adjustInterval);
        } else this.adjustInterval = 300000;
    }
    var clock = new WordClock();
    clock.generateClock();
};