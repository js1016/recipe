1. Please ensure that the execution of PowerShell scripts is enabled. If you're unsure whether script execution is enabled, open PowerShell and run the following command: `Get-ExecutionPolicy`. If the result is `RemoteSigned`, `Unrestricted`, or `Bypass`, then script execution is enabled regardless of whether your system is a Windows Client or Windows Server. If your system is Windows Server and the result is `Default` or `Undefined`, then PowerShell script execution is also enabled. In any other scenario, script execution in PowerShell is prohibited. If you want to enable PowerShell script execution, please refer to the steps below:

    1. Run PowerShell as an administrator and execute following command to set the PowerShell ExecutionPolicy to `RemoteSigned`. This will allow PowerShell to execute scripts.

        ```powershell
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
        ```

        If you encounter any errors with the execution of the above command, please proceed with the steps below:

        - To allow script execution in Windows PowerShell, execute following commands in an elevated CMD or PowerShell window:
            ```
            REG ADD HKLM\SOFTWARE\Policies\Microsoft\Windows\PowerShell /v EnableScripts /t REG_DWORD /d 1 /f
            REG ADD HKLM\SOFTWARE\Policies\Microsoft\Windows\PowerShell /v ExecutionPolicy /d "RemoteSigned" /f
            ```
        - To allow script execution in PowerShell Core (Cross-platform PowerShell), execute following commands in an elevated CMD or PowerShell window:
            ```
            REG ADD HKLM\SOFTWARE\Policies\Microsoft\PowerShellCore /v EnableScripts /t REG_DWORD /d 1 /f
            REG ADD HKLM\SOFTWARE\Policies\Microsoft\PowerShellCore /v ExecutionPolicy /d "RemoteSigned" /f
            ```
        - After restarting PowerShell, these changes will take effect.
