/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2020. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
/// 
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('MyMainContainerWidget', ['MainContainerWidget', 'WidgetFactory'],
  function(context, cls) {

    /**
     * @class MyMainContainerWidget
     * @memberOf classes
     * @extends classes.MainContainerWidget
     */
    cls.MyMainContainerWidget = context.oo.Class(cls.MainContainerWidget, function($super) {
      return /** @lends classes.MyMainContainerWidget.prototype */ {
        __name: "MyMainContainerWidget",
        _headerBar: null,
		  _footerBar: null,

        constructor: function(opts) {
          $super.constructor.call(this, opts);

          this._headerBar = cls.WidgetFactory.createWidget('HeaderBar', this.getBuildParameters());
          this._headerBar.setParentWidget(this);
          this.getElement().querySelector("header").appendChild(this._headerBar.getElement());

          this._footerBar = cls.WidgetFactory.createWidget('FooterBar', this.getBuildParameters());
          this._footerBar.setParentWidget(this);
          this.getElement().querySelector("footer").appendChild(this._footerBar.getElement());
        },

        destroy: function() {
          if (this._headerBar) {
             this._headerBar.destroy();
          }
			 if (this._footerBar) {
             this._footerBar.destroy();
			 }
          $super.destroy.call(this);
        }

      };
    });

    /*
     *  This is a sample widget that would replace the default one in GBC
     *  To activate it, please uncomment the line below. This will override
     *  the original widget registration to this one.
     */

    cls.WidgetFactory.registerBuilder('MainContainer', cls.MyMainContainerWidget);
  });
