1. ref:ttd
2. Execute the following command to attach TTD to the target process and start recording the time travel trace. You need to replace `<PID>` with the actual PID of the target process. For example, if the process you want to record the trace of is `notepad.exe` and its PID is `3232`, the actual command you need to execute would be: `tttracer.exe -dumpfull -attach 3232`.

    ```
    tttracer.exe -dumpfull -attach <PID>
    ```

3. After executing the command, TTD will need some time to attach to the process and start recording the trace. This may take some time, depending on the memory usage of the target process.

4. Once TTD is successfully attached, you will see a small window in the upper left corner of the screen. The title of this window will display as `Process Name + Number + .run`. This is the final filename of the Time Travel trace that is currently being recorded. During the Time Travel recording process, the overall performance of the process will slow down, which is normal.

    ![](https://joji.blob.core.windows.net/recipe/ttd-trace-by-attach-to-a-process-1.png)

5. Perform any operations in the target process that you want TTD to record.
