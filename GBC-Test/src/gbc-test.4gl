IMPORT util

TYPE THeader RECORD
	rectype STRING,
	appimage STRING,
	appname STRING,
	username STRING,
	lastlogin STRING
END RECORD

TYPE TFooter RECORD
	rectype STRING,
	homeurl STRING,
	email STRING
END RECORD

MAIN
	DEFINE recHeader THeader
	DEFINE recFooter TFooter

	WHENEVER ANY ERROR CALL errorHandler

	OPEN WINDOW mainWindow WITH FORM "gbc-form"
	CLOSE WINDOW SCREEN

	#Set default values
	LET recHeader.rectype = "header"
	LET recHeader.appimage = "https://4js.com/wp-content/uploads/2015/05/logo_4Js_2014_CMYK_seul-300x92.png"
	LET recHeader.appname = "GBC Demo"
	LET recHeader.username = "mifo@4js.com"
	LET recHeader.lastlogin = CURRENT YEAR TO SECOND
	CALL executeHeaderFrontCall(recHeader.*)

	LET recFooter.rectype = "footer"
	LET recFooter.homeurl = "https://4js.com"
	LET recFooter.email = "mifo@4js.com"
	CALL executeFooterFrontCall(recFooter.*)

	INPUT recHeader.appimage, recHeader.appname, recHeader.username, recHeader.lastlogin,
			recFooter.homeurl, recFooter.email
		WITHOUT DEFAULTS FROM s_record.*

		ON ACTION CANCEL
			EXIT INPUT

		AFTER INPUT
			IF recHeader.appimage IS NULL THEN
				ERROR "App Image is missing"
				NEXT FIELD appimage
			END IF
			IF recHeader.appname IS NULL THEN
				ERROR "App Name is missing"
				NEXT FIELD appname
			END IF
			IF recHeader.username IS NULL THEN
				ERROR "App Username is missing"
				NEXT FIELD username
			END IF
			IF recHeader.lastlogin IS NULL THEN
				ERROR "App Last Login is missing"
				NEXT FIELD lastlogin
			END IF
			IF recFooter.homeurl IS NULL THEN
				ERROR "Home URL is missing"
				NEXT FIELD homeurl
			END IF
			IF recFooter.email IS NULL THEN
				ERROR "Email address is missing"
				NEXT FIELD email_addr
			END IF

			CALL executeHeaderFrontCall(recHeader.*)
			CALL executeFooterFrontCall(recFooter.*)
			CONTINUE INPUT

	END INPUT

	CLOSE WINDOW mainWindow

END MAIN

PRIVATE FUNCTION executeHeaderFrontCall(recHeader THeader) RETURNS ()

	#Excute Frontcall to set header info
	TRY
		CALL ui.Interface.frontCall("JSONInfo", "BDLInfo", [util.JSON.stringifyOmitNulls(recHeader)], [])
	CATCH
		CALL errorHandler()
	END TRY

END FUNCTION

PRIVATE FUNCTION executeFooterFrontCall(recFooter TFooter) RETURNS ()

	#Excute Frontcall to set header info
	TRY
		CALL ui.Interface.frontCall("JSONInfo", "BDLInfo", [util.JSON.stringifyOmitNulls(recFooter)], [])
	CATCH
		CALL errorHandler()
	END TRY

END FUNCTION

PRIVATE FUNCTION errorHandler() RETURNS ()

        DISPLAY SFMT("Error Code: %1", STATUS)
        DISPLAY SFMT("Error Description: %1", err_get(STATUS))
        DISPLAY SFMT("Stack Trace: %1", base.Application.getStackTrace())
        EXIT PROGRAM -1

END FUNCTION

