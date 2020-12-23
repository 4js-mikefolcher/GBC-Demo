# GBC Frontcall Demo
**GBC Frontcall**

## GBC Code
The GBC code uses an event model to emit the front call BDL event (*BDLInfo*) at the \
session level to any widget objects that subscribe.  The subscribing widgets should test \
the rectype property to determine if the frontcall is of a type that it needs to respond \
to and process accordingly.

**Register a Widget** \
`this._handler = session.when('BDLInfo', this._onInfoReceived.bind(this));`

**Implement the Handler** \
`_onInfoReceived: function(event, session, data) {` \
`   console.debug("Received the BDLInfo event"); ` \
`   if (!data) { ` \
`      //Data is null ` \
`      return; ` \
`   } ` \
`   if (data.rectype == null || data.rectype !== "header") { ` \
`      //Received non-header event, ignoring... ` \
`      return; ` \
`   } ` \
`   //Add your code here... ` \
`}`

## Genero BDL Code
The Genero BDL code calls the frontcall with one parameter, a serialized JSON string that \
represents an object.  The Genero record will then became a Javascript object on the \
frontend in the form of the *data* object in the Javascript example.

**Define a record with the data you want to pass to the frontend** \
`DEFINE fc_rec RECORD` \
`	rectype STRING, ` \
`	username STRING,` \
`   appname STRING` \
`END RECORD`

**Populate the record with data** \
`LET fc_rec.rectype = "header"` \
`LET fc_rec.username = "mike.folcher"` \
`LET fc_rec.appname = "GBC Frontcall Demo"`

**Make the frontcall** \
`CALL ui.Interface.frontCall("JSONInfo", "BDLInfo", ` \
`	[util.JSON.stringifyOmitNulls(fc_rec)], [])`



