Handlebars.registerHelper("greetText", function (type) {
    const greetTexts = {"true": "checked", "false": ""};
    return greetTexts[type];
});

Handlebars.registerHelper("ratingsym", function (lengthRating) {
    let text = ''
    for (let i = 0; i < lengthRating; ++i) {
        text += '<span>&#9760;</span>'
    }
    return text;
});