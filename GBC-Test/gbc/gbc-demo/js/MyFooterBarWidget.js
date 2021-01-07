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

modulum('MyFooterBarWidget', ['WidgetBase', 'WidgetFactory'],
  function(context, cls) {

    /**
     * @class MyFooterBarWidget
     * @memberOf classes
     * @extends classes.WidgetBase
     */
    cls.MyFooterBarWidget = context.oo.Class(cls.WidgetBase, function($super) {
      return /** @lends classes.MyFooterBarWidget.prototype */ {
        __name: "MyFooterBarWidget",
        _model: null,
        _footerTable: null,
        _homeurl: null,
        _email: null,

        constructor: function(opts) {
          $super.constructor.call(this, opts);
          this._model = new cls.ModelHelper(this);
        },

        _initElement: function() {
          $super._initElement.call(this);

          //Get references to HTML tags
          this._footerTable = this.getElement().querySelector(".mike-footer");
          this._homeurl = this.getElement().querySelector(".mike-homeurl");
          this._email = this.getElement().querySelector(".mike-email");

			 //delay the listener by 100 ms
          this._registerTimeout(function() {
             var session = context.SessionService.getCurrent();
             if (session) {
                console.debug("Setting session BDLInfo handler");
                this._handler = session.when('BDLInfo', this._onInfoReceived.bind(this));
             } else {
                console.debug("Looks like session is null");
             }
          }.bind(this), 100);

        },

        _onInfoReceived: function(event, session, data) {
           console.debug("Received the BDLInfo event in the footer");
           if (!data) {
              console.log("Data is empty");
              return;
           }
           if (!this._footerTable) {
              console.log("Cannot locate footer table");
              return;
           }

           if (data.rectype == null || data.rectype !== "footer") {
              console.log("Received non-footer event");
				  return;
			  }
 
           //set the home url
           if (data.homeurl && this._homeurl) {
              this._homeurl.href = data.homeurl;
				  this._homeurl.innerHTML = data.homeurl;
           }

           //set the email
           if (data.email && this._email) {
              this._email.href = "mailto:" + data.email;
              this._email.innerHTML = data.email;
           }

        },

        destroy: function() {
          $super.destroy.call(this);
			 this._footerTable = null;
			 this._email = null;
			 this._homeurl = null;
			 this._model = null;
        }

      };
    });
    cls.WidgetFactory.registerBuilder('FooterBar', cls.MyFooterBarWidget);
});
