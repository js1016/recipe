1. Close the host process that invokes Edge WebView2.
2. ref:edit-the-system-environment-variables
3. Create a new user/system variable as follows:

    **Variable name**: WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS

    **Variable value**: --log-net-log=%USERPROFILE%\Desktop\net-export.json --net-log-capture-mode=Everything

    You can choose a different path instead of `%USERPROFILE%\Desktop\net-export.json`.

    If you want the variable to be effective system-wide, create it as a system variable. Otherwise, create it as a user variable

    ![](https://joji.blob.core.windows.net/recipe/edge-webview2-netexport-log-1.png)

4. Now launch the host process that invokes Edge WebView2, it will captuer Network Export log during its lifetime.
