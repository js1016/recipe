1. Run CMD or PowerShell as an administrator, and execute the following command:

    ```
    reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\msedge.exe" /v MitigationOptions /t REG_BINARY /d "0000000000000000000000000000002000" /f
    ```

    You can verify whether the User-mode shadow stack (CET) of Edge is turned off by running `Get-ProcessMitigation -Name "msedge.exe"` in PowerShell:

    ```
    User Shadow Stack:
    UserShadowStack : OFF
    UserShadowStackStrictMode : OFF
    AuditUserShadowStack : NOTSET
    Override UserShadowStack : False
    ```
