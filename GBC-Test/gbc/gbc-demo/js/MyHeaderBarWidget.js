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

modulum('MyHeaderBarWidget', ['WidgetBase', 'WidgetFactory'],
  function(context, cls) {

    /**
     * @class MyHeaderBarWidget
     * @memberOf classes
     * @extends classes.WidgetBase
     */
    cls.MyHeaderBarWidget = context.oo.Class(cls.WidgetBase, function($super) {
      return /** @lends classes.MyHeaderBarWidget.prototype */ {
        __name: "MyHeaderBarWidget",
        _model: null,
        _headerTable: null,
        _appimage: null,
        _appname: null,
        _username: null,
        _lastlogin: null,
        _logoutButton: null,

        constructor: function(opts) {
          $super.constructor.call(this, opts);
          this._model = new cls.ModelHelper(this);
        },

        _initElement: function() {
          $super._initElement.call(this);

          //Get references to HTML tags
          this._headerTable = this.getElement().querySelector(".mike-header");
          this._appimage = this.getElement().querySelector(".mike-appimage");
          this._appname = this.getElement().querySelector(".mike-appname");
          this._username = this.getElement().querySelector(".mike-username");
          this._lastlogin = this.getElement().querySelector(".mike-lastlogin");
          this._logoutButton = this.getElement().querySelector(".mike-logout-button");
          if (this._logoutButton) {
             this._logoutButton.on('click.MyHeaderBarWidget', this._onLogout.bind(this));
          }

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
           console.debug("Received the BDLInfo event in the header");
           if (!data) {
              console.log("Data is empty");
              return;
           }
           if (!this._headerTable) {
              console.log("Cannot locate header table");
              return;
           }

			  if (data.rectype == null || data.rectype !== "header") {
              console.log("Received non-header event");
				  return;
			  }
 
           //set the appimage
           if (data.appimage && this._appimage) {
              this._appimage.src = data.appimage;
           }

           //set the appname
           if (data.appname && this._appname) {
              this._appname.innerHTML = data.appname;
           }

           //set the username
           if (data.username && this._username) {
              this._username.innerHTML = "Username: <b>" + data.username + "</b>"; 
           }

           //set the last login
           if (data.lastlogin && this._lastlogin) {
              this._lastlogin.innerHTML = "Last Login: <b>" + data.lastlogin + "</b>"; 
           }

        },

        _onLogout: function(event) {
             console.log("Close Action sending in function");
             var tabbedContainer = this._model.getCurrentApplication().getSession().getTabbedContainerModeHostApplication();
             if (tabbedContainer) {
                tabbedContainer.close();
                return;
             } else {
                console.log("Tabbed Container is null");
             }
             var actionService = this._model.getCurrentApplication().getActionApplicationService();
             if (actionService) {
                actionService.getAction("close").execute();
             } else {
                console.log("Action Service is null");
             }
        },

        destroy: function() {
          $super.destroy.call(this);
          this._model = null;
          this._headerTable = null;
          this._appimage = null;
          this._appname = null;
          this._username = null;
          this._lastlogin = null;
          this._logoutButton = null;
        }

      };
    });
    cls.WidgetFactory.registerBuilder('HeaderBar', cls.MyHeaderBarWidget);
});
