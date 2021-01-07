"use strict";

modulum('FrontCallService.modules.JSONInfo', ['FrontCallService'],
/**
*    * @param {gbc} context
*       * @param {classes} cls
*          */
   function(context, cls) {
      context.FrontCallService.modules.JSONInfo = {

		BDLInfo: function (jsonString) {

			//Validate the jsonString Parameter
         if (jsonString === undefined) {
				this.parametersError();
				console.log("jsonString is null");
				return;
			}
         
         try {
				//Parse jsonString
				var obj = JSON.parse(jsonString);

				//Trigger a session event
				var session = context.SessionService.getCurrent();
				console.debug("Sending the BDLInfo event");
				console.debug("JSON string is: " + jsonString);
				session.emit('BDLInfo', obj);

			} catch (ex) {
				//Error parsing the jsonString
				this.runtimeError("BDLInfo parameter is not a valid JSON string");
				console.log("Exception: " + ex.toString());
				console.log("jsonString: " + jsonString);
				return;
			}
			return [''];
      }
   };
});
