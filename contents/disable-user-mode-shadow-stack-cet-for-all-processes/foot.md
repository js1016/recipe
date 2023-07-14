1. If you want to undo the disabling of the User-mode shadow stack (CET) for all processes, please execute the following command in an elevated Command Prompt (CMD) or PowerShell window:

    ```
    reg delete "HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Session Manager\Kernel" /v MitigationOptions /f
    ```

2. Restart Windows to apply the settings.
