'use strict';

describe('arg-parser', function() {

  //spec test variables
  var spec_config = {
      no_args: []
    , bad_args: []
    , good_args: []
    , cli_aux: require('../lib/arg-parser')
  }
  , expected = true
  , result = false;

  beforeEach(function (){
    spec_config.no_args   = ['', ''];
    spec_config.bad_args  = ['', '', 'bad-arg-test'];
    spec_config.good_args = ['', '', '-o', 'foo'];
  });

  it('should return an object with \'input\', \'warnings\', and \'opt_count\' properties', function() {
    expect(spec_config.cli_aux(spec_config.no_args).input).toBeDefined();
    expect(spec_config.cli_aux(spec_config.no_args).warnings).toBeDefined();
    expect(spec_config.cli_aux(spec_config.no_args).opt_count).toBeDefined();
  });

  it('should warn the user when bad arguments are given', function() {
    //test good options warning count
    expected = 0;
    result = spec_config.cli_aux(spec_config.good_args).warnings;
    expect(result).toEqual(expected);

    //test bad options warning count
    expected = 1;
    result = spec_config.cli_aux(spec_config.bad_args).warnings;
    expect(result).toEqual(expected);
  });

  it('should increment opt_count when options are passed in', function(){
    expected = 1;
    result = spec_config.cli_aux(spec_config.good_args).opt_count;
    expect(result).toEqual(expected);
  });

  it('should populate input.params with options', function(){
    //test empty args first
    expected = 0;
    const count = (args) => {
      const params = spec_config.cli_aux(args).input.params;
      result = 0
      for (let key in params) {
        if (params[key]) {
          result++;
        }
      }
      return result;
    };
    expect(count(spec_config.no_args)).toEqual(expected);

    //test population of single arg
    expected = 1;
    expect(count(spec_config.good_args)).toEqual(expected);
  });

  it('should throw a bad format error when an improper arg string is passed in', function() {
    expected = true;
    result = false;
    try{
        spec_config.no_args.push('--source');
        spec_config.cli_aux(spec_config.no_args);
    }catch(res){
        console.log(res.message);
        result = true;
    }finally{
        expect(result).toBe(expected);
    }
  });
});