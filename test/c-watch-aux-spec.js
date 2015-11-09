'use strict';

describe('c-watch-aux', function() {

  //spec test variables
  var spec_config = {
    custom_opts: {
          source_code: ['./*', './foo/Makefile'],
          params: {exc: 'test'}
    }
    , c_aux: require('../lib/c-watch-aux')
  }
  , expected = true
  , result = false;


  it('should provide an object with \'get_defaults\' & \'set_options\' properties', function() {
    expect(spec_config.c_aux.get_defaults).toBeDefined();
    expect(spec_config.c_aux.set_options).toBeDefined();
  });

  it('should return default user_data when get_defaults is called', function() {
    expected = { 
        source_code: [ './*.c', './*.cpp', './*.h' ],
        params: { exc: 'a.out', args: '' },
        makefile: false,
        makefile_dir: '',
        get_exc_str: 'a.out '
    };

    //call get_defaults
    result = spec_config.c_aux.get_defaults();

    //run checks
    expect(result.source_code.length).toEqual(expected.source_code.length);
    expect(result.source_code[0]).toEqual(expected.source_code[0]);
    expect(result.source_code[1]).toEqual(expected.source_code[1]);
    expect(result.source_code[2]).toEqual(expected.source_code[2]);
    expect(result.params.exc).toEqual(expected.params.exc);
    expect(result.params.args).toEqual(expected.params.args);
    expect(result.makefile).toEqual(expected.makefile);
    expect(result.makefile_dir).toEqual(expected.makefile_dir);
    expect(result.get_exc_str()).toEqual(expected.get_exc_str);
  });

  it('should return custom user_data when set_options is called', function() {
    expected = { 
        source_code: [ './*', './foo/Makefile' ],
        params: { exc: 'test', args: '' },
        makefile: true,
        makefile_dir: './foo/',
        get_exc_str: './foo/test '
    };

    //run set_options
    result = spec_config.c_aux.set_options(spec_config.custom_opts);
    
    //run checks
    expect(result.source_code.length).toEqual(expected.source_code.length);
    expect(result.source_code[0]).toEqual(expected.source_code[0]);
    expect(result.source_code[1]).toEqual(expected.source_code[1]);
    expect(result.params.exc).toEqual(expected.params.exc);
    expect(result.params.args).toEqual(expected.params.args);
    expect(result.makefile).toEqual(expected.makefile);
    expect(result.makefile_dir).toEqual(expected.makefile_dir);
    expect(result.get_exc_str()).toEqual(expected.get_exc_str);
  });

});
