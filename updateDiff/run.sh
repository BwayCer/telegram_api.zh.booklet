#!/bin/bash
# 檢查更新


__filename=`realpath "$0"`
_dirsh=`dirname "$__filename"`
_binsh=$_dirsh
_libsh=`realpath "$_dirsh/../lib"`
_fileName=`basename "$0"`
rootDir=`realpath "$_dirsh/.."`

remotePath="https://core.telegram.org"
pageInfo=`echo "
/bots/api
/css/bootstrap.min.css
/css/telegram.css
/js/bootstrap.min.js
/js/jquery.min.js
/js/main.js
/img/back_to_top.png
/img/back_to_top_1x.png
/img/breadcrumb_divider.png
/img/breadcrumb_divider_1x.png
/img/bullet.png
/img/bullet_2x.png
/img/link-icon.png
/img/twitter.png
/img/twitter_2x.png
" | grep .`

fnMain() {
    local idx len val

    len=`echo -e "$pageInfo" | wc -l`

    for idx in `seq 1 $len`
    do
        val=`echo -e "$pageInfo" | sed -n "${idx}p"`
        pageRemotePath="$_dirsh/remote${val}"
        pageRemoteDir=`dirname "$pageRemotePath"`

        if [ ! -d "$pageRemoteDir" ]; then
            mkdir -p "$pageRemoteDir"
        fi

        if [ -z "`echo "$val" | grep "\(\.html\|\.css\|\.js\|\.jpg\|\.png\|\.gif\)"`" ]; then
            pageRemotePath=${pageRemotePath}.html
        fi

        echo ${remotePath}${val}
        curl "${remotePath}${val}" > "$pageRemotePath"
    done

    echo
    diff -ry --suppress-common-lines "$_dirsh/local" "$_dirsh/remote"
}


fnMain "$@"

