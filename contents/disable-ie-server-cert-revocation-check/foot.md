1.  If you want to re-enable the IE server certificate revocation check, please run `inetcpl.cpl` to open the **Internet Properties** again and enable following three options under the **Security** category:

    -   Check for publisher's certificate revocation
    -   Check for server certificate revocation
    -   Check for signatures on downloaded programs

    ![](https://joji.blob.core.windows.net/recipe/disable-ie-server-cert-revocation-check-2.png)

    If you disabled the IE server certificate check by importing registry keys, then please delete the following registry keys:

    ```
    Windows Registry Editor Version 5.00

    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Internet Explorer\Download]
    "CheckExeSignatures"="no"

    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\CurrentVersion\Internet Settings]
    "CertificateRevocation"=dword:00000000
    ```
