module.exports = function () {

    this.BeforeFeatures(function (event, next) {
        // maximize browser window before test
        browser.driver.manage().window().maximize();
        next();
    });
};

