'use strict';

describe('sample-module', function() {

  //spec test variables
  var spec_config = {
    sample: true
  }
  , expected = true
  , result = false;


  it('should always pass', function() {
    //setup
    expected = true;
    result = spec_config.sample;

    //test
    expect(result).toBe(expected);
  });

  //..etc.
});
