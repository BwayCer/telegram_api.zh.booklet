
function translation() {
    var idx, len, helTxtZh, helTxtOrigin;
    var helQsTxtZh = document.querySelectorAll( "span[data-translation='zh']" );

    for ( idx = 0, len = helQsTxtZh.length ; idx < len ; idx++ ) {
        helTxtZh = helQsTxtZh[ idx ];
        helTxtOrigin = helTxtZh.previousElementSibling;

        if ( !helTxtOrigin || helTxtOrigin.dataset[ "translation" ] !== "origin" ) continue;
        if ( navigator.userAgent.indexOf( "Mobile" ) > -1 ) continue;

        helTxtZh.onmouseenter
            = helTxtOrigin.onmouseenter
            = showBtn;

        helTxtZh.onmouseleave
            = helTxtOrigin.onmouseleave
            = closeBtn;
    }

    var helChangeLanguageBtn = document.createElement( "div" );
    var btn_isShow = false;
    var btn_nowLanguageHelem = null;
    var btn_changeLanguageHelem = null;
    var btn_waitClose = null;

    helChangeLanguageBtn.style.position = "absolute";
    helChangeLanguageBtn.style.padding = ".375rem .75rem";
    helChangeLanguageBtn.style.background = "#fff";
    helChangeLanguageBtn.style.border = "1px solid #007bff";
    helChangeLanguageBtn.style.borderRadius = ".25rem";
    helChangeLanguageBtn.style.textAlign = "center";
    helChangeLanguageBtn.style.lineHeight = "1.5";
    helChangeLanguageBtn.style.fontSize = "1rem";
    helChangeLanguageBtn.style.fontWeight = "900";
    helChangeLanguageBtn.style.color = "#007bff";
    helChangeLanguageBtn.style.cursor = "pointer";
    helChangeLanguageBtn.textContent = "T";

    helChangeLanguageBtn.onselectstart= function() { return false; };
    helChangeLanguageBtn.onmouseenter = function () {
        if ( btn_waitClose ) {
            clearTimeout( btn_waitClose );
            btn_waitClose = null;
        }
    };
    helChangeLanguageBtn.onmouseleave = closeBtn;
    helChangeLanguageBtn.onclick = changeLanguage;

    function showBtn() {
        if ( btn_waitClose ) {
            clearTimeout( btn_waitClose );
            btn_waitClose = null;
        }

        if ( ! btn_isShow ) {
            document.body.appendChild( helChangeLanguageBtn );
            btn_isShow = true;
        }

        var objBoundingClientRect = this.getBoundingClientRect();
        var pageTop  = objBoundingClientRect.top  + window.scrollY;
        var pageLeft = objBoundingClientRect.left + window.scrollX;

        helChangeLanguageBtn.style.top
            = ( pageTop - helChangeLanguageBtn.clientHeight - 2 ) + "px";
        helChangeLanguageBtn.style.left
            = ( pageLeft - helChangeLanguageBtn.clientWidth / 2 ) + "px";

        btn_nowLanguageHelem = this;

        switch ( this.dataset[ "translation" ] ) {
            case "origin":
                btn_changeLanguageHelem = this.nextElementSibling;
                break;
            case "zh":
                btn_changeLanguageHelem = this.previousElementSibling;
                break;
        }
    }

    function closeBtn() {
        btn_waitClose = setTimeout( function () {
            if ( ! btn_isShow ) return;

            btn_isShow = false;
            btn_changeLanguageHelem = null;
            btn_waitClose = null;

            helChangeLanguageBtn.remove();
        }, 300 );
    }

    function changeLanguage() {
        var tmp;

        btn_nowLanguageHelem.setAttribute( "hidden", "" );
        btn_changeLanguageHelem.removeAttribute( "hidden" )

        tmp = btn_nowLanguageHelem;
        btn_nowLanguageHelem = btn_changeLanguageHelem;
        btn_changeLanguageHelem = tmp;
    }
}


translation();

