1. Run CMD as an administrator. If your system is 64-bit, navigate to the x64 subdirectory under the directory where you extracted livekd.zip, for example: `c:\temp\livekd\x64`. If your system is 32-bit, navigate to `c:\temp\livekd\x86`. If you have extracted the files to a different directory than `c:\temp`, please replace the path accordingly.

2. Execute the following command to create a kernel memory dump.

    ```bash
    livekd -m -o memory.dmp
    ```

    ![](https://joji.blob.core.windows.net/recipe/kernel-memory-dump-using-livekd-1.png)
