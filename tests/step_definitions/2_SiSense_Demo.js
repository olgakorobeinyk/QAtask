/**
 * Step definitions
 */
var
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    SisensePO = require('../page_objects/sisense.js').Sisense,
    sisense = new SisensePO,
    expect
    ;

chai.use(chaiAsPromised);
expect = chai.expect;

module.exports = function () {

    this.Given(/^I am on the SiSense homepage$/, function (next) {

        sisense.openHomepage();
        next();
    });

    this.When(/^I go to the "([^"]*)" section$/, function (sectionTitle, next) {

        sisense.openSection(sectionTitle).then(function () {
            //wait for section
            browser.sleep(1500).then(next);
        });
    });

    this.When(/^I click the "([^"]*)" button$/, function (buttonTitle, next) {

        sisense.clickTheButton(buttonTitle).then(function () {
            //wait for dashboard popup
            browser.sleep(10000).then(next);
        });
    });

    this.When(/^I click the "([^"]*)" slice in the chart titled "([^"]*)"$/, function (sliceTitle, chartTitle, next) {
        //console.log("click now");
        sisense.clickTheSlice(sliceTitle, chartTitle).then(function () {
            //wait for section
            browser.sleep(5000).then(next);
        });

    });

    this.When(/^Eventually the dashboard shows up$/, function (next) {
        expect(sisense.isDashboardShowsUp()).to.eventually.equal(true);
        next();
    });

    this.Then(/^Eventually the dashboard shows up$/, function (next) {
        expect(sisense.isDashboardShowsUp()).to.eventually.equal(true);
        next();

    });

    this.Then(/^The indicators show the following values$/, function (dataTable, next) {
        var data = dataTable.rows();

        data = data.map(function(element){
            return element[1];
        });

        sisense.getStatistics().then(function(results){
            results.forEach(function(value, index){
               expect(value).equal(data[index]);
            });
            next();
        });

    })


};

