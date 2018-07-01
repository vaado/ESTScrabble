"use strict"

const EstScrabble = {

    init: function () {
        document.getElementById('scrabble')
            .addEventListener('submit', function(e){
                e.preventDefault()
                let letters = document.getElementById('letters').value
                console.log(letters)
                EstScrabble.find(letters)
            })
    },

    find: function(letters) {
        let anagrams = this.anagrams(letters)
        console.log(anagrams);
        let matches = []
        for (let i = 0; i < anagrams.length; i++) {
            let match = fetch('https://www.eki.ee/dict/shs_soovita.cgi?term=' + anagrams[i])
                .then((response) => response.text())
                .then((responseTXT) => {
                    let responseWords = responseTXT.replace(/\\|"|[|]/g, '')
                    if (responseWords.length > 2) {
                        results.insertAdjacentHTML('beforeend', responseWords)
                    }
                })
            break
        }
    },

    anagrams: function(letters) {
        let counter = [],
            anagrams = [],
            chars = letters.split(''),
            length = chars.length,
            i

        for (i = 0; i < length; i++) {
            counter[i] = 0
        }

        anagrams.push(letters)
        i = 0
        while (i < length) {
            if (counter[i] < i) {
                this.shift(chars, i % 2 === 1 ? counter[i] : 0, i)
                counter[i]++
                i = 0;
                anagrams.push(chars.join(''))
            } else {
                counter[i] = 0
                i++
            }
        }

        return anagrams
    },

    shift: function (chars, i, j) {
        let tmp = chars[i]
        chars[i] = chars[j]
        chars[j] = tmp
    }
}

EstScrabble.init()




