define([
  'aeris/util',
  'vendor/marionette',
  'aeris/errors/invalidargumenterror'
], function(_, Marionette, InvalidArgumentError) {
  /**
   * An Aeris extension of Marionette.Layout.
   *
   * Extended functionality
   * - Accepts ui, events, and regions in constructor options
   * - Accepts a regionControllers option,
   *   to simplify rendering controllers within regions
   *
   * @class aeris.appliction.controller.LayoutController
   * @extends Marionette.Layout
   *
   * @constructor
   * @override
   *
   * @param {Object=} opt_options
   * @param {Object=} opt_options.ui
   * @param {Object.<string, string>=} opt_options.regions Named regions to add to the layout.
   * @param {Object.<string,Backbone.View>=} opt_options.regionControllers A hash of controllers to render in regions.
   */
  var LayoutController = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      ui: {},
      events: {},
      regions: {},
      regionControllers: {}
    });


    /**
     * DOM UI alias definitions
     *
     * See Marionette.View documentation.
     *
     * @override
     */
    this.ui = options.ui;


    /**
     * Layout regions definitions.
     * See Marionette.Layout documentation.
     *
     * @override
     * @type {Object.<string, string>}
     */
    this.regions = options.regions;


    /**
     * A hash of controllers to render in regions.
     *
     * @type {Object.<string,Backbone.View>} As { 'regionName': controllerInstance }
     * @private
     */
    this.regionControllers_ = options.regionControllers;


    /**
     * @override
     * @type {Object.<string,string|Function>} Backbone events hash.
     */
    this.events = options.events;


    Marionette.Layout.call(this, options);


    // Render layout controllers when Layout is rendered.
    this.listenTo(this, 'render', this.renderRegionControls_);
  };
  _.inherits(LayoutController, Marionette.Layout);


  /**
   * Show a controller in the specified
   * region.
   *
   * @throws {aeris.errors.InvalidArgumentError} If region is not available.
   *
   * @param {Backbone.View} controller Object must have a `render` method.
   * @param {string} regionName
   */
  LayoutController.prototype.showInRegion = function(controller, regionName) {
    if (!this[regionName] || !(this[regionName] instanceof Marionette.Region)) {
      throw new InvalidArgumentError('Unable to show controller in region ' +
        '\'' + regionName + '\'. Region has not been renderered, ' +
        'or does not exist..');
    }

    this[regionName].show(controller);
  };


  /**
   * Render controllers and show in layouts, as defined in
   * this.regionControllers_.
   *
   * @private
   */
  LayoutController.prototype.renderRegionControls_ = function() {
    _.each(this.regionControllers_, function(controller, regionName) {
      this.showInRegion(controller, regionName);
    }, this);
  };


  return LayoutController;
});