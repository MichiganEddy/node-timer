var prompt = require('prompt');
var Spinner = require('cli-spinner').Spinner;

var secSchema = {
  properties: {
    seconds: {
      description: 'Enter how long you want to set the timer for, (in seconds).',
      pattern: /[0-9]+/,
      message: 'Seconds must be a whole number',
      required: true
    }
  }
};


var authSchema = {
  properties: {
    auth: {
      description: 'Start the timer? (y/n - q to quit)',
      pattern: /[yYnNqQ]{1}/,
      message: 'Enter "y" to start, "n" to change the timer settings, or "q" to quit',
      required: 'true'
    }
  }
};

// FUNCTION - programInit --> Briefly announce program beginning.
var programInit = function()
{
  console.log('Timer program started. \n');
  getSeconds();
};


// FUNCTION - getSeconds --> get the user's desired timer run time
var getSeconds = () =>
{
    prompt.get(secSchema, function (err, results) {
      if(err)
      {
        errFunc("getSeconds", err);
      }else{
    console.log('Timer set for: ' + results.seconds);
    authStartTimer(getMilis(results.seconds));

  }});
};

// FUNCTION - authStartTimer --> get the user's signal to start the timer
//            (or to change the timer settings.)
var authStartTimer = function(timerSetting)
{
  prompt.get(authSchema, function (err, results) {
    if(err)
    {
      errFunc("authStartTimer", err);
    }else {
      runSwitch(results.auth.toLowerCase(), timerSetting);
    }
  });
};

// FUNCTION - runSwitch --> A switch statement function to control program flow.
var runSwitch = function(userResponse, timerSetting)
{
  switch(userResponse)
  {
    case 'y':
      countdown(3, timerSetting);
      break;
    case 'n':
      getSeconds();
      break;
    default:
      process.exit();
      break;
  }
};

// countdown from
var countdown = function(count, timerSetting)
{
  if(count == 0)
  {
    timerStart(timerSetting);
  }else {
    console.log(count + '...');
    setTimeout(function(){
    countdown(--count, timerSetting);
  },1000, timerSetting);
  }
};


// FUNCTION - timerStart --> function that starts the timer running.
var timerStart = function(timerSetting) {
  setTimeout(function(){
    spinner.stop();
    let alertString = '**************************************\n';
    console.log('\n\n' + alertString + '\n\tTimer is finished.\n\t' + timerSetting/1000 + ' seconds elapsed.\n\n' + alertString);
    process.exit();
  }, timerSetting, timerSetting);
  spinner.start();
};


// FUNCTION - getMilis --> convert seconds to miliseconds
var getMilis = (s) => {return s * 1000};

// FUNCTION - errFunc --> report an error and exit.
var errFunc = function (functionName, error)
{
  console.log('Error in ' + functionName + '.\n' + error);
  process.exit(1);
};


// Main Code Loop starts here
prompt.start;
var spinner = new Spinner('running... %s');

programInit();
