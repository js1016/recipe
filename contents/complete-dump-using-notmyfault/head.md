1. Download <https://download.sysinternals.com/files/NotMyFault.zip> and extract it to `c:\temp\NotMyFault` directory.
2. Run CMD or PowerShell as an administrator.

    ```bash
    reg add "HKLM\System\CurrentControlSet\Control\Session Manager\Memory Management" /v PagingFiles /t REG_MULTI_SZ /d "C:\pagefile.sys 4100 4100" /f
    reg add "HKLM\System\CurrentControlSet\Control\CrashControl" /v AlwaysKeepMemoryDump /t REG_DWORD /d 1 /f
    reg add "HKLM\System\CurrentControlSet\Control\CrashControl" /v CrashDumpEnabled /t REG_DWORD /d 1 /f
    ```

    Adjust the parameters in the first command based on your physical memory size. In `C:\pagefile.sys 4100 4100`, the two `4100` values represent the size of the page file to be created on the C drive. This value should be slightly larger than your physical memory. In this example, `4100MB` is suitable for `4GB` of physical memory. Adjust the values according to your actual situation. The table below lists recommended page file sizes for common physical memory sizes:

    | Physical Memory Size (GB) | Recommended Page File Size (MB) |
    | ------------------------- | ------------------------------- |
    | 4                         | 4100                            |
    | 8                         | 8200                            |
    | 16                        | 16400                           |
    | 32                        | 32800                           |
    | 64                        | 65600                           |
    | 128                       | 131100                          |

    After adjusting the page file size parameter in the first command, execute these three commands in CMD or PowerShell.

    ![](https://joji.blob.core.windows.net/recipe/complete-dump-using-notmyfault-1.png)

3. Make sure you have twice the size of your physical memory as free space on your system drive (usually C drive) before creating the page file. For example, if your physical memory is `4GB`, make sure you have at least `8GB` of free space on the C drive to accommodate the page file and the complete dump that will be captured later. If the space on the C drive is only enough for the page file, run the following command in CMD or PowerShell to set the output path of the complete dump to another disk (make sure that disk has free space greater than your physical memory size). The command below changes the output path of the complete dump to `D:\memory.dmp`, but you can adjust it accordingly.

    ```bash
    reg add "HKLM\System\CurrentControlSet\Control\CrashControl" /v DumpFile  /t REG_EXPAND_SZ /d "D:\memory.dmp" /f
    ```

    ![](https://joji.blob.core.windows.net/recipe/complete-dump-using-notmyfault-2.png)

4. After executing the above commands, restart your system to apply these settings.
