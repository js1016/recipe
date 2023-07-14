1. Run CMD or PowerShell as an administrator, and execute the following command:

    ```
    reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\msedge.exe" /v MitigationOptions /t REG_BINARY /d "0000000000000000000000000000002000" /f
    ```

    You can verify whether the User-mode shadow stack (CET) of Edge is turned off by running `Get-ProcessMitigation -Name "msedge.exe"` in PowerShell:

    ```powershell
    PS C:\Users\user> Get-ProcessMitigation -Name "msedge.exe"
    ...
    ...
    User Shadow Stack:
    UserShadowStack                    : OFF
    UserShadowStackStrictMode          : OFF
    AuditUserShadowStack               : NOTSET
    Override UserShadowStack           : False
    PS C:\Users\user>
    ```

    **Note**: This setting will take effect only after restarting the Edge browser. Please close all running instances of `msedge.exe` from the **Task Manager** to ensure that no background Edge processes remain active.
