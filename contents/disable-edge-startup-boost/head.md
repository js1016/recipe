1. Access `edge://settings/system` in Edge and disable **Startup boost**.

    ![](https://joji.blob.core.windows.net/recipe/edge-startup-boost-1.png)

2. If the setting is greyed out, please launch a CMD or PowerShell window as administrator and execute following command:
    ```
    REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v StartupBoostEnabled /t REG_DWORD /d 0 /f
    ```
