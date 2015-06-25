/**
 * Created by oromanko on 6/25/15.
 */

window.onload =  function () {
    function WordClock () {

    }
    WordClock.prototype.generateClock = function () {
        var clockWords = ["quarter", 'twenty', 'five', 'half', 'ten', 'to', 'past', 'nine', 'one', 'six', 'three', 'four', 'five', 'eleven', 'seven', 'twelve', 'ten', 'oclock'];

        for (var clockWord in clockWords) {
            var element = document.createElement("span");
            element.id = clockWords[clockWord];
            element.className = "clockWordDisabled";
            element.innerHTML = clockWords[clockWord];
            document.body.appendChild(element);
            document.body.appendChild(document.createElement("br"));
        }
        this._updateClock();
    }


    WordClock.prototype._updateClock = function () {
        var hourWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

        var currentTime = new Date(Date.now());
        var currentMinutes = currentTime.getMinutes();
        var currentHours = currentTime.getHours();
        if(currentHours > 12) {
            currentHours -= 12;
        }

        this._resetClock();

        var elementsToEnable = [];
        var element = document.getElementById(hourWords[currentHours-1]);
        elementsToEnable.push(element);

        if (currentMinutes > 30) {
            elementsToEnable.push(document.getElementById("to"));
            currentMinutes = 60 - currentMinutes;
        } else {
            elementsToEnable.push(document.getElementById("past"));
        }

        if (currentMinutes >= 0 && currentMinutes <= 3) {
            elementsToEnable.push(document.getElementById("oclock"));
        } else if (currentMinutes > 3 && currentMinutes <=7) {
            elementsToEnable.push(document.getElementById("five"));
        } else if (currentMinutes > 7 && currentMinutes <=12) {
            elementsToEnable.push(document.getElementById("ten"));
        } else if (currentMinutes > 12 && currentMinutes <= 17) {
            elementsToEnable.push(document.getElementById("quarter"));
        } else if (currentMinutes > 17 && currentMinutes <= 22) {
            elementsToEnable.push(document.getElementById("twenty"));
        } else if (currentMinutes > 22 && currentMinutes <= 27) {
            elementsToEnable.push(document.getElementById("twenty"));
            elementsToEnable.push(document.getElementById("five"));
        } else if (currentMinutes > 27 && currentMinutes <= 30) {
            elementsToEnable.push(document.getElementById("half"));
        }

        for (var i in elementsToEnable) {
            var element = elementsToEnable[i];
            element.className = "clockWordEnabled";
        }
    }

    WordClock.prototype._resetClock = function () {
        var enabledElements = (document.getElementsByClassName("clockWordEnabled"));
        for (var i in enabledElements) {
            var element = enabledElements[i];
            element.className = "clockWordDisable";
        }
    }
    var clock = new WordClock();
    clock.generateClock();
}