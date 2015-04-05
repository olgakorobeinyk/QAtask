module.exports.config = {

    framework: 'cucumber',

    specs: 'features/*.feature',

    cucumberOpts: {
        require: 'step_definitions/**/*.js',
        format: 'pretty'
    }

};