/**
 * @fileoverview Defines the APIReponseError class.
*/
define(['aeris', 'aeris/errors/abstracterror'], function(aeris, AbstractError) {
  aeris.provide('aeris.errors.APIResponseError');


  /**
   * APIResponse Error
   *
   * Use when:
   *  - An API request responds with an HTTP error code
   *  - An API request responds with an error message
   *  - An API request responds with unexpected data
   *
   * @constructor
   * @extends {aeris.errors.AbstractError}
   * @override
   */
  aeris.errors.APIResponseError = function() {
    AbstractError.apply(this, arguments);
  };

  aeris.inherits(
    aeris.errors.APIResponseError,
    AbstractError
  );


  /**
   * @override
   */
  aeris.errors.APIResponseError.prototype.setName = function() {
    return 'APIResponseError';
  };


  return aeris.errors.APIResponseError;
});