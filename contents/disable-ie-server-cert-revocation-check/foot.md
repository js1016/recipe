1.  If you want to re-enable the IE server certificate revocation check, please run `inetcpl.cpl` to open the **Internet Properties** again and enable following three options under the **Security** category:

    -   Check for publisher's certificate revocation
    -   Check for server certificate revocation
    -   Check for signatures on downloaded programs

    ![](https://joji.blob.core.windows.net/recipe/disable-ie-server-cert-revocation-check-2.png)

    If you disabled the IE server certificate check via commands, then please execute following commands in an elevated CMD or PowerShell window.

    ```
    REG DELETE "HKLM\SOFTWARE\Policies\Microsoft\Internet Explorer\Download" /v CheckExeSignatures /f
    REG DELETE "HKLM\SOFTWARE\Policies\Microsoft\Windows\CurrentVersion\Internet Settings" /v CertificateRevocation /f
    ```
