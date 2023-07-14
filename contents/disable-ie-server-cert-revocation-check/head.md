1. Press the `Win key + R` or right click on the **Start Menu** and choose **Run** to launch a **Run** dialog. Then run `inetcpl.cpl` to open **Internet Properties**.

    ![](https://joji.blob.core.windows.net/recipe/clear-ie-cache-1.png)

2. Go to the **Advanced** tab, uncheck the following three options under the **Security** category:

    - Check for publisher's certificate revocation
    - Check for server certificate revocation
    - Check for signatures on downloaded programs

    ![](https://joji.blob.core.windows.net/recipe/disable-ie-server-cert-revocation-check-1.png)

3. If you are unable to change the settings through the user interface, please launch a CMD or PowerShell window as administrator and execute following commands:
    ```
    REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Internet Explorer\Download" /v CheckExeSignatures /d no /f
    REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Windows\CurrentVersion\Internet Settings" /v CertificateRevocation /t REG_DWORD /d 0 /f
    ```
