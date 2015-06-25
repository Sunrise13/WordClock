/**
 * Created by oromanko on 6/25/15.
 */

window.onload =  function () {
    function WordClock () {
    }
    WordClock.prototype.generateClock = function () {
        var minuteWords = ["quarter", 'twenty', 'five', 'half', 'ten'];
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
        var currentMinutes = currentTime.getMinutes();
        var currentHours =  currentTime.getHours();
        if(currentHours > 12) {
            currentHours -= 12;
        }

        this._resetClock();

        var elementsToEnable = [];

        if (currentMinutes > 30) {
            currentMinutes = 60 - currentMinutes;
            if (currentMinutes >=0 && currentMinutes <=3) {
                currentHours++;
            } else {
                elementsToEnable.push(document.getElementById("sw_to"));
            }
        } else {
            elementsToEnable.push(document.getElementById("sw_past"));
        }

        elementsToEnable.push(document.getElementById("hh_" + hourWords[currentHours-1]));


        if (currentMinutes >= 0 && currentMinutes <= 3) {
            elementsToEnable.push(document.getElementById("hh_oclock"));
        } else if (currentMinutes > 3 && currentMinutes <=7) {
            elementsToEnable.push(document.getElementById("mm_five"));
        } else if (currentMinutes > 7 && currentMinutes <=12) {
            elementsToEnable.push(document.getElementById("mm_ten"));
        } else if (currentMinutes > 12 && currentMinutes <= 17) {
            elementsToEnable.push(document.getElementById("mm_quarter"));
        } else if (currentMinutes > 17 && currentMinutes <= 22) {
            elementsToEnable.push(document.getElementById("mm_twenty"));
        } else if (currentMinutes > 22 && currentMinutes <= 27) {
            elementsToEnable.push(document.getElementById("mm_twenty"));
            elementsToEnable.push(document.getElementById("mm_five"));
        } else if (currentMinutes > 27 && currentMinutes <= 30) {
            elementsToEnable.push(document.getElementById("mm_half"));
        }

        for (var i in elementsToEnable) {
            var element = elementsToEnable[i];
            element.className = "clockWordEnabled";
        }

        window.setInterval(this._updateClock.bind(this), 600);
    };

    WordClock.prototype._resetClock = function () {
        var enabledElements = (document.getElementsByClassName("clockWordEnabled"));
        for (var i in enabledElements) {
            var element = enabledElements[i];
            element.className = "clockWordDisable";
        }
    };
    var clock = new WordClock();
    clock.generateClock();
};