/*
 * Page Object for Google Search page
 */
var
    driver = browser.driver,
    Google = function () {

        this.url = 'https://google.co.uk';
        this.searchInput = 'input[name="q"]';
        this.results = '.srg .g';
        this.resultCaptions = '.srg .g .r';
        this.link = "//h3[@class='r']";
    };

Google.prototype.openSearchPage = function () {

    return driver.get(this.url);
};

Google.prototype.searchFor = function (searchString) {
    var
        google = this,
        input = driver.findElement(by.css(google.searchInput))
        ;

    return input.sendKeys(searchString)
        .then(function () {
            return input.sendKeys(protractor.Key.ENTER);
        });
};

Google.prototype.getResultByIndex = function (index) {
    var
        result = [],
        resultElement,
        pushCallback = result.push.bind(result)
        ;

    return driver.findElements(by.css(this.results))
        .then(function (resultElements) {
            resultElement = resultElements[Number(index) - 1];
        })
        .then(function () {
            resultElement.findElement(by.css('.r')).getText().then(pushCallback);
        })
        .then(function () {
            resultElement.findElement(by.css('cite')).getText().then(pushCallback);
        })
        .then(function () {
            resultElement.findElement(by.css('.st')).getText().then(pushCallback);
        })
        .then(function () {
            return result;
        });
};

Google.prototype.clickOnTheResultLink = function (linkNumber) {
    var
        sisense = this,
        linkLocator = this.link + "[" + linkNumber + "]",
        element = driver.findElement(by.xpath(linkLocator));

    return element.click();
}

Google.prototype.getPageAddress = function () {

    return driver.getCurrentUrl();
}

module.exports.Google = Google;