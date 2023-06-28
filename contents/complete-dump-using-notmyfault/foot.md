1. If you haven't previously modified the output path of the complete dump, it will be saved in `C:\Windows\memory.dmp`. If you have modified the output path of the complete dump, please retrieve it from the specified location.

2. If you want to revert the previous registry settings, run CMD or PowerShell as an administrator and execute the following commands:

    ```bash
    reg add "HKLM\System\CurrentControlSet\Control\Session Manager\Memory Management" /v PagingFiles /t REG_MULTI_SZ /d "?:\pagefile.sys" /f
    reg delete "HKLM\System\CurrentControlSet\Control\CrashControl" /v AlwaysKeepMemoryDump /f
    reg add "HKLM\System\CurrentControlSet\Control\CrashControl" /v CrashDumpEnabled /t REG_DWORD /d 7 /f
    ```

3. If you previously modified the complete dump's output path and want to change it back to the default value, additionally run the following command:

    ```bash
    reg add "HKLM\System\CurrentControlSet\Control\CrashControl" /v DumpFile  /t REG_EXPAND_SZ /d "%SystemRoot%\MEMORY.DMP" /f
    ```
