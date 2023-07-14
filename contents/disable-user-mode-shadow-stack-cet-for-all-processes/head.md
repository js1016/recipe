1. Run CMD or PowerShell as an administrator, and execute the following command:

    ```
    reg add "HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Session Manager\Kernel" /v MitigationOptions /t REG_BINARY /d "0000000000000000000000000000002000" /f
    ```

2. Restart Windows to apply the settings.
