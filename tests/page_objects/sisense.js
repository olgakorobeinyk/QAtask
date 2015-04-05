/*
 * Page Object for SiSense website
 */
var
    driver = browser.driver,
    Sisense = function () {

        this.url = 'http://www.sisense.com/';
        this.section = "//*[@id='menu-main-menu']//a[text()='";
        this.frame = '.fancybox-iframe';
        this.widgetTitle = "//widget-title[contains(text(), 'TOTAL VISITOR BY LOCATION')]";
        this.statisticColumnNumber = "//span[@class = 'number_span']";
        this.buttonsList = {
            "Open Dashboard" : "a.action-btn.yellow.fancybox.full"
        };
        this.chartsList = {
            "Lead Breakdown By Campaign Source": "//widget[widget-header/widget-title[contains(text(), " +
            "'LEAD BREAKDOWN BY CAMPAIGN SOURCE')]]"
        };
        this.slicesList = {
            "Webinar" : "//*[name()='path' and @fill='#1e7c7e']"
        };
    };

Sisense.prototype.openHomepage = function () {

    return driver.get(this.url);
}

Sisense.prototype.openSection = function (sectionTitle) {
    var
        sisense = this,
        sectionLocator = sisense.section + sectionTitle + "']",
        section = driver.findElement(by.xpath(sectionLocator));

    return section.click();
}

Sisense.prototype.clickTheButton = function (buttonTitle) {
    var
        sisense = this,
        buttonLocator = sisense.buttonsList[buttonTitle],
        button = driver.findElement(by.css(buttonLocator));

    return button.click();
}

Sisense.prototype.isDashboardShowsUp = function () {
    var
        sisense = this;

    return driver.isElementPresent(by.css(this.frame)).then(function(exists){
        if (!exists) {
            throw new TypeError;
        }
        return driver.findElement(by.css(sisense.frame)).getAttribute("name");
    }).then(function(name){

        return driver.switchTo().frame(name);
    }).then(function(){

        return driver.isElementPresent(by.xpath(sisense.widgetTitle));
    }).then(function(result){

        return result;
    }, function(){

        return false;
    });
}

Sisense.prototype.getStatistics = function() {

    return driver.findElements(by.xpath(this.statisticColumnNumber)).then(function(elements) {
        var
            promise = protractor.promise.defer(),
            results = [];

        elements.forEach(function(element){
            promise =  promise.then(function(){
                return element.getText()
            }).then(function(test) {
                results.push(test);
            })
        });

        return promise.then(function() {
            return results;
        });

    });
}

Sisense.prototype.getFrame = function(frame) {
    var
        frameElement;
    try {
        frameElement = driver.findElement(by.css(frame));

    } catch (e) {
    }

    return frameElement;
}

Sisense.prototype.clickTheSlice = function (sliceTitle, chartTitle) {
    var
        sisense = this,
        locator = this.chartsList[chartTitle] + this.slicesList[sliceTitle];

    return driver.findElement(by.xpath(locator)).click();
}


module.exports.Sisense = Sisense;