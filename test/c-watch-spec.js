'use strict';

describe('c-watch', function() {

  //spec test variables
  var spec_config = {
      no_opts: {params: {}}
    , custom_opts: {
          source_code: ['./*', './foo/Makefile'],
          params: {exc: 'foo'}
    }
    , c_watch: require('../lib/c-watch')
    , c_aux: require('../lib/c-watch-aux')
  }
  , expected = true
  , result = false;


  it('should provide an object with \'init\' & \'enable\' properties', function() {
    expect(spec_config.c_watch.init).toBeDefined();
    expect(spec_config.c_watch.enable).toBeDefined();
  });

  it('should init with defaults if no console args are present', function () {
      //get expected defaults (no references)
      expected = {
          source_code: spec_config.c_aux.get_defaults().source_code
        , params: {
            exc: spec_config.c_aux.get_defaults().params.exc
          , args: spec_config.c_aux.get_defaults().params.args
        }
        , makefile: spec_config.c_aux.get_defaults().makefile
        , makefile_dir: spec_config.c_aux.get_defaults().makefile_dir
      };

      //run c-watch with no console args
      spec_config.c_watch.init(spec_config.no_opts);
      result = spec_config.c_watch.get_config();
      //cross check default values
      expect(result.source_code).toEqual(expected.source_code);
      expect(result.params.exc).toEqual(expected.params.exc);
      expect(result.params.args).toEqual(expected.params.args);
      expect(result.makefile).toEqual(expected.makefile);
      expect(result.makefile_dir).toEqual(expected.makefile_dir);
  });

  it('should populate user_data when init is called with custom options', function() {
    spec_config.c_watch.init(spec_config.no_opts);
    //use expected as a prior state data holder
    expected = {
        source_code: spec_config.c_watch.get_config().source_code
      , params: { exc: spec_config.c_watch.get_config().params.exc }
    };

    //set custom options
    spec_config.c_watch.init(spec_config.custom_opts);
    result = spec_config.c_watch.get_config();

    expect(expected.source_code.length).toBeGreaterThan(result.source_code.length);
    expect(expected.params.exc).toNotEqual(result.params.exc);
    expect(result.params.exc).toEqual(spec_config.custom_opts.params.exc);
  });


});