headline = document.getElementsByClassName("article__title")[0].innerText

sentences = []
sent_to_para = {}
dom_paragraphs = document.querySelectorAll(".article-content > p")

// FOR SENTENCE HIGHLIGHT

// for (var i = 0; i < dom_paragraphs.length; i++){
//     var text = dom_paragraphs[i].innerText;

//     if (text && dom_paragraphs[i].getElementsByTagName('div').length == 0) {
//         var s = text.match(/[^.?!]+[.!?]+[\])'"“`’”]*/g)
//         s = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!\:)\s+|\p{Cc}+|\p{Cf}+/)
//         sentences = sentences.concat(s);

//         for (var j=0; j<s.length; j++) {
//             sent_to_para[s[j]] = i;
//         }
//     }
// }

paragraphs = []
for (var i = 0; i < dom_paragraphs.length; i++){
    paragraphs = paragraphs.concat(dom_paragraphs[i].innerText);
}

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin','http://localhost:8000');
body = {
    'headline': headline,
    'sentences': paragraphs
};
fetch('http://localhost:8000/predict', {
    mode: 'cors',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)})
  .then(response => response.json())
  .then(data => highlightSentences(data))
  .catch(error => console.log('Failed : ' + error.message));

function highlightSentences(data, color) {
    var sim = data['similarities'][headline];
    
    for (var i = 0; i < dom_paragraphs.length; i++) {
        if (sim[paragraphs[i]] >= 0.7) {
            highlight(dom_paragraphs[i], 'red');
        }
        else if (sim[paragraphs[i]] >= 0.5) {
            highlight(dom_paragraphs[i], 'yellow');
        }
        else if (sim[paragraphs[i]] >= 0.3) {
            highlight(dom_paragraphs[i], 'light')
        }
    }
}

function highlight(paragraph, color) {
    if (color == 'red') {
        paragraph.innerHTML = '<mark style="background-color: #F0B7A4">' + paragraph.innerHTML + '</mark>'
    }
    else if (color == 'yellow') {
        paragraph.innerHTML = '<mark style="background-color: #F1D185">' + paragraph.innerHTML + '</mark>'
    }
    else if (color == 'light') {
        paragraph.innerHTML = '<mark style="background-color: #F1E6C1">' + paragraph.innerHTML + '</mark>'
    }
}

// SENTENCE HIGHLIGHT

// function highlight(sentence) {
//     // console.log(sentence);
//     console.log(dom_paragraphs[sent_to_para[sentence]].innerHTML)
//     var source = dom_paragraphs[sent_to_para[sentence]].innerHTML;
//     var pattern = '(' + sentence.split(/(?=[.\s]|\b)/).join(') (') + ')';
//     pattern = pattern.replace(/ /g, '(((?:\\s*<\/?\\w[^<>]*>\\s*)*)|\\s)');
//     var pattern = new RegExp(pattern);
//     var result = source.replace(pattern, (match) => {
//         return '<mark>' + match + '</mark>';
//         // return match;
//     });
    
//     dom_paragraphs[sent_to_para[sentence]].innerHTML = result;
//     console.log(dom_paragraphs[sent_to_para[sentence]].innerHTML)
// }


// SINGLE SENTENCE CUSTOM HIGHLIGHT

// var source = document.querySelector('.article-content').innerHTML; // html from example
// console.log(source)
// var text = 'The project taps into the growing interest in no-code, spreadsheet-powered database platforms — like AirTable, for example, which had closed on $185 million in Series D funding in the days before Tables’ release, valuing its business at $2.585 billion, post-money.' // what we searching for
// text = '(' + text.split(' ').join(') (') + ')'
// // text = '(' + text.split(/(?=[.\s]|\b)/).join(') (') + ')';
// // .split(/(?=[.\s]|\b)/)
// console.log(text)
// text = text.replace(/ /g, '(((?:\\s*<\/?\\w[^<>]*>\\s*)*)|\\s)');
// console.log(text)
// var htmlTag = new RegExp('(<\\/?([a-z]+)([^<]+)*(?:>))+', 'g'); // find html tags
// var missingRegExp = new RegExp('(((?:\s*<\/?\w[^<>]*>\s*)*)|\s)', 'i'); // << missing regex
// var s = new RegExp(/(120)(((?:\s*<\/?\w[^<>]*>\s*)*)|\s)(introduced)/, 'g')
// var s = new RegExp(text)

// var result = source.replace(s, function (searchedText) {
//     // Wrap html tags inside searched text with span tag
//     // var result = source.replace('/(120)(((?:\s*<\/?\w[^<>]*>\s*)*)|\s)(introduced)/', 'HAHAHAHAHAHAH') 
//     // searchedText = searchedText.replace(text, function (match) {
//     //     console.log('match:', match);
//     //     return '</span>' + match + '<span>';
//     // });
//     console.log('searchedText: ', searchedText)
//     return '<mark>' + searchedText + '</mark>';
// });

// console.log('Result: ' + result);

// document.querySelector('.article-content').innerHTML = result